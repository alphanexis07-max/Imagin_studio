import { createServerFn } from "@tanstack/react-start";
import {
  getSiteData,
  listCollectionData,
  listReelData,
} from "./storage.server";

export const getPortfolioContent = createServerFn({ method: "GET" }).handler(async () => {
  const [
    site,
    capabilities,
    process,
    cases,
    engagements,
    testimonials,
    stats,
    heroShowcase,
    videoEditing,
    visualAssets,
    softwareSystems,
    seoAnalytics,
    strategicConsulting,
    contentWriting,
    reels,
  ] =
    await Promise.all([
      getSiteData(),
      listCollectionData("capabilities"),
      listCollectionData("process"),
      listCollectionData("cases"),
      listCollectionData("engagements"),
      listCollectionData("testimonials"),
      listCollectionData("stats"),
      listCollectionData("heroShowcase"),
      listCollectionData("videoEditing"),
      listCollectionData("visualAssets"),
      listCollectionData("softwareSystems"),
      listCollectionData("seoAnalytics"),
      listCollectionData("strategicConsulting"),
      listCollectionData("contentWriting"),
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
      heroShowcase,
      videoEditing,
      visualAssets,
      softwareSystems,
      seoAnalytics,
      strategicConsulting,
      contentWriting,
    },
    reels,
  };
});

export const getPublicReels = createServerFn({ method: "GET" }).handler(async () => {
  return listReelData();
});
