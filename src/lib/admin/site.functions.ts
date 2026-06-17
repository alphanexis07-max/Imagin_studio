import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import { requireAdmin } from "./auth.server";
import { readJson, writeJson } from "./storage.server";

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

const DEFAULT_SITE: SiteData = {
  hero: {
    eyebrow: "Hola — open for Q3 2026",
    name: "Helmi",
    headline: "A Brand & Marketing Specialist",
    portraitUrl: "/portrait.png",
    sidebarStat: { value: "6+ Years", label: "in Brand & Marketing" },
    sidebarQuote: "Working with Helmi, I can confidently say he's an exceptional marketer and brand strategist.",
  },
  about: {
    eyebrow: "a little about",
    title: "I help brands actually grow",
    body: "Marketing isn't magic — it's a system. I blend brand strategy, sharp creative, and performance data into campaigns that don't just look good, they move numbers.",
    tiles: ["Strategist", "Creative Director", "Copy & Content", "Data-driven"],
  },
  contact: {
    eyebrow: "let's make something",
    headline: "Got a brand to grow? Let's talk.",
    blurb: "Reply within 24 hours · Open for projects Q3 2026",
    email: "hello@alphanexius.com",
    bookCallUrl: "tel:+1234567890",
  },
  footer: {
    copyright: "© 2026 AlphaNexis · Growth, by design",
    socials: [
      { label: "Instagram", url: "https://www.instagram.com/alphanexis/", icon: "Instagram" },
      { label: "LinkedIn", url: "https://www.linkedin.com/company/alphanexis/posts/?feedView=all", icon: "LinkedIn" },
      { label: "Website", url: "https://www.alphanexis.com/", icon: "Globe" },
    ],
  },
  marquee: {
    top: ["Branding", "Marketing", "Social Media", "Performance Ads", "Strategy", "Content"],
    bottom: ["growth.", "stories.", "systems.", "design.", "engines.", "loops.", "ideas.", "results."],
  },
};

export const getSite = createServerFn({ method: "GET" }).handler(async () => {
  return readJson<SiteData>("site.json", DEFAULT_SITE);
});

export const updateSite = createServerFn({ method: "POST" })
  .validator(z.record(z.unknown()))
  .handler(async ({ data }) => {
    requireAdmin(getRequest());
    const current = readJson<SiteData>("site.json", DEFAULT_SITE);
    const merged = deepMerge(current, data) as SiteData;
    writeJson("site.json", merged);
    return merged;
  });

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
    for (const [k, v] of Object.entries(source as Record<string, unknown>)) {
      result[k] = deepMerge(result[k], v);
    }
    return result;
  }
  return source !== undefined ? source : target;
}
