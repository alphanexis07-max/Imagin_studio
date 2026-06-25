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
  portfolio: {
    overview: {
      eyebrow: "Our Global Workspace",
      title: "Digital Agency Portfolio",
      description:
        "A premium showcase of creative services, marketing campaigns, software solutions, and strategic business consulting.",
    },
    sections: {
      heroShowcase: {
        eyebrow: "First Impressions",
        title: "HERO SHOWCASE",
        description: "Our strongest visual services and client outcomes, mapped in full-perspective motion.",
      },
      videoEditing: {
        eyebrow: "Motion Editing",
        title: "VIDEO EDITING",
        description: "Reel previews, commercial edits, and short-form social hooks.",
      },
      visualAssets: {
        eyebrow: "Visual Assets",
        title: "GRAPHIC DESIGN",
        description: "Social creatives, branding systems, packaging labels, and print design layouts.",
      },
      softwareSystems: {
        eyebrow: "Intelligent Stacks",
        title: "SOFTWARE & SYSTEMS",
        description: "Desktop and mobile mockups for custom CRMs, internal tools, and sales apps.",
      },
      seoAnalytics: {
        eyebrow: "Growth Metrics",
        title: "SEO & ANALYTICS",
        description: "Lighthouse speeds, technical audits, and organic search compounding results.",
      },
      strategicConsulting: {
        eyebrow: "Management Consulting",
        title: "STRATEGIC CONSULTING",
        description: "Executive blueprints, go-to-market pricing structures, and roadmap frameworks.",
      },
      contentWriting: {
        eyebrow: "Copywriting",
        title: "CONTENT WRITING",
        description: "Sales landing pages, email campaigns, blogs, and high-converting product copies.",
      },
    },
    achievements: {
      eyebrow: "Achievements",
      title: "Milestones that prove our work delivers impact.",
      description:
        "From enterprise launches to repeated growth loops, these metrics show the outcomes we create.",
    },
    testimonials: {
      eyebrow: "What Clients Say",
      title: "Straight from the source.",
    },
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
  heroShowcase: [
    { order: 0, categoryLabel: "VIDEO EDITING", title: "Brand Campaign Edit", description: "Premium editorial video cut capturing the target aesthetic for a luxury wellness brand.", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", poster: "/carousel-samples/screenshot-2.jpg", glow: "shadow-red-950/40", ctaText: "View Project", ctaLink: "#portfolio" },
    { order: 1, categoryLabel: "WEBSITE DEVELOPMENT", title: "Stellar Booking Platform", description: "High-performance marketing site and booking application with interactive client UI.", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", poster: "/carousel-samples/screenshot-1.jpg", glow: "shadow-blue-950/40", ctaText: "View Project", ctaLink: "#portfolio" },
    { order: 2, categoryLabel: "GRAPHIC DESIGN", title: "Lume Skincare Visuals", description: "High-end brand assets, social media grid style templates, and premium custom packaging.", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", poster: "/carousel-samples/screenshot-2.jpg", glow: "shadow-purple-950/40", ctaText: "View Project", ctaLink: "#portfolio" },
    { order: 3, categoryLabel: "CRM SOFTWARE", title: "Nexis Automation CRM", description: "Custom enterprise CRM dashboard simplifying client workflows and sales metrics tracking.", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", poster: "/carousel-samples/screenshot-3.jpg", glow: "shadow-teal-950/40", ctaText: "View Project", ctaLink: "#portfolio" },
    { order: 4, categoryLabel: "SALES APPLICATIONS", title: "Retail Billing App", description: "Cloud-native sales app designed with high-conversion checkout flows and real-time ledger.", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", poster: "/carousel-samples/screenshot-4.jpg", glow: "shadow-pink-950/40", ctaText: "View Project", ctaLink: "#portfolio" },
  ],
  videoEditing: [
    { order: 0, categoryLabel: "VIDEO EDITING", title: "Off-hours Cinematic Cut", description: "High-energy commercial cut with quick cuts and professional grading.", outcome: "Generated 2.4M views", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", poster: "/carousel-samples/screenshot-5.jpg", accentColor: "from-red-950/90" },
    { order: 1, categoryLabel: "VIDEO EDITING", title: "Atlas Origin Brand Story", description: "Documentary-style corporate story reel emphasizing brand authenticity.", outcome: "Improved engagement by 140%", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", poster: "/carousel-samples/screenshot-6.jpg", accentColor: "from-rose-950/90" },
    { order: 2, categoryLabel: "VIDEO EDITING", title: "Lume Skincare Promo Edit", description: "Before/After skin transformations showcasing visual effects and motion tracking.", outcome: "Brand campaign launch", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", poster: "/carousel-samples/screenshot-1.jpg", accentColor: "from-red-900/90" },
    { order: 3, categoryLabel: "VIDEO EDITING", title: "Social Media Hook Playbook", description: "Short-form video assets styled for high audience retention and CTA clicks.", outcome: "3.2M Blended Views", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", poster: "/carousel-samples/screenshot-2.jpg", accentColor: "from-orange-950/90" },
  ],
  visualAssets: [
    { order: 0, image: "/carousel-samples/screenshot-2.jpg", categoryLabel: "GRAPHIC DESIGN", subcategory: "Branding", title: "Lume Skincare Visual Identity", description: "Color system, custom typography, and premium brand voice." },
    { order: 1, image: "/carousel-samples/screenshot-1.jpg", categoryLabel: "GRAPHIC DESIGN", subcategory: "Packaging", title: "Premium Product Packaging", description: "Eco-friendly cosmetic bottle labels and box layouts." },
    { order: 2, image: "/carousel-samples/screenshot-3.jpg", categoryLabel: "GRAPHIC DESIGN", subcategory: "Social Media", title: "High-Retention Instagram Creatives", description: "Curated grids, posters, and stories designed for organic conversion." },
    { order: 3, image: "/carousel-samples/screenshot-4.jpg", categoryLabel: "GRAPHIC DESIGN", subcategory: "Advertising", title: "Out-Of-Home Banner Campaigns", description: "High-contrast billboards and print advertisements for modern transport hubs." },
    { order: 4, image: "/carousel-samples/screenshot-6.jpg", categoryLabel: "GRAPHIC DESIGN", subcategory: "Print Design", title: "Editorial Brand Catalogs", description: "Premium booklets showcasing collection launches." },
  ],
  softwareSystems: [
    { order: 0, categoryLabel: "CRM SOFTWARE", title: "Nexis Enterprise CRM", description: "Custom customer dashboard managing pipelines, emails, and automatic lead triggers.", keyFeatures: ["Automated CRM Sync", "Real-Time User Attribution", "Multi-Channel Messaging"], techStack: ["React", "FastAPI", "PostgreSQL"], businessBenefit: "Reduced client management overhead by 40%", poster: "/carousel-samples/screenshot-3.jpg", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", accentColor: "from-teal-950/90" },
    { order: 1, categoryLabel: "PROJECT MANAGEMENT", title: "Agile Dev Sprint Console", description: "Real-time ticket updates, resource tracking, and automatic deployment pipeline charts.", keyFeatures: ["Custom Sprint Planner", "Interactive Gantt Charts", "Direct Slack Webhooks"], techStack: ["Next.js", "Express", "MongoDB"], businessBenefit: "Boosted team shipping velocity by 30%", poster: "/carousel-samples/screenshot-6.jpg", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", accentColor: "from-indigo-950/90" },
    { order: 2, categoryLabel: "SALES APPLICATIONS", title: "Nexis Cloud POS System", description: "Tablet-optimized sales app featuring offline checkouts and automatic ledger sync.", keyFeatures: ["Offline Transactions", "Dynamic Loyalty System", "Inventory Alerts"], techStack: ["React Native", "Go", "SQLite"], businessBenefit: "Increased checkout throughput by 25%", poster: "/carousel-samples/screenshot-4.jpg", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", accentColor: "from-pink-950/90" },
    { order: 3, categoryLabel: "BUSINESS AUTOMATION", title: "Internal Operations Middleware", description: "Connects ERP tables, logistics logs, and client emails to an LLM agent.", keyFeatures: ["Autonomous Agents", "Semantic Log Parsing", "PDF Invoicing OCR"], techStack: ["Python", "LangChain", "Docker"], businessBenefit: "Automated 85% of manual shipping checks", poster: "/carousel-samples/screenshot-1.jpg", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", accentColor: "from-amber-950/90" },
  ],
  seoAnalytics: [
    { order: 0, categoryLabel: "SEO", title: "Organic Search Engine Optimization", description: "Compound growth funnels capturing high-intent search terms and generating qualified inbound leads.", metrics: [{ label: "Organic Traffic Growth", value: "+312%" }, { label: "Top 3 Keywords Ranked", value: "840+" }], poster: "/carousel-samples/screenshot-5.jpg", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", accent: "from-green-950/40" },
    { order: 1, categoryLabel: "ACCOUNT AUDIT", title: "Technical Site Performance Audit", description: "Exhaustive audits resolving slow load times, poor lighthouse core web vitals, and indexation gaps.", metrics: [{ label: "Lighthouse Performance Score", value: "98/100" }, { label: "Site Speed Improvement", value: "3.2x Faster" }], poster: "/carousel-samples/screenshot-6.jpg", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", accent: "from-cyan-950/40" },
    { order: 2, categoryLabel: "ANALYTICS", title: "Conversion Attribution Dashboard", description: "Multi-touch attribution reporting providing marketing attribution modeling across channels.", metrics: [{ label: "Attributed ROI Accuracy", value: "95%" }, { label: "ROAS Optimization", value: "4.2x Blended" }], poster: "/carousel-samples/screenshot-3.jpg", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", accent: "from-emerald-950/40" },
    { order: 3, categoryLabel: "PERFORMANCE REPORT", title: "Core Web Vitals Optimizations", description: "Technical optimizations resolving Cumulative Layout Shifts and First Contentful Paint delays.", metrics: [{ label: "Bounce Rate Reduction", value: "-22%" }, { label: "Conversion Rate Uplift", value: "+45%" }], poster: "/carousel-samples/screenshot-4.jpg", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", accent: "from-blue-950/40" },
  ],
  strategicConsulting: [
    { order: 0, categoryLabel: "STRATEGIC PLANNING", title: "B2B SaaS Market Entry", challenge: "Enterprise tech company struggling to enter APAC due to localized pricing, regulatory hurdles, and unknown brand authority.", solution: "Conducted a deep local competitor audit, structured local-first packaging tiers, and launched a multi-touch digital campaign directed at C-Suite stakeholders.", execution: "Constructed targeted growth strategy, localized brand messaging, and implemented serverless landing hubs built for low-bandwidth environments.", results: [{ label: "ARR Growth in 8mo", value: "$1.8M" }, { label: "Customer Acq. Cost (CAC)", value: "-35%" }, { label: "Client Inbound Pipeline", value: "+300%" }] },
    { order: 1, categoryLabel: "STRATEGIC PLANNING", title: "Retail Supply Chain Digitization", challenge: "Legacy retail chain with paper-heavy logistics, causing shipping bottlenecks and severe stock mismatches.", solution: "Designed a digital transformation blueprint. Programmed cloud PM middleware linking inventory logs to real-time sales APIs.", execution: "Phased integration plan, custom ERP dashboards, and automated Slack alert channels warning warehouse staff about inventory drops.", results: [{ label: "Bottlenecks Resolved", value: "99%" }, { label: "Staff Time Saved", value: "85%" }, { label: "Fulfillment Errors", value: "<0.1%" }] },
  ],
  contentWriting: [
    { order: 0, categoryLabel: "Content Writing", type: "Sales Landing Page Copy", headline: "Unchain Your Operations: The AI Middleware Built for Scale", metrics: "4.8% Conv. Rate (+60% vs benchmark)", excerpt: "Enterprise systems are notoriously rigid. We don't believe in rewriting your stack from scratch. Our middleware sits quietly on top, using intelligent semantic parsing to turn unstructured email requests into structured database inserts..." },
    { order: 1, categoryLabel: "Content Writing", type: "Tech Blog & Thought Leadership", headline: "The Churn Tax: Why Legacy Architectures Threaten Series-A Runways", metrics: "15K Views · 18% CTA Click-Through", excerpt: "Losing 3% of your customer base each month is a leaky bucket. When your CAC exceeds your LTV payback window, growth stops compounding. Read our deep-dive analysis on building growth loops directly into your product experience..." },
    { order: 2, categoryLabel: "Content Writing", type: "B2B Email Campaign Sequence", headline: "The 3 Bottlenecks C-Suite Teams Ignore (And How to Automate Them)", metrics: "46% Open Rate · 12% Reply Rate", excerpt: "Hi {First Name}, most logistics companies waste 20 hours a week on manual inventory audits. It isn't a staff issue; it's a data synchronization issue. Here is how one retail client freed 85% of their operational backlog without hiring..." },
  ],
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
  visualAssets: [
    {
      order: 0,
      image: "/carousel-samples/screenshot-2.jpg",
      categoryLabel: "GRAPHIC DESIGN",
      subcategory: "Branding",
      title: "Lume Skincare Visual Identity",
      description: "Color system, custom typography, and premium brand voice.",
    },
    {
      order: 1,
      image: "/carousel-samples/screenshot-1.jpg",
      categoryLabel: "GRAPHIC DESIGN",
      subcategory: "Packaging",
      title: "Premium Product Packaging",
      description: "Eco-friendly cosmetic bottle labels and box layouts.",
    },
    {
      order: 2,
      image: "/carousel-samples/screenshot-3.jpg",
      categoryLabel: "GRAPHIC DESIGN",
      subcategory: "Social Media",
      title: "High-Retention Instagram Creatives",
      description: "Curated grids, posters, and stories designed for organic conversion.",
    },
    {
      order: 3,
      image: "/carousel-samples/screenshot-4.jpg",
      categoryLabel: "GRAPHIC DESIGN",
      subcategory: "Advertising",
      title: "Out-Of-Home Banner Campaigns",
      description: "High-contrast billboards and print advertisements for modern transport hubs.",
    },
    {
      order: 4,
      image: "/carousel-samples/screenshot-6.jpg",
      categoryLabel: "GRAPHIC DESIGN",
      subcategory: "Print Design",
      title: "Editorial Brand Catalogs",
      description: "Premium booklets showcasing collection launches.",
    },
  ],
};

export const DEFAULT_REELS: Reel[] = [];
