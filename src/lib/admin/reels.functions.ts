import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import { requireAdmin } from "./auth.server";
import {
  createReelData,
  deleteReelData,
  listReelData,
  reorderReelData,
  updateReelData,
} from "@/lib/cms/storage.server";

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

export const listReels = createServerFn({ method: "GET" }).handler(async () => {
  return listReelData();
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
    return createReelData(data);
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
    }),
  )
  .handler(async ({ data }) => {
    requireAdmin(getRequest());
    return updateReelData(data);
  });

export const deleteReel = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    requireAdmin(getRequest());
    return deleteReelData(data.id);
  });

export const reorderReels = createServerFn({ method: "POST" })
  .validator(z.object({ orderedIds: z.array(z.string()) }))
  .handler(async ({ data }) => {
    requireAdmin(getRequest());
    return reorderReelData(data.orderedIds);
  });

