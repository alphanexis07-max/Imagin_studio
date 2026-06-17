import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import { requireAdmin } from "./auth.server";
import { readJson, writeJson } from "./storage.server";

export type CollectionName =
  | "capabilities"
  | "process"
  | "cases"
  | "engagements"
  | "testimonials"
  | "stats";

// ─── Defaults (mirrors current hardcoded arrays) ──────────────────────────────

const DEFAULTS: Record<CollectionName, unknown[]> = {
  capabilities: [
    { id: "cap1", order: 0, key: "01", title: "Brand Strategy", description: "Positioning, narrative & GTM that gives your brand a point of view people remember.", chips: ["Positioning", "Messaging", "GTM plan"], metric: "+38%", metricLabel: "avg. brand recall", bg: "bg-accent", icon: "Target", big: true },
    { id: "cap2", order: 1, key: "02", title: "Performance Ads", description: "Meta, Google & TikTok ads engineered for unit economics.", chips: ["Meta", "Google", "TikTok"], metric: "4.2x", metricLabel: "blended ROAS", bg: "bg-[oklch(0.82_0.14_25)]", icon: "Rocket", big: false },
    { id: "cap3", order: 2, key: "03", title: "Social & Content", description: "Content engines that compound — hooks, edits, calendar.", chips: ["Short-form", "Calendar", "Community"], metric: "+312%", metricLabel: "organic reach", bg: "bg-[oklch(0.83_0.12_140)]", icon: "Sparkles", big: false },
    { id: "cap4", order: 3, key: "04", title: "Brand Identity", description: "Logos, type, color & verbal identity with conviction.", chips: ["Logo", "Type system", "Voice"], metric: "11+", metricLabel: "brands shipped", bg: "bg-[oklch(0.88_0.1_75)]", icon: "PenTool", big: false },
  ],
  process: [
    { id: "p1", order: 0, number: "01", title: "Discover", description: "Audit, interviews, audience map.", icon: "Search", bg: "bg-accent" },
    { id: "p2", order: 1, number: "02", title: "Define", description: "Positioning, KPIs, north-star metric.", icon: "Lightbulb", bg: "bg-[oklch(0.85_0.12_75)]" },
    { id: "p3", order: 2, number: "03", title: "Design", description: "Identity, creative, content system.", icon: "Layers", bg: "bg-[oklch(0.82_0.14_25)]" },
    { id: "p4", order: 3, number: "04", title: "Deploy", description: "Launch ads, content, funnels live.", icon: "Rocket", bg: "bg-[oklch(0.83_0.12_140)]" },
    { id: "p5", order: 4, number: "05", title: "Decode", description: "Analytics, attribution, learnings.", icon: "LineChart", bg: "bg-[oklch(0.78_0.14_280)]" },
    { id: "p6", order: 5, number: "06", title: "Double-down", description: "Scale winners, kill losers, repeat.", icon: "Repeat", bg: "bg-accent" },
  ],
  cases: [
    { id: "cs1", order: 0, name: "Atlas Coffee Co.", sector: "Brand · Social", year: "'25", word: "ATLAS", problem: "Scattered brand, low reach", tags: ["Brand", "Social"], color: "bg-orange-pop", rotation: -3, metrics: [{ key: "Reach", value: "+312%" }, { key: "Followers", value: "+45K" }, { key: "ROAS", value: "3.8x" }] },
    { id: "cs2", order: 1, name: "Volt Mobility", sector: "Ads · Launch", year: "'25", word: "VOLT", problem: "New product, zero awareness", tags: ["Ads", "Launch"], color: "bg-[oklch(0.82_0.14_25)]", rotation: 2, metrics: [{ key: "ROAS", value: "4.2x" }, { key: "CPL", value: "-38%" }, { key: "MQLs", value: "+210" }] },
    { id: "cs3", order: 2, name: "North/South", sector: "Identity · Web", year: "'24", word: "N/S", problem: "Dated identity, unclear positioning", tags: ["Identity", "Web"], color: "bg-[oklch(0.78_0.13_140)]", rotation: -2, metrics: [{ key: "Award", value: "Webby finalist" }, { key: "Traffic", value: "+89%" }, { key: "NPS", value: "+42" }] },
    { id: "cs4", order: 3, name: "Helios Skincare", sector: "Social · Strategy", year: "'24", word: "HELIOS", problem: "Low engagement, no community", tags: ["Social", "Strategy"], color: "bg-[oklch(0.85_0.12_75)]", rotation: 3, metrics: [{ key: "Followers", value: "1.2M" }, { key: "ER", value: "8.4%" }, { key: "Revenue", value: "+67%" }] },
    { id: "cs5", order: 4, name: "Pulse Audio", sector: "Brand · Launch", year: "'24", word: "PULSE", problem: "No brand identity pre-launch", tags: ["Brand", "Launch"], color: "bg-[oklch(0.78_0.14_280)]", rotation: -2, metrics: [{ key: "Launch", value: "Sold out" }, { key: "PR hits", value: "14" }, { key: "Rev", value: "+$280K" }] },
  ],
  engagements: [
    { id: "eng1", order: 0, name: "Sprint", duration: "2–4 wks", description: "Tight scope, one outcome. Perfect for launches, rebrands or paid kick-offs.", bullets: ["Daily standups", "Single deliverable", "Fixed price"], bg: "bg-[oklch(0.85_0.12_75)]", rotation: -1.2, tag: "Fastest", popular: false, icon: "Zap" },
    { id: "eng2", order: 1, name: "Retainer", duration: "Monthly", description: "An embedded growth partner — strategy, creative & ads under one roof.", bullets: ["Weekly sync", "Always-on creative", "Owned dashboard"], bg: "bg-accent", rotation: 0, tag: "Most popular", popular: true, icon: "Infinity" },
    { id: "eng3", order: 2, name: "Project", duration: "6–12 wks", description: "End-to-end builds: brand systems, GTM launches, full funnels.", bullets: ["Phased milestones", "Cross-discipline", "Documented handoff"], bg: "bg-[oklch(0.83_0.12_140)]", rotation: 1.4, tag: "Most depth", popular: false, icon: "Flame" },
  ],
  testimonials: [
    { id: "t1", order: 0, quote: "Helmi gets it. He turned our scattered social presence into a real brand engine — and our conversion rate doubled in the first quarter.", author: "Sara K.", role: "Founder · Atlas Coffee Co.", stars: 5 },
  ],
  stats: [
    { id: "s1", order: 0, value: "6+", label: "Years experience" },
    { id: "s2", order: 1, value: "3+", label: "Industries served" },
    { id: "s3", order: 2, value: "50M+", label: "Impressions driven" },
    { id: "s4", order: 3, value: "2+", label: "Awards won" },
    { id: "s5", order: 4, value: "11+", label: "Happy clients" },
  ],
};

function load(collection: CollectionName): unknown[] {
  return readJson<unknown[]>(`${collection}.json`, DEFAULTS[collection] ?? []);
}

function save(collection: CollectionName, data: unknown[]) {
  writeJson(`${collection}.json`, data);
}

const CollectionSchema = z.enum(["capabilities", "process", "cases", "engagements", "testimonials", "stats"]);

export const listCollection = createServerFn({ method: "POST" })
  .validator(z.object({ collection: CollectionSchema }))
  .handler(async ({ data }) => {
    const items = load(data.collection);
    return [...items].sort((a: unknown, b: unknown) => {
      const ao = (a as { order?: number }).order ?? 0;
      const bo = (b as { order?: number }).order ?? 0;
      return ao - bo;
    });
  });

export const upsertItem = createServerFn({ method: "POST" })
  .validator(z.object({ collection: CollectionSchema, item: z.record(z.unknown()) }))
  .handler(async ({ data }) => {
    requireAdmin(getRequest());
    const items = load(data.collection) as Array<Record<string, unknown>>;
    const item = data.item;
    if (!item.id) {
      // create
      const newItem = {
        ...item,
        id: crypto.randomUUID(),
        order: items.length,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      save(data.collection, [...items, newItem]);
      return newItem;
    } else {
      // update
      const idx = items.findIndex((i) => i.id === item.id);
      if (idx === -1) throw new Error("NOT_FOUND");
      const updated = { ...items[idx], ...item, updatedAt: new Date().toISOString() };
      items[idx] = updated;
      save(data.collection, items);
      return updated;
    }
  });

export const deleteItem = createServerFn({ method: "POST" })
  .validator(z.object({ collection: CollectionSchema, id: z.string() }))
  .handler(async ({ data }) => {
    requireAdmin(getRequest());
    const items = (load(data.collection) as Array<Record<string, unknown>>).filter(
      (i) => i.id !== data.id
    );
    save(data.collection, items);
    return { success: true };
  });

export const reorderCollection = createServerFn({ method: "POST" })
  .validator(z.object({ collection: CollectionSchema, orderedIds: z.array(z.string()) }))
  .handler(async ({ data }) => {
    requireAdmin(getRequest());
    const items = load(data.collection) as Array<Record<string, unknown>>;
    const map = new Map(items.map((i) => [i.id as string, i]));
    const reordered = data.orderedIds
      .map((id, idx) => {
        const item = map.get(id);
        if (!item) return null;
        return { ...item, order: idx };
      })
      .filter(Boolean);
    save(data.collection, reordered);
    return reordered;
  });
