import type { Reel } from "@/lib/admin/reels.functions";
import type { CollectionName } from "@/lib/admin/collections.functions";
import type { SiteData } from "@/lib/admin/site.functions";

export const DEFAULT_SITE: SiteData = {
  hero: {
    eyebrow: "Hola - open for Q3 2026",
    name: "AlphaNexis",
    headline: "A Brand & Marketing Specialist",
    portraitUrl: "/portrait.png",
    sidebarStat: { value: "8+ Years", label: "in Digital Marketing & AI" },
    sidebarQuote:
      "AlphaNexis shipped our enterprise app three months ahead of schedule and captured a critical market window.",
  },
  about: {
    eyebrow: "Who We Are",
    title: "We build brands that actually scale.",
    body:
      "AlphaNexis is a cross-border digital marketing & AI automation agency. We run Follow-the-Sun delivery across US, EU & APAC - so your growth never sleeps.",
    tiles: ["Growth-first", "AI-native", "Data-driven", "Global reach"],
  },
  contact: {
    eyebrow: "let's build something",
    headline: "Ready to scale? Let's talk.",
    blurb: "Reply within 24 hours - Open for Q3 2026 partnerships - US / EU / APAC",
    email: "hello@alphanexius.com",
    bookCallUrl: "tel:+1234567890",
  },
  footer: {
    copyright: "© 2026 AlphaNexis - Growth, by design",
    socials: [
      { label: "Instagram", url: "https://www.instagram.com/alphanexis/", icon: "Instagram" },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/company/alphanexis/posts/?feedView=all",
        icon: "LinkedIn",
      },
      { label: "Website", url: "https://www.alphanexis.com/", icon: "Globe" },
    ],
  },
  marquee: {
    top: ["IMPACT", "DESIGN", "INNOVATE", "CREATE", "STRATEGIZE"],
    bottom: ["IMPACT", "DESIGN", "INNOVATE", "CREATE", "STRATEGIZE"],
  },
};

export const DEFAULT_COLLECTIONS: Record<CollectionName, Array<Record<string, unknown>>> = {
  capabilities: [
    { order: 0, key: "01", title: "Performance Marketing", description: "High-intent SEO funnels, algorithmic ad systems & growth loops that compound - not one-off campaigns.", chips: ["SEO & SEM", "Paid Social", "Funnel Architecture"], metric: "3x", metricLabel: "pipeline velocity", bg: "bg-accent", icon: "Target", big: true },
    { order: 1, key: "02", title: "Brand Identity", description: "GTM strategy, positioning, verbal identity & creative systems with a point of view that converts.", chips: ["Positioning", "Creative Direction", "Brand Voice"], metric: "-35%", metricLabel: "customer acq. cost", bg: "bg-surface-1 dark:bg-[oklch(0.88_0.1_75)]", icon: "PenTool", big: false },
    { order: 2, key: "03", title: "Social & Content", description: "Content engines built on short-form video, editorial calendars & community ops that ship every week.", chips: ["Short-form Video", "Editorial Calendar", "Community"], metric: "+312%", metricLabel: "organic reach", bg: "bg-surface-2 dark:bg-[oklch(0.83_0.12_140)]", icon: "Sparkles", big: false },
    { order: 3, key: "04", title: "AI-Powered Automation", description: "Autonomous AI agents & intelligent middleware that compress manual workflows from hours to minutes.", chips: ["AI Agents", "CRM Automation", "Analytics Dash"], metric: "85%", metricLabel: "task automation", bg: "bg-surface-3 dark:bg-[oklch(0.85_0.12_75)]", icon: "Brain", big: false },
  ],
  process: [
    { order: 0, number: "01", title: "Discover", description: "Deep-dive audit, stakeholder interviews & audience mapping.", icon: "Search", bg: "bg-accent" },
    { order: 1, number: "02", title: "Strategize", description: "Positioning, KPIs, channel mix & north-star growth metric.", icon: "Lightbulb", bg: "bg-surface-3 dark:bg-[oklch(0.85_0.12_75)]" },
    { order: 2, number: "03", title: "Create", description: "Brand identity, creative assets & content system built.", icon: "Layers", bg: "bg-surface-4 dark:bg-[oklch(0.82_0.14_25)]" },
    { order: 3, number: "04", title: "Deploy", description: "Launch ads, funnels, content & automation pipelines live.", icon: "Rocket", bg: "bg-surface-2 dark:bg-[oklch(0.83_0.12_140)]" },
    { order: 4, number: "05", title: "Decode", description: "Full analytics, attribution modelling & insight extraction.", icon: "LineChart", bg: "bg-surface-6 dark:bg-[oklch(0.78_0.14_280)]" },
    { order: 5, number: "06", title: "Optimise", description: "Scale winners, cut losers, repeat the compounding loop.", icon: "Repeat", bg: "bg-accent" },
  ],
  cases: [
    { order: 0, name: "B2B SaaS Scale-Up", sector: "FinTech - US", year: "2025", word: "FINTECH", color: "bg-accent", problem: "18% churn, legacy backend, CAC threatening Series-A runway.", tags: ["Growth", "Funnels", "Ads"], rotation: -1.4, metrics: [{ key: "+140%", value: "ARR growth" }, { key: "99.9%", value: "Uptime" }, { key: "11mo", value: "To $5.2M" }] },
    { order: 1, name: "HealthTech Platform", sector: "Healthcare - APAC", year: "2025", word: "HEALTH", color: "bg-surface-4 dark:bg-[oklch(0.82_0.14_25)]", problem: "Zero digital presence entering 3 new markets simultaneously.", tags: ["Brand", "Launch", "Paid"], rotation: 1.6, metrics: [{ key: "4.2x", value: "ROAS" }, { key: "65%", value: "CAC reduction" }, { key: "8wk", value: "Go-live" }] },
  ],
  engagements: [
    { order: 0, name: "Sprint", duration: "2-4 wks", description: "Tight scope, one outcome. Brand audit, paid kick-off or content system build.", bullets: ["Daily standups", "Single deliverable", "Fixed price"], bg: "bg-surface-3 dark:bg-[oklch(0.85_0.12_75)]", rotation: -1.2, tag: "Fastest", icon: "Zap" },
    { order: 1, name: "Retainer", duration: "Monthly", description: "An embedded growth pod - strategy, creative, ads & AI automation under one roof.", bullets: ["Weekly sprint demos", "Always-on creative", "Live analytics dash"], bg: "bg-accent", rotation: 0, tag: "Most popular", popular: true, icon: "Infinity" },
    { order: 2, name: "Project", duration: "6-12 wks", description: "End-to-end builds: GTM launch, full brand system, funnel + automation stack.", bullets: ["Phased milestones", "Cross-discipline", "Full handoff docs"], bg: "bg-surface-2 dark:bg-[oklch(0.83_0.12_140)]", rotation: 1.4, tag: "Most depth", icon: "Flame" },
  ],
  testimonials: [
    { order: 0, quote: "AlphaNexis completely transformed our product delivery lifecycle. They shipped ahead of schedule and captured a critical market window.", author: "VP of Product", role: "North American HealthTech Corp", verified: "LinkedIn Verified", stars: 5 },
    { order: 1, quote: "The operational predictability is what sets AlphaNexis apart. Their AI automation insights added immediate value to our bottom line.", author: "Chief Operating Officer", role: "European Logistics Group", verified: "Clutch 5-Star", stars: 5 },
  ],
  stats: [
    { order: 0, value: "180+", label: "Projects delivered" },
    { order: 1, value: "35+", label: "Active clients" },
    { order: 2, value: "12+", label: "Countries served" },
    { order: 3, value: "$2M+", label: "Revenue impact" },
    { order: 4, value: "96%", label: "Client retention" },
  ],
};

export const DEFAULT_REELS: Reel[] = [];

