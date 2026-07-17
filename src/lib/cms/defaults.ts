import type { Reel } from "@/lib/admin/reels.functions";
import type { CollectionName } from "@/lib/admin/collections.functions";
import type { SiteData } from "@/lib/admin/site.functions";

export const DEFAULT_SITE: SiteData = {
  hero: {
    eyebrow: "Architecture & Interior Design Studio",
    name: "Imagine Design Studio",
    headline: "Architecture That Shapes Tomorrow",
    portraitUrl: "/portrait.png",
    sidebarStat: { value: "15+ Years", label: "in Architecture & Interior Design" },
    sidebarQuote:
      "Imagine Design Studio transforms ideas into refined homes, workplaces, hospitality spaces, and urban environments.",
  },
  about: {
    eyebrow: "About Imagine Design Studio",
    title: "We design spaces with clarity, craft, and purpose.",
    body:
      "Imagine Design Studio is a contemporary architecture and interior design studio working across homes, workplaces, hospitality, and urban environments. We connect concept, material, detail, and delivery into spaces that feel resolved and enduring.",
    tiles: ["Architecture", "Interior Design", "Urban Design", "Project Delivery"],
  },
  portfolio: {
    overview: {
      eyebrow: "Selected Work",
      title: "Architecture, interiors, and spatial stories.",
      description:
        "A curated showcase of residential, commercial, hospitality, and urban design work shaped by proportion, material intelligence, and careful execution.",
    },
    sections: {
      heroShowcase: {
        eyebrow: "Featured Projects",
        title: "SPATIAL SHOWCASE",
        description: "Signature architecture, interior, hospitality, and urban design concepts from the studio.",
      },
      videoEditing: {
        eyebrow: "",
        title: "",
        description: "",
      },
      visualAssets: {
        eyebrow: "Design Aesthetics",
        title: "ARCHITECTURAL RENDERINGS",
        description: "Visualizing spaces through photorealistic design.",
      },
      softwareSystems: {
        eyebrow: "Design Coordination",
        title: "DRAWINGS, MODELS & DELIVERY SYSTEMS",
        description: "Coordinated drawing sets, material schedules, documentation, and build-ready design packages.",
      },
      seoAnalytics: {
        eyebrow: "Development Insights",
        title: "PROJECT MANAGEMENT & ANALYTICS",
        description: "Data-driven construction delivery and resource optimization.",
      },
      strategicConsulting: {
        eyebrow: "Master Planning",
        title: "URBAN DESIGN & STRATEGIC CONSULTING",
        description: "Frameworks for districts, adaptive reuse, mixed-use environments, and long-term spatial value.",
      },
      contentWriting: {
        eyebrow: "Design Narrative",
        title: "CONCEPT NOTES, BRIEFS & SPECIFICATIONS",
        description: "Clear design writing for client briefs, concept statements, project stories, and technical specifications.",
      },
    },
    achievements: {
      eyebrow: "Achievements",
      title: "Milestones that define our built legacy.",
      description:
        "From award-winning designs to sustainable building certifications, our work delivers lasting impact.",
    },
    testimonials: {
      eyebrow: "Client Voices",
      title: "What partners say about our work.",
    },
  },
  contact: {
    eyebrow: "let's build your vision",
    headline: "Ready to build? Let's talk.",
    blurb: "Reply within 24 hours - Open for collaborations",
    email: "Architects@imaginedesignstudios.com",
    bookCallUrl: "tel:917067068673",
  },
  footer: {
    copyright: "© 2026 Imagine Design Studio - Crafted with care",
    socials: [
      { label: "Instagram", url: "https://www.instagram.com/imagine_design_studios/", icon: "Instagram" },
      { label: "Facebook", url: "https://www.facebook.com/imagine.consultants/", icon: "Facebook" },
      { label: "Website", url: "https://www.imaginedesignstudios.com/", icon: "Globe" },
    ],
  },
  marquee: {
    top: ["ARCHITECTURE", "INTERIORS", "HOSPITALITY", "URBAN DESIGN", "SUSTAINABILITY"],
    bottom: ["HOMES", "WORKPLACES", "MATERIALS", "DETAILS", "CRAFT"],
  },
};

export const DEFAULT_COLLECTIONS: Record<CollectionName, Array<Record<string, unknown>>> = {
  heroShowcase: [
    { order: 0, categoryLabel: "RESIDENTIAL", title: "Courtyard Residence", description: "A warm, inward-looking home shaped around daylight, stone, and quiet thresholds.", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", poster: "/carousel-samples/screenshot-2.jpg", glow: "shadow-red-950/40", ctaText: "View Project", ctaLink: "#portfolio" },
    { order: 1, categoryLabel: "COMMERCIAL", title: "Boutique Workplace", description: "A flexible studio workplace with layered acoustics, hospitality cues, and custom joinery.", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", poster: "/carousel-samples/screenshot-1.jpg", glow: "shadow-blue-950/40", ctaText: "View Project", ctaLink: "#portfolio" },
    { order: 2, categoryLabel: "INTERIORS", title: "Gallery Apartment", description: "A restrained interior study balancing collected art, natural texture, and precise detailing.", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", poster: "/carousel-samples/screenshot-2.jpg", glow: "shadow-purple-950/40", ctaText: "View Project", ctaLink: "#portfolio" },
    { order: 3, categoryLabel: "URBAN DESIGN", title: "Waterfront Framework", description: "A public-realm proposal connecting mixed-use edges, shaded walks, and civic gathering.", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", poster: "/carousel-samples/screenshot-3.jpg", glow: "shadow-teal-950/40", ctaText: "View Project", ctaLink: "#portfolio" },
    { order: 4, categoryLabel: "HOSPITALITY", title: "Retreat Pavilion", description: "A compact hospitality pavilion designed for landscape immersion and low-impact construction.", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", poster: "/carousel-samples/screenshot-4.jpg", glow: "shadow-pink-950/40", ctaText: "View Project", ctaLink: "#portfolio" },
  ],
  videoEditing: [
    { order: 0, categoryLabel: "ARCHITECTURAL", title: "Harbor Skyline Visualisation", description: "Cinematic architectural flythrough showcasing the integrated urban waterfront development.", outcome: "Won International Design Award", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", poster: "/carousel-samples/screenshot-5.jpg", accentColor: "from-blue-950/90" },
    { order: 1, categoryLabel: "CONSTRUCTION", title: "Timelapse: Campus Build", description: "12-month construction process compressed into 4 minutes showing the transformation from ground to completion.", outcome: "Featured in ArchDaily", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", poster: "/carousel-samples/screenshot-6.jpg", accentColor: "from-amber-950/90" },
    { order: 2, categoryLabel: "ARCHITECTURAL", title: "Eco-Tower Walkthrough", description: "Real-time rendered virtual tour of the sustainable office tower with detailed environmental systems.", outcome: "LEED Platinum Certified", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", poster: "/carousel-samples/screenshot-1.jpg", accentColor: "from-green-950/90" },
    { order: 3, categoryLabel: "INTERIOR", title: "Residential Showcase", description: "Immersive photorealistic presentation of luxury apartment interiors with custom furniture and finishes.", outcome: "Interior Design Award Nominee", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", poster: "/carousel-samples/screenshot-2.jpg", accentColor: "from-orange-950/90" },
  ],
  visualAssets: [
    { order: 0, image: "/carousel-samples/screenshot-2.jpg", categoryLabel: "INTERIOR DESIGN", subcategory: "Concept Study", title: "Layered Residential Material Study", description: "A warm interior palette study pairing stone, timber, plaster, and measured daylight." },
    { order: 1, image: "/carousel-samples/screenshot-1.jpg", categoryLabel: "ARCHITECTURE", subcategory: "Facade", title: "Tactile Facade Prototypes", description: "Material mockups exploring depth, shadow, and weathering across a refined street elevation." },
    { order: 2, image: "/carousel-samples/screenshot-3.jpg", categoryLabel: "URBAN DESIGN", subcategory: "Public Realm", title: "Civic Streetscape Studies", description: "Compact public-realm studies for shaded movement, seating, planting, and storefront rhythm." },
    { order: 3, image: "/carousel-samples/screenshot-4.jpg", categoryLabel: "COMMERCIAL DESIGN", subcategory: "Retail", title: "Flagship Retail Threshold", description: "A precise entry sequence balancing display, circulation, and tactile brand experience." },
    { order: 4, image: "/carousel-samples/screenshot-6.jpg", categoryLabel: "HOSPITALITY", subcategory: "Guest Suite", title: "Pure Earth Stay - Guest Suite Concept", description: "A calm hospitality interior built around natural finishes, filtered light, and comfort." },
  ],
  softwareSystems: [
    { order: 0, categoryLabel: "BIM", title: "Building Information Modeling System", description: "Complete digital twin integration connecting architectural, structural, and MEP systems.", keyFeatures: ["Clash Detection", "Quantity Takeoffs", "4D Construction Sequencing"], techStack: ["Revit", "Navisworks", "Dynamo"], businessBenefit: "Reduced design conflicts by 40%", poster: "/carousel-samples/screenshot-3.jpg", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", accentColor: "from-blue-950/90" },
    { order: 1, categoryLabel: "PROJECT MANAGEMENT", title: "Construction ERP Platform", description: "Integrated project planning, resource allocation, and real-time progress tracking across multiple sites.", keyFeatures: ["Gantt Scheduling", "Resource Optimization", "Progress Dashboards"], techStack: ["Custom", "React", "Node.js"], businessBenefit: "Reduced project delays by 30%", poster: "/carousel-samples/screenshot-6.jpg", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", accentColor: "from-teal-950/90" },
    { order: 2, categoryLabel: "SUSTAINABILITY", title: "Building Performance Analytics", description: "Real-time energy modeling, carbon footprint tracking, and sustainable material lifecycle analysis.", keyFeatures: ["Energy Simulation", "Carbon Tracking", "LCA Analysis"], techStack: ["Python", "IES VE", "EnergyPlus"], businessBenefit: "Achieved 35% energy reduction", poster: "/carousel-samples/screenshot-4.jpg", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", accentColor: "from-green-950/90" },
    { order: 3, categoryLabel: "SITE MANAGEMENT", title: "Construction Site Intelligence", description: "IoT sensor integration for safety monitoring, equipment tracking, and automated site reporting.", keyFeatures: ["IoT Sensors", "Safety Analytics", "Drone Integration"], techStack: ["Python", "MQTT", "Dashboard"], businessBenefit: "Improved site safety by 60%", poster: "/carousel-samples/screenshot-1.jpg", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", accentColor: "from-amber-950/90" },
  ],
  seoAnalytics: [
    { order: 0, categoryLabel: "MARKET ANALYSIS", title: "Urban Development Insights", description: "Market research and feasibility studies for large-scale urban development projects.", metrics: [{ label: "Project Pipeline Value", value: "$450M" }, { label: "Market Demand Index", value: "92%" }], poster: "/carousel-samples/screenshot-5.jpg", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", accent: "from-blue-950/40" },
    { order: 1, categoryLabel: "ENVIRONMENTAL", title: "Sustainable Building Audits", description: "Comprehensive environmental impact assessments and green building certification audits.", metrics: [{ label: "Carbon Reduction", value: "45%" }, { label: "LEED Score", value: "Platinum" }], poster: "/carousel-samples/screenshot-6.jpg", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", accent: "from-green-950/40" },
    { order: 2, categoryLabel: "CONSTRUCTION", title: "Project Risk Assessment", description: "Data-driven risk analysis and mitigation strategies for complex construction projects.", metrics: [{ label: "Risk Mitigation Rate", value: "95%" }, { label: "Project Success Rate", value: "98%" }], poster: "/carousel-samples/screenshot-3.jpg", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", accent: "from-amber-950/40" },
    { order: 3, categoryLabel: "SUSTAINABILITY", title: "Green Building Performance", description: "Post-occupancy performance monitoring and optimization of green building systems.", metrics: [{ label: "Energy Savings", value: "38%" }, { label: "Water Conservation", value: "52%" }], poster: "/carousel-samples/screenshot-4.jpg", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", accent: "from-teal-950/40" },
  ],
  strategicConsulting: [
    { order: 0, categoryLabel: "MASTER PLANNING", title: "Smart City Integration", challenge: "Municipal government requires a comprehensive masterplan for a new smart city district integrating technology and sustainability.", solution: "Developed phased masterplan with smart infrastructure, sustainable transport, and green building guidelines.", execution: "Collaborated with urban planners, tech partners, and sustainability experts to create an integrated vision.", results: [{ label: "Project Timeline", value: "10 Years" }, { label: "Investment Value", value: "$2.5B" }, { label: "Sustainability Index", value: "LEED-Certified" }] },
    { order: 1, categoryLabel: "DEVELOPMENT", title: "Mixed-Use Development Strategy", challenge: "Private developer seeking to maximize returns on a 5-acre urban site through mixed-use development.", solution: "Created comprehensive feasibility study, financial modelling, and design recommendations.", execution: "Managed design team, secured planning approvals, and coordinated stakeholder engagement.", results: [{ label: "ROI Projection", value: "28%" }, { label: "Construction Cost", value: "$180M" }, { label: "GFA Optimization", value: "+15%" }] },
  ],
  contentWriting: [
    { order: 0, categoryLabel: "Technical Writing", type: "Architectural Specifications", headline: "High-Performance Building Envelope Specification Guide", metrics: "Specification Standards", excerpt: "Comprehensive technical specifications for high-performance building facades including thermal break systems, curtain wall detailing, air barrier installation, and condensation analysis for mixed-humidity climate zones..." },
    { order: 1, categoryLabel: "Feasibility Study", type: "Site Development Report", headline: "Mixed-Use Development Feasibility and Massing Report", metrics: "Planning Review", excerpt: "A structured assessment of site capacity, access, zoning controls, parking demand, phasing, and development yield to guide early investment and planning decisions..." },
    { order: 2, categoryLabel: "Environmental", type: "Impact Assessment", headline: "Daylight, Ventilation, and Environmental Performance Report", metrics: "Sustainability Review", excerpt: "Performance-led reporting covering solar exposure, daylight autonomy, natural ventilation paths, shading strategy, material impact, and recommendations for reduced operational demand..." },
    { order: 3, categoryLabel: "Construction", type: "Tender Documentation", headline: "Detailed Construction Notes and Vendor Scope Package", metrics: "Tender Ready", excerpt: "Clear technical notes, schedules, execution standards, and vendor scope definitions prepared to reduce ambiguity during pricing, procurement, and site coordination..." },
  ],
  capabilities: [
    { order: 0, key: "01", title: "Architecture", description: "Concept design, planning strategy, drawings, and spatial development for homes, workplaces, and civic settings.", chips: ["Concept Design", "Planning", "Construction Docs"], metric: "40+", metricLabel: "Projects shaped", bg: "bg-accent", icon: "PenTool", big: true },
    { order: 1, key: "02", title: "Interior Design", description: "Material palettes, furniture planning, lighting, detailing, and procurement guidance for refined interiors.", chips: ["Materials", "Furniture", "Lighting"], metric: "98%", metricLabel: "client satisfaction", bg: "bg-surface-1 dark:bg-[oklch(0.88_0.1_75)]", icon: "Layers", big: false },
    { order: 2, key: "03", title: "Sustainable Design", description: "Passive comfort, daylight, ventilation, and material decisions shaped for long-term performance.", chips: ["Daylight", "Ventilation", "Material Research"], metric: "35%", metricLabel: "local material share", bg: "bg-surface-2 dark:bg-[oklch(0.83_0.12_140)]", icon: "Leaf", big: false },
    { order: 3, key: "04", title: "Urban & Hospitality", description: "Public-realm, retail, workplace, and hospitality concepts with clear experiential sequencing.", chips: ["Masterplans", "Retail", "Guest Experience"], metric: "15+", metricLabel: "years of practice", bg: "bg-surface-3 dark:bg-[oklch(0.85_0.12_75)]", icon: "Map", big: false },
  ],
  process: [
    { order: 0, number: "01", title: "Discover", description: "Project brief, site conditions, lifestyle needs, and design intent are clarified.", icon: "Search", bg: "bg-accent" },
    { order: 1, number: "02", title: "Concept", description: "Spatial direction, massing, mood, and material language are shaped into a clear proposal.", icon: "PenTool", bg: "bg-surface-3 dark:bg-[oklch(0.85_0.12_75)]" },
    { order: 2, number: "03", title: "Detail", description: "Drawings, finishes, joinery, lighting, and consultant inputs are coordinated.", icon: "Layers", bg: "bg-surface-4 dark:bg-[oklch(0.82_0.14_25)]" },
    { order: 3, number: "04", title: "Deliver", description: "Execution is guided through documentation, reviews, site coordination, and handover.", icon: "Rocket", bg: "bg-surface-2 dark:bg-[oklch(0.83_0.12_140)]" },
    { order: 4, number: "05", title: "Refine", description: "Final styling, corrections, and quality checks bring the space into alignment.", icon: "LineChart", bg: "bg-surface-6 dark:bg-[oklch(0.78_0.14_280)]" },
    { order: 5, number: "06", title: "Care", description: "Post-handover guidance supports long-term use, maintenance, and future changes.", icon: "Repeat", bg: "bg-accent" },
  ],
  cases: [
    { order: 0, name: "Urban Tech Hub", sector: "Commercial Development", year: "2025", word: "INNOVATION", color: "bg-accent", problem: "Developers needed to create a future-proof office complex for tech tenants in a competitive market.", tags: ["Commercial", "Sustainability", "Smart"], rotation: -1.4, metrics: [{ key: "100%", value: "Leased" }, { key: "BREEAM", value: "Excellent" }, { key: "6mo", value: "Early completion" }] },
    { order: 1, name: "Coastal Wellness Resort", sector: "Hospitality - APAC", year: "2025", word: "TRANQUILITY", color: "bg-surface-4 dark:bg-[oklch(0.82_0.14_25)]", problem: "Creating a luxury eco-resort that blends seamlessly with sensitive coastal environment.", tags: ["Hospitality", "Sustainable", "Luxury"], rotation: 1.6, metrics: [{ key: "5-Star", value: "Resort Rating" }, { key: "Zero", value: "Carbon" }, { key: "12mo", value: "Construction" }] },
  ],
  engagements: [
    { order: 0, name: "Concept Consultation", duration: "1-2 wks", description: "A focused starting point for site, brief, mood, and spatial direction.", bullets: ["Brief review", "Site inputs", "Concept direction"], bg: "bg-surface-3 dark:bg-[oklch(0.85_0.12_75)]", rotation: -1.2, tag: "Fastest", icon: "Zap" },
    { order: 1, name: "Full Design", duration: "3-6 mo", description: "Complete architecture or interior design from concept through detailed documentation.", bullets: ["Concept design", "Material palette", "Technical drawings"], bg: "bg-accent", rotation: 0, tag: "Most popular", popular: true, icon: "PenTool" },
    { order: 2, name: "Design + Execution Support", duration: "6-18 mo", description: "Design documentation with site reviews, vendor coordination, and handover guidance.", bullets: ["Site coordination", "Vendor guidance", "Quality checks"], bg: "bg-surface-2 dark:bg-[oklch(0.83_0.12_140)]", rotation: 1.4, tag: "Full service", icon: "Flame" },
  ],
  testimonials: [
    { order: 0, quote: "Imagine Design Studio transformed our home with exceptional architecture and interior design. Their professionalism, attention to detail, and ability to bring our vision to life made the entire experience outstanding.", author: "Mohit Patel", role: "2 months ago", verified: "Verified", stars: 5 },
    { order: 1, quote: "The team perfectly brought my jewellery store vision to life. Their creativity, professionalism, and commitment to quality exceeded my expectations from start to finish.", author: "Nayan Bhargava", role: "3 months ago", verified: "Verified", stars: 5 },
    { order: 2, quote: "Their attention to detail and uncompromising quality made all the difference. The project was managed flawlessly, and the final result exceeded every expectation.", author: "Neelam Chawla", role: "2 months ago", verified: "Verified", stars: 5 },
    { order: 3, quote: "Their expertise, technical knowledge, and project management were worth every penny. They delivered a stunning modern home exactly as envisioned.", author: "Harish Jog", role: "3 months ago", verified: "Verified", stars: 5 },
    { order: 4, quote: "A highly creative and professional team delivering premium-quality architecture and interior design. I would confidently recommend them to anyone looking for exceptional design services.", author: "Darshan Kharniwal", role: "3 months ago", verified: "Verified", stars: 5 },
    { order: 5, quote: "Their creativity transformed my house into a beautifully designed home. Every detail reflects thoughtful planning, craftsmanship, and genuine dedication.", author: "Saddam Singh", role: "3 months ago", verified: "Verified", stars: 5 },
  ],
  stats: [
    { order: 0, value: "120+", label: "Projects completed" },
    { order: 1, value: "45+", label: "Active clients" },
    { order: 2, value: "15+", label: "Years of practice" },
    { order: 3, value: "85%", label: "Referral-led work" },
    { order: 4, value: "98%", label: "Client satisfaction" },
  ],
};

export const DEFAULT_REELS: Reel[] = [];
