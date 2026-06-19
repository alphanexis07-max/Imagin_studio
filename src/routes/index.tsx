import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type MouseEvent } from "react";
import logo from "@/assets/logo.png";
import {
  ArrowUpRight,
  Megaphone,
  Rocket,
  Star,
  Sparkles,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Send,
  Target,
  User,
  AtSign,
  MessageSquareText,
  CalendarCheck,
  PenTool,
  Search,
  Lightbulb,
  Layers,
  LineChart,
  Repeat,
  Zap,
  Clock,
  Infinity as InfinityIcon,
  Flame,
  TrendingUp,
  Shield,
  Globe,
  Brain,
  BarChart3,
  Film,
  Volume2,
  VolumeX,
  Play,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import portrait from "@/assets/portrait.png";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { instagramPosts } from "@/data/instagramFeed";
import {
  RingCarousel,
  JumboStack,
  TricksMenu,
  FlankCarousel,
  TriangleMask,
  DiagonalWheel,
} from "@/components/carousels";
import screenshot1 from "@/assets/carousel-samples/screenshot-1.jpg";
import screenshot2 from "@/assets/carousel-samples/screenshot-2.jpg";
import screenshot3 from "@/assets/carousel-samples/screenshot-3.jpg";
import screenshot4 from "@/assets/carousel-samples/screenshot-4.jpg";
import screenshot5 from "@/assets/carousel-samples/screenshot-5.jpg";
import screenshot6 from "@/assets/carousel-samples/screenshot-6.jpg";

function extractEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);
    const basePath = parsed.origin + parsed.pathname;
    const embedBase = basePath.endsWith("/") ? `${basePath}embed/` : `${basePath}/embed/`;
    return `${embedBase}?autoplay=1&mute=1`;
  } catch {
    return url;
  }
}

export const Route = createFileRoute("/")({ component: Index });

/* ── SVG Decorators ── */
const Scribble = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 60" className={className} fill="none">
    <path
      d="M5 30 Q 25 5, 50 30 T 95 30"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path d="M10 45 Q 30 35, 50 45" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);
const Underline = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 200 20" className={className} fill="none" preserveAspectRatio="none">
    <path
      d="M3 14 Q 60 2, 100 10 T 197 8"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);
const Arrow = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none">
    <path d="M10 10 Q 40 30, 35 55" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <path
      d="M25 50 L 35 58 L 45 48"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const Star4 = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 40 40" className={className} fill="currentColor">
    <path d="M20 0 C 22 14, 26 18, 40 20 C 26 22, 22 26, 20 40 C 18 26, 14 22, 0 20 C 14 18, 18 14, 20 0Z" />
  </svg>
);

/* ── Data ── */
const stats = [
  { k: "180+", v: "Projects delivered" },
  { k: "35+", v: "Active clients" },
  { k: "12+", v: "Countries served" },
  { k: "$2M+", v: "Revenue impact" },
  { k: "96%", v: "Client retention" },
];

const workProjects = [
  {
    name: "Somefolk R&D Digital",
    role: "Product launch · SaaS",
    outcome: "A high-conversion website, launch campaign, and growth funnel for a rapid scale-up.",
    tags: ["Brand", "Web", "Paid Media"],
    color: "bg-surface-5",
  },
  {
    name: "Lume Skincare",
    role: "DTC rebrand · content",
    outcome:
      "Built a premium brand system, hero film, and social motion playbook for product launch.",
    tags: ["Creative", "Video", "Social"],
    color: "bg-accent",
  },
  {
    name: "Stellar Travel",
    role: "Experience design · storytelling",
    outcome: "Designed a travel brand with immersive UX, editorial commerce, and retention loops.",
    tags: ["UX", "Content", "Growth"],
    color: "bg-surface-3",
  },
];

const serviceOfferings = [
  {
    title: "Brand Strategy",
    description: "Positioning, voice, and launch systems that make your brand stand out and scale.",
    icon: Target,
    accent: "from-orange-500 to-amber-500",
  },
  {
    title: "UI / UX Design",
    description: "Conversion-first experience design that feels premium and converts consistently.",
    icon: Layers,
    accent: "from-sky-500 to-cyan-500",
  },
  {
    title: "Content Creation",
    description: "Video, social, and editorial systems that keep your brand top of mind.",
    icon: Sparkles,
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    title: "Growth Automation",
    description: "AI-enabled funnels, workflows, and reporting that reduce manual overhead.",
    icon: Brain,
    accent: "from-emerald-500 to-lime-500",
  },
];

/* ── Custom Portfolio Datasets ── */
const categoryColors: Record<string, { badge: string; border: string; text: string }> = {
  "Video Editing": {
    badge: "bg-red-500/10 border-red-500/20",
    border: "border-red-500/40",
    text: "text-red-400",
  },
  "Graphic Design": {
    badge: "bg-purple-500/10 border-purple-500/20",
    border: "border-purple-500/40",
    text: "text-purple-400",
  },
  "Website Development": {
    badge: "bg-blue-500/10 border-blue-500/20",
    border: "border-blue-500/40",
    text: "text-blue-400",
  },
  SEO: {
    badge: "bg-green-500/10 border-green-500/20",
    border: "border-green-500/40",
    text: "text-green-400",
  },
  "Content Writing": {
    badge: "bg-orange-500/10 border-orange-500/20",
    border: "border-orange-500/40",
    text: "text-orange-400",
  },
  "Strategic Planning": {
    badge: "bg-amber-500/10 border-amber-500/20",
    border: "border-amber-500/40",
    text: "text-amber-400",
  },
  "Account Audit Reports": {
    badge: "bg-cyan-500/10 border-cyan-500/20",
    border: "border-cyan-500/40",
    text: "text-cyan-400",
  },
  "Project Management Systems": {
    badge: "bg-indigo-500/10 border-indigo-500/20",
    border: "border-indigo-500/40",
    text: "text-indigo-400",
  },
  "CRM Software": {
    badge: "bg-teal-500/10 border-teal-500/20",
    border: "border-teal-500/40",
    text: "text-teal-400",
  },
  "Sales Applications": {
    badge: "bg-pink-500/10 border-pink-500/20",
    border: "border-pink-500/40",
    text: "text-pink-400",
  },
};

const heroShowcaseSlides = [
  {
    categoryLabel: "VIDEO EDITING",
    title: "Brand Campaign Edit",
    description:
      "Premium editorial video cut capturing the target aesthetic for a luxury wellness brand.",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    poster: screenshot2,
    glow: "shadow-red-950/40",
    ctaText: "View Project",
    ctaLink: "#portfolio",
  },
  {
    categoryLabel: "WEBSITE DEVELOPMENT",
    title: "Stellar Booking Platform",
    description:
      "High-performance marketing site and booking application with interactive client UI.",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    poster: screenshot1,
    glow: "shadow-blue-950/40",
    ctaText: "View Project",
    ctaLink: "#portfolio",
  },
  {
    categoryLabel: "GRAPHIC DESIGN",
    title: "Lume Skincare Visuals",
    description:
      "High-end brand assets, social media grid style templates, and premium custom packaging.",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    poster: screenshot2,
    glow: "shadow-purple-950/40",
    ctaText: "View Project",
    ctaLink: "#portfolio",
  },
  {
    categoryLabel: "CRM SOFTWARE",
    title: "Nexis Automation CRM",
    description:
      "Custom enterprise CRM dashboard simplifying client workflows and sales metrics tracking.",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    poster: screenshot3,
    glow: "shadow-teal-950/40",
    ctaText: "View Project",
    ctaLink: "#portfolio",
  },
  {
    categoryLabel: "SALES APPLICATIONS",
    title: "Retail Billing App",
    description:
      "Cloud-native sales app designed with high-conversion checkout flows and real-time ledger.",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    poster: screenshot4,
    glow: "shadow-pink-950/40",
    ctaText: "View Project",
    ctaLink: "#portfolio",
  },
];

const videoEditingSlides = [
  {
    categoryLabel: "VIDEO EDITING",
    title: "Off-hours Cinematic Cut",
    description: "High-energy commercial cut with quick cuts and professional grading.",
    outcome: "Generated 2.4M views",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    poster: screenshot5,
    accentColor: "from-red-950/90",
  },
  {
    categoryLabel: "VIDEO EDITING",
    title: "Atlas Origin Brand Story",
    description: "Documentary-style corporate story reel emphasizing brand authenticity.",
    outcome: "Improved engagement by 140%",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    poster: screenshot6,
    accentColor: "from-rose-950/90",
  },
  {
    categoryLabel: "VIDEO EDITING",
    title: "Lume Skincare Promo Edit",
    description: "Before/After skin transformations showcasing visual effects and motion tracking.",
    outcome: "Brand campaign launch",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    poster: screenshot1,
    accentColor: "from-red-900/90",
  },
  {
    categoryLabel: "VIDEO EDITING",
    title: "Social Media Hook Playbook",
    description: "Short-form video assets styled for high audience retention and CTA clicks.",
    outcome: "3.2M Blended Views",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    poster: screenshot2,
    accentColor: "from-orange-950/90",
  },
];

const graphicDesignSlides = [
  {
    categoryLabel: "GRAPHIC DESIGN",
    subcategory: "",
    title: "Lume Skincare Visual Identity",
    description: "Color system, custom typography, and premium brand voice.",
    image: screenshot2,
  },
  {
    categoryLabel: "GRAPHIC DESIGN",
    subcategory: "",
    title: "Premium Product Packaging",
    description: "Eco-friendly cosmetic bottle labels and box layouts.",
    image: screenshot1,
  },
  {
    categoryLabel: "GRAPHIC DESIGN",
    subcategory: "",
    title: "High-Retention Instagram Creatives",
    description: "Curated grids, posters, and stories designed for organic conversion.",
    image: screenshot3,
  },
  {
    categoryLabel: "GRAPHIC DESIGN",
    subcategory: "",
    title: "Out-Of-Home Banner Campaigns",
    description: "High-contrast billboards and print advertisements for modern transport hubs.",
    image: screenshot4,
  },
  {
    categoryLabel: "GRAPHIC DESIGN",
    subcategory: "",
    title: "Editorial Brand Catalogs",
    description: "Premium booklets showcasing collection launches.",
    image: screenshot6,
  },
];

const softwareSystemsSlides = [
  {
    categoryLabel: "CRM SOFTWARE",
    title: "Nexis Enterprise CRM",
    description:
      "Custom customer dashboard managing pipelines, emails, and automatic lead triggers.",
    keyFeatures: ["Automated CRM Sync", "Real-Time User Attribution", "Multi-Channel Messaging"],
    techStack: ["React", "FastAPI", "PostgreSQL"],
    businessBenefit: "Reduced client management overhead by 40%",
    poster: screenshot3,
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    accentColor: "from-teal-950/90",
  },
  {
    categoryLabel: "PROJECT MANAGEMENT",
    title: "Agile Dev Sprint Console",
    description:
      "Real-time ticket updates, resource tracking, and automatic deployment pipeline charts.",
    keyFeatures: ["Custom Sprint Planner", "Interactive Gantt Charts", "Direct Slack Webhooks"],
    techStack: ["Next.js", "Express", "MongoDB"],
    businessBenefit: "Boosted team shipping velocity by 30%",
    poster: screenshot6,
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    accentColor: "from-indigo-950/90",
  },
  {
    categoryLabel: "SALES APPLICATIONS",
    title: "Nexis Cloud POS System",
    description:
      "Tablet-optimized sales app featuring offline checkouts and automatic ledger sync.",
    keyFeatures: ["Offline Transactions", "Dynamic Loyalty System", "Inventory Alerts"],
    techStack: ["React Native", "Go", "SQLite"],
    businessBenefit: "Increased checkout throughput by 25%",
    poster: screenshot4,
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    accentColor: "from-pink-950/90",
  },
  {
    categoryLabel: "BUSINESS AUTOMATION",
    title: "Internal Operations Middleware",
    description: "Connects ERP tables, logistics logs, and client emails to an LLM agent.",
    keyFeatures: ["Autonomous Agents", "Semantic Log Parsing", "PDF Invoicing OCR"],
    techStack: ["Python", "LangChain", "Docker"],
    businessBenefit: "Automated 85% of manual shipping checks",
    poster: screenshot1,
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    accentColor: "from-amber-950/90",
  },
];

const seoAnalyticsSlides = [
  {
    categoryLabel: "SEO",
    title: "Organic Search Engine Optimization",
    description:
      "Compound growth funnels capturing high-intent search terms and generating qualified inbound leads.",
    metrics: [
      { label: "Organic Traffic Growth", value: "+312%" },
      { label: "Top 3 Keywords Ranked", value: "840+" },
    ],
    poster: screenshot5,
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    accent: "from-green-950/40",
  },
  {
    categoryLabel: "ACCOUNT AUDIT",
    title: "Technical Site Performance Audit",
    description:
      "Exhaustive audits resolving slow load times, poor lighthouse core web vitals, and indexation gaps.",
    metrics: [
      { label: "Lighthouse Performance Score", value: "98/100" },
      { label: "Site Speed Improvement", value: "3.2x Faster" },
    ],
    poster: screenshot6,
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    accent: "from-cyan-950/40",
  },
  {
    categoryLabel: "ANALYTICS",
    title: "Conversion Attribution Dashboard",
    description:
      "Multi-touch attribution reporting providing marketing attribution modeling across channels.",
    metrics: [
      { label: "Attributed ROI Accuracy", value: "95%" },
      { label: "ROAS Optimization", value: "4.2x Blended" },
    ],
    poster: screenshot3,
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    accent: "from-emerald-950/40",
  },
  {
    categoryLabel: "PERFORMANCE REPORT",
    title: "Core Web Vitals Optimizations",
    description:
      "Technical optimizations resolving Cumulative Layout Shifts and First Contentful Paint delays.",
    metrics: [
      { label: "Bounce Rate Reduction", value: "-22%" },
      { label: "Conversion Rate Uplift", value: "+45%" },
    ],
    poster: screenshot4,
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    accent: "from-blue-950/40",
  },
];

const consultingCases = [
  {
    categoryLabel: "STRATEGIC PLANNING",
    title: "B2B SaaS Market Entry",
    challenge:
      "Enterprise tech company struggling to enter APAC due to localized pricing, regulatory hurdles, and unknown brand authority.",
    solution:
      "Conducted a deep local competitor audit, structured local-first packaging tiers, and launched a multi-touch digital campaign directed at C-Suite stakeholders.",
    execution:
      "Constructed targeted growth strategy, localized brand messaging, and implemented serverless landing hubs built for low-bandwidth environments.",
    results: [
      { label: "ARR Growth in 8mo", value: "$1.8M" },
      { label: "Customer Acq. Cost (CAC)", value: "-35%" },
      { label: "Client Inbound Pipeline", value: "+300%" },
    ],
  },
  {
    categoryLabel: "STRATEGIC PLANNING",
    title: "Retail Supply Chain Digitization",
    challenge:
      "Legacy retail chain with paper-heavy logistics, causing shipping bottlenecks and severe stock mismatches.",
    solution:
      "Designed a digital transformation blueprint. Programmed cloud PM middleware linking inventory logs to real-time sales APIs.",
    execution:
      "Phased integration plan, custom ERP dashboards, and automated Slack alert channels warning warehouse staff about inventory drops.",
    results: [
      { label: "Bottlenecks Resolved", value: "99%" },
      { label: "Staff Time Saved", value: "85%" },
      { label: "Fulfillment Errors", value: "<0.1%" },
    ],
  },
];

const editorialContent = [
  {
    categoryLabel: "CONTENT WRITING",
    type: "Sales Landing Page Copy",
    headline: "Unchain Your Operations: The AI Middleware Built for Scale",
    metrics: "4.8% Conv. Rate (+60% vs benchmark)",
    excerpt:
      "Enterprise systems are notoriously rigid. We don't believe in rewriting your stack from scratch. Our middleware sits quietly on top, using intelligent semantic parsing to turn unstructured email requests into structured database inserts...",
  },
  {
    categoryLabel: "CONTENT WRITING",
    type: "Tech Blog & Thought Leadership",
    headline: "The Churn Tax: Why Legacy Architectures Threaten Series-A Runways",
    metrics: "15K Views · 18% CTA Click-Through",
    excerpt:
      "Losing 3% of your customer base each month is a leaky bucket. When your CAC exceeds your LTV payback window, growth stops compounding. Read our deep-dive analysis on building growth loops directly into your product experience...",
  },
  {
    categoryLabel: "CONTENT WRITING",
    type: "B2B Email Campaign Sequence",
    headline: "The 3 Bottlenecks C-Suite Teams Ignore (And How to Automate Them)",
    metrics: "46% Open Rate · 12% Reply Rate",
    excerpt:
      "Hi {First Name}, most logistics companies waste 20 hours a week on manual inventory audits. It isn't a staff issue; it's a data synchronization issue. Here is how one retail client freed 85% of their operational backlog without hiring...",
  },
];

function DiscoveryCallDialog() {
  const hostEmail = "hello@alphanexius.com";
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
  });

  const onChange =
    (field: keyof typeof form) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
      setSent(false);
    };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      "",
      "Project description:",
      form.description || "Not provided",
    ].join("\n");

    window.location.href = `mailto:${hostEmail}?subject=${encodeURIComponent(
      "Discovery call request from AlphaNexis website",
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="inline-flex h-auto items-center gap-2 rounded-full border-2 border-ink bg-background px-6 py-3 font-semibold text-foreground shadow-[4px_4px_0_0_var(--ink)] transition-transform hover:-translate-y-0.5 hover:bg-card"
        >
          <Phone className="h-4 w-4" /> Book a discovery call
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[min(94vw,34rem)] overflow-hidden rounded-[1.5rem] border-2 border-ink bg-card p-0 shadow-[10px_10px_0_0_var(--ink)]">
        <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-accent via-surface-2 to-surface-6" />
        <div className="p-6 sm:p-8">
          <DialogHeader>
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-ink bg-accent text-ink">
              <CalendarCheck className="h-6 w-6" />
            </div>
            <DialogTitle className="font-display text-3xl font-bold text-card-foreground">
              Discovery call
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Share contact details. Mail app opens with message ready for host.
            </DialogDescription>
          </DialogHeader>

          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="lead-name">Name *</Label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="lead-name"
                    value={form.name}
                    onChange={onChange("name")}
                    required
                    autoComplete="name"
                    className="h-11 rounded-xl border-2 border-ink/20 bg-background pl-10 focus-visible:ring-2"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lead-email">Email *</Label>
                <div className="relative">
                  <AtSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="lead-email"
                    type="email"
                    value={form.email}
                    onChange={onChange("email")}
                    required
                    autoComplete="email"
                    className="h-11 rounded-xl border-2 border-ink/20 bg-background pl-10 focus-visible:ring-2"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lead-phone">Phone number *</Label>
              <div className="relative">
                <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="lead-phone"
                  type="tel"
                  value={form.phone}
                  onChange={onChange("phone")}
                  required
                  autoComplete="tel"
                  className="h-11 rounded-xl border-2 border-ink/20 bg-background pl-10 focus-visible:ring-2"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lead-description">
                Description <span className="text-muted-foreground">(optional)</span>
              </Label>
              <div className="relative">
                <MessageSquareText className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Textarea
                  id="lead-description"
                  value={form.description}
                  onChange={onChange("description")}
                  rows={4}
                  className="min-h-28 rounded-xl border-2 border-ink/20 bg-background pl-10 focus-visible:ring-2"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
              <Button
                type="submit"
                className="h-12 flex-1 rounded-full bg-ink px-6 font-semibold text-cream shadow-[4px_4px_0_0_var(--accent)] transition-transform hover:-translate-y-0.5"
              >
                <Send className="h-4 w-4" /> Send request
              </Button>
              {sent && (
                <p className="text-sm font-medium text-foreground/70" role="status">
                  Mail draft opened.
                </p>
              )}
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function WorkSection() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-24">
      <div className="mb-10 text-center">
        <span className="script text-3xl text-accent">work that speaks</span>
        <h2 className="mt-3 font-display text-5xl font-bold md:text-7xl">
          Selected projects crafted to elevate brands and deliver real results.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-foreground/70">
          A curated selection of our most strategic launches, product redesigns, and growth
          campaigns.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {workProjects.map((project) => (
          <div
            key={project.name}
            className={`rounded-[2rem] border-2 border-ink p-8 shadow-[6px_6px_0_0_var(--ink)] dark:border-border dark:bg-card dark:text-card-foreground dark:shadow-[6px_6px_0_0_rgba(255,255,255,0.16)] ${project.color}`}
          >
            <div className="text-sm uppercase tracking-[0.3em] text-foreground/60">
              {project.role}
            </div>
            <h3 className="mt-4 font-display text-3xl font-bold text-ink">{project.name}</h3>
            <p className="mt-4 text-sm leading-6 text-ink/80">{project.outcome}</p>
            <div className="mt-6 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.3em] text-ink/80">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-ink/20 bg-ink/10 px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <a
          href="#work"
          className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-background px-8 py-3 font-semibold text-ink transition hover:bg-ink hover:text-cream"
        >
          View all works <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section
      id="services"
      className="relative mx-auto max-w-6xl px-5 py-24 )]"
    >
      <div className="mb-10 text-center">
        <span className="script text-3xl text-accent">services that drive digital growth</span>
        <h2 className="mt-3 font-display text-5xl font-bold md:text-7xl">
          Services built to move your business forward.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-foreground/70">
          From strategy to execution, we design systems that create momentum, experience, and
          measurable value.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {serviceOfferings.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.title}
              className="rounded-[2rem] border-2 border-ink bg-background p-8 shadow-[6px_6px_0_0_var(--ink)]"
            >
              <div
                className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br ${service.accent} text-white`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-2xl font-bold">{service.title}</h3>
              <p className="mt-4 text-sm leading-6 text-foreground/70">{service.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

const capabilities = [
  {
    icon: Target,
    t: "Performance Marketing",
    k: "01",
    d: "High-intent SEO funnels, algorithmic ad systems & growth loops that compound — not one-off campaigns.",
    chips: ["SEO & SEM", "Paid Social", "Funnel Architecture"],
    metric: "3x",
    metricLabel: "pipeline velocity",
    bg: "bg-accent",
    span: "md:col-span-2 md:row-span-2",
    big: true,
  },
  {
    icon: PenTool,
    t: "Brand Identity",
    k: "02",
    d: "GTM strategy, positioning, verbal identity & creative systems with a point of view that converts.",
    chips: ["Positioning", "Creative Direction", "Brand Voice"],
    metric: "–35%",
    metricLabel: "customer acq. cost",
    bg: "bg-surface-1 dark:bg-[oklch(0.88_0.1_75)]",
    span: "",
  },
  {
    icon: Sparkles,
    t: "Social & Content",
    k: "03",
    d: "Content engines built on short-form video, editorial calendars & community ops that ship every week.",
    chips: ["Short-form Video", "Editorial Calendar", "Community"],
    metric: "+312%",
    metricLabel: "organic reach",
    bg: "bg-surface-2 dark:bg-[oklch(0.83_0.12_140)]",
    span: "",
  },
  {
    icon: Brain,
    t: "AI-Powered Automation",
    k: "04",
    d: "Autonomous AI agents & intelligent middleware that compress manual workflows from hours to minutes.",
    chips: ["AI Agents", "CRM Automation", "Analytics Dash"],
    metric: "85%",
    metricLabel: "task automation",
    bg: "bg-surface-3 dark:bg-[oklch(0.85_0.12_75)]",
    span: "md:col-span-2",
  },
];

const steps = [
  {
    n: "01",
    t: "Discover",
    d: "Deep-dive audit, stakeholder interviews & audience mapping.",
    icon: Search,
    color: "bg-accent",
  },
  {
    n: "02",
    t: "Strategize",
    d: "Positioning, KPIs, channel mix & north-star growth metric.",
    icon: Lightbulb,
    color: "bg-surface-3 dark:bg-[oklch(0.85_0.12_75)]",
  },
  {
    n: "03",
    t: "Create",
    d: "Brand identity, creative assets & content system built.",
    icon: Layers,
    color: "bg-surface-4 dark:bg-[oklch(0.82_0.14_25)]",
  },
  {
    n: "04",
    t: "Deploy",
    d: "Launch ads, funnels, content & automation pipelines live.",
    icon: Rocket,
    color: "bg-surface-2 dark:bg-[oklch(0.83_0.12_140)]",
  },
  {
    n: "05",
    t: "Decode",
    d: "Full analytics, attribution modelling & insight extraction.",
    icon: LineChart,
    color: "bg-surface-6 dark:bg-[oklch(0.78_0.14_280)]",
  },
  {
    n: "06",
    t: "Optimise",
    d: "Scale winners, cut losers, repeat the compounding loop.",
    icon: Repeat,
    color: "bg-accent",
  },
];

const cases = [
  {
    name: "B2B SaaS Scale-Up",
    sector: "FinTech · US",
    year: "2025",
    word: "FINTECH",
    color: "bg-accent",
    problem: "18% churn, legacy backend, CAC threatening Series-A runway.",
    metrics: [
      { k: "+140%", v: "ARR growth" },
      { k: "99.9%", v: "Uptime" },
      { k: "11mo", v: "To $5.2M" },
    ],
    tags: ["Growth", "Funnels", "Ads"],
    rot: -1.4,
  },
  {
    name: "HealthTech Platform",
    sector: "Healthcare · APAC",
    year: "2025",
    word: "HEALTH",
    color: "bg-surface-4 dark:bg-[oklch(0.82_0.14_25)]",
    problem: "Zero digital presence entering 3 new markets simultaneously.",
    metrics: [
      { k: "4.2x", v: "ROAS" },
      { k: "65%", v: "CAC reduction" },
      { k: "8wk", v: "Go-live" },
    ],
    tags: ["Brand", "Launch", "Paid"],
    rot: 1.6,
  },
  {
    name: "Logistics Brand",
    sector: "Supply Chain · EU",
    year: "2024",
    word: "SUPPLY",
    color: "bg-surface-3 dark:bg-[oklch(0.85_0.12_75)]",
    problem: "Outdated identity attracting wrong-fit enterprise clients.",
    metrics: [
      { k: "3x", v: "Avg. deal size" },
      { k: "100%", v: "Inbound" },
      { k: "+540%", v: "Reach" },
    ],
    tags: ["Rebrand", "Social", "Strategy"],
    rot: -1.8,
  },
  {
    name: "Real Estate SaaS",
    sector: "PropTech · AU",
    year: "2024",
    word: "PROPTECH",
    color: "bg-surface-5 dark:bg-[oklch(0.78_0.13_140)]",
    problem: "Stagnant pipeline with $0 content ROI across all channels.",
    metrics: [
      { k: "1.2M", v: "Impressions" },
      { k: "9", v: "Viral posts" },
      { k: "–40%", v: "CPL" },
    ],
    tags: ["Content", "SEO", "Community"],
    rot: 1.2,
  },
];

const engagements = [
  {
    icon: Zap,
    t: "Sprint",
    k: "2–4 wks",
    d: "Tight scope, one outcome. Brand audit, paid kick-off or content system build.",
    bullets: ["Daily standups", "Single deliverable", "Fixed price"],
    bg: "bg-surface-3 dark:bg-[oklch(0.85_0.12_75)]",
    rot: -1.2,
    tag: "Fastest",
  },
  {
    icon: InfinityIcon,
    t: "Retainer",
    k: "Monthly",
    d: "An embedded growth pod — strategy, creative, ads & AI automation under one roof.",
    bullets: ["Weekly sprint demos", "Always-on creative", "Live analytics dash"],
    bg: "bg-accent",
    rot: 0,
    tag: "Most popular",
    popular: true,
  },
  {
    icon: Flame,
    t: "Project",
    k: "6–12 wks",
    d: "End-to-end builds: GTM launch, full brand system, funnel + automation stack.",
    bullets: ["Phased milestones", "Cross-discipline", "Full handoff docs"],
    bg: "bg-surface-2 dark:bg-[oklch(0.83_0.12_140)]",
    rot: 1.4,
    tag: "Most depth",
  },
];

const filmReels = instagramPosts.slice(0, 4).map((post, i) => ({
  tag: ["Brand · Reel", "After Work", "Studio · Talk", "Street · B-roll"][i] || "Reel",
  title: ["Atlas — Origin", "Off-hours", "20:00 Live", "Walk & Talk"][i] || "Reel",
  src: post.url,
  poster: "",
}));

/* ── Core Capabilities Section ── */
function CoreCapabilitiesSection() {
  return (
    <section id="capabilities" className="relative mx-auto max-w-6xl px-5 py-24">
      <div className="mb-12 grid items-end gap-6 md:grid-cols-[1fr_auto]">
        <div>
          <span className="script text-3xl text-accent">What We Bring</span>
          <h2 className="font-display text-5xl font-bold leading-[1.02] md:text-7xl">
            Core <span className="italic">Capabilities</span>
            <span className="text-accent">.</span>
          </h2>
        </div>
        <p className="max-w-sm text-base text-foreground/70 md:text-right">
          Four sharp practices. One growth operating system — built to plug into your team or run
          end-to-end.
        </p>
      </div>

      <div className="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 md:grid-cols-3">
        {capabilities.map((c, i) => (
          <motion.div
            key={c.t}
            initial={{ opacity: 0, y: 30, rotate: i % 2 === 0 ? -1.2 : 1.2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            whileHover={{ y: -6, rotate: i % 2 === 0 ? -0.6 : 0.6 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.08, type: "spring", stiffness: 90 }}
            className={`group relative flex flex-col overflow-hidden rounded-[1.5rem] border-2 border-ink text-ink shadow-[5px_5px_0_0_var(--ink)] dark:[--cream:oklch(0.93_0.018_78)] dark:[--ink:oklch(0.25_0.018_60)] dark:border-cream/35 dark:text-ink dark:shadow-[5px_5px_0_0_rgba(255,255,255,0.16)] ${c.bg} ${c.span}`}
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-background/40 blur-2xl transition-opacity duration-500 group-hover:opacity-80 dark:bg-accent/10" />
            <div className="absolute right-4 top-4 rounded-full border-2 border-ink bg-background/85 px-2 py-0.5 font-display text-xs font-bold dark:border-ink/60 dark:bg-cream/85 dark:text-ink">
              {c.k}
            </div>
            <div className="relative flex flex-1 flex-col gap-4 p-6 md:p-8">
              <motion.div
                whileHover={{ rotate: -8, scale: 1.06 }}
                className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-ink bg-background/85 dark:border-ink/60 dark:bg-cream/85"
              >
                <c.icon className="h-6 w-6" />
              </motion.div>
              <h3
                className={`font-display font-bold leading-[1.02] ${c.big ? "text-4xl md:text-6xl" : "text-2xl md:text-3xl"}`}
              >
                {c.t}
              </h3>
              <p className="max-w-md text-sm text-ink/80 md:text-base">{c.d}</p>
              <div className="mt-auto flex flex-wrap gap-1.5">
                {c.chips.map((b) => (
                  <span
                    key={b}
                    className="rounded-full border border-ink/40 bg-background/75 px-2.5 py-0.5 text-xs font-medium dark:border-ink/40 dark:bg-cream/75 dark:text-ink"
                  >
                    {b}
                  </span>
                ))}
              </div>
              <div className="mt-3 flex items-end justify-between border-t-2 border-ink/30 pt-3 dark:border-ink/35">
                <div>
                  <div className="font-display text-3xl font-black leading-none md:text-4xl">
                    {c.metric}
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-ink/60">
                    {c.metricLabel}
                  </div>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-background/85 transition-transform group-hover:rotate-45 dark:border-ink/60 dark:bg-cream/85">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ── 6-Step Delivery Framework ── */
function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 20%"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="relative mx-auto max-w-6xl px-5 py-24">
      <div className="mb-14 text-center">
        <span className="script text-3xl text-accent">How We Ship</span>
        <h2 className="font-display text-5xl font-bold leading-[1.02] md:text-7xl">
          6-Step <span className="italic">Delivery</span> Framework
          <span className="text-accent">.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-foreground/70">
          A repeatable growth engine — not vibes. Each step has owners, deliverables, and a live
          checkpoint.
        </p>
      </div>

      <div ref={ref} className="relative">
        <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 rounded-full bg-ink/10 md:block dark:bg-white/24" />
        <motion.div
          style={{ scaleY: lineScale, transformOrigin: "top" }}
          className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 rounded-full bg-accent md:block"
        />
        <ol className="relative grid gap-6 md:gap-12">
          {steps.map((s, i) => {
            const left = i % 2 === 0;
            return (
              <motion.li
                key={s.n}
                initial={{ opacity: 0, x: left ? -40 : 40, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ type: "spring", stiffness: 80, delay: i * 0.05 }}
                className={`relative grid items-center gap-4 md:grid-cols-2 ${left ? "" : "md:[&>*:first-child]:order-2"}`}
              >
                <motion.div
                  whileHover={{ scale: 1.04, rotate: left ? -1 : 1 }}
                  className={`relative rounded-[1.5rem] border-2 border-ink p-6 text-ink shadow-[5px_5px_0_0_var(--ink)] dark:[--cream:oklch(0.93_0.018_78)] dark:[--ink:oklch(0.25_0.018_60)] dark:border-cream/35 dark:text-ink dark:shadow-[5px_5px_0_0_rgba(255,255,255,0.16)] ${s.color} ${left ? "md:mr-10 md:text-right" : "md:ml-10"}`}
                >
                  <div
                    className={`mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-ink bg-background/85 dark:border-ink/60 dark:bg-cream/85 ${left ? "md:ml-auto" : ""}`}
                  >
                    <s.icon className="h-6 w-6" />
                  </div>
                  <div className="font-display text-sm font-bold uppercase tracking-widest text-ink/60">
                    Step {s.n}
                  </div>
                  <h3 className="font-display text-3xl font-bold leading-tight md:text-4xl">
                    {s.t}
                  </h3>
                  <p className="mt-1 text-ink/80">{s.d}</p>
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", delay: i * 0.05 + 0.1 }}
                  className="absolute left-1/2 top-1/2 z-10 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-ink bg-background font-display text-sm font-black md:flex dark:border-white/25 dark:bg-[oklch(0.93_0.018_78)] dark:text-[oklch(0.25_0.018_60)]"
                >
                  {s.n}
                </motion.div>
                <div className="hidden md:block" />
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ── Film Reels ── */
function FilmReelsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rotations = [-0.5, 0.5, -0.35, 0.35];

  return (
    <section
      id="film"
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-transparent text-foreground"
    >
      <div className="relative mx-auto max-w-6xl px-5 py-24">
        <div className="mb-10 grid items-end gap-6 md:grid-cols-[1fr_auto]">
          <div>
            <span className="script text-3xl text-accent">The Reel Room</span>
            <h2 className="font-display text-4xl font-bold leading-[1.04] md:text-6xl">
              Expert <em className="text-accent">editing</em> that brings
              <br />
              <em>visuals</em>, sound & pacing into one cohesive film.
            </h2>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <p className="max-w-sm text-foreground/70 md:text-right">
              Real client cuts — autoplaying as you arrive. Tap a frame to unmute and feel the room.
            </p>
            <Link
              to="/reels"
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-card/70 px-6 py-2.5 text-sm font-semibold text-card-foreground shadow-sm backdrop-blur transition-all hover:bg-ink hover:text-cream dark:border-white/10 dark:bg-card/70 dark:text-card-foreground dark:hover:bg-foreground dark:hover:text-background"
            >
              View All Reels <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {filmReels.map((reel, i) => {
              return (
                <motion.div
                  key={reel.title}
                  initial={{ opacity: 0, y: 40, rotate: rotations[i] * 2 }}
                  whileInView={{ opacity: 1, y: 0, rotate: rotations[i] }}
                  whileHover={{ y: -8, rotate: 0, scale: 1.02 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ type: "spring", stiffness: 90, delay: i * 0.1 }}
                  className="group relative aspect-[9/16] overflow-hidden rounded-2xl border border-ink/10 bg-card shadow-[0_22px_60px_-38px_rgba(0,0,0,0.5)] ring-1 ring-white/30 dark:border-white/10 dark:bg-card dark:ring-white/5"
                >
                  <iframe
                    src={extractEmbedUrl(reel.src)}
                    className="absolute inset-0 h-full w-full rounded-2xl border-none"
                    loading="lazy"
                    title={reel.title}
                    allowtransparency="true"
                    scrolling="no"
                    allowFullScreen={true}
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-black/70 via-black/10 to-black/25 transition-opacity duration-300 group-hover:opacity-90" />

                  <div className="absolute left-3 top-3 inline-flex max-w-[calc(100%-1.5rem)] items-center gap-1.5 rounded-full border border-white/25 bg-black/45 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                    REC · {reel.tag}
                  </div>
                  <h3 className="absolute bottom-4 left-4 right-4 font-display text-base font-bold leading-tight text-white drop-shadow-lg md:text-lg">
                    {reel.title}
                  </h3>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 pt-4 text-[11px] uppercase tracking-[0.2em] text-foreground/55 dark:border-white/10">
            <div className="inline-flex items-center gap-2">
              <Film className="h-3.5 w-3.5 text-accent" />
              Cinematography · Cut · Color · Sound
            </div>
            <div>Auto-play on view · Tap to unmute</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Case Studies ── */
function CaseStudiesSection() {
  return (
    <section id="case-studies" className="relative mx-auto max-w-6xl px-5 py-24">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="script text-3xl text-accent">In The Wild</span>
          <h2 className="font-display text-5xl font-bold leading-[1.02] md:text-7xl">
            Selected <span className="italic">Case Studies</span>
            <span className="text-accent">.</span>
          </h2>
        </div>
        <a
          href="#contact"
          className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-background px-4 py-2 text-sm font-semibold lift dark:border-border dark:bg-secondary dark:text-secondary-foreground"
        >
          Request the deck <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {cases.map((c, i) => (
          <motion.a
            key={c.name}
            href="#"
            initial={{ opacity: 0, y: 40, rotate: c.rot * 1.5 }}
            whileInView={{ opacity: 1, y: 0, rotate: c.rot }}
            whileHover={{ rotate: 0, y: -6, scale: 1.01 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.08, type: "spring", stiffness: 90 }}
            className={`group relative block overflow-hidden rounded-[1.75rem] border-2 border-ink text-ink shadow-[6px_6px_0_0_var(--ink)] dark:[--cream:oklch(0.93_0.018_78)] dark:[--ink:oklch(0.25_0.018_60)] dark:border-cream/35 dark:text-ink dark:shadow-[6px_6px_0_0_rgba(255,255,255,0.16)] ${c.color}`}
          >
            <div className="flex items-center justify-between border-b-2 border-ink/40 bg-background/50 px-5 py-2 text-[11px] font-bold uppercase tracking-widest backdrop-blur-sm dark:border-ink/35 dark:bg-cream/45">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-ink animate-pulse" />
                Case · {c.year}
              </span>
              <span>{c.sector}</span>
            </div>
            <div className="relative flex items-center justify-center overflow-hidden px-6 py-10">
              <motion.span
                whileHover={{ scale: 1.06, rotate: -1 }}
                className="font-display text-[clamp(3rem,9vw,6.5rem)] font-black tracking-tighter text-ink/85"
              >
                {c.word}
              </motion.span>
              <Star4 className="absolute right-5 top-5 h-6 w-6 text-ink/70 animate-spin-slow" />
            </div>
            <div className="bg-background/70 p-6 backdrop-blur-sm dark:bg-cream/55">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl font-bold leading-tight">{c.name}</h3>
                  <p className="mt-1 max-w-md text-sm text-ink/70">
                    <span className="font-semibold text-ink">Brief — </span>
                    {c.problem}
                  </p>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-background/85 transition-transform group-hover:rotate-45 dark:border-ink/60 dark:bg-cream/85">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2 rounded-2xl border-2 border-ink bg-background/85 p-3 dark:border-ink/50 dark:bg-cream/85">
                {c.metrics.map((m) => (
                  <div key={m.v} className="text-center">
                    <div className="font-display text-xl font-black leading-none md:text-2xl">
                      {m.k}
                    </div>
                    <div className="mt-1 text-[10px] uppercase tracking-wider text-ink/60">
                      {m.v}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-ink/40 bg-background/85 px-2.5 py-0.5 text-[11px] font-semibold dark:border-ink/40 dark:bg-cream/75"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

/* ── Engagement Models ── */
function FlexibleSection() {
  return (
    <section id="engage" className="relative mx-auto max-w-6xl px-5 py-24">
      <div className="mb-12 grid items-end gap-6 md:grid-cols-[1fr_auto]">
        <div>
          <span className="script text-3xl text-accent">how we work</span>
          <h2 className="font-display text-5xl font-bold leading-[1.02] md:text-7xl">
            Flexible by <span className="italic">Design</span>
            <span className="text-accent">.</span>
          </h2>
        </div>
        <p className="max-w-sm text-base text-foreground/70 md:text-right">
          Plug us in for a sprint or a year. Same expertise, different gear — pick the engagement
          that fits.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {engagements.map((e, i) => (
          <motion.div
            key={e.t}
            initial={{ opacity: 0, y: 30, rotate: e.rot * 1.5 }}
            whileInView={{ opacity: 1, y: 0, rotate: e.rot }}
            whileHover={{ rotate: 0, y: -8 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 90 }}
            className={`relative flex flex-col overflow-hidden rounded-[1.75rem] border-2 border-ink p-7 text-ink shadow-[6px_6px_0_0_var(--ink)] dark:[--cream:oklch(0.93_0.018_78)] dark:[--ink:oklch(0.25_0.018_60)] dark:border-cream/35 dark:text-ink dark:shadow-[6px_6px_0_0_rgba(255,255,255,0.16)] ${e.bg} ${e.popular ? "md:-mt-4 md:scale-[1.04]" : ""}`}
          >
            <div className="absolute -right-10 top-5 rotate-45 border-y-2 border-ink bg-ink px-12 py-0.5 text-[10px] font-bold uppercase tracking-widest text-cream dark:bg-[oklch(0.25_0.018_60)] dark:text-[oklch(0.93_0.018_78)]">
              {e.tag}
            </div>
            <motion.div
              whileHover={{ rotate: -10, scale: 1.08 }}
              className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-ink bg-background/85 dark:border-ink/60 dark:bg-cream/85"
            >
              <e.icon className="h-7 w-7" />
            </motion.div>
            <div className="flex items-baseline gap-2">
              <h3 className="font-display text-4xl font-bold leading-none">{e.t}</h3>
              <span className="inline-flex items-center gap-1 rounded-full border-2 border-ink bg-background/85 px-2 py-0.5 text-xs font-semibold dark:border-ink/60 dark:bg-cream/85">
                <Clock className="h-3 w-3" />
                {e.k}
              </span>
            </div>
            <p className="mt-3 text-ink/80">{e.d}</p>
            <ul className="mt-5 space-y-2">
              {e.bullets.map((b, j) => (
                <motion.li
                  key={b}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + j * 0.06 }}
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-ink bg-background/85 dark:border-ink/60 dark:bg-cream/85">
                    <TrendingUp className="h-3 w-3" />
                  </span>
                  {b}
                </motion.li>
              ))}
            </ul>
            <a
              href="#contact"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream lift"
            >
              Start {e.t.toLowerCase()} <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ── ROI Table Section ── */
const roiRows = [
  {
    lever: "Revenue Growth",
    solution: "Performance funnels & API ecosystems",
    outcome: "+45% avg. ARR within 12 months",
  },
  {
    lever: "Cost Reduction",
    solution: "Serverless infra & automated cloud scaling",
    outcome: "30–50% lower infrastructure overhead",
  },
  {
    lever: "Process Automation",
    solution: "AI agent integration & middleware",
    outcome: "85% reduction in manual operational tasks",
  },
  {
    lever: "Lead Generation",
    solution: "High-intent SEO & intent-data funnels",
    outcome: "3× pipeline velocity, zero ad spend increase",
  },
  {
    lever: "Customer Acquisition",
    solution: "Frictionless UX & conversion loops",
    outcome: "–35% customer acquisition cost",
  },
  {
    lever: "Operational Velocity",
    solution: "CRM/ERP interop & real-time dashboards",
    outcome: "65% surge in cross-dept data synchronisation",
  },
];

function ROISection() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-24">
      <div className="mb-12">
        <span className="script text-3xl text-accent">The Numbers</span>
        <h2 className="font-display text-5xl font-bold leading-[1.02] md:text-7xl">
          ROI & Value <span className="italic">Realisation</span>
          <span className="text-accent">.</span>
        </h2>
        <p className="mt-4 max-w-xl text-foreground/70">
          Executive-level outcomes from every engagement we run.
        </p>
      </div>

      <div className="overflow-hidden rounded-[1.5rem] border-2 border-ink shadow-[6px_6px_0_0_var(--ink)]">
        <div className="grid grid-cols-3 border-b-2 border-ink bg-ink px-6 py-3 font-display text-xs font-bold uppercase tracking-widest text-cream">
          <span>Operational Lever</span>
          <span>Solution</span>
          <span>Documented Outcome</span>
        </div>
        {roiRows.map((r, i) => (
          <motion.div
            key={r.lever}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className={`grid grid-cols-3 gap-4 px-6 py-4 border-b border-ink/20 ${i % 2 === 0 ? "bg-background" : "bg-surface-7"}`}
          >
            <span className="font-display font-semibold text-sm">{r.lever}</span>
            <span className="text-sm text-foreground/70">{r.solution}</span>
            <span className="font-semibold text-sm text-accent">{r.outcome}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ── Trust / Partners strip ── */
const partners = [
  "AWS Partner",
  "Google Cloud",
  "Microsoft Azure",
  "NVIDIA Inception",
  "Clutch Top Agency",
  "GoodFirms Leader",
];

function TrustSection() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-16">
      <p className="mb-8 text-center text-sm font-bold uppercase tracking-widest text-foreground/40">
        Certified & recognised by
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {partners.map((p, i) => (
          <motion.span
            key={p}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="rounded-full border-2 border-ink bg-background px-5 py-2 font-display text-sm font-semibold lift"
          >
            {p}
          </motion.span>
        ))}
      </div>
    </section>
  );
}

/* ── Portfolio Section Components ── */
function PortfolioHeroShowcase() {
  return (
    <div className="py-6 " id="work">
      <div className="mb-10 text-center px-5">
        <span className="script text-3xl text-accent">First Impressions</span>
        <h2 className="mt-3 font-display text-4xl font-bold md:text-6xl tracking-tight text-foreground dark:text-white">
          SECTION 1 – HERO SHOWCASE
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-foreground/65 dark:text-gray-400">
          Our strongest visual services and client outcomes, mapped in full-perspective motion.
        </p>
      </div>
      <FlankCarousel
        slides={heroShowcaseSlides}
        title="Hero Showcase"
        subtitle="FEATURED WORKS"
        description="Swipe or use arrow keys to navigate. Videos autoplay on active cards only."
      />
    </div>
  );
}

function PortfolioVideoEditing() {
  return (
    <div className="py-6">
      <div className="mb-10 text-center px-5">
        <span className="script text-3xl text-red-500 font-bold">Motion Editing</span>
        <h2 className="mt-3 font-display text-4xl font-bold md:text-6xl tracking-tight text-foreground dark:text-white">
          SECTION 2 – VIDEO EDITING
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-foreground/65 dark:text-gray-400">
          Reel previews, commercial edits, and short-form social hooks.
        </p>
      </div>
      <JumboStack
        slides={videoEditingSlides}
        title="Video Editing Portfolio"
        subtitle="REELS & COMMERCIALS"
        description="Layered priority stack with direct audience response and view count attribution."
      />
    </div>
  );
}

function PortfolioGraphicDesign() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  const badgeStyle =
    "bg-purple-500/15 border-purple-500/30 text-purple-700 dark:bg-purple-500/25 dark:border-purple-500/40 dark:text-purple-400";

  return (
    <div className="py-20">
      <div className="mx-auto max-w-6xl px-5 mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <span className="script text-3xl text-purple-600 dark:text-purple-400">
            Visual Assets
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-6xl tracking-tight text-foreground dark:text-white">
            SECTION 3 – GRAPHIC DESIGN
          </h2>
          <p className="mt-4 max-w-xl text-foreground/65 dark:text-gray-400">
            Social creatives, branding systems, packaging labels, and print design layouts.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={scrollLeft}
            aria-label="Scroll graphic design left"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-background/80 text-foreground hover:bg-accent/15 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 transition cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={scrollRight}
            aria-label="Scroll graphic design right"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-background/80 text-foreground hover:bg-accent/15 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 transition cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        onWheel={(event) => {
          if (!scrollRef.current || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
          event.preventDefault();
          scrollRef.current.scrollBy({ left: event.deltaY, behavior: "auto" });
        }}
        className="flex gap-6 overflow-x-auto px-6 md:px-20 scrollbar-none snap-x snap-mandatory py-4 "
        style={{ scrollbarWidth: "none" }}
      >
        {graphicDesignSlides.map((slide, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative min-w-[12rem] max-w-[6rem] sm:min-w-[14rem] sm:max-w-[4rem] md:min-w-[17rem] md:max-w-[20rem] lg:min-w-[19rem] lg:max-w-[25rem] aspect-[3/4] rounded-[1.25rem] border border-ink/10 overflow-hidden bg-card snap-start shrink-0 shadow-[0_18px_50px_-32px_rgba(0,0,0,0.45)] shimmer dark:border-white/10 dark:bg-[#111827]"
          >
            <img
              src={slide.image}
              alt={slide.title}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

            <span
              className={`absolute left-4 top-4 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${badgeStyle} backdrop-blur-md`}
            >
              {slide.categoryLabel}
            </span>

            {slide.subcategory && (
              <span className="absolute right-3 top-3 max-w-[45%] truncate rounded-full border border-white/20 bg-black/50 px-2.5 py-1 text-[9px] font-mono text-white/85 backdrop-blur">
                {slide.subcategory}
              </span>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
              <h4 className="font-display text-base sm:text-lg font-bold leading-tight text-white line-clamp-2">
                {slide.title}
              </h4>
              <p className="mt-1 text-xs leading-5 text-white/80 line-clamp-2">
                {slide.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function PortfolioSoftwareSystems() {
  return (
    <div className="py-6">
      <div className="mb- text-center px-5">
        <span className="script text-3xl text-orange-400">Intelligent Stacks</span>
        <h2 className="mt-3 font-display text-4xl font-bold md:text-6xl tracking-tight text-foreground dark:text-white">
          SECTION 4 – SOFTWARE & SYSTEMS
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-foreground/65 dark:text-gray-400">
          Desktop and mobile mockups for custom CRMs, internal tools, and sales apps.
        </p>
      </div>
      <RingCarousel
        slides={softwareSystemsSlides}
        title="Software & Systems"
        subtitle="AUTOMATION & PLATFORMS"
        description="Cylinder-style rotating visual carousel showcasing architecture details and business impact"
      />
    </div>
  );
}

function PortfolioSEOAnalytics() {
  return (
    <div className="py-20">
      <div className="mb-10 text-center px-5">
        <span className="script text-3xl text-blue-400">Growth Metrics</span>
        <h2 className="mt-3 font-display text-4xl font-bold md:text-6xl tracking-tight text-foreground dark:text-white">
          SECTION 5 – SEO & ANALYTICS
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-foreground/65 dark:text-gray-400">
          Lighthouse speeds, technical audits, and organic search compounding results.
        </p>
      </div>
      <TriangleMask
        slides={seoAnalyticsSlides}
        title="SEO & Analytics"
        subtitle="COMPLEX SEARCH FUNNELS"
        description="Soft triangular mask frame focusing on documented traffic graphs and conversion improvements."
      />
    </div>
  );
}

function PortfolioStrategicConsulting() {
  const badgeStyle = "bg-amber-500/25 border-amber-500/40 text-amber-400";
  return (
    <div className="py-20">
      <div className="mx-auto max-w-6xl px-5 mb-14 text-center">
        <span className="script text-3xl text-amber-400">Management Consulting</span>
        <h2 className="mt-3 font-display text-4xl font-bold md:text-6xl tracking-tight text-foreground dark:text-white">
          SECTION 6 – STRATEGIC CONSULTING
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-foreground/65 dark:text-gray-400">
          Executive blueprints, go-to-market pricing structures, and roadmap frameworks.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-5 grid gap-8 md:grid-cols-2">
        {consultingCases.map((cs, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -6 }}
            className="rounded-[2rem] border border-ink/10 bg-card p-6 shadow-[0_24px_70px_-45px_rgba(0,0,0,0.45)] md:p-8 flex flex-col justify-between relative dark:border-white/10 dark:bg-[#111827]/95 dark:shadow-2xl"
          >
            <div className="absolute right-6 top-6">
              <span
                className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${badgeStyle} backdrop-blur-md`}
              >
                {cs.categoryLabel}
              </span>
            </div>

            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-card-foreground dark:text-white mb-6 pr-32">
                {cs.title}
              </h3>

              <div className="space-y-4 text-left">
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-amber-400 font-bold">
                    Challenge
                  </h4>
                  <p className="text-sm text-muted-foreground dark:text-gray-300 mt-1 leading-relaxed">
                    {cs.challenge}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-amber-400 font-bold">
                    Solution
                  </h4>
                  <p className="text-sm text-muted-foreground dark:text-gray-300 mt-1 leading-relaxed">
                    {cs.solution}
                  </p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-amber-400 font-bold">
                    Execution
                  </h4>
                  <p className="text-sm text-muted-foreground dark:text-gray-300 mt-1 leading-relaxed">
                    {cs.execution}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-ink/10 pt-6 dark:border-white/10">
              <h4 className="text-xs uppercase tracking-wider text-muted-foreground dark:text-gray-500 font-bold text-left mb-3">
                Key Results
              </h4>
              <div className="grid grid-cols-3 gap-2 bg-background/70 border border-ink/10 rounded-2xl p-4 dark:bg-white/5 dark:border-white/10">
                {cs.results.map((res, ri) => (
                  <div key={ri} className="text-center">
                    <div className="text-lg md:text-xl font-black text-amber-400 leading-none">
                      {res.value}
                    </div>
                    <div className="text-[9px] uppercase tracking-wider text-muted-foreground dark:text-gray-400 mt-1.5 leading-tight">
                      {res.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function PortfolioContentWriting() {
  const badgeStyle = "bg-orange-500/25 border-orange-500/40 text-orange-400";
  return (
    <div className="py-20">
      <div className="mx-auto max-w-6xl px-5 mb-14 text-center">
        <span className="script text-3xl text-orange-400 font-bold">Copywriting</span>
        <h2 className="mt-3 font-display text-4xl font-bold md:text-6xl tracking-tight text-foreground dark:text-white">
          SECTION 7 – CONTENT WRITING
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-foreground/65 dark:text-gray-400">
          Sales landing pages, email campaigns, blogs, and high-converting product copies.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-5 grid gap-8 md:grid-cols-3 text-left">
        {editorialContent.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -6 }}
            className="rounded-[2rem] border border-ink/10 bg-card p-6 shadow-[0_24px_70px_-45px_rgba(0,0,0,0.45)] md:p-8 flex flex-col justify-between relative dark:border-white/10 dark:bg-[#111827]/95 dark:shadow-2xl"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="text-[10px] font-bold text-muted-foreground dark:text-gray-500 uppercase tracking-widest">
                  {item.type}
                </span>
                <span
                  className={`rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${badgeStyle}`}
                >
                  {item.categoryLabel}
                </span>
              </div>

              <h3 className="font-display text-lg md:text-xl font-bold text-card-foreground dark:text-white mb-4 leading-snug">
                "{item.headline}"
              </h3>

              <blockquote className="border-l-2 border-orange-500 pl-4 text-xs italic text-muted-foreground dark:text-gray-400 leading-relaxed">
                {item.excerpt}
              </blockquote>
            </div>

            <div className="mt-6 border-t border-ink/10 pt-4 flex items-center justify-between dark:border-white/10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground dark:text-gray-500">
                Performance
              </span>
              <span className="text-xs font-bold text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-md px-2 py-1">
                {item.metrics}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function PortfolioSection() {
  return (
    <section
      id="portfolio"
      className="relative isolate overflow-hidden bg-transparent py-20 text-foreground"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,transparent_0%,oklch(0.68_0.17_62/0.07)_12%,oklch(0.68_0.17_62/0.11)_48%,oklch(0.68_0.17_62/0.07)_82%,transparent_100%)] dark:bg-[linear-gradient(180deg,transparent_0%,oklch(0.6_0.14_62/0.08)_12%,oklch(0.6_0.14_62/0.12)_48%,oklch(0.6_0.14_62/0.08)_82%,transparent_100%)]" />
      <div className="mx-auto max-w-6xl px-5 text-center mb-16">
        <span className="script text-3xl text-accent">Our Global Workspace</span>
        <h2 className="mt-3 font-display text-5xl font-bold md:text-8xl tracking-tight text-foreground">
          Digital Agency <span className="italic text-accent">Portfolio</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-foreground/65 text-lg">
          A premium showcase of creative services, marketing campaigns, software solutions, and
          strategic business consulting.
        </p>
      </div>

      <PortfolioHeroShowcase />
      <PortfolioVideoEditing />
      <PortfolioGraphicDesign />
      <PortfolioSoftwareSystems />
      <PortfolioSEOAnalytics />
      <PortfolioStrategicConsulting />
      <PortfolioContentWriting />
    </section>
  );
}

/* ── Main Page ── */
function Index() {
  return (
    <main className="relative min-h-screen overflow-visible bg-background text-foreground">
      {/* ambient blobs */}
      <div className="pointer-events-none fixed -left-32 top-1/3 -z-0 h-96 w-96 bg-accent/20 animate-blob blur-3xl" />
      <div
        className="pointer-events-none fixed -right-32 top-2/3 -z-0 h-96 w-96 bg-surface-3/30 animate-blob blur-3xl"
        style={{ animationDelay: "3s" }}
      />

      {/* Nav */}
      <Navbar />

      {/* HERO */}
      <section className="relative mx-auto max-w-6xl px-5 pt-12 pb-8 md:pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          // className="mx-auto mb-6 w-fit rounded-full border-2 border-ink bg-background px-6 py-1.5 text-lg"
        ></motion.div>

        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display text-[clamp(2.5rem,8vw,4rem)] font-bold leading-[1.05] tracking-tight"
          >
            We craft digital experiences that
            <br />
            drive growth and leave a lasting <span className="text-accent">impact</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-foreground/70"
          >
            Creativity, strategy, and technology come together in every campaign we build. We turn
            brand momentum into measurable growth for fast-moving teams.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-3.5 font-semibold text-cream lift"
          >
            View Our Work <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-background px-8 py-3.5 font-semibold lift"
          >
            Explore services
          </a>
        </motion.div>

        {/* Portrait hero — matches uploaded design */}
        <div className="relative mx-auto mt-10 max-w-3xl">
          {/* Orange semicircle backdrop */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            style={{ transformOrigin: "bottom" }}
            className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 h-[55%] w-[70%] rounded-t-full bg-accent"
          />

          {/* Portrait image */}
          <motion.img
            src={portrait}
            alt="AlphaNexis — Digital Marketing & AI Agency"
            width={1024}
            height={1024}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="relative z-10 mx-auto h-auto w-[min(520px,80vw)] md:w-[min(670px,90%)] drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] animate-float-y"
          />

          {/* SVG scribble decorators */}
          <Scribble className="pointer-events-none absolute left-4 top-2 h-8 w-14 text-ink animate-draw md:left-8" />
          <Scribble className="pointer-events-none absolute right-6 top-8 h-8 w-14 text-accent rotate-12 animate-draw md:right-16" />
          <Star4 className="pointer-events-none absolute left-2 top-1/3 h-5 w-5 text-accent animate-spin-slow md:left-10" />
          <Star4 className="pointer-events-none absolute right-8 bottom-1/3 h-6 w-6 text-ink animate-spin-slow" />

          {/* Floating pill tags — same positions as original Helmi design */}
          {[
            {
              txt: (
                <>
                  <Megaphone className="h-4 w-4 text-accent" /> Marketing
                </>
              ),
              pos: "-left-4 top-[50%] md:left-0",
              r: "-6deg",
              d: "0s",
            },
            { txt: <>🚀 Ads</>, pos: "-right-4 top-[36%] md:right-0", r: "8deg", d: "0.4s" },
            { txt: <>🌟 Brand</>, pos: "-left-6 top-[87%] md:left-12", r: "-4deg", d: "0.8s" },
            {
              txt: <>💎 Social Media</>,
              pos: "-right-6 bottom-[15%] md:right-8",
              r: "6deg",
              d: "1.2s",
            },
          ].map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.8, scale: 1 }}
              transition={{ delay: 0.9 + i * 0.1, type: "spring" }}
              style={{ ["--r" as never]: p.r, animationDelay: p.d }}
              className={`pill-tag absolute z-10 animate-bob scale-75 md:scale-100 text-xs md:text-sm ${p.pos}`}
            >
              {p.txt}
            </motion.div>
          ))}

          {/* "8+ Years" stat — top right, same as original */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="absolute -right-2 top-[18%] z-20 hidden text-right md:block"
          >
            <div className="font-display text-4xl font-bold leading-none">8+ Years</div>
            <div className="text-sm text-foreground/60">in Digital Marketing & AI</div>
          </motion.div>

          {/* Mini testimonial snippet — top left, same as original */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute -left-2 top-[42%] z-20 hidden max-w-[200px] md:block"
          >
            <div className="font-display text-4xl text-foreground/40">"</div>
            <p className="text-sm leading-snug text-foreground/70">
              
            </p>
          </motion.div>
        </div>
      </section>

      {/* STATS strip */}
      <section className="relative mx-auto max-w-6xl px-5 py-24">
        <div className="mb-10 text-center">
          <span className="script text-3xl text-accent">Achievements</span>
          <h2 className="mt-3 font-display text-5xl font-bold md:text-7xl">
            Milestones that prove our work delivers impact.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-foreground/70">
            From enterprise launches to repeated growth loops, these metrics show the outcomes we
            create.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((s, i) => (
            <motion.div
              key={s.v}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, type: "spring" }}
              className="rounded-[2rem] border-2 border-ink bg-background p-8 text-center shadow-[5px_5px_0_0_var(--ink)] dark:border-border dark:bg-card dark:shadow-[5px_5px_0_0_rgba(255,255,255,0.16)]"
            >
              <div className="font-display text-5xl font-bold text-ink md:text-6xl">{s.k}</div>
              <div className="mt-3 text-sm text-foreground/70">{s.v}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MARQUEE */}
      <div className="border-y border-border bg-background py-5 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, idx) => (
            <div
              key={idx}
              className="flex shrink-0 items-center gap-10 px-6 font-display text-3xl font-semibold"
            >
              {[
                "IMPACT",
                "/",
                "DESIGN",
                "/",
                "INNOVATE",
                "/",
                "CREATE",
                "/",
                "STRATEGIZE",
                "/",
                "IMPACT",
                "/",
                "DESIGN",
                "/",
                "INNOVATE",
              ].map((w, i) => (
                <span key={i} className={i % 2 === 0 ? "text-foreground" : "text-accent"}>
                  {w}
                </span>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-3 flex animate-marquee-rev whitespace-nowrap opacity-60">
          {[...Array(2)].map((_, idx) => (
            <div
              key={idx}
              className="flex shrink-0 items-center gap-10 px-6 font-display text-2xl italic"
            >
              {[
                "IMPACT",
                "/",
                "DESIGN",
                "/",
                "INNOVATE",
                "/",
                "CREATE",
                "/",
                "STRATEGIZE",
                "/",
                "IMPACT",
                "/",
                "DESIGN",
                "/",
                "INNOVATE",
              ].map((w, i) => (
                <span key={i} className={i % 2 === 1 ? "text-accent" : ""}>
                  {w}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <PortfolioSection />

      <ServicesSection/>

      {/* ABOUT */}
      <section id="about" className="relative mx-auto max-w-6xl px-5 py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="script text-3xl text-accent">Who We Are</span>
            <h2 className="mt-2 font-display text-5xl font-bold leading-tight md:text-6xl">
              We build brands
              <br />
              <span className="relative inline-block">
                that actually scale
                <Underline className="absolute -bottom-2 left-0 h-3 w-full text-accent" />
              </span>
              .
            </h2>
            <p className="mt-6 max-w-md text-lg text-foreground/70">
              AlphaNexis is a cross-border digital marketing & AI automation agency. We run
              Follow-the-Sun delivery across US, EU & APAC — so your growth never sleeps.
            </p>
            <p className="mt-4 max-w-md text-base text-foreground/60">
              8+ years blending performance marketing, brand systems, and AI-powered automation into
              one integrated growth pod your team can plug straight into.
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-medium text-cream lift"
            >
              Let's talk <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { t: "Growth-first", icon: TrendingUp },
                { t: "AI-native", icon: Brain },
                { t: "Data-driven", icon: BarChart3 },
                { t: "Global reach", icon: Globe },
              ].map(({ t, icon: Icon }, i) => (
                <motion.div
                  key={t}
                  whileHover={{ rotate: 0, scale: 1.04 }}
                  initial={{ opacity: 0, scale: 0.8, rotate: i % 2 === 0 ? -2 : 2 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: i % 2 === 0 ? -2 : 2 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`rounded-2xl border-2 border-ink p-5 lift ${i % 2 === 0 ? "bg-accent" : "bg-background"}`}
                >
                  <Icon className="mb-3 h-5 w-5" />
                  <div className="font-display text-xl font-semibold">{t}</div>
                </motion.div>
              ))}
            </div>
            <Arrow className="absolute -right-4 -top-8 h-16 w-16 text-ink hidden md:block" />
          </motion.div>
        </div>
      </section>

      {/* CORE CAPABILITIES */}
      <CoreCapabilitiesSection />

      {/* 6-STEP PROCESS */}
      <ProcessSection />

      {/* FILM REELS */}
      <FilmReelsSection />

      {/* CASE STUDIES */}
      <CaseStudiesSection />

      {/* ROI TABLE */}
      <ROISection />

      {/* PARTNERS */}
      <TrustSection />

      {/* ENGAGEMENT MODELS */}
      <FlexibleSection />

      {/* TESTIMONIALS */}
      <section className="relative mx-auto max-w-6xl px-5 py-24">
        <div className="mb-12 text-center">
          <span className="script text-3xl text-accent">What Clients Say</span>
          <h2 className="font-display text-5xl font-bold md:text-6xl">
            Straight from <span className="italic">the source</span>
            <span className="text-accent">.</span>
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              q: "AlphaNexis completely transformed our product delivery lifecycle. We replaced a fragmented three-vendor setup with their single integrated growth pod. They shipped ahead of schedule and captured a critical market window.",
              name: "VP of Product",
              co: "North American HealthTech Corp",
              verified: "LinkedIn Verified",
            },
            {
              q: "The operational predictability is what sets AlphaNexis apart. Their sprint demos are rigorous, code transparency is absolute, and their AI automation insights added immediate value to our bottom line.",
              name: "Chief Operating Officer",
              co: "European Logistics Group",
              verified: "Clutch 5-Star",
            },
          ].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, rotate: i === 0 ? -1 : 1 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring" }}
              className="rounded-[1.5rem] border-2 border-ink bg-background p-8 shadow-[5px_5px_0_0_var(--ink)] lift dark:border-border dark:bg-card dark:shadow-[5px_5px_0_0_rgba(255,255,255,0.16)]"
            >
              <div className="mb-4 flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="font-display text-xl font-medium leading-snug">"{t.q}"</p>
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-sm">— {t.name}</div>
                  <div className="text-sm text-foreground/60">{t.co}</div>
                </div>
                <span className="rounded-full border border-ink/30 bg-accent/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wide">
                  {t.verified}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="relative mx-auto max-w-6xl px-5 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2.5rem] border-2 border-ink bg-accent p-10 text-center md:p-20 shimmer"
        >
          <Star4 className="absolute left-8 top-8 h-8 w-8 text-ink animate-spin-slow" />
          <Star4 className="absolute right-10 top-12 h-6 w-6 text-ink animate-spin-slow" />
          <Star4 className="absolute bottom-10 left-1/4 h-5 w-5 text-ink animate-spin-slow" />

          <span className="script text-3xl">let's build something</span>
          <h2 className="font-display text-5xl font-bold leading-[1.05] md:text-7xl">
            Ready to scale?
            <br />
            <span className="italic">Let's talk.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-foreground/80">
            Reply within 24 hours · Open for Q3 2026 partnerships · US / EU / APAC
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="mailto:hello@alphanexius.com"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-cream lift"
            >
              <Mail className="h-4 w-4" /> hello@alphanexius.com
            </a>
            <DiscoveryCallDialog />
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 md:flex-row">
          <div className="text-sm text-foreground/60">© 2026 AlphaNexis · Growth, by design</div>
          <div className="flex items-center gap-5 text-sm">
            <a
              href="https://www.instagram.com/alphanexis/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-accent"
            >
              <Instagram className="h-4 w-4" /> Instagram
            </a>
            <a
              href="https://www.linkedin.com/company/alphanexis/posts/?feedView=all"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-accent"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a
              href="https://www.alphanexis.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-accent"
            >
              <Globe className="h-4 w-4" /> Website
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
