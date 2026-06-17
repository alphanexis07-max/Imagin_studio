import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import { requireAdmin } from "./auth.server";
import { readJson, writeJson } from "./storage.server";
import { detectEmbed } from "./embed";

export interface Reel {
  id: string;
  tag: string;
  title: string;
  description: string;
  url: string;
  kind: string;
  embedUrl: string;
  poster: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

const DEFAULT_REELS: Reel[] = [];

function load(): Reel[] {
  return readJson<Reel[]>("reels.json", DEFAULT_REELS);
}

function save(reels: Reel[]) {
  writeJson("reels.json", reels);
}

export const listReels = createServerFn({ method: "GET" }).handler(async () => {
  return load().sort((a, b) => a.order - b.order);
});

const ReelInput = z.object({
  tag: z.string().min(1).max(80),
  title: z.string().min(1).max(80),
  description: z.string().max(400),
  url: z.string().url(),
  poster: z.string().optional(),
});

export const createReel = createServerFn({ method: "POST" })
  .validator(ReelInput)
  .handler(async ({ data }) => {
    requireAdmin(getRequest());
    const embed = detectEmbed(data.url);
    const reels = load();
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
    save([...reels, reel]);
    return reel;
  });

export const updateReel = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.string(),
      tag: z.string().min(1).max(80).optional(),
      title: z.string().min(1).max(80).optional(),
      description: z.string().max(400).optional(),
      url: z.string().url().optional(),
      poster: z.string().optional(),
    })
  )
  .handler(async ({ data }) => {
    requireAdmin(getRequest());
    const reels = load();
    const idx = reels.findIndex((r) => r.id === data.id);
    if (idx === -1) throw new Error("NOT_FOUND");
    const existing = reels[idx];
    let embed = { kind: existing.kind, embedUrl: existing.embedUrl, thumb: existing.poster };
    if (data.url && data.url !== existing.url) {
      const d = detectEmbed(data.url);
      embed = { kind: d.kind, embedUrl: d.embedUrl, thumb: d.thumb };
    }
    const updated: Reel = {
      ...existing,
      tag: data.tag ?? existing.tag,
      title: data.title ?? existing.title,
      description: data.description ?? existing.description,
      url: data.url ?? existing.url,
      kind: embed.kind,
      embedUrl: embed.embedUrl,
      poster: data.poster !== undefined ? data.poster : (embed.thumb || existing.poster),
      updatedAt: new Date().toISOString(),
    };
    reels[idx] = updated;
    save(reels);
    return updated;
  });

export const deleteReel = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    requireAdmin(getRequest());
    const reels = load().filter((r) => r.id !== data.id);
    save(reels);
    return { success: true };
  });

export const reorderReels = createServerFn({ method: "POST" })
  .validator(z.object({ orderedIds: z.array(z.string()) }))
  .handler(async ({ data }) => {
    requireAdmin(getRequest());
    const reels = load();
    const map = new Map(reels.map((r) => [r.id, r]));
    const reordered = data.orderedIds
      .map((id, i) => {
        const r = map.get(id);
        if (!r) return null;
        return { ...r, order: i };
      })
      .filter(Boolean) as Reel[];
    save(reordered);
    return reordered;
  });
