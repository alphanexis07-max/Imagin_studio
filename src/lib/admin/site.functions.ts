import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import { requireAdmin } from "./auth.server";
import { getSiteData, updateSiteData } from "@/lib/cms/storage.server";

export interface SiteData {
  hero: {
    eyebrow: string;
    name: string;
    headline: string;
    portraitUrl: string;
    sidebarStat: { value: string; label: string };
    sidebarQuote: string;
  };
  about: {
    eyebrow: string;
    title: string;
    body: string;
    tiles: string[];
  };
  portfolio: {
    overview: {
      eyebrow: string;
      title: string;
      description: string;
    };
    sections: {
      heroShowcase: { eyebrow: string; title: string; description: string };
      videoEditing: { eyebrow: string; title: string; description: string };
      visualAssets: { eyebrow: string; title: string; description: string };
      softwareSystems: { eyebrow: string; title: string; description: string };
      seoAnalytics: { eyebrow: string; title: string; description: string };
      strategicConsulting: { eyebrow: string; title: string; description: string };
      contentWriting: { eyebrow: string; title: string; description: string };
    };
    achievements: {
      eyebrow: string;
      title: string;
      description: string;
    };
    testimonials: {
      eyebrow: string;
      title: string;
    };
  };
  contact: {
    eyebrow: string;
    headline: string;
    blurb: string;
    email: string;
    bookCallUrl: string;
  };
  footer: {
    copyright: string;
    socials: Array<{ label: string; url: string; icon: string | null }>;
  };
  marquee: {
    top: string[];
    bottom: string[];
  };
}

export const getSite = createServerFn({ method: "GET" }).handler(async () => {
  return getSiteData();
});

export const updateSite = createServerFn({ method: "POST" })
  .validator(z.record(z.unknown()))
  .handler(async ({ data }) => {
    requireAdmin(getRequest());
    return updateSiteData(data);
  });
