import { getPrisma } from "@/lib/db.server";
import { readJson, writeJson } from "@/lib/admin/storage.server";
import { detectEmbed } from "@/lib/admin/embed";
import { DEFAULT_COLLECTIONS, DEFAULT_REELS, DEFAULT_SITE } from "./defaults";
import type { CollectionName } from "@/lib/admin/collections.functions";
import type { Reel } from "@/lib/admin/reels.functions";
import type { SiteData } from "@/lib/admin/site.functions";

function sortByOrder<T extends { order?: number }>(items: T[]) {
  return [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

function recordToItem(record: { id: string; order: number; data: unknown }) {
  const data = typeof record.data === "object" && record.data !== null ? record.data : {};
  return { ...(data as Record<string, unknown>), id: record.id, order: record.order };
}

function warnDbFallback(operation: string, error: unknown) {
  console.warn(`[cms] MongoDB unavailable during ${operation}; using local JSON fallback.`, error);
}

function localReelFallback() {
  return sortByOrder(readJson<Reel[]>("reels.json", DEFAULT_REELS));
}

type RawReelRecord = Record<string, unknown>;

function asText(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function asNumber(value: unknown, fallback: number) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function rawObjectId(value: unknown) {
  if (typeof value === "string") return value;
  if (typeof value === "object" && value !== null && "$oid" in value) {
    return asText((value as { $oid?: unknown }).$oid);
  }
  return "";
}

function rawDate(value: unknown) {
  if (typeof value === "string") return value;
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "object" && value !== null && "$date" in value) {
    const date = (value as { $date?: unknown }).$date;
    return typeof date === "string" ? date : new Date().toISOString();
  }
  return new Date().toISOString();
}

function normalizeRawReel(record: RawReelRecord, index: number): Reel | null {
  const url = asText(record.url).replace(/\s+/g, "");
  if (!url) return null;

  const embed = detectEmbed(url);
  const title = asText(record.title, `Reel ${index + 1}`);

  return {
    id: rawObjectId(record._id) || asText(record.id) || url,
    tag: asText(record.tag, "Reel"),
    title,
    description: asText(record.description),
    url,
    kind: asText(record.kind, embed.kind),
    embedUrl: asText(record.embedUrl, embed.embedUrl),
    poster: asText(record.poster, embed.thumb || ""),
    order: asNumber(record.order, index),
    createdAt: rawDate(record.createdAt),
    updatedAt: rawDate(record.updatedAt),
  };
}

const MAX_COLLECTION_ITEMS: Partial<Record<CollectionName, number>> = {
  heroShowcase: 10,
  videoEditing: 4,
  visualAssets: 15,
  softwareSystems: 4,
  seoAnalytics: 4,
  strategicConsulting: 2,
  contentWriting: 4,
};

export async function getSiteData(): Promise<SiteData> {
  const prisma = getPrisma();
  if (!prisma) return readJson<SiteData>("site.json", DEFAULT_SITE);

  try {
    const site = await prisma.site.upsert({
      where: { key: "main" },
      create: { key: "main", data: DEFAULT_SITE },
      update: {},
    });
    return site.data as unknown as SiteData;
  } catch (error) {
    warnDbFallback("getSiteData", error);
    return readJson<SiteData>("site.json", DEFAULT_SITE);
  }
}

export async function updateSiteData(patch: Record<string, unknown>): Promise<SiteData> {
  const current = await getSiteData();
  const merged = deepMerge(current, patch) as SiteData;
  const prisma = getPrisma();

  if (!prisma) {
    writeJson("site.json", merged);
    return merged;
  }

  try {
    const site = await prisma.site.upsert({
      where: { key: "main" },
      create: { key: "main", data: merged },
      update: { data: merged },
    });
    return site.data as unknown as SiteData;
  } catch (error) {
    warnDbFallback("updateSiteData", error);
    writeJson("site.json", merged);
    return merged;
  }
}

export async function listCollectionData(collection: CollectionName) {
  const prisma = getPrisma();
  if (!prisma) {
    return sortByOrder(readJson<Array<Record<string, unknown>>>(`${collection}.json`, DEFAULT_COLLECTIONS[collection]));
  }

  try {
    let rows = await prisma.contentItem.findMany({
      where: { collection },
      orderBy: { order: "asc" },
    });

    if (rows.length === 0 && DEFAULT_COLLECTIONS[collection]?.length) {
      await prisma.contentItem.createMany({
        data: DEFAULT_COLLECTIONS[collection].map((item, order) => ({
          collection,
          order: Number(item.order ?? order),
          data: item,
        })),
      });
      rows = await prisma.contentItem.findMany({ where: { collection }, orderBy: { order: "asc" } });
    }

    return rows.map(recordToItem);
  } catch (error) {
    warnDbFallback(`listCollectionData:${collection}`, error);
    return sortByOrder(readJson<Array<Record<string, unknown>>>(`${collection}.json`, DEFAULT_COLLECTIONS[collection]));
  }
}

export async function upsertCollectionItem(collection: CollectionName, item: Record<string, unknown>) {
  const prisma = getPrisma();
  const maxItems = MAX_COLLECTION_ITEMS[collection];

  if (!prisma) {
    const items = readJson<Array<Record<string, unknown>>>(`${collection}.json`, DEFAULT_COLLECTIONS[collection]);
    if (!item.id) {
      if (typeof maxItems === "number" && items.length >= maxItems) {
        throw new Error("LIMIT_REACHED");
      }
      const now = new Date().toISOString();
      const newItem = {
        ...item,
        id: crypto.randomUUID(),
        order: items.length,
        createdAt: now,
        updatedAt: now,
      };
      writeJson(`${collection}.json`, [...items, newItem]);
      return newItem;
    }

    const idx = items.findIndex((entry) => entry.id === item.id);
    if (idx === -1) throw new Error("NOT_FOUND");
    const updated = { ...items[idx], ...item, updatedAt: new Date().toISOString() };
    items[idx] = updated;
    writeJson(`${collection}.json`, items);
    return updated;
  }

  try {
    if (!item.id) {
      if (typeof maxItems === "number") {
        const count = await prisma.contentItem.count({ where: { collection } });
        if (count >= maxItems) throw new Error("LIMIT_REACHED");
        const created = await prisma.contentItem.create({
          data: { collection, order: count, data: { ...item, order: count } },
        });
        return recordToItem(created);
      }
      const count = await prisma.contentItem.count({ where: { collection } });
      const created = await prisma.contentItem.create({
        data: { collection, order: count, data: { ...item, order: count } },
      });
      return recordToItem(created);
    }

    const existing = await prisma.contentItem.findUnique({ where: { id: String(item.id) } });
    if (!existing || existing.collection !== collection) throw new Error("NOT_FOUND");
    const { id: _id, ...itemData } = item;
    const data = {
      ...((existing.data as Record<string, unknown>) ?? {}),
      ...itemData,
      updatedAt: new Date().toISOString(),
    };
    const updated = await prisma.contentItem.update({
      where: { id: existing.id },
      data: { data, order: Number(item.order ?? existing.order) },
    });
    return recordToItem(updated);
  } catch (error) {
    if ((error as Error)?.message === "LIMIT_REACHED") {
      throw error;
    }
    warnDbFallback(`upsertCollectionItem:${collection}`, error);
    const items = readJson<Array<Record<string, unknown>>>(`${collection}.json`, DEFAULT_COLLECTIONS[collection]);
    if (!item.id) {
      if (typeof maxItems === "number" && items.length >= maxItems) {
        throw new Error("LIMIT_REACHED");
      }
      const now = new Date().toISOString();
      const newItem = { ...item, id: crypto.randomUUID(), order: items.length, createdAt: now, updatedAt: now };
      writeJson(`${collection}.json`, [...items, newItem]);
      return newItem;
    }
    const idx = items.findIndex((entry) => entry.id === item.id);
    if (idx === -1) throw new Error("NOT_FOUND");
    const updated = { ...items[idx], ...item, updatedAt: new Date().toISOString() };
    items[idx] = updated;
    writeJson(`${collection}.json`, items);
    return updated;
  }
}

export async function deleteCollectionItem(collection: CollectionName, id: string) {
  const prisma = getPrisma();
  if (!prisma) {
    const items = readJson<Array<Record<string, unknown>>>(`${collection}.json`, DEFAULT_COLLECTIONS[collection]).filter(
      (item) => item.id !== id,
    );
    writeJson(`${collection}.json`, items);
    return { success: true };
  }

  try {
    await prisma.contentItem.delete({ where: { id } });
    return { success: true };
  } catch (error) {
    warnDbFallback(`deleteCollectionItem:${collection}`, error);
    const items = readJson<Array<Record<string, unknown>>>(`${collection}.json`, DEFAULT_COLLECTIONS[collection]).filter(
      (item) => item.id !== id,
    );
    writeJson(`${collection}.json`, items);
    return { success: true };
  }
}

export async function reorderCollectionData(collection: CollectionName, orderedIds: string[]) {
  const prisma = getPrisma();
  if (!prisma) {
    const items = readJson<Array<Record<string, unknown>>>(`${collection}.json`, DEFAULT_COLLECTIONS[collection]);
    const map = new Map(items.map((item) => [item.id as string, item]));
    const reordered = orderedIds
      .map((id, order) => {
        const item = map.get(id);
        return item ? { ...item, order } : null;
      })
      .filter(Boolean) as Array<Record<string, unknown>>;
    writeJson(`${collection}.json`, reordered);
    return reordered;
  }

  try {
    await Promise.all(
      orderedIds.map((id, order) =>
        prisma.contentItem.update({
          where: { id },
          data: { order },
        }),
      ),
    );
    return listCollectionData(collection);
  } catch (error) {
    warnDbFallback(`reorderCollectionData:${collection}`, error);
    const items = readJson<Array<Record<string, unknown>>>(`${collection}.json`, DEFAULT_COLLECTIONS[collection]);
    const map = new Map(items.map((item) => [item.id as string, item]));
    const reordered = orderedIds
      .map((id, order) => {
        const item = map.get(id);
        return item ? { ...item, order } : null;
      })
      .filter(Boolean) as Array<Record<string, unknown>>;
    writeJson(`${collection}.json`, reordered);
    return reordered;
  }
}

export async function listReelData(): Promise<Reel[]> {
  const prisma = getPrisma();
  if (!prisma) return localReelFallback();

  try {
    return ((await prisma.reel.findRaw({ options: { sort: { order: 1 } } })) as unknown as unknown[])
      .map((reel, order) => normalizeRawReel(reel as RawReelRecord, order))
      .filter(Boolean) as Reel[];
  } catch (error) {
    console.error("[cms] Failed to load reels from MongoDB.", error);
    throw new Error("Unable to load reels from MongoDB.");
  }
}

export async function createReelData(data: {
  tag: string;
  title: string;
  description: string;
  url: string;
  poster?: string;
}): Promise<Reel> {
  const embed = detectEmbed(data.url);
  const prisma = getPrisma();

  if (!prisma) {
    const reels = readJson<Reel[]>("reels.json", DEFAULT_REELS);
    const now = new Date().toISOString();
    const reel: Reel = {
      id: crypto.randomUUID(),
      tag: data.tag,
      title: data.title,
      description: data.description,
      url: data.url,
      kind: embed.kind,
      embedUrl: embed.embedUrl,
      poster: data.poster || embed.thumb || "",
      order: reels.length,
      createdAt: now,
      updatedAt: now,
    };
    writeJson("reels.json", [...reels, reel]);
    return reel;
  }

  const order = await prisma.reel.count();
  const created = await prisma.reel.create({
    data: {
      tag: data.tag,
      title: data.title,
      description: data.description,
      url: data.url,
      kind: embed.kind,
      embedUrl: embed.embedUrl,
      poster: data.poster || embed.thumb || "",
      order,
    },
  });

  return { ...created, createdAt: created.createdAt.toISOString(), updatedAt: created.updatedAt.toISOString() };
}

export async function updateReelData(data: Partial<Reel> & { id: string }): Promise<Reel> {
  const prisma = getPrisma();

  if (!prisma) {
    const reels = readJson<Reel[]>("reels.json", DEFAULT_REELS);
    const idx = reels.findIndex((reel) => reel.id === data.id);
    if (idx === -1) throw new Error("NOT_FOUND");
    const existing = reels[idx];
    const embed = data.url && data.url !== existing.url ? detectEmbed(data.url) : existing;
    const updated = {
      ...existing,
      ...data,
      kind: embed.kind,
      embedUrl: embed.embedUrl,
      poster: data.poster !== undefined ? data.poster : existing.poster,
      updatedAt: new Date().toISOString(),
    } as Reel;
    reels[idx] = updated;
    writeJson("reels.json", reels);
    return updated;
  }

  const existing = await prisma.reel.findUnique({ where: { id: data.id } });
  if (!existing) throw new Error("NOT_FOUND");
  const embed = data.url && data.url !== existing.url ? detectEmbed(data.url) : existing;
  const updated = await prisma.reel.update({
    where: { id: data.id },
    data: {
      tag: data.tag ?? existing.tag,
      title: data.title ?? existing.title,
      description: data.description ?? existing.description,
      url: data.url ?? existing.url,
      kind: embed.kind,
      embedUrl: embed.embedUrl,
      poster: data.poster !== undefined ? data.poster : existing.poster,
    },
  });
  return { ...updated, createdAt: updated.createdAt.toISOString(), updatedAt: updated.updatedAt.toISOString() };
}

export async function deleteReelData(id: string) {
  const prisma = getPrisma();
  if (!prisma) {
    writeJson(
      "reels.json",
      readJson<Reel[]>("reels.json", DEFAULT_REELS).filter((reel) => reel.id !== id),
    );
    return { success: true };
  }

  await prisma.reel.delete({ where: { id } });
  return { success: true };
}

export async function reorderReelData(orderedIds: string[]) {
  const prisma = getPrisma();
  if (!prisma) {
    const reels = readJson<Reel[]>("reels.json", DEFAULT_REELS);
    const map = new Map(reels.map((reel) => [reel.id, reel]));
    const reordered = orderedIds
      .map((id, order) => {
        const reel = map.get(id);
        return reel ? { ...reel, order } : null;
      })
      .filter(Boolean) as Reel[];
    writeJson("reels.json", reordered);
    return reordered;
  }

  await Promise.all(orderedIds.map((id, order) => prisma.reel.update({ where: { id }, data: { order } })));
  return listReelData();
}

function deepMerge(target: unknown, source: unknown): unknown {
  if (
    typeof target === "object" &&
    target !== null &&
    !Array.isArray(target) &&
    typeof source === "object" &&
    source !== null &&
    !Array.isArray(source)
  ) {
    const result = { ...(target as Record<string, unknown>) };
    for (const [key, value] of Object.entries(source as Record<string, unknown>)) {
      result[key] = deepMerge(result[key], value);
    }
    return result;
  }
  return source !== undefined ? source : target;
}
