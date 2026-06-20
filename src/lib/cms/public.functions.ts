import { createServerFn } from "@tanstack/react-start";
import {
  getSiteData,
  listCollectionData,
  listReelData,
} from "./storage.server";

export const getPortfolioContent = createServerFn({ method: "GET" }).handler(async () => {
  const [site, capabilities, process, cases, engagements, testimonials, stats, reels] =
    await Promise.all([
      getSiteData(),
      listCollectionData("capabilities"),
      listCollectionData("process"),
      listCollectionData("cases"),
      listCollectionData("engagements"),
      listCollectionData("testimonials"),
      listCollectionData("stats"),
      listReelData(),
    ]);

  return {
    site,
    collections: {
      capabilities,
      process,
      cases,
      engagements,
      testimonials,
      stats,
    },
    reels,
  };
});

export const getPublicReels = createServerFn({ method: "GET" }).handler(async () => {
  return listReelData();
});

