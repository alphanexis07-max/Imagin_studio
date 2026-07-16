import type { Reel } from "@/lib/admin/reels.functions";
import type { CollectionName } from "@/lib/admin/collections.functions";
import type { SiteData } from "@/lib/admin/site.functions";

export const DEFAULT_SITE: SiteData = {
  hero: {
    eyebrow: "Architect Farm - Building Tomorrow's Landmarks",
    name: "Architect Farm",
    headline: "Architecture & Construction Specialists",
    portraitUrl: "/portrait.png",
    sidebarStat: { value: "15+ Years", label: "in Architectural Design & Construction" },
    sidebarQuote:
      "Architect Farm transformed our vision into reality, delivering a sustainable landmark that redefines modern urban living.",
  },
  about: {
    eyebrow: "Who We Are",
    title: "We build spaces that inspire and endure.",
    body:
      "Architect Farm is a cross-disciplinary architecture and construction firm. We specialize in sustainable design, project management, and turnkey construction delivery across commercial, residential, and institutional projects.",
    tiles: ["Sustainable", "Innovative", "Precision-built", "Turnkey delivery"],
  },
  portfolio: {
    overview: {
      eyebrow: "Our Built Environment",
      title: "Architectural Portfolio",
      description:
        "A curated showcase of landmark buildings, sustainable spaces, and construction excellence across multiple sectors.",
    },
    sections: {
      heroShowcase: {
        eyebrow: "Featured Projects",
        title: "ARCHITECTURAL SHOWCASE",
        description: "Our most iconic buildings and development projects.",
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
        eyebrow: "Digital Construction",
        title: "BIM & TECHNICAL SYSTEMS",
        description: "Building Information Modeling and precision engineering.",
      },
      seoAnalytics: {
        eyebrow: "Development Insights",
        title: "PROJECT MANAGEMENT & ANALYTICS",
        description: "Data-driven construction delivery and resource optimization.",
      },
      strategicConsulting: {
        eyebrow: "Master Planning",
        title: "URBAN DESIGN & CONSULTING",
        description: "Strategic development and city planning solutions.",
      },
      contentWriting: {
        eyebrow: "Technical Documentation",
        title: "SPECIFICATIONS & REPORTS",
        description: "Detailed architectural specifications, feasibility studies, and environmental impact assessments.",
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
    email: "info@architectfarm.com",
    bookCallUrl: "tel:917067068673",
  },
  footer: {
    copyright: "© 2026 Architect Farm - Building Tomorrow, Today",
    socials: [
      { label: "Instagram", url: "https://www.instagram.com/imagine_design_studios/", icon: "Instagram" },
      { label: "Facebook", url: "https://www.facebook.com/imagine.consultants/", icon: "Facebook" },
      { label: "Website", url: "https://www.imaginedesignstudios.com/", icon: "Globe" },
    ],
  },
  marquee: {
    top: ["ARCHITECTURE", "CONSTRUCTION", "DESIGN", "SUSTAINABILITY", "INNOVATION"],
    bottom: ["ARCHITECTURE", "CONSTRUCTION", "DESIGN", "SUSTAINABILITY", "INNOVATION"],
  },
};

export const DEFAULT_COLLECTIONS: Record<CollectionName, Array<Record<string, unknown>>> = {
  heroShowcase: [
    { order: 0, categoryLabel: "ARCHITECTURAL", title: "Horizon Corporate Tower", description: "A 40-story sustainable commercial landmark featuring double-skin facade technology and AI-optimized energy systems.", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", poster: "/carousel-samples/screenshot-2.jpg", glow: "shadow-blue-950/40", ctaText: "View Project", ctaLink: "#portfolio" },
    { order: 1, categoryLabel: "CONSTRUCTION", title: "Urban Green Residences", description: "Net-zero residential complex with integrated green walls, solar infrastructure, and community rooftop gardens.", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", poster: "/carousel-samples/screenshot-1.jpg", glow: "shadow-green-950/40", ctaText: "View Project", ctaLink: "#portfolio" },
    { order: 2, categoryLabel: "ARCHITECTURAL", title: "Waterfront Cultural Centre", description: "Iconic arts venue designed with parametric geometry, sustainable materials, and 270-degree harbor views.", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", poster: "/carousel-samples/screenshot-2.jpg", glow: "shadow-purple-950/40", ctaText: "View Project", ctaLink: "#portfolio" },
    { order: 3, categoryLabel: "CONSTRUCTION", title: "MedTech Innovation Campus", description: "State-of-the-art medical research facility with smart infrastructure, specialized cleanrooms, and sustainable operations.", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", poster: "/carousel-samples/screenshot-3.jpg", glow: "shadow-teal-950/40", ctaText: "View Project", ctaLink: "#portfolio" },
    { order: 4, categoryLabel: "INTERIOR DESIGN", title: "Minimalist Luxury Penthouse", description: "Premium residential interior featuring clean lines, natural materials, and panoramic views of the city skyline.", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", poster: "/carousel-samples/screenshot-4.jpg", glow: "shadow-amber-950/40", ctaText: "View Project", ctaLink: "#portfolio" },
  ],
  videoEditing: [
    { order: 0, categoryLabel: "ARCHITECTURAL", title: "Harbor Skyline Visualisation", description: "Cinematic architectural flythrough showcasing the integrated urban waterfront development.", outcome: "Won International Design Award", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", poster: "/carousel-samples/screenshot-5.jpg", accentColor: "from-blue-950/90" },
    { order: 1, categoryLabel: "CONSTRUCTION", title: "Timelapse: Campus Build", description: "12-month construction process compressed into 4 minutes showing the transformation from ground to completion.", outcome: "Featured in ArchDaily", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", poster: "/carousel-samples/screenshot-6.jpg", accentColor: "from-amber-950/90" },
    { order: 2, categoryLabel: "ARCHITECTURAL", title: "Eco-Tower Walkthrough", description: "Real-time rendered virtual tour of the sustainable office tower with detailed environmental systems.", outcome: "LEED Platinum Certified", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", poster: "/carousel-samples/screenshot-1.jpg", accentColor: "from-green-950/90" },
    { order: 3, categoryLabel: "INTERIOR", title: "Residential Showcase", description: "Immersive photorealistic presentation of luxury apartment interiors with custom furniture and finishes.", outcome: "Interior Design Award Nominee", video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", poster: "/carousel-samples/screenshot-2.jpg", accentColor: "from-orange-950/90" },
  ],
  visualAssets: [
    { order: 0, image: "/carousel-samples/screenshot-2.jpg", categoryLabel: "ARCHITECTURAL", subcategory: "Facades", title: "Curtain Wall Detailing", description: "Precision engineered glass and metal facade systems with thermal performance optimization." },
    { order: 1, image: "/carousel-samples/screenshot-1.jpg", categoryLabel: "INTERIOR", subcategory: "Residential", title: "Contemporary Living Spaces", description: "Open plan interiors with natural light optimization and minimalist furniture design." },
    { order: 2, image: "/carousel-samples/screenshot-3.jpg", categoryLabel: "ARCHITECTURAL", subcategory: "Renderings", title: "Photorealistic Visualizations", description: "High-fidelity 3D renderings showcasing materiality and spatial experience." },
    { order: 3, image: "/carousel-samples/screenshot-4.jpg", categoryLabel: "CONSTRUCTION", subcategory: "Structural", title: "Steel Frame Architecture", description: "Structural engineering solutions for high-rise construction and seismic resistance." },
    { order: 4, image: "/carousel-samples/screenshot-6.jpg", categoryLabel: "URBAN", subcategory: "Landscape", title: "Public Space Design", description: "Integrated landscape architecture and urban design for city regeneration projects." },
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
    { order: 1, categoryLabel: "Content Writing", type: "Project Case Studies", headline: "The Sustainability Revolution: Net-Zero High-Rise Construction", metrics: "Published in Architecture Today", excerpt: "This landmark project demonstrates that high-rise living can achieve net-zero operational carbon through integrated renewable energy systems, advanced building automation, and sustainable material selection..." },
    { order: 2, categoryLabel: "Content Writing", type: "Industry Insights", headline: "The Future of Urban Living: Post-Pandemic Design Strategies", metrics: "20K+ Reads", excerpt: "The pandemic has fundamentally shifted our expectations of the built environment. Forward-thinking developers are incorporating flexible workspaces, outdoor access, and wellness-focused amenities as core design features..." },
  ],
  capabilities: [
    { order: 0, key: "01", title: "Architectural Design", description: "Creative architectural solutions from concept design through construction documentation and delivery.", chips: ["Concept Design", "Planning Consents", "Construction Docs"], metric: "40+", metricLabel: "Projects delivered", bg: "bg-accent", icon: "PenTool", big: true },
    { order: 1, key: "02", title: "Construction Management", description: "End-to-end construction management with guaranteed quality, schedule, and budget adherence.", chips: ["Project Management", "Quality Control", "Health & Safety"], metric: "98%", metricLabel: "on-time delivery", bg: "bg-surface-1 dark:bg-[oklch(0.88_0.1_75)]", icon: "HardHat", big: false },
    { order: 2, key: "03", title: "Sustainable Design", description: "Green building design, LEED certification, and low-carbon strategies for environmental responsibility.", chips: ["Green Building", "Energy Modeling", "Waste Reduction"], metric: "LEED", metricLabel: "Platinum Certified", bg: "bg-surface-2 dark:bg-[oklch(0.83_0.12_140)]", icon: "Leaf", big: false },
    { order: 3, key: "04", title: "Digital Construction", description: "BIM, VR walkthroughs, and construction management dashboards for precision project delivery.", chips: ["BIM", "3D Printing", "IoT Monitoring"], metric: "85%", metricLabel: "digital adoption", bg: "bg-surface-3 dark:bg-[oklch(0.85_0.12_75)]", icon: "Layers", big: false },
  ],
  process: [
    { order: 0, number: "01", title: "Discover", description: "Project visioning, site analysis, and stakeholder consultation.", icon: "Search", bg: "bg-accent" },
    { order: 1, number: "02", title: "Design", description: "Concept development, design iteration, and architectural visualization.", icon: "PenTool", bg: "bg-surface-3 dark:bg-[oklch(0.85_0.12_75)]" },
    { order: 2, number: "03", title: "Develop", description: "Detailed documentation, engineering coordination, and planning approvals.", icon: "Layers", bg: "bg-surface-4 dark:bg-[oklch(0.82_0.14_25)]" },
    { order: 3, number: "04", title: "Deliver", description: "Construction management, quality assurance, and project handover.", icon: "Rocket", bg: "bg-surface-2 dark:bg-[oklch(0.83_0.12_140)]" },
    { order: 4, number: "05", title: "Monitor", description: "Post-occupancy evaluation and building performance monitoring.", icon: "LineChart", bg: "bg-surface-6 dark:bg-[oklch(0.78_0.14_280)]" },
    { order: 5, number: "06", title: "Optimise", description: "Continuous improvement and lifecycle management of built assets.", icon: "Repeat", bg: "bg-accent" },
  ],
  cases: [
    { order: 0, name: "Urban Tech Hub", sector: "Commercial Development", year: "2025", word: "INNOVATION", color: "bg-accent", problem: "Developers needed to create a future-proof office complex for tech tenants in a competitive market.", tags: ["Commercial", "Sustainability", "Smart"], rotation: -1.4, metrics: [{ key: "100%", value: "Leased" }, { key: "BREEAM", value: "Excellent" }, { key: "6mo", value: "Early completion" }] },
    { order: 1, name: "Coastal Wellness Resort", sector: "Hospitality - APAC", year: "2025", word: "TRANQUILITY", color: "bg-surface-4 dark:bg-[oklch(0.82_0.14_25)]", problem: "Creating a luxury eco-resort that blends seamlessly with sensitive coastal environment.", tags: ["Hospitality", "Sustainable", "Luxury"], rotation: 1.6, metrics: [{ key: "5-Star", value: "Resort Rating" }, { key: "Zero", value: "Carbon" }, { key: "12mo", value: "Construction" }] },
  ],
  engagements: [
    { order: 0, name: "Feasibility", duration: "2-4 wks", description: "Initial concept development and feasibility assessment for your project.", bullets: ["Site analysis", "Cost estimation", "Planning guidance"], bg: "bg-surface-3 dark:bg-[oklch(0.85_0.12_75)]", rotation: -1.2, tag: "Fastest", icon: "Zap" },
    { order: 1, name: "Full Design", duration: "3-6 mo", description: "Comprehensive design and documentation services for planning approval and construction.", bullets: ["Concept design", "Technical drawings", "BIM models"], bg: "bg-accent", rotation: 0, tag: "Most popular", popular: true, icon: "PenTool" },
    { order: 2, name: "Turnkey Build", duration: "6-24 mo", description: "Complete project delivery from concept to construction handover and beyond.", bullets: ["Project management", "Construction delivery", "Post-build warranty"], bg: "bg-surface-2 dark:bg-[oklch(0.83_0.12_140)]", rotation: 1.4, tag: "Full service", icon: "Flame" },
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
    { order: 2, value: "15+", label: "Countries served" },
    { order: 3, value: "85%", label: "Repeat clients" },
    { order: 4, value: "98%", label: "Client satisfaction" },
  ],
  visualAssets: [
    {
      order: 0,
      image: "/carousel-samples/screenshot-2.jpg",
      categoryLabel: "ARCHITECTURAL",
      subcategory: "Facades",
      title: "Curtain Wall Detailing",
      description: "Precision engineered glass and metal facade systems with thermal performance optimization.",
    },
    {
      order: 1,
      image: "/carousel-samples/screenshot-1.jpg",
      categoryLabel: "INTERIOR",
      subcategory: "Residential",
      title: "Contemporary Living Spaces",
      description: "Open plan interiors with natural light optimization and minimalist furniture design.",
    },
    {
      order: 2,
      image: "/carousel-samples/screenshot-3.jpg",
      categoryLabel: "ARCHITECTURAL",
      subcategory: "Renderings",
      title: "Photorealistic Visualizations",
      description: "High-fidelity 3D renderings showcasing materiality and spatial experience.",
    },
    {
      order: 3,
      image: "/carousel-samples/screenshot-4.jpg",
      categoryLabel: "CONSTRUCTION",
      subcategory: "Structural",
      title: "Steel Frame Architecture",
      description: "Structural engineering solutions for high-rise construction and seismic resistance.",
    },
    {
      order: 4,
      image: "/carousel-samples/screenshot-6.jpg",
      categoryLabel: "URBAN",
      subcategory: "Landscape",
      title: "Public Space Design",
      description: "Integrated landscape architecture and urban design for city regeneration projects.",
    },
  ],
};

export const DEFAULT_REELS: Reel[] = [];
