import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import { requireAdmin } from "./auth.server";
import {
  deleteCollectionItem,
  listCollectionData,
  reorderCollectionData,
  upsertCollectionItem,
} from "@/lib/cms/storage.server";

export type CollectionName =
  | "capabilities"
  | "process"
  | "cases"
  | "engagements"
  | "testimonials"
  | "stats";

const CollectionSchema = z.enum(["capabilities", "process", "cases", "engagements", "testimonials", "stats"]);

export const listCollection = createServerFn({ method: "POST" })
  .validator(z.object({ collection: CollectionSchema }))
  .handler(async ({ data }) => {
    return listCollectionData(data.collection);
  });

export const upsertItem = createServerFn({ method: "POST" })
  .validator(z.object({ collection: CollectionSchema, item: z.record(z.unknown()) }))
  .handler(async ({ data }) => {
    requireAdmin(getRequest());
    return upsertCollectionItem(data.collection, data.item);
  });

export const deleteItem = createServerFn({ method: "POST" })
  .validator(z.object({ collection: CollectionSchema, id: z.string() }))
  .handler(async ({ data }) => {
    requireAdmin(getRequest());
    return deleteCollectionItem(data.collection, data.id);
  });

export const reorderCollection = createServerFn({ method: "POST" })
  .validator(z.object({ collection: CollectionSchema, orderedIds: z.array(z.string()) }))
  .handler(async ({ data }) => {
    requireAdmin(getRequest());
    return reorderCollectionData(data.collection, data.orderedIds);
  });

