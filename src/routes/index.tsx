import { createFileRoute, Link } from "@tanstack/react-router";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

import { motion, useScroll, useTransform } from "framer-motion";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import logo from "@/assets/logo.png";
import { DEFAULT_SITE } from "@/lib/cms/defaults";
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
import { getPortfolioContent } from "@/lib/cms/public.functions";
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
import story7 from "@/assets/carousel-samples/story-7.jpg";
import story8 from "@/assets/carousel-samples/story-8.jpg";
import story9 from "@/assets/carousel-samples/story-9.jpg";
import story10 from "@/assets/carousel-samples/story-10.jpg";
import story11 from "@/assets/carousel-samples/story-11.jpg";
import story12 from "@/assets/carousel-samples/story-12.jpg";
import type { SiteData } from "@/lib/admin/site.functions";
import { CartoonButton } from "@/components/ui/cartoon-button";

// ============================================
// HELPER COMPONENTS FOR HERO ENHANCEMENTS
// ============================================

// Floating Glass Card Component
const FloatingCard = ({
  label,
  value,
  delay,
  className = "",
  depth = 1,
}: {
  label: string;
  value: string;
  delay: number;
  className?: string;
  depth?: number;
}) => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (e.clientX - centerX) / 20;
      const y = (e.clientY - centerY) / 20;
      setMouseX(x);
      setMouseY(y);

      const rect2 = ref.current.parentElement?.getBoundingClientRect();
      if (rect2) {
        const px = (e.clientX - rect2.left) / rect2.width - 0.5;
        const py = (e.clientY - rect2.top) / rect2.height - 0.5;
        setPosition({ x: px * depth * 8, y: py * depth * 8 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [depth]);

  return (
    <motion.div
      ref={ref}
      className={`absolute backdrop-blur-[16px] bg-white/80 dark:bg-white/10 rounded-2xl border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.06)] p-4 min-w-[140px] pointer-events-none ${className}`}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -8, 0, -12, 0],
        x: [0, 4, -4, 6, 0],
        rotate: [0, 1.5, -1.5, 2, 0],
      }}
      transition={{
        opacity: { duration: 0.8, delay: delay + 0.3 },
        scale: { duration: 0.8, delay: delay + 0.3 },
        y: {
          duration: 4 + Math.random() * 3,
          repeat: Infinity,
          delay: delay,
          ease: "easeInOut",
        },
        x: {
          duration: 5 + Math.random() * 4,
          repeat: Infinity,
          delay: delay + 0.5,
          ease: "easeInOut",
        },
        rotate: {
          duration: 6 + Math.random() * 3,
          repeat: Infinity,
          delay: delay + 1,
          ease: "easeInOut",
        },
      }}
      style={{
        x: position.x,
        y: position.y,
        transform: `perspective(800px) rotateX(${mouseY * 0.5}deg) rotateY(${mouseX * 0.5}deg)`,
      }}
      whileHover={{
        scale: 1.06,
        y: -8,
        rotate: 0,
        boxShadow: "0 20px 60px rgba(255, 107, 53, 0.2)",
        borderColor: "rgba(255, 107, 53, 0.3)",
        transition: { duration: 0.3, type: "spring", stiffness: 300 },
      }}
    >
      <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
        {label}
      </p>
      <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
    </motion.div>
  );
};

// Ambient Particle Component
const Particle = ({ delay, size, type = "dot", xRange = 200, yRange = 200 }: any) => {
  const [position] = useState({
    x: (Math.random() - 0.5) * xRange,
    y: (Math.random() - 0.5) * yRange,
  });

  const shapes = {
    dot: "rounded-full",
    star: "rotate-45",
    sparkle: "rounded-sm",
    ring: "rounded-full border-2 border-current",
  };

  return (
    <motion.div
      className={`absolute ${shapes[type]} bg-orange-500/20 dark:bg-orange-400/20`}
      style={{
        width: size,
        height: type === "ring" ? size : size,
        left: "50%",
        top: "50%",
        x: position.x,
        y: position.y,
        borderColor: type === "ring" ? "rgba(255,107,53,0.2)" : "transparent",
      }}
      animate={{
        opacity: [0.08, 0.2, 0.08],
        scale: [1, 1.2, 1],
        x: position.x + (Math.random() - 0.5) * 40,
        y: position.y + (Math.random() - 0.5) * 40,
      }}
      transition={{
        duration: 4 + Math.random() * 3,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut",
      }}
    />
  );
};

// Cursor Glow Component
const CursorGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed z-0"
      animate={{
        x: position.x - 150,
        y: position.y - 150,
        opacity: isVisible ? 0.3 : 0,
      }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 200,
        mass: 0.5,
      }}
      style={{
        width: 300,
        height: 300,
        background: "radial-gradient(circle, rgba(255,107,53,0.15) 0%, transparent 70%)",
        filter: "blur(40px)",
      }}
    />
  );
};

// CEO Signature Button Component
const CEOSignature = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.8 }}
      className="mt-6 flex justify-center relative z-30"
    ></motion.div>
  );
};

// ============================================
// END HELPER COMPONENTS
// ============================================

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

export const Route = createFileRoute("/")({
  loader: () => getPortfolioContent(),
  component: Index,
});

/* -- SVG Decorators -- */
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
  <svg viewBox="0 0 120 90" className={className} fill="none" aria-hidden="true">
    <path
      d="M12 70 C 32 24, 88 18, 96 52 C 104 86, 42 82, 50 46 C 56 20, 92 22, 104 16"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M91 13 L104 16 L98 29"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const QuestionCallout = ({
  label,
  icon,
  className = "",
}: {
  label: string;
  icon: ReactNode;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 14, rotateX: 18 }}
    animate={{ opacity: 1, y: 0, rotateX: 0 }}
    transition={{ delay: 0.72, duration: 0.55 }}
    className={`absolute z-20 flex min-h-[74px] w-[min(88vw,310px)] items-center gap-3 rounded-lg border-2 border-ink bg-card px-4 py-3 text-left shadow-[0_10px_0_-5px_var(--orange-pop),0_18px_42px_-28px_rgba(0,0,0,0.5)] [transform:perspective(780px)_rotateX(7deg)] ${className}`}
  >
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-ink shadow-[inset_0_-4px_0_rgba(0,0,0,0.14)]">
      {icon}
    </span>
    <span className="text-sm font-semibold leading-snug text-foreground md:text-base">{label}</span>
  </motion.div>
);

const ThinAnswerArrow = ({
  className = "",
  path,
  headPath,
  delay,
}: {
  className?: string;
  path: string;
  headPath: string;
  delay: number;
}) => (
  <motion.svg
    aria-hidden="true"
    viewBox="0 0 320 190"
    className={`pointer-events-none absolute z-10 hidden h-[190px] w-[320px] overflow-visible text-accent drop-shadow-[0_8px_8px_rgba(0,0,0,0.18)] md:block ${className}`}
    fill="none"
  >
    <motion.path
      d={path}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: [0, 0.42, 0.7, 1, 1], opacity: [0.15, 1, 1, 1, 0.82] }}
      transition={{
        delay,
        duration: 2.8,
        repeat: Infinity,
        repeatDelay: 1,
        times: [0, 0.28, 0.5, 0.78, 1],
        ease: "easeInOut",
      }}
    />
    <motion.path
      d={headPath}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: [0, 0, 1, 1, 0.82], scale: [0.8, 0.8, 1.08, 1, 1] }}
      transition={{
        delay,
        duration: 2.8,
        repeat: Infinity,
        repeatDelay: 1,
        times: [0, 0.62, 0.78, 0.9, 1],
        ease: "easeInOut",
      }}
    />
  </motion.svg>
);

const MobileQuestionCta = ({
  label,
  icon,
  href,
  children,
  primary = false,
  delay,
}: {
  label: string;
  icon: ReactNode;
  href: string;
  children: ReactNode;
  primary?: boolean;
  delay: number;
}) => (
  <div className="grid gap-2">
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45 }}
      className="flex min-h-[76px] w-full items-center gap-3 rounded-lg border-2 border-ink bg-card px-4 py-3 text-left shadow-[0_8px_0_-4px_var(--orange-pop),0_16px_34px_-26px_rgba(0,0,0,0.45)]"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-ink shadow-[inset_0_-4px_0_rgba(0,0,0,0.14)]">
        {icon}
      </span>
      <span className="min-w-0 text-sm font-semibold leading-snug text-foreground">{label}</span>
    </motion.div>
    <a
      href={href}
      className={`inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold lift ${primary ? "bg-ink text-cream" : "border-2 border-ink bg-background text-foreground"
        }`}
    >
      {children}
    </a>
  </div>
);

const QuestionAnswerCtas = () => (
  <div className="mx-auto mt-8 w-full max-w-5xl px-2 md:px-0">
    <div className="grid gap-4 md:hidden">
      <MobileQuestionCta
        label="Need campaigns, content, and growth systems?"
        icon={<Megaphone className="h-5 w-5" />}
        href="#contact"
        primary
        delay={0.68}
      >
        Marketing <ArrowUpRight className="h-4 w-4" />
      </MobileQuestionCta>
      <MobileQuestionCta
        label="Need websites, apps, and automation built?"
        icon={<Rocket className="h-5 w-5" />}
        href="#contact"
        delay={0.78}
      >
        Development
      </MobileQuestionCta>
    </div>

    <div className="relative hidden min-h-[310px] w-full grid-rows-[1fr_auto] pt-2 md:grid">
      <QuestionCallout
        label="Need campaigns, content, and growth systems?"
        icon={<Megaphone className="h-5 w-5" />}
        className="left-0 top-0"
      />
      <QuestionCallout
        label="Need websites, apps, and automation built?"
        icon={<Rocket className="h-5 w-5" />}
        className="right-0 top-0"
      />

      <ThinAnswerArrow
        path="M22 28 C76 62 112 84 150 118 C182 146 224 166 282 178"
        headPath="M264 166 L282 178 L271 158"
        className="left-[14%] top-[70px]"
        delay={1}
      />
      <ThinAnswerArrow
        path="M298 28 C244 62 208 84 170 118 C138 146 96 166 38 178"
        headPath="M56 166 L38 178 L49 158"
        className="right-[14%] top-[70px]"
        delay={1.16}
      />

      <div className="relative z-20 row-start-2 flex w-full items-center justify-center gap-2 md:px-[9%]">
        <a
          href="#contact"
          className="inline-flex min-w-44 items-center justify-center gap-2 rounded-full bg-ink px-8 py-3.5 font-semibold text-cream lift"
        >
          Marketing <ArrowUpRight className="h-4 w-4" />
        </a>
        <a
          href="#contact"
          className="inline-flex min-w-44 items-center justify-center gap-2 rounded-full border-2 border-ink bg-background px-8 py-3.5 font-semibold text-foreground lift"
        >
          Development
        </a>
      </div>
    </div>
  </div>
);
const Star4 = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 40 40" className={className} fill="currentColor">
    <path d="M20 0 C 22 14, 26 18, 40 20 C 26 22, 22 26, 20 40 C 18 26, 14 22, 0 20 C 14 18, 18 14, 20 0Z" />
  </svg>
);

/* -- Data -- */
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
];

/* -- Custom Portfolio Datasets -- */
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

type VisualAssetSlide = {
  categoryLabel: string;
  subcategory?: string;
  title: string;
  description: string;
  image: string;
  detailUrl?: string;
};

type HeroShowcaseSlide = {
  categoryLabel: string;
  title: string;
  description: string;
  video: string;
  poster: string;
  glow: string;
  ctaText: string;
  ctaLink: string;
};

type VideoEditingSlide = {
  categoryLabel: string;
  title: string;
  description: string;
  outcome: string;
  video: string;
  poster: string;
  accentColor: string;
  detailUrl?: string;
};

type SoftwareSystemSlide = {
  categoryLabel: string;
  title: string;
  description: string;
  keyFeatures: string[];
  techStack: string[];
  businessBenefit: string;
  poster: string;
  video: string;
  accentColor: string;
  projectUrl?: string;
};

type SeoAnalyticsSlide = {
  categoryLabel: string;
  title: string;
  description: string;
  metrics: Array<{ label: string; value: string }>;
  poster: string;
  video: string;
  accent: string;
  detailUrl?: string;
};

type StrategicConsultingCase = {
  categoryLabel: string;
  title: string;
  challenge: string;
  solution: string;
  execution: string;
  results: Array<{ label: string; value: string }>;
};

type EditorialSlide = {
  categoryLabel: string;
  type: string;
  headline: string;
  metrics: string;
  excerpt: string;
};

type PortfolioSectionCopy = {
  eyebrow: string;
  title: string;
  description: string;
};

type PortfolioContentCopy = SiteData["portfolio"];

const fallbackGraphicDesignSlides: VisualAssetSlide[] = [
  {
    categoryLabel: "GRAPHIC DESIGN",
    subcategory: "Campaign Launch",
    title: "Bold Multi-Platform Story Frames",
    description: "A dynamic hero image set for launch campaigns, blending editorial polish with motion-led impact.",
    image: story7,
  },
  {
    categoryLabel: "GRAPHIC DESIGN",
    subcategory: "Packaging",
    title: "Tactile Brand Packaging Concepts",
    description: "Premium packaging mockups with layered textures, premium finishes, and retail-ready appeal.",
    image: story8,
  },
  {
    categoryLabel: "GRAPHIC DESIGN",
    subcategory: "Social Media",
    title: "Story-Led Social Content",
    description: "Swipe-ready story assets and modern editorial layouts designed for high engagement.",
    image: story9,
  },
  {
    categoryLabel: "GRAPHIC DESIGN",
    subcategory: "Advertising",
    title: "High-Impact Out-Of-Home Graphics",
    description: "Bold typography and expressive composition built to capture attention across billboards and transit ads.",
    image: story10,
  },
  {
    categoryLabel: "GRAPHIC DESIGN",
    subcategory: "Print Design",
    title: "Editorial Collage Systems",
    description: "Magazine-quality spreads and visual systems with layered imagery and refined editorial structure.",
    image: story11,
  },
  {
    categoryLabel: "GRAPHIC DESIGN",
    subcategory: "Visual Storytelling",
    title: "Narrative Visual Campaigns",
    description: "Story-driven creative frames that turn brand messaging into immersive visual journeys.",
    image: story12,
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
    categoryLabel: "Content Writing",
    type: "Sales Landing Page Copy",
    headline: "Unchain Your Operations: The AI Middleware Built for Scale",
    metrics: "4.8% Conv. Rate (+60% vs benchmark)",
    excerpt:
      "Enterprise systems are notoriously rigid. We don't believe in rewriting your stack from scratch. Our middleware sits quietly on top, using intelligent semantic parsing to turn unstructured email requests into structured database inserts...",
  },
  {
    categoryLabel: "Content Writing",
    type: "Tech Blog & Thought Leadership",
    headline: "The Churn Tax: Why Legacy Architectures Threaten Series-A Runways",
    metrics: "15K Views · 18% CTA Click-Through",
    excerpt:
      "Losing 3% of your customer base each month is a leaky bucket. When your CAC exceeds your LTV payback window, growth stops compounding. Read our deep-dive analysis on building growth loops directly into your product experience...",
  },
  {
    categoryLabel: "Content Writing",
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
    <section id="services" className="relative mx-auto max-w-6xl px-5 py-6">
      <div className="mb-10 text-center">
        <span className="script text-3xl text-accent"></span>
        <h2 className="mt-3 font-display text-3xl font-bold md:text-7xl">
          
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-foreground/70">
          .
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {serviceOfferings.map((service, i) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 28, rotate: i % 2 === 0 ? -0.8 : 0.8 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              whileHover={{ y: -8, rotate: i % 2 === 0 ? -0.6 : 0.6, scale: 1.015 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.07, type: "spring", stiffness: 95, damping: 14 }}
              className="group relative overflow-hidden rounded-[2rem] border-2 border-ink bg-background p-8 text-ink shadow-[6px_6px_0_0_var(--ink)] dark:border-border dark:bg-card dark:text-card-foreground dark:shadow-[6px_6px_0_0_rgba(255,255,255,0.16)]"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
              <motion.div
                whileHover={{ rotate: -8, scale: 1.08 }}
                className={`relative mb-5 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br ${service.accent} text-white shadow-[inset_0_-5px_0_rgba(0,0,0,0.14)] transition-transform duration-300 group-hover:-translate-y-1`}
              >
                <Icon className="h-6 w-6" />
              </motion.div>
              <h3 className="relative font-display text-2xl font-bold">{service.title}</h3>
              <p className="relative mt-4 text-sm leading-6 text-foreground/70 dark:text-card-foreground/70">
                {service.description}
              </p>
            </motion.div>
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
  tag: ["Brand / Reel", "After Work", "Studio Talk", "Street B-roll"][i] || "Reel",
  category: ["Brand", "Culture", "Studio", "B-roll"][i] || "Reel",
  title: ["Atlas - Origin", "Off-hours", "20:00 Live", "Walk & Talk"][i] || "Reel",
  description:
    [
      "Brand-story cut with polished launch pacing.",
      "After-hours culture reel with quick editorial beats.",
      "Talking-head studio clip for thought leadership.",
      "Street-level b-roll with motion and atmosphere.",
    ][i] || "Reel",
  src: post.url,
  poster: "",
}));

/* -- Core Capabilities Section -- */

type CmsItem = Record<string, unknown>;

const cmsIconMap = {
  Target,
  PenTool,
  Sparkles,
  Brain,
  Search,
  Lightbulb,
  Layers,
  Rocket,
  LineChart,
  Repeat,
  Zap,
  Infinity: InfinityIcon,
  Flame,
  TrendingUp,
  Globe,
  BarChart3,
} as const;
function asString(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value : fallback;
}
function asStringArray(value: unknown, fallback: string[] = []) {
  return Array.isArray(value) ? value.map((item) => String(item)).filter(Boolean) : fallback;
}
function asNumber(value: unknown, fallback = 0) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}
function iconFromName(name: unknown, fallback: keyof typeof cmsIconMap) {
  const key = asString(name, fallback) as keyof typeof cmsIconMap;
  return cmsIconMap[key] ?? cmsIconMap[fallback];
}
function resolveMediaUrl(value: unknown, fallback: string) {
  return asString(value) || fallback;
}
function normalizeStats(items: CmsItem[]) {
  return items.length
    ? items.map((item) => ({ k: asString(item.value), v: asString(item.label) }))
    : stats;
}
function normalizeCapabilities(items: CmsItem[]) {
  return items.length
    ? items.map((item, index) => ({
      k: asString(item.key, String(index + 1).padStart(2, "0")),
      t: asString(item.title),
      d: asString(item.description),
      icon: iconFromName(item.icon, "Target"),
      bg: asString(item.bg, index === 0 ? "bg-accent" : "bg-background"),
      span: item.big === true || index === 0 ? "md:col-span-2 md:row-span-2" : "",
      big: item.big === true || index === 0,
      chips: asStringArray(item.chips),
      metric: asString(item.metric),
      metricLabel: asString(item.metricLabel),
    }))
    : capabilities;
}
function normalizeProcess(items: CmsItem[]) {
  return items.length
    ? items.map((item, index) => ({
      n: asString(item.number, String(index + 1).padStart(2, "0")),
      t: asString(item.title),
      d: asString(item.description),
      icon: iconFromName(item.icon, "Search"),
      color: asString(item.bg, "bg-background"),
    }))
    : steps;
}
function normalizeCases(items: CmsItem[]) {
  return items.length
    ? items.map((item, index) => ({
      name: asString(item.name),
      sector: asString(item.sector),
      year: asString(item.year),
      word: asString(item.word, asString(item.name).toUpperCase()),
      color: asString(item.color, "bg-accent"),
      problem: asString(item.problem),
      metrics: Array.isArray(item.metrics)
        ? (item.metrics as CmsItem[]).map((metric) => ({
          k: asString(metric.key),
          v: asString(metric.value),
        }))
        : [],
      tags: asStringArray(item.tags),
      rot: asNumber(item.rotation, index % 2 === 0 ? -1.4 : 1.4),
    }))
    : cases;
}
function normalizeEngagements(items: CmsItem[]) {
  return items.length
    ? items.map((item, index) => ({
      icon: iconFromName(item.icon, "Zap"),
      t: asString(item.name),
      k: asString(item.duration),
      d: asString(item.description),
      bullets: asStringArray(item.bullets),
      bg: asString(item.bg, "bg-background"),
      rot: asNumber(item.rotation, index % 2 === 0 ? -1.2 : 1.2),
      tag: asString(item.tag),
      popular: item.popular === true,
    }))
    : engagements;
}
function normalizeHeroShowcase(items: CmsItem[]): HeroShowcaseSlide[] {
  return items.length
    ? items.map((item, index) => ({
      categoryLabel: asString(item.categoryLabel, "VIDEO EDITING"),
      title: asString(item.title, `Project ${index + 1}`),
      description: asString(item.description),
      video: asString(
        item.video,
        heroShowcaseSlides[index % heroShowcaseSlides.length]?.video ?? "",
      ),
      poster: resolveMediaUrl(
        item.poster,
        heroShowcaseSlides[index % heroShowcaseSlides.length]?.poster ?? screenshot1,
      ),
      glow: asString(
        item.glow,
        heroShowcaseSlides[index % heroShowcaseSlides.length]?.glow ?? "shadow-red-950/40",
      ),
      ctaText: asString(item.ctaText, "View Project"),
      ctaLink: asString(item.ctaLink, asString(item.video, asString(item.poster, "#portfolio"))),
    }))
    : heroShowcaseSlides;
}
function parseLabelValuePairs(items: unknown[]): Array<{ label: string; value: string }> {
  return items
    .map((item) => {
      if (item && typeof item === "object") {
        const obj = item as Record<string, unknown>;
        const label = asString(obj.label);
        const value = asString(obj.value);
        if (label || value) return { label: label || value, value: value || label };
      }
      const text = String(item ?? "").trim();
      if (!text) return null;
      const separator = text.includes(":") ? ":" : text.includes(" - ") ? " - " : "";
      if (!separator) return { label: text, value: text };
      const [label, ...rest] = text.split(separator);
      const value = rest.join(separator).trim();
      return { label: label.trim(), value: value || label.trim() };
    })
    .filter(Boolean) as Array<{ label: string; value: string }>;
}
function normalizeVideoEditing(items: CmsItem[]): VideoEditingSlide[] {
  return items.length
    ? items.map((item, index) => ({
      categoryLabel: asString(item.categoryLabel, "VIDEO EDITING"),
      title: asString(item.title, `Edit ${index + 1}`),
      description: asString(item.description),
      outcome: asString(item.outcome),
      video: asString(
        item.video,
        videoEditingSlides[index % videoEditingSlides.length]?.video ?? "",
      ),
      poster: resolveMediaUrl(
        item.poster,
        videoEditingSlides[index % videoEditingSlides.length]?.poster ?? screenshot1,
      ),
      accentColor: asString(
        item.accentColor,
        videoEditingSlides[index % videoEditingSlides.length]?.accentColor ?? "from-red-950/90",
      ),
      detailUrl: asString(item.detailUrl, asString(item.video, asString(item.poster))),
    }))
    : videoEditingSlides;
}
function normalizeVisualAssets(items: CmsItem[]): VisualAssetSlide[] {
  return items.length
    ? items.map((item, index) => ({
      categoryLabel: asString(item.categoryLabel, "GRAPHIC DESIGN"),
      subcategory: asString(item.subcategory),
      title: asString(item.title, `Asset ${index + 1}`),
      description: asString(item.description),
      image: asString(
        item.image,
        fallbackGraphicDesignSlides[index % fallbackGraphicDesignSlides.length]?.image ??
        screenshot1,
      ),
      detailUrl: asString(
        item.detailUrl,
        asString(
          item.image,
          fallbackGraphicDesignSlides[index % fallbackGraphicDesignSlides.length]?.image ??
          screenshot1,
        ),
      ),
    }))
    : fallbackGraphicDesignSlides;
}
function normalizeSoftwareSystems(items: CmsItem[]): SoftwareSystemSlide[] {
  return items.length
    ? items.map((item, index) => ({
      categoryLabel: asString(item.categoryLabel, "CRM SOFTWARE"),
      title: asString(item.title, `System ${index + 1}`),
      description: asString(item.description),
      keyFeatures: asStringArray(item.keyFeatures),
      techStack: asStringArray(item.techStack),
      businessBenefit: asString(item.businessBenefit),
      poster: resolveMediaUrl(
        item.poster,
        softwareSystemsSlides[index % softwareSystemsSlides.length]?.poster ?? screenshot1,
      ),
      video: asString(
        item.video,
        softwareSystemsSlides[index % softwareSystemsSlides.length]?.video ?? "",
      ),
      accentColor: asString(
        item.accentColor,
        softwareSystemsSlides[index % softwareSystemsSlides.length]?.accentColor ??
        "from-teal-950/90",
      ),
      projectUrl: asString(
        item.projectUrl,
        asString(item.ctaLink, asString(item.video, asString(item.poster))),
      ),
    }))
    : softwareSystemsSlides;
}
function normalizeSeoAnalytics(items: CmsItem[]): SeoAnalyticsSlide[] {
  return items.length
    ? items.map((item, index) => ({
      categoryLabel: asString(item.categoryLabel, "SEO"),
      title: asString(item.title, `Analytics ${index + 1}`),
      description: asString(item.description),
      metrics: Array.isArray(item.metrics) ? parseLabelValuePairs(item.metrics) : [],
      poster: resolveMediaUrl(
        item.poster,
        seoAnalyticsSlides[index % seoAnalyticsSlides.length]?.poster ?? screenshot1,
      ),
      video: asString(
        item.video,
        seoAnalyticsSlides[index % seoAnalyticsSlides.length]?.video ?? "",
      ),
      accent: asString(
        item.accent,
        seoAnalyticsSlides[index % seoAnalyticsSlides.length]?.accent ?? "from-green-950/40",
      ),
      detailUrl: asString(item.detailUrl, asString(item.video, asString(item.poster))),
    }))
    : seoAnalyticsSlides;
}
function normalizeStrategicConsulting(items: CmsItem[]): StrategicConsultingCase[] {
  return items.length
    ? items.map((item, index) => ({
      categoryLabel: asString(item.categoryLabel, "STRATEGIC PLANNING"),
      title: asString(item.title, `Case ${index + 1}`),
      challenge: asString(item.challenge),
      solution: asString(item.solution),
      execution: asString(item.execution),
      results: Array.isArray(item.results) ? parseLabelValuePairs(item.results) : [],
    }))
    : consultingCases;
}
function normalizeContentWriting(items: CmsItem[]): EditorialSlide[] {
  return items.length
    ? items.map((item, index) => ({
      categoryLabel: asString(item.categoryLabel, "Content Writing"),
      type: asString(item.type, `Item ${index + 1}`),
      headline: asString(item.headline),
      metrics: asString(item.metrics),
      excerpt: asString(item.excerpt),
    }))
    : editorialContent;
}
function normalizeReels(items: CmsItem[]) {
  const reels = items
    .map((item) => ({
      tag: asString(item.tag, "Reel"),
      category: asString(item.category, asString(item.categoryLabel, asString(item.tag, "Reel"))),
      title: asString(item.title, "Reel"),
      description: asString(item.description),
      src: asString(item.url),
      poster: asString(item.poster),
    }))
    .filter((item) => item.src);

  return reels.length ? reels : filmReels;
}
function normalizeTestimonials(items: CmsItem[]) {
  return items.length
    ? items.map((item) => ({
      q: asString(item.quote),
      name: asString(item.author),
      co: asString(item.role),
      verified: asString(item.verified, "Verified"),
      stars: Math.max(1, Math.min(5, Number(item.stars) || 5)),
    }))
    : [
      {
        q: "AlphaNexis completely transformed our product delivery lifecycle. We replaced a fragmented three-vendor setup with their single integrated growth pod. They shipped ahead of schedule and captured a critical market window.",
        name: "VP of Product",
        co: "North American HealthTech Corp",
        verified: "LinkedIn Verified",
        stars: 5,
      },
      {
        q: "The operational predictability is what sets AlphaNexis apart. Their sprint demos are rigorous, code transparency is absolute, and their AI automation insights added immediate value to our bottom line.",
        name: "Chief Operating Officer",
        co: "European Logistics Group",
        verified: "Clutch 5-Star",
        stars: 5,
      },
    ];
}

function CoreCapabilitiesSection({ items = capabilities }: { items?: typeof capabilities }) {
  return (
    <section id="capabilities" className="relative mx-auto max-w-6xl px-5 py-6">
      <div className="mb-12 grid items-end gap-6 md:grid-cols-[1fr_auto]">
        <div>
          <span className="script text-3xl text-accent">What We Bring</span>
          <h2 className="font-display text-4xl font-bold leading-[1.02] md:text-7xl">
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
        {items.map((c, i) => (
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

/* -- 6-Step Delivery Framework -- */
function ProcessSection({ items = steps }: { items?: typeof steps }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 20%"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="relative mx-auto max-w-6xl px-5 py-8 md:py-16">
      <div className="mb-14 text-center">
        <span className="script text-3xl text-accent">How We Ship</span>
        <h2 className="font-display text-4xl font-bold leading-[1.02] md:text-7xl">
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
          {items.map((s, i) => {
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

/* -- Film Reels -- */
function FilmReelsSection({ items = filmReels }: { items?: typeof filmReels }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isReelsLoading, setIsReelsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [reelSearch, setReelSearch] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);
  const rotations = [-0.5, 0.5, -0.35, 0.35];

  const categories = useMemo(() => {
    const unique = new Set<string>();
    items.forEach((reel) => unique.add(reel.category || reel.tag || "Reel"));
    return ["All", ...Array.from(unique)];
  }, [items]);

  const filteredReels = useMemo(() => {
    const query = reelSearch.trim().toLowerCase();

    return items.filter((reel) => {
      const category = reel.category || reel.tag || "Reel";
      const matchesCategory = activeCategory === "All" || category === activeCategory;
      const searchable = [reel.title, reel.tag, category, reel.description]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return matchesCategory && (!query || searchable.includes(query));
    });
  }, [activeCategory, items, reelSearch]);

  const visibleReels = filteredReels.slice(0, 6);

  useEffect(() => {
    setIsFiltering(true);
    const timeout = window.setTimeout(() => setIsFiltering(false), 360);
    return () => window.clearTimeout(timeout);
  }, [activeCategory, reelSearch]);

  return (
    <section
      id="film"
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-transparent text-foreground"
    >
      <div className="relative mx-auto max-w-6xl px-5 py-8">
        <div className="mb-8 grid items-end gap-6 md:grid-cols-[1fr_auto]">
          <div>
            <span className="script text-3xl text-accent">The Reel Room</span>
            <h2 className="font-display text-3xl font-bold leading-[1.04] md:text-6xl">
              Expert <em className="text-accent">editing</em> that brings
              <br />
              <em>visuals</em>, sound & pacing into one cohesive film.
            </h2>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <p className="max-w-sm text-foreground/70 md:text-right">
            
            </p>
            <Link
              to="/reels"
              onClick={() => setIsReelsLoading(true)}
              disabled={!isReelsLoading}
              className="inline-flex min-w-36 items-center justify-center gap-2 rounded-full border border-ink/15 bg-card/70 px-6 py-2.5 text-sm font-semibold text-card-foreground shadow-sm backdrop-blur transition-all hover:bg-ink hover:text-cream aria-busy:pointer-events-none aria-busy:opacity-80 dark:border-white/10 dark:bg-card/70 dark:text-card-foreground dark:hover:bg-foreground dark:hover:text-background"
            >
              {isReelsLoading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Loading
                </>
              ) : (
                <>
                  View All Reels <ArrowUpRight className="h-4 w-4" />
                </>
              )}
            </Link>
          </div>
        </div>

        <div className="mb-6 grid gap-4 rounded-[1.5rem] border border-ink/10 bg-card/70 p-3 shadow-[0_18px_50px_-40px_rgba(0,0,0,0.45)] backdrop-blur md:grid-cols-[1fr_280px] dark:border-white/10 dark:bg-card/70">
          <div className="min-w-0 overflow-hidden">
            <div
              className="flex gap-2 overflow-x-auto pb-1 scrollbar-none"
              style={{ scrollbarWidth: "none" }}
            >
              {categories.map((category) => {
                const selected = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={selected}
                    className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${selected
                        ? "border-ink bg-ink text-cream shadow-[3px_3px_0_0_var(--accent)] dark:border-foreground dark:bg-foreground dark:text-background"
                        : "border-ink/15 bg-background/80 text-foreground/70 hover:border-accent/50 hover:bg-accent/10 dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10"
                      }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          <label className="relative block">
            <span className="sr-only">Search reels</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/45" />
            <Input
              value={reelSearch}
              onChange={(event) => setReelSearch(event.target.value)}
              placeholder="Search reels"
              className="h-10 rounded-full border-ink/15 bg-background/85 pl-9 text-sm shadow-none focus-visible:ring-accent/30 dark:border-white/10 dark:bg-white/5"
            />
          </label>
        </div>

        <div className="relative min-h-[360px]">
          {isFiltering && (
            <div className="absolute -top-3 left-0 right-0 z-20 h-1 overflow-hidden rounded-full bg-ink/10 dark:bg-white/10">
              <motion.div
                className="h-full rounded-full bg-accent"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5" aria-busy={isFiltering}>
            {isFiltering
              ? Array.from({ length: Math.min(Math.max(visibleReels.length, 4), 6) }).map((_, i) => (
                <div
                  key={`reel-skeleton-${i}`}
                  className="aspect-[9/16] animate-pulse rounded-2xl border border-ink/10 bg-card/80 shadow-[0_22px_60px_-38px_rgba(0,0,0,0.5)] dark:border-white/10 dark:bg-white/5"
                >
                  <div className="h-full rounded-2xl bg-gradient-to-b from-foreground/10 via-foreground/5 to-foreground/15" />
                </div>
              ))
              : visibleReels.map((reel, i) => {
                const category = reel.category || reel.tag || "Reel";
                return (
                  <motion.div
                    key={`${reel.title}-${reel.src}`}
                    initial={{ opacity: 0, y: 40, rotate: rotations[i % rotations.length] * 2 }}
                    whileInView={{ opacity: 1, y: 0, rotate: rotations[i % rotations.length] }}
                    whileHover={{ y: -8, rotate: 0, scale: 1.02 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ type: "spring", stiffness: 90, delay: (i % 4) * 0.08 }}
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
                      {category} / {reel.tag}
                    </div>
                    <h3 className="absolute bottom-4 left-4 right-4 font-display text-base font-bold leading-tight text-white drop-shadow-lg md:text-lg">
                      {reel.title}
                    </h3>
                  </motion.div>
                );
              })}
          </div>

          {!isFiltering && filteredReels.length === 0 && (
            <div className="rounded-[1.5rem] border border-dashed border-ink/20 bg-card/70 px-6 py-10 text-center dark:border-white/10 dark:bg-white/5">
              <p className="font-display text-2xl font-bold">No reels found</p>
              <p className="mx-auto mt-2 max-w-md text-sm text-foreground/60">
                Try another category or clear the search to bring the full reel room back.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory("All");
                  setReelSearch("");
                }}
                className="mt-5 inline-flex items-center justify-center rounded-full border border-ink/15 bg-background px-5 py-2 text-sm font-semibold hover:bg-ink hover:text-cream dark:border-white/10 dark:bg-white/5"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* -- Case Studies -- */
function CaseStudiesSection({ items = cases }: { items?: typeof cases }) {
  return (
    <section id="case-studies" className="relative mx-auto max-w-6xl px-5 py-10 md:py-20">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="script text-3xl text-accent">In The Wild</span>
          <h2 className="font-display text-4xl font-bold leading-[1.02] md:text-7xl">
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
        {items.map((c, i) => (
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

/* -- Engagement Models --*/
function FlexibleSection({ items = engagements }: { items?: typeof engagements }) {
  return (
    <section id="engage" className="relative mx-auto max-w-6xl px-5 py-10 md:py-24">
      <div className="mb-12 grid items-end gap-6 md:grid-cols-[1fr_auto]">
        <div>
          {/*<span className="script text-3xl text-accent">how we work</span>*/}
          <h2 className="font-display text-4xl font-bold leading-[1.02] md:text-7xl">
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
        {items.map((e, i) => (
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

/* -- ROI Table Section -- */
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
        <h2 className="font-display text-4xl font-bold leading-[1.02] md:text-7xl">
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

/* -- Trust / Partners strip -- */
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
    <section className="relative mx-auto max-w-6xl px-5 py-6 md:py-16">
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

/* -- Portfolio Section Components -- */
function PortfolioHeroShowcase({
  content = DEFAULT_SITE.portfolio.sections.heroShowcase,
  items = heroShowcaseSlides,
}: {
  content?: PortfolioSectionCopy;
  items?: HeroShowcaseSlide[];
}) {
  return (
    <div className="py-6 overflow-x-hidden" id="work">
      <div className="mb-10 text-center px-5">
        <span className="script text-3xl text-accent">{content.eyebrow}</span>
        <h2 className="mt-3 font-display text-3xl font-bold md:text-6xl tracking-tight text-foreground dark:text-white">
          {content.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-foreground/65 dark:text-gray-400">
          {content.description}
        </p>
      </div>
      <FlankCarousel
        slides={items}
        /*title=""
        subtitle=""
        /*description="Swipe or use arrow keys to navigate. Videos autoplay on active cards only."*/
      />
    </div>
  );
}

function PortfolioVideoEditing({
  content = DEFAULT_SITE.portfolio.sections.videoEditing,
  items = videoEditingSlides,
}: {
  content?: PortfolioSectionCopy;
  items?: VideoEditingSlide[];
}) {
  return (
    <div className="overflow-x-clip py-6">
      <div className="mb-10 text-center px-5">
        <span className="script text-3xl text-red-500 font-bold">{content.eyebrow}</span>
        <h2 className="mt-3 font-display text-3xl font-bold md:text-6xl tracking-tight text-foreground dark:text-white">
          {content.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-foreground/65 dark:text-gray-400">
          {content.description}
        </p>
      </div>

    </div>
  );
}

function PortfolioGraphicDesign({
  content = DEFAULT_SITE.portfolio.sections.visualAssets,
  items = fallbackGraphicDesignSlides,
}: {
  content?: PortfolioSectionCopy;
  items?: VisualAssetSlide[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // ====== GRAPHIC DESIGN FILTER STATE ======
  const [activeGraphicCategory, setActiveGraphicCategory] = useState("All");
  const [graphicSearch, setGraphicSearch] = useState("");
  const [isGraphicFiltering, setIsGraphicFiltering] = useState(false);

  const graphicCategories = useMemo(() => {
    const unique = new Set<string>();
    items.forEach((slide) => {
      const category = slide.subcategory || slide.categoryLabel || "Design";
      unique.add(category);
    });
    return ["All", ...Array.from(unique)];
  }, [items]);

  const filteredGraphicItems = useMemo(() => {
    const query = graphicSearch.trim().toLowerCase();
    
    return items.filter((slide) => {
      const category = slide.subcategory || slide.categoryLabel || "Design";
      const matchesCategory = activeGraphicCategory === "All" || category === activeGraphicCategory;
      const searchable = [slide.title, slide.description, slide.subcategory, slide.categoryLabel]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return matchesCategory && (!query || searchable.includes(query));
    });
  }, [activeGraphicCategory, items, graphicSearch]);

  useEffect(() => {
    setIsGraphicFiltering(true);
    const timeout = window.setTimeout(() => setIsGraphicFiltering(false), 360);
    return () => window.clearTimeout(timeout);
  }, [activeGraphicCategory, graphicSearch]);
  // ====== END GRAPHIC DESIGN FILTER STATE ======

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
    <div className="overflow-x-clip py-6">
      <div className="mx-auto max-w-6xl px-5 mb-6 md:mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <span className="script text-3xl text-purple-600 dark:text-purple-400">
            {content.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-6xl tracking-tight text-foreground dark:text-white">
            {content.title}
          </h2>
          <p className="mt-4 max-w-xl text-foreground/65 dark:text-gray-400">
            {content.description}
          </p>
        </div>
        <div className="hidden md:flex gap-2">
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

      {/* ===== GRAPHIC DESIGN FILTER BAR ===== */}
      <div className="mx-auto max-w-6xl px-5 mb-6">
        <div className="grid gap-4 rounded-[1.5rem] border border-ink/10 bg-card/70 p-3 shadow-[0_18px_50px_-40px_rgba(0,0,0,0.45)] backdrop-blur md:grid-cols-[1fr_280px] dark:border-white/10 dark:bg-card/70">
          <div className="min-w-0 overflow-hidden">
            <div
              className="flex gap-2 overflow-x-auto pb-1 scrollbar-none"
              style={{ scrollbarWidth: "none" }}
            >
              {graphicCategories.map((category) => {
                const selected = activeGraphicCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveGraphicCategory(category)}
                    aria-pressed={selected}
                    className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                      selected
                        ? "border-purple-500 bg-purple-500 text-white shadow-[3px_3px_0_0_var(--accent)] dark:border-purple-400 dark:bg-purple-400 dark:text-background"
                        : "border-ink/15 bg-background/80 text-foreground/70 hover:border-purple-500/50 hover:bg-purple-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          <label className="relative block">
            <span className="sr-only">Search graphic design</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/45" />
            <Input
              value={graphicSearch}
              onChange={(event) => setGraphicSearch(event.target.value)}
              placeholder="Search designs"
              className="h-10 rounded-full border-ink/15 bg-background/85 pl-9 text-sm shadow-none focus-visible:ring-purple-500/30 dark:border-white/10 dark:bg-white/5"
            />
          </label>
        </div>
      </div>
      {/* ===== END GRAPHIC DESIGN FILTER BAR ===== */}

      <div
        ref={scrollRef}
        onWheel={(event) => {
          if (!scrollRef.current || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
          event.preventDefault();
          scrollRef.current.scrollBy({ left: event.deltaY, behavior: "auto" });
        }}
        className="mx-auto flex max-w-full gap-5 overflow-x-auto px-5 py-4 md:gap-6 md:px-20 scrollbar-none snap-x snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >
        {isGraphicFiltering ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`graphic-skeleton-${i}`}
              className="relative w-[min(72vw,10rem)] min-w-[12rem] sm:w-[10rem] sm:min-w-[8rem] md:w-[12rem] md:min-w-[10rem] lg:w-[16rem] lg:min-w-[14rem] aspect-[3/5] rounded-[1.25rem] border border-ink/10 bg-card/80 shadow-[0_18px_50px_-32px_rgba(0,0,0,0.45)] dark:border-white/10 dark:bg-white/5 animate-pulse"
            >
              <div className="absolute inset-0 rounded-[1.25rem] bg-gradient-to-b from-purple-500/10 via-purple-500/5 to-purple-500/15" />
            </div>
          ))
        ) : filteredGraphicItems.length > 0 ? (
          filteredGraphicItems.map((slide, idx) => (
            <motion.a
              key={idx}
              href={slide.detailUrl || slide.image}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative w-[min(72vw,10rem)] min-w-[12rem] sm:w-[10rem] sm:min-w-[8rem] md:w-[12rem] md:min-w-[10rem] lg:w-[16rem] lg:min-w-[14rem] aspect-[3/5] rounded-[1.25rem] border border-ink/10 overflow-hidden bg-card snap-start shrink-0 shadow-[0_18px_50px_-32px_rgba(0,0,0,0.45)] dark:border-white/10 dark:bg-[#111827] cursor-pointer"
            >
              <img
                src={slide.image}
                alt={slide.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <span className="hidden md:block absolute left-4 top-4 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-purple-500/15 border-purple-500/30 text-purple-700 dark:bg-purple-500/25 dark:border-purple-500/40 dark:text-purple-400 backdrop-blur-md">
                {slide.subcategory}
              </span>
              {slide.subcategory && (
                <span className="md:hidden absolute right-3 top-3 max-w-[45%] truncate rounded-full border border-white/20 bg-black/50 px-2.5 py-1 text-[9px] font-mono text-white/85 backdrop-blur">
                  {slide.subcategory}
                </span>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                <h4 className="font-display md:text-base sm:text-sm font-bold leading-tight text-white line-clamp-2">
                  {slide.title}
                </h4>
                <p className="mt-1 text-xs leading-5 text-white/80 line-clamp-2">
                  {slide.description}
                </p>
              </div>
            </motion.a>
          ))
        ) : (
          <div className="w-full py-12 text-center">
            <p className="font-display text-xl font-bold text-foreground/60">
              No designs found
            </p>
            <p className="mt-2 text-sm text-foreground/40">
              Try another category or clear the search
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveGraphicCategory("All");
                setGraphicSearch("");
              }}
              className="mt-4 inline-flex items-center justify-center rounded-full border border-ink/15 bg-background px-5 py-2 text-sm font-semibold hover:bg-purple-500 hover:text-white dark:border-white/10 dark:bg-white/5"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function PortfolioSoftwareSystems({
  content = DEFAULT_SITE.portfolio.sections.softwareSystems,
  items = softwareSystemsSlides,
}: {
  content?: PortfolioSectionCopy;
  items?: SoftwareSystemSlide[];
}) {
  return (
    <div className="py-6 mb-4">
      <div className="mb-10 text-center px-5">
        <span className="script text-3xl text-orange-400">{content.eyebrow}</span>
        <h2 className="mt-3 font-display text-3xl font-bold md:text-6xl tracking-tight text-foreground dark:text-white">
          {content.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-foreground/65 dark:text-gray-400">
          {content.description}
        </p>
      </div>
      <RingCarousel
        slides={items}
        title="Software & Systems"
        subtitle="AUTOMATION & PLATFORMS"
        description=""
      />
    </div>
  );
}

function PortfolioSEOAnalytics({
  content = DEFAULT_SITE.portfolio.sections.seoAnalytics,
  items = seoAnalyticsSlides,
}: {
  content?: PortfolioSectionCopy;
  items?: SeoAnalyticsSlide[];
}) {
  return (
    <div className="py-12 mt-8 md:mt-2 md:py-12">
      <div className="mb-10 text-center px-5">
        <span className="script text-3xl text-blue-400">{content.eyebrow}</span>
        <h2 className="mt-3 font-display text-3xl font-bold md:text-6xl tracking-tight text-foreground dark:text-white">
          {content.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-foreground/65 dark:text-gray-400">
          {content.description}
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }}
          modules={[Navigation]}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            }
          }}
          className="pb-12"
        >
          {items.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl h-full flex flex-col">
                {/* Image Section - Top */}
                <div className="relative h-48 md:h-56 lg:h-64 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-700 dark:to-gray-900 overflow-hidden">
                  <img
                    src={item.poster}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
                    {item.categoryLabel || "SEO"}
                  </div>
                </div>

                {/* Content Section - Bottom */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-foreground dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-1">
                    {item.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mt-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                    {item.metrics && item.metrics.map((metric, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {metric.value}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Arrows */}
        <button className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 p-3 rounded-full shadow-lg transition-all -ml-4 border border-gray-200 dark:border-gray-700">
          <svg className="w-5 h-5 text-gray-800 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="custom-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 p-3 rounded-full shadow-lg transition-all -mr-4 border border-gray-200 dark:border-gray-700">
          <svg className="w-5 h-5 text-gray-800 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function PortfolioStrategicConsulting({
  content = DEFAULT_SITE.portfolio.sections.strategicConsulting,
  items = consultingCases,
}: {
  content?: PortfolioSectionCopy;
  items?: StrategicConsultingCase[];
}) {
  const badgeStyle = "bg-amber-500/25 border-amber-500/40 text-amber-400";
  return (
    <div className="overflow-x-clip py-6">
      <div className="mx-auto max-w-6xl px-5 mb-14 text-center">
        <span className="script text-3xl text-amber-400">{content.eyebrow}</span>
        <h2 className="mt-3 font-display text-3xl font-bold md:text-6xl tracking-tight text-foreground dark:text-white">
          {content.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-foreground/65 dark:text-gray-400">
          {content.description}
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-5 grid gap-8 md:grid-cols-2">
        {items.map((cs, idx) => (
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

function PortfolioContentWriting({
  content = DEFAULT_SITE.portfolio.sections.contentWriting,
  items = editorialContent,
}: {
  content?: PortfolioSectionCopy;
  items?: EditorialSlide[];
}) {
  const badgeStyle = "bg-orange-500/25 border-orange-500/40 text-orange-400";
  return (
    <div className="py-6 md:py-20">
      <div className="mx-auto max-w-6xl px-5 mb-14 text-center">
        <span className="script text-3xl text-orange-400 font-bold">{content.eyebrow}</span>
        <h2 className="mt-3 font-display text-3xl font-bold md:text-6xl tracking-tight text-foreground dark:text-white">
          {content.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-foreground/65 dark:text-gray-400">
          {content.description}
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-5 grid gap-8 md:grid-cols-2 lg:grid-cols-3 text-left">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -6 }}
            className="rounded-[2rem] border border-ink/10 bg-card p-6 shadow-[0_24px_70px_-45px_rgba(0,0,0,0.45)] md:p-4 flex flex-col justify-between relative dark:border-white/10 dark:bg-[#111827]/95 dark:shadow-2xl"
          >
            <div>
              <div className="flex items-center justify-between gap-1 mb-4">
                <span className="text-[10px] font-bold text-muted-foreground dark:text-gray-500 uppercase tracking-widest">
                  {item.type}
                </span>
                <span
                  className={`shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-bold  tracking-wider ${badgeStyle}`}
                >
                  {item.categoryLabel}
                </span>
              </div>

              <h3 className="font-display text-lg md:text-xl font-bold text-card-foreground dark:text-white mb-4 leading-snug">
                "{item.headline}"
              </h3>

              <blockquote className="border-l-2  border-orange-500 pl-4 text-xs italic text-muted-foreground dark:text-gray-400 leading-relaxed">
                {item.excerpt}
              </blockquote>
            </div>

            <div className="mt-6 border-t border-ink/10 pt-4 flex items-center justify-between dark:border-white/10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground dark:text-gray-500">
                Performance
              </span>
              <span className="text-[8px] lg:text-[11px] font-bold  text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-md px-1 py-1">
                {item.metrics}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function PortfolioSection({
  content = DEFAULT_SITE.portfolio.overview,
}: {
  content?: PortfolioSectionCopy;
}) {
  return (
    <section
      id="portfolio"
      className="relative isolate overflow-hidden bg-transparent py-12 md:py-20  text-foreground"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,transparent_0%,oklch(0.68_0.17_62/0.07)_12%,oklch(0.68_0.17_62/0.11)_48%,oklch(0.68_0.17_62/0.07)_82%,transparent_100%)] dark:bg-[linear-gradient(180deg,transparent_0%,oklch(0.6_0.14_62/0.08)_12%,oklch(0.6_0.14_62/0.12)_48%,oklch(0.6_0.14_62/0.08)_82%,transparent_100%)]" />
      <div className="mx-auto max-w-6xl px-5 text-center mb-16">
        <span className="script text-3xl text-accent">{content.eyebrow}</span>
        <h2 className="mt-3 font-display text-xl font-bold md:text-6xl tracking-tight text-foreground">
          {content.title.split(" ")[0]}{" "}
          <span className="italic text-accent">{content.title.split(" ").slice(1).join(" ")}</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-foreground/65 text-lg">{content.description}</p>
      </div>
    </section>
  );
}

/* -- Main Page -- */
function Index() {
  const portfolio = Route.useLoaderData();
  const site = portfolio.site;
  const portfolioCopy = site.portfolio ?? DEFAULT_SITE.portfolio;
  const cmsStats = normalizeStats(portfolio.collections.stats);
  const cmsCapabilities = normalizeCapabilities(portfolio.collections.capabilities);
  const cmsProcess = normalizeProcess(portfolio.collections.process);
  const cmsCases = normalizeCases(portfolio.collections.cases);
  const cmsEngagements = normalizeEngagements(portfolio.collections.engagements);
  const cmsTestimonials = normalizeTestimonials(portfolio.collections.testimonials);
  const cmsHeroShowcase = normalizeHeroShowcase(portfolio.collections.heroShowcase);
  const cmsVideoEditing = normalizeVideoEditing(portfolio.collections.videoEditing);
  const cmsReels = normalizeReels(portfolio.reels);
  const cmsVisualAssets = normalizeVisualAssets(portfolio.collections.visualAssets);
  const cmsSoftwareSystems = normalizeSoftwareSystems(portfolio.collections.softwareSystems);
  const cmsSeoAnalytics = normalizeSeoAnalytics(portfolio.collections.seoAnalytics);
  const cmsStrategicConsulting = normalizeStrategicConsulting(
    portfolio.collections.strategicConsulting,
  );
  const cmsContentWriting = normalizeContentWriting(portfolio.collections.contentWriting);

  return (
    <main className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      {/* ambient blobs */}
      <div className="pointer-events-none fixed -left-32 top-1/3 -z-0 h-96 w-96 bg-accent/20 animate-blob blur-3xl" />
      <div
        className="pointer-events-none fixed -right-32 top-2/3 -z-0 h-96 w-96 bg-surface-3/30 animate-blob blur-3xl"
        style={{ animationDelay: "3s" }}
      />

      {/* Nav */}
      <Navbar />

      {/* Cursor Glow - Only in hero section */}
      <CursorGlow />

      {/* HERO */}
      <section className="relative mx-auto max-w-6xl  px-5  pb-8 ">
        <div className="  flex flex-col justify-center pt-12 ">
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
              className="font-display text-[clamp(2rem,8vw,4rem)]  md:text-[clamp(2.5rem,8vw,4rem)] font-bold leading-[1.05] tracking-tight"
            >
              {site.hero.headline || (
                <>
                  We craft digital experiences that
                  <br />
                  drive growth and leave a lasting <span className="text-accent">impact</span>
                </>
              )}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mx-auto text-accent/80 max-w-2xl text-base md:text-lg "
            >
            Accelerate Brand Momentum || Drive Measurable Growth || Execute at Speed  
        
               </motion.p>
          </div>
        </div>

        <div>
          {/* Portrait hero — matches uploaded design */}
          <div className="relative mx-auto  max-w-3xl">
            {/* Orange semicircle backdrop */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
              style={{ transformOrigin: "bottom" }}
              className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 h-[55%] w-[70%] rounded-t-full bg-accent"
            />

            {/* Portrait image */}
            <a
              href={resolveMediaUrl(site.hero.portraitUrl, portrait)}
              target="_blank"
              rel="noreferrer"
              aria-label="Open hero portrait in a new tab"
              className="relative z-10 block w-fit mx-auto"
            >
              <motion.img
                src={resolveMediaUrl(site.hero.portraitUrl, portrait)}
                alt="AlphaNexis — Digital Marketing & AI Agency"
                width={1024}
                height={1024}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="relative z-10 mx-auto h-auto w-[min(520px,80vw)] md:w-[min(670px,90%)] drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] animate-float-y cursor-pointer"
              />
            </a>

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
              {
                txt: (
                  <>
                    <Rocket className="h-4 w-4 text-accent" /> Ads
                  </>
                ),
                pos: "-right-4 top-[36%] md:right-0",
                r: "8deg",
                d: "0.4s",
              },
              {
                txt: (
                  <>
                    <Sparkles className="h-4 w-4 text-accent" /> Brand
                  </>
                ),
                pos: "-left-6 top-[87%] md:left-12",
                r: "-4deg",
                d: "0.8s",
              },
              {
                txt: (
                  <>
                    <Megaphone className="h-4 w-4 text-accent" /> Social Media
                  </>
                ),
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
                className={`pill-tag absolute z-10 animate-bob scale-75 md:scale-100 text-xs md:text-sm shadow-[0_12px_30px_-20px_rgba(0,0,0,0.55)] backdrop-blur-sm ${p.pos}`}
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
              <div className="font-display text-4xl font-bold leading-none">
                {site.hero.sidebarStat.value}
              </div>
              <div className="text-sm text-foreground/60">{site.hero.sidebarStat.label}</div>
            </motion.div>

            {/* Mini testimonial snippet — top left, same as original */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute -left-15 top-[60%] z-20 hidden max-w-[200px] md:block"
            >
              <div className="font-display text-4xl text-foreground/40">"</div>
              <p className="text-xs leading-snug text-foreground/70">{site.hero.sidebarQuote}</p>
            </motion.div>
          </div>

          <div className="mt-3 flex justify-center px-4">
            <div className="ceo-identity-badge" role="note" aria-label="Ankit Sen, founder and CEO">
              <span className="ceo-identity-badge__name">Ankit Sen</span>
              <span className="ceo-identity-badge__role">Founder & CEO</span>
            </div>
          </div>
        </div>
        <div className="w-full mt-8 mb-12 text-center flex flex-col justify-center items-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mx-auto  mt-12 max-w-5xl text-base md:text-lg text-accent"
          >
            We bridge the gap between creative imagination and functional engineering. From aggressive growth marketing to powerful custom tech, we build the exact systems you need to scale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="w-full"
          >
            <QuestionAnswerCtas />
          </motion.div>
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
              {site.marquee.top
                .flatMap((word) => [word, "/"])
                .map((w, i) => (
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
              {site.marquee.bottom
                .flatMap((word) => [word, "/"])
                .map((w, i) => (
                  <span key={i} className={i % 2 === 1 ? "text-accent" : ""}>
                    {w}
                  </span>
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <PortfolioSection content={portfolioCopy.overview} />
      <PortfolioHeroShowcase
        content={portfolioCopy.sections.heroShowcase}
        items={cmsHeroShowcase}
      />


      {/* FILM REELS */}
      <FilmReelsSection items={cmsReels} />


      {/* <PortfolioVideoEditing
        content={portfolioCopy.sections.videoEditing}
        items={cmsVideoEditing}
      /> */}
      <PortfolioGraphicDesign
        content={portfolioCopy.sections.visualAssets}
        items={cmsVisualAssets}
      />
      <PortfolioSoftwareSystems
        content={portfolioCopy.sections.softwareSystems}
        items={cmsSoftwareSystems}
      />
      <PortfolioSEOAnalytics
        content={portfolioCopy.sections.seoAnalytics}
        items={cmsSeoAnalytics}
      />
      <PortfolioStrategicConsulting
        content={portfolioCopy.sections.strategicConsulting}
        items={cmsStrategicConsulting}
      />
      <PortfolioContentWriting
        content={portfolioCopy.sections.contentWriting}
        items={cmsContentWriting}
      />

      <ServicesSection />

      {/* ABOUT */}
      <section id="about" className="relative mx-auto max-w-6xl px-5 py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="script text-3xl text-accent">{site.about.eyebrow}</span>
            <h2 className="mt-2 font-display text-4xl font-bold leading-tight md:text-6xl">
              We build brands
              <br />
              <span className="relative inline-block">
                that actually scale
                <Underline className="absolute -bottom-2 left-0 h-3 w-full text-accent" />
              </span>
              .
            </h2>
            <p className="mt-6 max-w-md text-lg text-foreground/70">{site.about.body}</p>
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
          </motion.div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <CaseStudiesSection items={cmsCases} />

      {/* ROI TABLE */}
      <ROISection />

      {/* PARTNERS */}
      <TrustSection />

      

      {/* TESTIMONIALS */}
      <section className="relative mx-auto max-w-6xl px-5 py-10 md:py-18">
        <div className="mb-12 text-center">
          <span className="script text-3xl text-accent">What Clients Say</span>
          <h2 className="font-display text-4xl font-bold md:text-6xl">
            Straight from <span className="italic">the source</span>
            <span className="text-accent">.</span>
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {cmsTestimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, rotate: i === 0 ? -1 : 1 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring" }}
              className="rounded-[1.5rem] border-2 border-ink bg-background p-8 px-4 shadow-[5px_5px_0_0_var(--ink)] lift dark:border-border dark:bg-card dark:shadow-[5px_5px_0_0_rgba(255,255,255,0.16)]"
            >
              <div className="mb-4 flex gap-1">
                {[...Array(t.stars)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="font-display text-xl font-medium leading-snug">"{t.q}"</p>
              <div className="mt-6 flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm">— {t.name}</div>
                  <div className="text-sm text-foreground/60 ">{t.co}</div>
                </div>

                <span className="shrink-0 rounded-full border border-ink/30 bg-accent/20 px-1 py-1 text-[9px] md:text-[11px] font-bold uppercase">
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

          <span className="script text-3xl">{site.contact.eyebrow}</span>
          <h2 className="font-display text-5xl font-bold leading-[1.05] md:text-7xl">
            {site.contact.headline}
          </h2>
          <p className="mx-auto mt-5 max-w-md text-foreground/80">{site.contact.blurb}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={`mailto:${site.contact.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-cream lift"
            >
              <Mail className="h-4 w-4" /> {site.contact.email}
            </a>
            <DiscoveryCallDialog />
          </div>
        </motion.div>
      </section>
      {/* STATS strip */}
      <section className="relative mx-auto max-w-6xl px-5 py-4 md:py-14">
        <div className="mb-10 text-center">
          <span className="script text-3xl text-accent">Achievements</span>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-7xl">
            Milestones that prove our work delivers impact.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-foreground/70">
            From enterprise launches to repeated growth loops, these metrics show the outcomes we
            create.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {cmsStats.map((s, i) => (
            <motion.div
              key={s.v}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, type: "spring" }}
              className="rounded-[2rem] border-2 border-ink bg-background p-8 text-center shadow-[5px_5px_0_0_var(--ink)] dark:border-border dark:bg-card dark:shadow-[5px_5px_0_0_rgba(255,255,255,0.16)]"
            >
              <div className="font-display text-4xl font-bold text-ink md:text-6xl">{s.k}</div>
              <div className="mt-3 text-sm text-foreground/70">{s.v}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 md:flex-row">
          <div className="text-sm text-foreground/60">{site.footer.copyright}</div>
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

      {/* FLOATING ACTION BUTTONS - BOTTOM RIGHT */}
      {/* ============================================ */}

      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-50">
        <CartoonButton
          label="WhatsApp"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          }
          color="bg-green-400"
          className="animate-float"
          onClick={() => {
            const whatsappLink =
              process.env.NEXT_PUBLIC_WHATSAPP_LINK || "https://wa.me/1234567890";
            window.open(whatsappLink, "_blank");
          }}
        />

        <CartoonButton
          label="View Our Work"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          }
          color="bg-white"
          className="animate-bounce-subtle"
          onClick={() => {
            document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        />
      </div>
    </main>
  );
}