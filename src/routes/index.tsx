import { createFileRoute, Link } from "@tanstack/react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
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

// ===== THUMBNAIL IMPORTS =====
import thumbnail1 from "@/assets/thumbanil  - 1_ 2.jpg";
import thumbnail2 from "@/assets/thumbanil - 2 3.jpg";
import thumbnail3 from "@/assets/thumbnail - Where every moment_.jpg";
import thumbnail4 from "@/assets/thumbanil - 2 4.jpg";
import thumbnail5 from "@/assets/verticle thumbvanil 2 - Step into your cozy hotel room_.jpg";
import thumbnail6 from "@/assets/thumbanil -1 2.jpg";
import thumbnail7 from "@/assets/thumbanil -_ 3.jpg";
import thumbnail8 from "@/assets/sky + line thumbanil_ 1.jpg";
import thumbnail9 from "@/assets/Thumbanil  copy 2.jpg";
import thumbnail10 from "@/assets/Thumbanil_ 3.jpg";

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
        boxShadow: "0 20px 60px rgba(176, 141, 87, 0.2)",
        borderColor: "rgba(176, 141, 87, 0.3)",
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
        borderColor: type === "ring" ? "rgba(176,141,87,0.2)" : "transparent",
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
        background: "radial-gradient(circle, rgba(176,141,87,0.15) 0%, transparent 70%)",
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
      className={`inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold lift ${
        primary ? "bg-ink text-cream" : "border-2 border-ink bg-background text-foreground"
      }`}
    >
      {children}
    </a>
  </div>
);

const QuestionAnswerCtas = () => (
  <div className="mx-auto mt-8 w-full max-w-5xl px-2 md:px-0">
    <div className="grid gap-4 md:hidden">
      <style>{`
    @keyframes border-spin {
      to { --border-angle: 360deg; }
    }
    @property --border-angle {
      syntax: "<angle>";
      inherits: false;
      initial-value: 0deg;
    }
    .border-beam-mobile {
      position: relative;
      border-radius: 9999px;
      width: fit-content;
    }
    .border-beam-mobile::before {
      content: "";
      position: absolute;
      inset: -2px;
      border-radius: inherit;
      padding: 2px;
      background: conic-gradient(
        from var(--border-angle),
        transparent 70%,
        var(--beam-color, #B08D57) 88%,
        transparent 100%
      );
      -webkit-mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      animation: border-spin 2.5s linear infinite;
      pointer-events: none;
    }
  `}</style>

      <MobileQuestionCta
        label="Planning a residence, retreat, or civic space?"
        icon={<Megaphone className="h-5 w-5" />}
        href="#contact"
        primary
        delay={0.68}
        innerClassName="border-beam-mobile"
        innerStyle={{ "--beam-color": "#B08D57" } as React.CSSProperties}
      >
        Architecture <ArrowUpRight className="h-4 w-4" />
      </MobileQuestionCta>

      <MobileQuestionCta
        label="Need interiors, planning, or adaptive reuse?"
        icon={<Rocket className="h-5 w-5" />}
        href="#contact"
        delay={0.78}
        innerClassName="border-beam-mobile"
        innerStyle={{ "--beam-color": "#7A8465" } as React.CSSProperties}
      >
        Interiors
      </MobileQuestionCta>
    </div>

    <div className="relative hidden min-h-[310px] w-full grid-rows-[1fr_auto] pt-2 md:grid">
      <QuestionCallout
        label="Planning a residence, retreat, or civic space?"
        icon={<Megaphone className="h-5 w-5" />}
        className="left-0 top-0"
      />
      <QuestionCallout
        label="Need interiors, planning, or adaptive reuse?"
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
        <style>{`
    @keyframes border-spin {
      to { --border-angle: 360deg; }
    }
    @property --border-angle {
      syntax: "<angle>";
      inherits: false;
      initial-value: 0deg;
    }
    .border-beam {
      position: relative;
      border-radius: 9999px;
    }
    .border-beam::before {
      content: "";
      position: absolute;
      inset: -2px;
      border-radius: inherit;
      padding: 2px;
      background: conic-gradient(
        from var(--border-angle),
        transparent 70%,
        var(--beam-color, #B08D57) 88%,
        transparent 100%
      );
      -webkit-mask:
        linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      animation: border-spin 2.5s linear infinite;
      pointer-events: none;
    }
  `}</style>

        <div className="border-beam" style={{ "--beam-color": "#B08D57" } as React.CSSProperties}>
          {" "}
          <a
            href="#contact"
            className="inline-flex min-w-44 items-center justify-center gap-2 rounded-full bg-ink px-8 py-3.5 font-semibold text-cream lift"
          >
            Architecture <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="border-beam" style={{ "--beam-color": "#7A8465" } as React.CSSProperties}>
          <a
            href="#contact"
            className="inline-flex min-w-44 items-center justify-center gap-2 rounded-full border-2 border-ink bg-background px-8 py-3.5 font-semibold text-foreground lift"
          >
            Interiors
          </a>
        </div>
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
  { k: "180+", v: "Spaces delivered" },
  { k: "35+", v: "Active commissions" },
  { k: "12+", v: "Cities studied" },
  { k: "2M+", v: "Sq ft shaped" },
  { k: "96%", v: "Client retention" },
];

const workProjects = [
  {
    name: "Northline Courtyard House",
    role: "Residential · Bengaluru",
    outcome: "A climate-responsive family residence organized around light, privacy, and craft.",
    tags: ["Architecture", "Interiors", "Landscape"],
    color: "bg-surface-5",
  },
  {
    name: "Tessera Workclub",
    role: "Commercial interiors · Mumbai",
    outcome:
      "A refined workplace concept balancing hospitality, acoustic comfort, and flexible planning.",
    tags: ["Workplace", "Materiality", "Strategy"],
    color: "bg-accent",
  },
  {
    name: "Harbor Edge Masterplan",
    role: "Urban design · Waterfront",
    outcome: "A civic waterfront framework connecting public space, mixed-use anchors, and transit.",
    tags: ["Urban Design", "Public Realm", "Mobility"],
    color: "bg-surface-3",
  },
];

const serviceOfferings = [
  {
    title: "Architecture",
    description: "Concept, planning, and detailing for residential, commercial, and cultural buildings.",
    icon: Target,
    accent: "from-orange-500 to-amber-500",
  },
  {
    title: "Interior Design",
    description: "Measured interiors shaped through material research, proportion, lighting, and craft.",
    icon: Layers,
    accent: "from-sky-500 to-cyan-500",
  },
  {
    title: "Urban Planning",
    description: "Public-realm, mobility, and mixed-use strategies for resilient urban environments.",
    icon: Sparkles,
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    title: "Sustainable Design",
    description: "Low-impact design decisions that improve comfort, performance, and long-term value.",
    icon: Brain,
    accent: "from-emerald-500 to-lime-500",
  },
];

/* -- Custom Portfolio Datasets -- */
const categoryColors: Record<string, { badge: string; border: string; text: string }> = {
  Residential: {
    badge: "bg-red-500/10 border-red-500/20",
    border: "border-red-500/40",
    text: "text-red-400",
  },
  "Interior Design": {
    badge: "bg-purple-500/10 border-purple-500/20",
    border: "border-purple-500/40",
    text: "text-purple-400",
  },
  Architecture: {
    badge: "bg-blue-500/10 border-blue-500/20",
    border: "border-blue-500/40",
    text: "text-blue-400",
  },
  Sustainability: {
    badge: "bg-green-500/10 border-green-500/20",
    border: "border-green-500/40",
    text: "text-green-400",
  },
  "Design Narrative": {
    badge: "bg-orange-500/10 border-orange-500/20",
    border: "border-orange-500/40",
    text: "text-orange-400",
  },
  Masterplanning: {
    badge: "bg-amber-500/10 border-amber-500/20",
    border: "border-amber-500/40",
    text: "text-amber-400",
  },
  "Site Analysis": {
    badge: "bg-cyan-500/10 border-cyan-500/20",
    border: "border-cyan-500/40",
    text: "text-cyan-400",
  },
  "Urban Planning": {
    badge: "bg-indigo-500/10 border-indigo-500/20",
    border: "border-indigo-500/40",
    text: "text-indigo-400",
  },
  "Commercial Design": {
    badge: "bg-teal-500/10 border-teal-500/20",
    border: "border-teal-500/40",
    text: "text-teal-400",
  },
  Hospitality: {
    badge: "bg-pink-500/10 border-pink-500/20",
    border: "border-pink-500/40",
    text: "text-pink-400",
  },
};

const heroShowcaseSlides = [
  {
    categoryLabel: "RESIDENTIAL",
    title: "Courtyard Residence",
    description:
      "A warm, inward-looking home shaped around daylight, stone, and quiet thresholds.",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    poster: screenshot2,
    glow: "shadow-red-950/40",
    ctaText: "View Project",
    ctaLink: "#portfolio",
  },
  {
    categoryLabel: "COMMERCIAL",
    title: "Boutique Workplace",
    description:
      "A flexible studio workplace with layered acoustics, hospitality cues, and custom joinery.",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    poster: screenshot1,
    glow: "shadow-blue-950/40",
    ctaText: "View Project",
    ctaLink: "#portfolio",
  },
  {
    categoryLabel: "INTERIORS",
    title: "Gallery Apartment",
    description:
      "A restrained interior study balancing collected art, natural texture, and precise detailing.",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    poster: screenshot2,
    glow: "shadow-purple-950/40",
    ctaText: "View Project",
    ctaLink: "#portfolio",
  },
  {
    categoryLabel: "URBAN DESIGN",
    title: "Waterfront Framework",
    description:
      "A public-realm proposal connecting mixed-use edges, shaded walks, and civic gathering.",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    poster: screenshot3,
    glow: "shadow-teal-950/40",
    ctaText: "View Project",
    ctaLink: "#portfolio",
  },
  {
    categoryLabel: "HOSPITALITY",
    title: "Retreat Pavilion",
    description:
      "A compact hospitality pavilion designed for landscape immersion and low-impact construction.",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    poster: screenshot4,
    glow: "shadow-pink-950/40",
    ctaText: "View Project",
    ctaLink: "#portfolio",
  },
];

const videoEditingSlides = [
  {
    categoryLabel: "RESIDENTIAL",
    title: "Dawn House Study",
    description: "A cinematic walkthrough of a residence tuned for morning light and cross-ventilation.",
    outcome: "Passive cooling strategy",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    poster: screenshot5,
    accentColor: "from-red-950/90",
  },
  {
    categoryLabel: "COMMERCIAL",
    title: "Studio Atrium Sequence",
    description: "A spatial film tracing material transitions through a compact creative workplace.",
    outcome: "Adaptive workplace plan",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    poster: screenshot6,
    accentColor: "from-rose-950/90",
  },
  {
    categoryLabel: "INTERIORS",
    title: "Quiet Gallery Interior",
    description: "A measured visual study of built-in storage, art walls, and soft natural finishes.",
    outcome: "Bespoke joinery package",
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    poster: screenshot1,
    accentColor: "from-red-900/90",
  },
  {
    categoryLabel: "URBAN DESIGN",
    title: "Public Edge Walkthrough",
    description: "A concise urban sequence showing shaded crossings, planted edges, and civic nodes.",
    outcome: "Pedestrian-first framework",
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

// ===== UPDATED GRAPHIC DESIGN SLIDES WITH YOUR THUMBNAILS =====
const fallbackGraphicDesignSlides: VisualAssetSlide[] = [
  {
    categoryLabel: "INTERIOR DESIGN",
    subcategory: "Concept Study",
    title: "Layered Residential Material Study",
    description:
      "A warm interior palette study pairing stone, timber, plaster, and measured daylight.",
    image: story7,
  },
  {
    categoryLabel: "ARCHITECTURE",
    subcategory: "Facade",
    title: "Tactile Facade Prototypes",
    description:
      "Material mockups exploring depth, shadow, and weathering across a refined street elevation.",
    image: story8,
  },
  {
    categoryLabel: "URBAN DESIGN",
    subcategory: "Public Realm",
    title: "Civic Streetscape Studies",
    description:
      "Compact public-realm studies for shaded movement, seating, planting, and storefront rhythm.",
    image: story9,
  },
  {
    categoryLabel: "COMMERCIAL DESIGN",
    subcategory: "Retail",
    title: "Flagship Retail Threshold",
    description: "A precise entry sequence balancing display, circulation, and tactile brand experience.",
    image: thumbnail2,
  },
  {
    categoryLabel: "HOSPITALITY",
    subcategory: "Hospitality",
    title: "Pure Earth Stay - Guest Suite Concept",
    description: "A calm hospitality interior built around natural finishes, filtered light, and comfort.",
    image: thumbnail3,
  },
  {
    categoryLabel: "ARCHITECTURE",
    subcategory: "Construction",
    title: "Clarity First - Construction Follows",
    description: "A disciplined site communication system for precise sequencing and build quality.",
    image: thumbnail4,
  },
  {
    categoryLabel: "HOSPITALITY",
    subcategory: "Guest Room",
    title: "Step Into a Quiet Guest Room",
    description: "A warm hotel room concept centered on proportion, texture, and restful detail.",
    image: thumbnail5,
  },
  {
    categoryLabel: "MASTERPLANNING",
    subcategory: "Modernization",
    title: "Adaptive Campus Systems",
    description: "A modernization framework for phased campus growth and connected outdoor rooms.",
    image: thumbnail1,
  },
  {
    categoryLabel: "COMMERCIAL DESIGN",
    subcategory: "Workplace",
    title: "Corporate Workplace System",
    description: "A spatial identity system for meeting suites, team hubs, and focused work zones.",
    image: thumbnail7,
  },
  {
    categoryLabel: "URBAN DESIGN",
    subcategory: "Modernization",
    title: "Sky-Line Visual Identity",
    description: "A refined skyline study for architecture, real estate, and urban innovation.",
    image: thumbnail9,
  },
  {
    categoryLabel: "ARCHITECTURE",
    subcategory: "Vision",
    title: "Built on Vision",
    description: "A concept package for contemporary architecture shaped by craft and restraint.",
    image: thumbnail10,
  },
  {
    categoryLabel: "HOSPITALITY",
    subcategory: "Modernization",
    title: "Cozy Hotel Room Interior",
    description: "Hospitality design with a modern, welcoming spatial language.",
    image: thumbnail6,
  },
];

const seoAnalyticsSlides = [
  {
    categoryLabel: "SUSTAINABILITY",
    title: "Passive Performance Strategy",
    description:
      "Environmental studies shaping daylight, shading, ventilation, and long-term operating comfort.",
    metrics: [
      { label: "Cooling Load Reduction", value: "-28%" },
      { label: "Daylit Work Areas", value: "82%" },
    ],
    poster: screenshot5,
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    accent: "from-green-950/40",
  },
  {
    categoryLabel: "SITE ANALYSIS",
    title: "Urban Context Audit",
    description:
      "A rigorous study of movement, edges, views, landscape, and constraints before concept design.",
    metrics: [
      { label: "Access Points Mapped", value: "14" },
      { label: "Public Realm Gain", value: "+38%" },
    ],
    poster: screenshot6,
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    accent: "from-cyan-950/40",
  },
  {
    categoryLabel: "MATERIAL RESEARCH",
    title: "Material Lifecycle Study",
    description:
      "Comparative material research focused on durability, embodied carbon, sourcing, and craft.",
    metrics: [
      { label: "Reused Material Share", value: "35%" },
      { label: "Local Sourcing Radius", value: "120km" },
    ],
    poster: screenshot3,
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    accent: "from-emerald-950/40",
  },
  {
    categoryLabel: "BUILDING PERFORMANCE",
    title: "Envelope Optimization",
    description:
      "Facade, glazing, and shading studies tuned for comfort, energy demand, and visual clarity.",
    metrics: [
      { label: "Solar Gain Reduction", value: "-31%" },
      { label: "Thermal Comfort Hours", value: "+46%" },
    ],
    poster: screenshot4,
    video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    accent: "from-blue-950/40",
  },
];

const consultingCases = [
  {
    categoryLabel: "MASTERPLANNING",
    title: "Mixed-Use District Framework",
    challenge:
      "A dense urban site needed a coherent framework for housing, retail, mobility, and civic space.",
    solution:
      "Developed a phased masterplan with active edges, shaded pedestrian routes, and flexible development parcels.",
    execution:
      "Built urban massing studies, public-realm sections, mobility diagrams, and implementation guidelines.",
    results: [
      { label: "Public Realm Increase", value: "+42%" },
      { label: "Walkable Frontage", value: "1.8km" },
      { label: "Phasing Packages", value: "4" },
    ],
  },
  {
    categoryLabel: "ADAPTIVE REUSE",
    title: "Warehouse-to-Studio Conversion",
    challenge:
      "An industrial shell needed to become a refined creative workplace without erasing its existing character.",
    solution:
      "Preserved the structural rhythm while inserting warm workspaces, shared studios, and daylight-led gathering zones.",
    execution:
      "Produced reuse audits, service coordination, material samples, and construction-ready detail packages.",
    results: [
      { label: "Structure Retained", value: "88%" },
      { label: "Embodied Carbon Saved", value: "31%" },
      { label: "New Studio Capacity", value: "120" },
    ],
  },
];

const editorialContent = [
  {
    categoryLabel: "Technical Writing",
    type: "Architectural Specifications",
    headline: "High-Performance Building Envelope Specification Guide",
    metrics: "Specification Standards",
    excerpt:
      "Comprehensive technical specifications for high-performance building facades including thermal break systems, curtain wall detailing, air barrier installation, and condensation analysis for mixed-humidity climate zones...",
  },
  {
    categoryLabel: "Feasibility Study",
    type: "Site Development Report",
    headline: "Mixed-Use Development Feasibility and Massing Report",
    metrics: "Planning Review",
    excerpt:
      "A structured assessment of site capacity, access, zoning controls, parking demand, phasing, and development yield to guide early investment and planning decisions...",
  },
  {
    categoryLabel: "Environmental",
    type: "Impact Assessment",
    headline: "Daylight, Ventilation, and Environmental Performance Report",
    metrics: "Sustainability Review",
    excerpt:
      "Performance-led reporting covering solar exposure, daylight autonomy, natural ventilation paths, shading strategy, material impact, and recommendations for reduced operational demand...",
  },
  {
    categoryLabel: "Construction",
    type: "Tender Documentation",
    headline: "Detailed Construction Notes and Vendor Scope Package",
    metrics: "Tender Ready",
    excerpt:
      "Clear technical notes, schedules, execution standards, and vendor scope definitions prepared to reduce ambiguity during pricing, procurement, and site coordination...",
  },
];

function DiscoveryCallDialog() {
  const hostEmail = "Architects@imaginedesignstudios.com";
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
      "Studio consultation request from Imagine Design Studio website",
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
          <Phone className="h-4 w-4" /> Book a studio consultation
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
              Studio consultation
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Share a few details about your project. Your mail app opens with the brief ready.
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
                Project brief <span className="text-muted-foreground">(optional)</span>
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
                <Send className="h-4 w-4" /> Send brief
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

const capabilities = [
  {
    icon: Target,
    t: "Architecture",
    k: "01",
    d: "Ground-up residential, commercial, and cultural buildings shaped through context, proportion, and detail.",
    chips: ["Concept Design", "Planning", "Detailing"],
    metric: "3x",
    metricLabel: "design options",
    bg: "bg-accent",
    span: "md:col-span-2 md:row-span-2",
    big: true,
  },
  {
    icon: PenTool,
    t: "Interior Design",
    k: "02",
    d: "Calm, tactile interiors resolved through material palettes, lighting, furniture, and custom joinery.",
    chips: ["Materiality", "Lighting", "Furniture"],
    metric: "35%",
    metricLabel: "local sourcing",
    bg: "bg-surface-1 dark:bg-[#ECE8E1]",
    span: "",
  },
  {
    icon: Sparkles,
    t: "Urban Planning",
    k: "03",
    d: "District, campus, and public-realm strategies that connect movement, landscape, density, and civic life.",
    chips: ["Masterplans", "Mobility", "Public Realm"],
    metric: "+312%",
    metricLabel: "public realm",
    bg: "bg-surface-2 dark:bg-[#D6D2CB]",
    span: "",
  },
  {
    icon: Brain,
    t: "Sustainable Design",
    k: "04",
    d: "Performance-led design that reduces demand, extends building life, and improves daily comfort.",
    chips: ["Energy Study", "Adaptive Reuse", "Material Audit"],
    metric: "85%",
    metricLabel: "daylit areas",
    bg: "bg-surface-3 dark:bg-[#F7F5F2]",
    span: "md:col-span-2",
  },
];

const steps = [
  {
    n: "01",
    t: "Listen",
    d: "Client ambitions, site conditions, constraints, and opportunities are mapped with care.",
    icon: Search,
    color: "bg-accent",
  },
  {
    n: "02",
    t: "Frame",
    d: "Program, budget, approvals, sustainability goals, and design priorities are aligned.",
    icon: Lightbulb,
    color: "bg-surface-3 dark:bg-[#F7F5F2]",
  },
  {
    n: "03",
    t: "Concept",
    d: "Spatial ideas, massing, material direction, and atmosphere are developed together.",
    icon: Layers,
    color: "bg-surface-4 dark:bg-[#B08D57]",
  },
  {
    n: "04",
    t: "Resolve",
    d: "Plans, sections, details, specifications, and consultants are coordinated for buildability.",
    icon: Rocket,
    color: "bg-surface-2 dark:bg-[#D6D2CB]",
  },
  {
    n: "05",
    t: "Deliver",
    d: "Tender, site review, procurement, and handover are guided with consistent studio attention.",
    icon: LineChart,
    color: "bg-surface-6 dark:bg-[#6F7377]",
  },
  {
    n: "06",
    t: "Refine",
    d: "Post-occupancy feedback informs improvements and future phases.",
    icon: Repeat,
    color: "bg-accent",
  },
];

const cases = [
  {
    name: "Courtyard Residence",
    sector: "Residential · India",
    year: "2025",
    word: "COURT",
    color: "bg-accent",
    problem: "A compact urban plot required privacy, daylight, and passive cooling.",
    metrics: [
      { k: "42%", v: "Open space" },
      { k: "3", v: "Courtyards" },
      { k: "-28%", v: "Cooling load" },
    ],
    tags: ["Residence", "Courtyard", "Passive"],
    rot: -1.4,
  },
  {
    name: "Wellness Clinic",
    sector: "Healthcare · APAC",
    year: "2025",
    word: "CLINIC",
    color: "bg-surface-4 dark:bg-[#B08D57]",
    problem: "A clinical program needed warmth, privacy, and operational clarity.",
    metrics: [
      { k: "18", v: "Rooms" },
      { k: "65%", v: "Daylit zones" },
      { k: "8wk", v: "Concept stage" },
    ],
    tags: ["Healthcare", "Interiors", "Wayfinding"],
    rot: 1.6,
  },
  {
    name: "Adaptive Warehouse",
    sector: "Workplace · EU",
    year: "2024",
    word: "REUSE",
    color: "bg-surface-3 dark:bg-[#F7F5F2]",
    problem: "A former warehouse needed to become a refined creative workplace.",
    metrics: [
      { k: "88%", v: "Structure kept" },
      { k: "100%", v: "New services" },
      { k: "+540sqm", v: "Shared studios" },
    ],
    tags: ["Reuse", "Workplace", "Low Carbon"],
    rot: -1.8,
  },
  {
    name: "Harbor Edge Plan",
    sector: "Urban Design · AU",
    year: "2024",
    word: "HARBOR",
    color: "bg-surface-5 dark:bg-[#7A8465]",
    problem: "A waterfront district needed civic space, shade, and mixed-use activation.",
    metrics: [
      { k: "1.2km", v: "Waterfront" },
      { k: "9", v: "Civic nodes" },
      { k: "40%", v: "Public edge" },
    ],
    tags: ["Masterplan", "Mobility", "Public Realm"],
    rot: 1.2,
  },
];

const engagements = [
  {
    icon: Zap,
    t: "Study",
    k: "2–4 wks",
    d: "A focused design study for feasibility, site potential, or material direction.",
    bullets: ["Site review", "Concept options", "Clear scope"],
    bg: "bg-surface-3 dark:bg-[#F7F5F2]",
    rot: -1.2,
    tag: "Focused",
  },
  {
    icon: InfinityIcon,
    t: "Commission",
    k: "Monthly",
    d: "A complete architecture or interior commission from concept through handover.",
    bullets: ["Design reviews", "Consultant coordination", "Site support"],
    bg: "bg-accent",
    rot: 0,
    tag: "Most complete",
    popular: true,
  },
  {
    icon: Flame,
    t: "Masterplan",
    k: "6–12 wks",
    d: "Strategic planning for campuses, districts, hospitality precincts, and mixed-use sites.",
    bullets: ["Phased milestones", "Cross-discipline", "Guideline package"],
    bg: "bg-surface-2 dark:bg-[#D6D2CB]",
    rot: 1.4,
    tag: "Most strategic",
  },
];

const filmReels = instagramPosts.slice(0, 4).map((post, i) => ({
  tag: ["Residence / Reel", "Studio Process", "Model Study", "Site Walk"][i] || "Reel",
  category: ["Residential", "Process", "Studio", "Site"][i] || "Reel",
  title: ["Courtyard Light", "Material Review", "Model Table", "Street Section"][i] || "Reel",
  description:
    [
      "A short study of daylight, threshold, and movement through a home.",
      "A quiet look at material samples, drawings, and studio critique.",
      "A close view of massing models, site grain, and proportion.",
      "Street-level observations of shade, edge, and public life.",
    ][i] || "Reel",
  src: post.url,
  poster: "",
}));

/* -- Core Capabilities Section -- */

type CmsItem = Record<string, unknown>;
type ReelItem = Partial<{
  tag: string;
  category: string;
  categoryLabel: string;
  title: string;
  description: string;
  url: string;
  poster: string;
}>;

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
        categoryLabel: asString(item.categoryLabel, "RESIDENTIAL"),
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
        categoryLabel: asString(item.categoryLabel, "RESIDENTIAL"),
        title: asString(item.title, `Study ${index + 1}`),
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
        categoryLabel: asString(item.categoryLabel, "INTERIOR DESIGN"),
        subcategory: asString(item.subcategory),
        title: asString(item.title, `Study ${index + 1}`),
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
function normalizeSeoAnalytics(items: CmsItem[]): SeoAnalyticsSlide[] {
  return items.length
    ? items.map((item, index) => ({
        categoryLabel: asString(item.categoryLabel, "SUSTAINABILITY"),
        title: asString(item.title, `Study ${index + 1}`),
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
        categoryLabel: asString(item.categoryLabel, "MASTERPLANNING"),
        title: asString(item.title, `Case ${index + 1}`),
        challenge: asString(item.challenge),
        solution: asString(item.solution),
        execution: asString(item.execution),
        results: Array.isArray(item.results) ? parseLabelValuePairs(item.results) : [],
      }))
    : consultingCases;
}
function normalizeContentWriting(items: CmsItem[]): EditorialSlide[] {
  if (!items.length) return editorialContent;

  const normalized = items.map((item, index) => ({
        categoryLabel: asString(item.categoryLabel, "Design Narrative"),
        type: asString(item.type, `Item ${index + 1}`),
        headline: asString(item.headline),
        metrics: asString(item.metrics),
        excerpt: asString(item.excerpt),
      }));

  return [...normalized, ...editorialContent.slice(normalized.length)];
}
function normalizeReels(items: ReelItem[]) {
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

  return reels;
}
// ===== REPLACE YOUR EXISTING normalizeTestimonials FUNCTION WITH THIS =====
function normalizeTestimonials(items: CmsItem[]) {
  // If CMS items exist, use them
  if (items.length) {
    return items.map((item) => ({
      q: asString(item.quote),
      name: asString(item.author),
      co: asString(item.role),
      verified: asString(item.verified, "Verified"),
      stars: Math.max(1, Math.min(5, Number(item.stars) || 5)),
    }));
  }

  // Static fallback testimonial data
  return [
    {
      q: "Imagine Design Studio transformed our home with exceptional architecture and interior design. Their professionalism, attention to detail, and ability to bring our vision to life made the entire experience outstanding.",
      name: "Mohit Patel",
      co: "2 months ago",
      verified: "Verified",
      stars: 5,
    },
    {
      q: "The team perfectly brought my jewellery store vision to life. Their creativity, professionalism, and commitment to quality exceeded my expectations from start to finish.",
      name: "Nayan Bhargava",
      co: "3 months ago",
      verified: "Verified",
      stars: 5,
    },
    {
      q: "Their attention to detail and uncompromising quality made all the difference. The project was managed flawlessly, and the final result exceeded every expectation.",
      name: "Neelam Chawla",
      co: "2 months ago",
      verified: "Verified",
      stars: 5,
    },
    {
      q: "Their expertise, technical knowledge, and project management were worth every penny. They delivered a stunning modern home exactly as envisioned.",
      name: "Harish Jog",
      co: "3 months ago",
      verified: "Verified",
      stars: 5,
    },
    {
      q: "A highly creative and professional team delivering premium-quality architecture and interior design. I would confidently recommend them to anyone looking for exceptional design services.",
      name: "Darshan Kharniwal",
      co: "3 months ago",
      verified: "Verified",
      stars: 5,
    },
    {
      q: "Their creativity transformed my house into a beautifully designed home. Every detail reflects thoughtful planning, craftsmanship, and genuine dedication.",
      name: "Saddam Singh",
      co: "3 months ago",
      verified: "Verified",
      stars: 5,
    },
  ];
}

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?sca_esv=8841194606cfa8ed&sxsrf=APpeQnu2sgESES25OOUqIwho-CU5VUwfJw:1784180256581&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_-qspt8b1PX-uffAIi_5gCEA5e7btdNKAXGfGqeGcO6UJlZY8NE5K2CmeaGdovjyZrlTWc025BJDonxxq0kW7BlUhVIBLFMnYaBuWw3XaQWUGQqWIMGXT-NVjfmMK5gdVsQXXQjE7NBCZ9GOI3Dx99ibl5p4pAY386ZRNPOujiTEBesRhfc9ogXnlZmfsjZkmY1NtBhZxcvw2wsAWAdjt2mAbp1MivWicJDTosLhNxh0XDF-XeysKRPgh_3QLEQvrvuFkCUsKBBMUCrvL91QmX9rPy0O&q=%E0%A4%87%E0%A4%AE%E0%A5%88%E0%A4%9C%E0%A4%BF%E0%A4%A8+%E0%A4%A1%E0%A4%BF%E0%A4%9C%E0%A4%BE%E0%A4%87%E0%A4%A8+%E0%A4%B8%E0%A5%8D%E0%A4%9F%E0%A5%82%E0%A4%A1%E0%A4%BF%E0%A4%AF%E0%A5%8B+-+%E0%A4%AC%E0%A5%87%E0%A4%B8%E0%A5%8D%E0%A4%9F+%E0%A4%86%E0%A4%B0%E0%A5%8D%E0%A4%95%E0%A4%BF%E0%A4%9F%E0%A5%87%E0%A4%95%E0%A5%8D%E0%A4%9F+%E0%A4%87%E0%A4%A8+%E0%A4%87%E0%A4%82%E0%A4%A6%E0%A5%8C%E0%A4%B0+%E0%A4%B8%E0%A4%AE%E0%A5%80%E0%A4%95%E0%A5%8D%E0%A4%B7%E0%A4%BE%E0%A4%8F%E0%A4%82&sa=X&ved=2ahUKEwjwkqKzvdaVAxUBVmwGHSS2DtsQ0bkNegQILhAI&biw=1920&bih=869&dpr=1";

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

  const visibleReels = filteredReels.slice(0, 8);

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
      <div className="relative mx-auto max-w-6xl px-5 py-2">
        <div className="mb-8 flex flex-col justify-center  items-end text-center gap-1 ">
          <div>
            <span className="script text-3xl text-accent">Studio Films</span>
            <h2 className="font-display text-3xl font-bold leading-[1.04] md:text-6xl">
              Quiet <em className="text-accent">films</em> that bring
              <br />
              <em>space</em>, material & light into one clear story.
            </h2>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <p className="max-w-sm text-foreground/70 md:text-right"></p>
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
                  View All Films <ArrowUpRight className="h-4 w-4" />
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
                    className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                      selected
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
            <span className="sr-only">Search films</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/45" />
            <Input
              value={reelSearch}
              onChange={(event) => setReelSearch(event.target.value)}
              placeholder="Search films"
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
              ? Array.from({ length: Math.min(Math.max(visibleReels.length, 4), 6) }).map(
                  (_, i) => (
                    <div
                      key={`reel-skeleton-${i}`}
                      className="aspect-[9/16] animate-pulse rounded-2xl border border-ink/10 bg-card/80 shadow-[0_22px_60px_-38px_rgba(0,0,0,0.5)] dark:border-white/10 dark:bg-white/5"
                    >
                      <div className="h-full rounded-2xl bg-gradient-to-b from-foreground/10 via-foreground/5 to-foreground/15" />
                    </div>
                  ),
                )
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
              <p className="font-display text-2xl font-bold">No films found</p>
              <p className="mx-auto mt-2 max-w-md text-sm text-foreground/60">
                Try another category or clear the search to return to the full studio film archive.
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

/* -- Engagement Models -- */
function FlexibleSection({ items = engagements }: { items?: typeof engagements }) {
  return (
    <section id="engage" className="relative mx-auto max-w-7xl px-5 py-10 md:py-24">
      <div className="mb-12 grid items-end gap-6 border-b border-border pb-8 md:grid-cols-[1fr_auto]">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-highlight">
            how we work
          </span>
          <h2 className="font-display text-4xl font-bold leading-[1.02] md:text-7xl">
            Flexible by <span className="italic">Design</span>
            <span className="text-accent">.</span>
          </h2>
        </div>
        <p className="max-w-sm text-base text-foreground/70 md:text-right">
          Engage the studio for a focused study, a full commission, or a strategic masterplan.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {items.map((e, i) => (
          <motion.div
            key={e.t}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 90 }}
            className={`relative flex min-h-full flex-col border border-border bg-card p-7 text-card-foreground shadow-[0_22px_70px_-55px_rgba(0,0,0,0.55)] dark:border-white/10 dark:bg-[#2E3135]/95 ${e.popular ? "md:-mt-4" : ""}`}
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-highlight/70" />
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mb-8 flex h-12 w-12 items-center justify-center border border-border bg-background text-highlight dark:border-white/10 dark:bg-white/5"
            >
              <e.icon className="h-7 w-7" />
            </motion.div>
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-3xl font-bold leading-none">{e.t}</h3>
              <span className="inline-flex items-center gap-1 border border-border bg-background px-2 py-1 text-xs font-semibold text-muted-foreground dark:border-white/10 dark:bg-white/5">
                <Clock className="h-3 w-3" />
                {e.k}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{e.d}</p>
            <div className="mt-5 w-fit border border-highlight/35 bg-highlight/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-highlight">
              {e.tag}
            </div>
            <ul className="mt-7 space-y-3 border-t border-border pt-5 dark:border-white/10">
              {e.bullets.map((b, j) => (
                <motion.li
                  key={b}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + j * 0.06 }}
                  className="flex items-center gap-3 text-sm font-medium text-foreground/80 dark:text-gray-200"
                >
                  <span className="flex h-7 w-7 items-center justify-center border border-border bg-background text-highlight dark:border-white/10 dark:bg-white/5">
                    <TrendingUp className="h-3 w-3" />
                  </span>
                  {b}
                </motion.li>
              ))}
            </ul>
            <a
              href="#contact"
              className="mt-auto inline-flex items-center justify-center gap-2 border border-ink bg-ink px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-highlight hover:text-ink dark:border-white/10"
            >
              Discuss {e.t.toLowerCase()} <ArrowUpRight className="h-4 w-4" />
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
    lever: "Spatial Value",
    solution: "Program clarity, efficient planning, and durable material strategy",
    outcome: "Higher usable area and stronger long-term asset quality",
  },
  {
    lever: "Lifecycle Cost",
    solution: "Envelope performance, service coordination, and material durability",
    outcome: "Lower maintenance and operating demand",
  },
  {
    lever: "Design Certainty",
    solution: "Clear drawings, consultant alignment, and staged approvals",
    outcome: "Fewer site conflicts and cleaner execution",
  },
  {
    lever: "Environmental Comfort",
    solution: "Daylight, shade, ventilation, and passive performance studies",
    outcome: "Improved comfort with reduced energy demand",
  },
  {
    lever: "Client Collaboration",
    solution: "Structured reviews, visual options, and transparent decision logs",
    outcome: "Faster decisions with stronger design alignment",
  },
  {
    lever: "Delivery Quality",
    solution: "Tender support, site review, mockups, and detail resolution",
    outcome: "Better craftsmanship from concept to handover",
  },
];

function ROISection() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-24">
      <div className="mb-12 grid gap-5 md:grid-cols-[0.95fr_1fr] md:items-end">
        <div>
        <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-highlight">
          The Value
        </span>
        <h2 className="font-display text-4xl font-bold leading-[1.02] md:text-7xl">
          Design & Value <span className="italic">Realisation</span>
          <span className="text-accent">.</span>
        </h2>
        </div>
        <p className="max-w-xl text-foreground/70 md:justify-self-end">
          Practical outcomes from a disciplined design process.
        </p>
      </div>

      <div className="overflow-hidden border border-border bg-card shadow-[0_24px_80px_-60px_rgba(0,0,0,0.55)] dark:border-white/10 dark:bg-[#2E3135]/95">
        <div className="hidden grid-cols-3 border-b border-border bg-ink px-6 py-4 text-[10px] font-bold uppercase tracking-[0.25em] text-cream dark:border-white/10 md:grid">
          <span>Design Lever</span>
          <span>Studio Response</span>
          <span>Documented Outcome</span>
        </div>
        {roiRows.map((r, i) => (
          <motion.div
            key={r.lever}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className={`grid gap-4 border-b border-border px-6 py-5 last:border-b-0 dark:border-white/10 md:grid-cols-3 ${i % 2 === 0 ? "bg-background" : "bg-surface"}`}
          >
            <span className="font-display text-lg font-semibold md:text-sm">{r.lever}</span>
            <span className="text-sm leading-relaxed text-foreground/70">{r.solution}</span>
            <span className="border-l-2 border-highlight pl-4 text-sm font-semibold leading-relaxed text-foreground md:border-l md:border-border md:pl-5 dark:md:border-white/10">
              {r.outcome}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* -- Trust / Partners strip -- */
const partners = [
  "Architecture",
  "Interiors",
  "Urban Design",
  "Sustainability",
  "Craft",
  "Research",
];

function TrustSection() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-8">
      <p className="mb-5 text-xs font-bold uppercase tracking-[0.32em] text-foreground/45">
        Disciplines integrated by the studio
      </p>
      <div className="grid border-y border-border dark:border-white/10 sm:grid-cols-2 lg:grid-cols-6">
        {partners.map((p, i) => (
          <motion.span
            key={p}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="border-b border-border px-4 py-5 font-display text-sm font-semibold uppercase tracking-[0.14em] text-foreground/75 last:border-b-0 dark:border-white/10 sm:border-r sm:last:border-r-0 lg:border-b-0"
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
    <div className="py-2 overflow-x-hidden" id="work">
      <div className="mb-2 text-center px-5">
        <span className="script text-3xl text-accent">{content.eyebrow}</span>
        <h2 className="mt-3 font-display text-3xl font-bold md:text-6xl tracking-tight text-foreground dark:text-white">
          {content.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-foreground/65 dark:text-gray-400">
          {content.description}
        </p>
      </div>
      <FlankCarousel slides={items} />
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
  const bannerScrollRef = useRef<HTMLDivElement>(null);

  // ====== ASPECT RATIO DETECTION STATE ======
  // Maps image URL ? true (banner/landscape) | false (portrait)
  const [bannerMap, setBannerMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    items.forEach((slide) => {
      if (!slide.image || slide.image in bannerMap) return;
      const img = new Image();
      img.onload = () => {
        const isBanner = img.naturalWidth > img.naturalHeight;
        setBannerMap((prev) => ({ ...prev, [slide.image]: isBanner }));
      };
      img.src = slide.image;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  // Split based on detected aspect ratio (default to portrait until loaded)
  const bannerItems = useMemo(
    () => items.filter((s) => bannerMap[s.image] === true),
    [items, bannerMap],
  );
  // ====== END ASPECT RATIO DETECTION ======

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
  // ====== END FILTER STATE ======

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -400, behavior: "smooth" });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 400, behavior: "smooth" });
  const scrollBannerLeft = () =>
    bannerScrollRef.current?.scrollBy({ left: -520, behavior: "smooth" });
  const scrollBannerRight = () =>
    bannerScrollRef.current?.scrollBy({ left: 520, behavior: "smooth" });

  return (
    <div className="overflow-x-clip my-8 py-10">
      {/* ----------- HEADER ----------- */}
      <div className="mx-auto max-w-6xl px-5 mb-6 md:mb-8 flex flex-col  items-end justify-center gap-4">
        <div className="w-full flex flex-col justify-center items-center text-center">
          <span className="script text-3xl text-purple-600 dark:text-purple-400">
            {content.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-6xl tracking-tight text-foreground dark:text-white">
            {content.title}
          </h2>
          <p className="mt-4 max-w-2xl text-center text-foreground/65 dark:text-gray-400">
            {content.description}
          </p>
        </div>
        <div className="hidden md:flex gap-2">
          <button
            onClick={scrollLeft}
            aria-label="Scroll left"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-background/80 text-foreground hover:bg-accent/15 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 transition cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={scrollRight}
            aria-label="Scroll right"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-background/80 text-foreground hover:bg-accent/15 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 transition cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ----------- FILTER BAR ----------- */}
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
            <span className="sr-only">Search project studies</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/45" />
            <Input
              value={graphicSearch}
              onChange={(e) => setGraphicSearch(e.target.value)}
              placeholder="Search studies"
              className="h-10 rounded-full border-ink/15 bg-background/85 pl-9 text-sm shadow-none focus-visible:ring-purple-500/30 dark:border-white/10 dark:bg-white/5"
            />
          </label>
        </div>
      </div>

      {/* ----------- PORTRAIT CARD RAIL ----------- */}
      <div
        ref={scrollRef}
        onWheel={(e) => {
          if (!scrollRef.current || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
          e.preventDefault();
          scrollRef.current.scrollBy({ left: e.deltaY, behavior: "auto" });
        }}
        className="mx-auto flex max-w-full gap-5 overflow-x-auto px-5 py-4 md:gap-6 md:px-20 scrollbar-none snap-x snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >
        {isGraphicFiltering ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`skeleton-${i}`}
              className="relative shrink-0 w-[200px] aspect-[3/5] rounded-[1.25rem] border border-ink/10 bg-card/80 dark:border-white/10 dark:bg-white/5 animate-pulse"
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
              className="relative shrink-0 w-[200px] aspect-[4/5] rounded-[1.25rem] border border-ink/10 overflow-hidden bg-[#2E3135] snap-start shadow-[0_18px_50px_-32px_rgba(0,0,0,0.45)] dark:border-white/10 dark:bg-[#2E3135] cursor-pointer"
            >
              <img
                src={slide.image}
                alt={slide.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-contain"
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
                <h4 className="font-display text-sm md:text-base font-bold leading-tight text-white line-clamp-2">
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
            <p className="font-display text-xl font-bold text-foreground/60">No studies found</p>
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

      {/* ----------- BANNER SECTION (auto-detected, hidden if none) ----------- */}
      {bannerItems.length > 0 && (
        <div className="mt-12 border-t border-ink/8 pt-2 dark:border-white/8">
          {/* Banner header */}
          <div className="mx-auto max-w-6xl px-5 mb-6 flex items-end justify-end">
            {/* <div>
              <span className="script text-2xl text-purple-600 dark:text-purple-400">
                Wide Format
              </span>
              <h3 className="mt-2 font-display text-3xl font-bold md:text-4xl tracking-tight text-foreground dark:text-white">
                Banners &amp; Covers
              </h3>
              <p className="mt-2 text-sm text-foreground/55 dark:text-gray-400">
                Landscape artwork, social covers, and promotional banners
              </p>
            </div> */}
            <div className="hidden md:flex gap-2 shrink-0 ml-6">
              <button
                onClick={scrollBannerLeft}
                aria-label="Scroll banners left"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-background/80 text-foreground hover:bg-accent/15 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 transition cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={scrollBannerRight}
                aria-label="Scroll banners right"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-background/80 text-foreground hover:bg-accent/15 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 transition cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Banner rail */}
          <div
            ref={bannerScrollRef}
            onScroll={() => {
              const container = bannerScrollRef.current;
              if (!container || bannerItems.length === 0) return;

              const cardElement = container.children[0] as HTMLElement;
              if (!cardElement) return;

              const totalItemWidth = cardElement.offsetWidth + 20; // 20px is gap-5
              const boundaryWidth = totalItemWidth * bannerItems.length;

              // Instant boundary snapping for infinite loop effect
              if (container.scrollLeft <= 0) {
                container.scrollLeft = boundaryWidth;
              } else if (container.scrollLeft >= boundaryWidth * 2) {
                container.scrollLeft = boundaryWidth;
              }
            }}
            onWheel={(e) => {
              if (!bannerScrollRef.current || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
              e.preventDefault();
              bannerScrollRef.current.scrollLeft += e.deltaY;
            }}
            className="flex gap-5 overflow-x-auto px-5 py-4 md:gap-6 md:px-20 scrollbar-none snap-x snap-mandatory"
            style={{ scrollbarWidth: "none" }}
          >
            {/* Triple the items right inside the map to create the infinite scroll clones seamlessly */}
            {[...bannerItems, ...bannerItems, ...bannerItems].map((slide, idx) => (
              <motion.a
                key={idx}
                href={slide.detailUrl || slide.image}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -6, scale: 1.015 }}
                className="relative shrink-0 w-[min(82vw,560px)] aspect-[4/1] rounded-[1.25rem] border border-ink/10 overflow-hidden bg-[#2E3135] snap-start shadow-[0_20px_55px_-30px_rgba(0,0,0,0.6)] dark:border-white/10 dark:bg-[#2E3135] cursor-pointer"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-contain"
                />
                {/* subtle vignette only at bottom for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />

                {/* Category badge */}
                {slide.subcategory && (
                  <span className="absolute left-4 top-4 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 border-purple-500/40 text-purple-300 backdrop-blur-md">
                    {slide.subcategory}
                  </span>
                )}

                {/* "Banner" pill — top right */}
                <span className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[9px] font-mono text-white/70 backdrop-blur">
                  Banner
                </span>

                {/* Text overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h4 className="font-display text-base md:text-lg font-bold leading-tight text-white line-clamp-1">
                    {slide.title}
                  </h4>
                  <p className="mt-1 text-xs leading-5 text-white/70 line-clamp-1">
                    {slide.description}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      )}
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
          loop={true}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          modules={[Navigation]}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
          }}
          className="pb-12"
        >
          {items.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl h-full flex flex-col">
                <div className="relative h-48 md:h-56 lg:h-64 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-700 dark:to-gray-900 overflow-hidden">
                  <img
                    src={item.poster}
                    alt={item.title}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute top-4 right-8 bg-blue-600/40 text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
                    {item.categoryLabel || "SUSTAINABILITY"}
                  </div>
                </div>

                {/* Content Section - Bottom */}
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-foreground dark:text-white ">
                    {item.title}
                  </h3>
                  {/* <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-1">
                    {item.description}
                  </p> */}

                  <div className="grid grid-cols-2 gap-4  pt-2 border-t border-gray-200 dark:border-gray-700">
                    {item.metrics &&
                      item.metrics.map((metric, idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
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

        <button className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 p-3 rounded-full shadow-lg transition-all -ml-4 border border-gray-200 dark:border-gray-700">
          <svg
            className="w-5 h-5 text-gray-800 dark:text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button className="custom-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 p-3 rounded-full shadow-lg transition-all -mr-4 border border-gray-200 dark:border-gray-700">
          <svg
            className="w-5 h-5 text-gray-800 dark:text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
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
  return (
    <div className="relative overflow-x-clip py-10 md:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-24 h-px bg-border dark:bg-white/10" />
      <div className="mx-auto mb-12 grid max-w-6xl gap-6 px-5 text-center md:grid-cols-[0.9fr_1.1fr] md:items-end md:text-left">
        <div>
          <span className="inline-flex border border-highlight/40 bg-highlight/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-highlight">
            {content.eyebrow}
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-foreground dark:text-white md:text-6xl">
            {content.title}
          </h2>
        </div>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-foreground/65 dark:text-gray-400 md:mx-0 md:justify-self-end md:text-base">
          {content.description}
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-5">
        <div className="space-y-6">
        {items.map((cs, idx) => (
          <motion.article
            key={idx}
            whileHover={{ y: -4 }}
            className={`grid overflow-hidden border border-ink/10 shadow-[0_24px_70px_-50px_rgba(0,0,0,0.5)] dark:border-white/10 md:grid-cols-[minmax(10rem,0.32fr)_1fr] ${
              idx % 2 === 0 ? "bg-card" : "bg-background"
            } dark:bg-[#2E3135]/95`}
          >
            <div className="flex min-h-48 flex-col items-center justify-between bg-ink p-6 text-center text-cream dark:bg-white dark:text-ink md:items-start md:p-7 md:text-left">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.35em] opacity-70">
                  Case {String(idx + 1).padStart(2, "0")}
                </div>
                <div className="mt-6 font-display text-5xl font-black leading-none">
                  {String(idx + 1).padStart(2, "0")}
                </div>
              </div>
              <span className="mt-8 inline-flex w-fit border border-cream/30 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider dark:border-ink/25">
                {cs.categoryLabel}
              </span>
            </div>

            <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
              <div className="p-6 text-center md:p-8 md:text-left">
                <h3 className="mx-auto max-w-2xl font-display text-2xl font-bold leading-tight text-card-foreground dark:text-white md:mx-0 md:text-4xl">
                  {cs.title}
                </h3>

                <div className="mt-8 space-y-5 text-center md:text-left">
                  {[
                    ["Challenge", cs.challenge],
                    ["Solution", cs.solution],
                    ["Execution", cs.execution],
                  ].map(([label, copy]) => (
                    <div
                      key={label}
                      className="grid gap-3 border-border sm:grid-cols-[7.5rem_1fr] sm:text-left"
                    >
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.22em] text-highlight">
                        {label}
                      </h4>
                      <p className="text-sm leading-relaxed text-muted-foreground dark:text-gray-300">
                        {copy}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-ink/10 bg-ink/[0.035] p-6 text-center dark:border-white/10 dark:bg-white/[0.04] md:p-8 md:text-left lg:border-l lg:border-t-0">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.28em] text-muted-foreground dark:text-gray-400">
                  Key Results
                </h4>
                <div className="mt-6 grid gap-3">
                  {cs.results.map((res, ri) => (
                    <div
                      key={ri}
                      className="grid items-center gap-2 border-b border-ink/10 pb-4 last:border-b-0 last:pb-0 dark:border-white/10 sm:grid-cols-[0.9fr_1.1fr] sm:gap-4 sm:text-left"
                    >
                      <div className="font-display text-3xl font-black leading-none text-highlight md:text-4xl">
                        {res.value}
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground dark:text-gray-400">
                        {res.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>
        ))}
        </div>
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
            className="rounded-[2rem] border border-ink/10 bg-card p-6 shadow-[0_24px_70px_-45px_rgba(0,0,0,0.45)] md:p-4 flex flex-col justify-between relative dark:border-white/10 dark:bg-[#2E3135]/95 dark:shadow-2xl"
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
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,transparent_0%,color-mix(in_oklab,var(--accent)_7%,transparent)_12%,color-mix(in_oklab,var(--accent)_11%,transparent)_48%,color-mix(in_oklab,var(--accent)_7%,transparent)_82%,transparent_100%)] dark:bg-[linear-gradient(180deg,transparent_0%,color-mix(in_oklab,var(--accent)_8%,transparent)_12%,color-mix(in_oklab,var(--accent)_12%,transparent)_48%,color-mix(in_oklab,var(--accent)_8%,transparent)_82%,transparent_100%)]" />
      <div className="mx-auto max-w-6xl px-5 text-center mb-1">
        <span className="script text-3xl text-accent">{content.eyebrow}</span>
        <h2 className="mt-3 font-display text-xl font-bold md:text-6xl tracking-tight text-foreground">
          {content.title.split(" ")[0]}{" "}
          <span className="italic text-accent">{content.title.split(" ").slice(1).join(" ")}</span>
        </h2>
        {/* <p className="mx-auto mt-4 max-w-2xl text-foreground/65 text-lg">{content.description}</p> */}
      </div>
    </section>
  );
}

{/* ZIGZAG ABOUT SECTION - OPTIMIZED FOR ALL DEVICES */}
function PortfolioSectionAbout({
  content = DEFAULT_SITE.portfolio.overview,
}: {
  content?: PortfolioSectionCopy;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const dotTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const items = [
    {
      side: "right",
      eyebrow: "Who we are",
      title: "About Imagine Design Studio",
      body: "Imagine Design Studio is a contemporary architecture and interior design studio working across homes, workplaces, hospitality, and urban environments.",
      color: "#6F7377",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 sm:h-5 sm:w-5" stroke="white" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="7" />
          <circle cx="12" cy="12" r="2" fill="white" stroke="none" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
        </svg>
      ),
    },
    {
      side: "left",
      eyebrow: "What we do",
      title: "Architecture & Interiors",
      body: "We shape spaces through proportion, material intelligence, daylight, and precise detailing, from early concept through site execution.",
      color: "#B08D57",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 sm:h-5 sm:w-5" stroke="white" strokeWidth="2" strokeLinecap="round">
          <rect x="2" y="6" width="20" height="14" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
          <rect x="5" y="2" width="5" height="4" rx="1" fill="white" stroke="none" />
          <rect x="14" y="2" width="5" height="4" rx="1" fill="white" stroke="none" />
        </svg>
      ),
    },
    {
      side: "right",
      eyebrow: "How we work",
      title: "Context-Led Design",
      body: "From site reading to construction detail, every decision is grounded in climate, program, budget, and the daily life of the people who will use the space.",
      color: "#7A8465",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 sm:h-5 sm:w-5" stroke="white" strokeWidth="2" strokeLinecap="round">
          <path d="M4 20L12 6l8 14H4Z" />
          <line x1="12" y1="6" x2="12" y2="2" />
        </svg>
      ),
    },
    {
      side: "left",
      eyebrow: "Planning with purpose",
      title: "Urban & Commercial Strategy",
      body: "We develop clear spatial strategies for mixed-use sites, workplaces, hospitality environments, and public-facing destinations.",
      color: "#7A8465",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 sm:h-5 sm:w-5" stroke="white" strokeWidth="2" strokeLinecap="round">
          <rect x="2" y="2" width="8" height="8" rx="1" />
          <rect x="14" y="2" width="8" height="8" rx="1" />
          <rect x="2" y="14" width="8" height="8" rx="1" />
          <rect x="14" y="14" width="8" height="8" rx="1" />
        </svg>
      ),
    },
    {
      side: "right",
      eyebrow: "Our expertise",
      title: "Core Services",
      body: "Architecture · Interior Design · Urban Planning · Hospitality · Adaptive Reuse · Sustainable Design - all under one roof.",
      color: "#B08D57",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 sm:h-5 sm:w-5" stroke="white" strokeWidth="2" strokeLinecap="round">
          <polyline points="2,18 6,12 10,16 14,8 18,14 22,6" />
          <circle cx="22" cy="6" r="2" fill="white" stroke="none" />
        </svg>
      ),
    },
    {
      side: "left",
      eyebrow: "Built for craft",
      title: "Why Imagine Design Studio",
      body: "8+ years of thoughtful practice across planning, interiors, construction coordination, and client collaboration.",
      color: "#B08D57",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 sm:h-5 sm:w-5">
          <path d="M12 2l2.5 7h7l-5.5 4.5 2.5 7.5L12 17l-6.5 4 2.5-7.5L2 9h7z" fill="white" />
        </svg>
      ),
    },
  ];

  return (
    <section id="about" ref={containerRef} className="relative mx-auto max-w-5xl px-2 sm:px-5 py-6 sm:py-20">
      {/* Center spine line - visible on all devices */}
      <div className="absolute hidden md:block left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-border">
        <motion.div
          className="absolute hidden md:block left-1/2 w-1.5 h-1.5 sm:w-3 sm:h-3 -translate-x-1/2 rounded-full shadow-[0_0_10px_rgba(43,155,209,0.5)] z-20"
          style={{
            top: dotTop,
            backgroundColor: "#6F7377",
          }}
        />
      </div>

      {items.map((item, i) => {
        const isRight = item.side === "right";

        return (
          <div 
            key={i} 
            className="flex items-stretch mb-4 sm:mb-12 last:mb-0"
          >
            {isRight ? (
              // RIGHT SIDE CONTENT
              <>
                {/* Empty spacer */}
                <div className="flex-1" />
                
                {/* Spine connector */}
                <div className="flex flex-col items-center shrink-0 z-10 self-stretch px-1 sm:px-4">
                  <div className={`w-px flex-1 min-h-[20px] sm:min-h-[40px] bg-border ${i === 0 ? "opacity-0" : ""}`} />
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 + 0.1, type: "spring", stiffness: 200, damping: 16 }}
                    className="shrink-0 w-6 h-6 sm:w-14 sm:h-14 flex items-center justify-center"
                    style={{
                      background: item.color,
                      clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                    }}
                  >
                    {item.icon}
                  </motion.div>
                  <div className={`w-px flex-1 min-h-[20px] sm:min-h-[40px] bg-border ${i === 5 ? "opacity-0" : ""}`} />
                </div>

                {/* Content - Smaller on mobile */}
                <motion.div
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, type: "spring", stiffness: 80 }}
                  className="flex-[3] sm:flex-1 ml-2 sm:ml-6 rounded-lg sm:rounded-[1.5rem] border border-ink sm:border-2 bg-background p-2.5 sm:p-6 text-ink shadow-[2px_2px_0_0_var(--ink)] sm:shadow-[6px_6px_0_0_var(--ink)] dark:border-border dark:bg-card dark:text-card-foreground dark:shadow-[2px_2px_0_0_rgba(255,255,255,0.16)] sm:dark:shadow-[6px_6px_0_0_rgba(255,255,255,0.16)]"
                >
                  <p className="text-[7px] sm:text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.22em] text-foreground/40 mb-0.5 sm:mb-1">
                    {item.eyebrow}
                  </p>
                  <h3 className="font-display text-[13px] sm:text-xl font-bold mb-0.5 sm:mb-2 leading-tight">{item.title}</h3>
                  <p className="text-[11px] sm:text-sm leading-snug sm:leading-relaxed text-foreground/70 dark:text-card-foreground/70 line-clamp-3 sm:line-clamp-none">
                    {item.body}
                  </p>
                </motion.div>
              </>
            ) : (
              // LEFT SIDE CONTENT
              <>
                {/* Content - Smaller on mobile */}
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, type: "spring", stiffness: 80 }}
                  className="flex-[3] sm:flex-1 mr-2 sm:mr-6 rounded-lg sm:rounded-[1.5rem] border border-ink sm:border-2 bg-background p-2.5 sm:p-6 text-ink shadow-[2px_2px_0_0_var(--ink)] sm:shadow-[6px_6px_0_0_var(--ink)] dark:border-border dark:bg-card dark:text-card-foreground dark:shadow-[2px_2px_0_0_rgba(255,255,255,0.16)] sm:dark:shadow-[6px_6px_0_0_rgba(255,255,255,0.16)] text-right"
                >
                  <p className="text-[7px] sm:text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.22em] text-foreground/40 mb-0.5 sm:mb-1">
                    {item.eyebrow}
                  </p>
                  <h3 className="font-display text-[13px] sm:text-xl font-bold mb-0.5 sm:mb-2 leading-tight">{item.title}</h3>
                  <p className="text-[11px] sm:text-sm leading-snug sm:leading-relaxed text-foreground/70 dark:text-card-foreground/70 line-clamp-3 sm:line-clamp-none">
                    {item.body}
                  </p>
                </motion.div>

                {/* Spine connector */}
                <div className="flex flex-col items-center shrink-0 z-10 self-stretch px-1 sm:px-4">
                  <div className={`w-px flex-1 min-h-[20px] sm:min-h-[40px] bg-border ${i === 0 ? "opacity-0" : ""}`} />
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 + 0.1, type: "spring", stiffness: 200, damping: 16 }}
                    className="shrink-0 w-6 h-6 sm:w-14 sm:h-14 flex items-center justify-center"
                    style={{
                      background: item.color,
                      clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                    }}
                  >
                    {item.icon}
                  </motion.div>
                  <div className={`w-px flex-1 min-h-[20px] sm:min-h-[40px] bg-border ${i === 5 ? "opacity-0" : ""}`} />
                </div>

                {/* Empty spacer */}
                <div className="flex-1" />
              </>
            )}
          </div>
        );
      })}
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
  const cmsEngagements = normalizeEngagements(portfolio.collections.engagements);
  const cmsTestimonials = normalizeTestimonials(portfolio.collections.testimonials);
  const cmsHeroShowcase = normalizeHeroShowcase(portfolio.collections.heroShowcase);
  const cmsVideoEditing = normalizeVideoEditing(portfolio.collections.videoEditing);
  const cmsReels = normalizeReels(portfolio.reels);
  const cmsVisualAssets = normalizeVisualAssets(portfolio.collections.visualAssets);
  const cmsSeoAnalytics = normalizeSeoAnalytics(portfolio.collections.seoAnalytics);
  const cmsStrategicConsulting = normalizeStrategicConsulting(
    portfolio.collections.strategicConsulting,
  );
  const cmsContentWriting = normalizeContentWriting(portfolio.collections.contentWriting);

  // Carousel functionality for Google Reviews
  useEffect(() => {
    const track = document.getElementById("reviewsTrack");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const dotsContainer = document.getElementById("dotsContainer");

    if (!track || !prevBtn || !nextBtn || !dotsContainer) return;

    let cardWidth = 320;
    let visibleCards = 3;
    let currentIndex = 0;
    const totalCards = track.children.length;

    const updateCardWidth = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 640) {
        cardWidth = 292;
        visibleCards = 1;
      } else if (screenWidth < 1024) {
        cardWidth = 312;
        visibleCards = 2;
      } else {
        cardWidth = 340;
        visibleCards = 3;
      }
    };

    const getMaxIndex = () => Math.max(0, totalCards - visibleCards);

    const updateDots = () => {
      const maxIndex = getMaxIndex();
      dotsContainer.innerHTML = "";
      for (let i = 0; i <= maxIndex; i++) {
        const dot = document.createElement("button");
        dot.className = `h-2 w-2 rounded-full transition-all ${i === currentIndex ? "bg-accent w-6" : "bg-gray-300 dark:bg-gray-600"}`;
        dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
        dot.onclick = () => scrollToIndex(i);
        dotsContainer.appendChild(dot);
      }
    };

    const scrollToIndex = (index: number) => {
      const maxIndex = getMaxIndex();
      currentIndex = Math.max(0, Math.min(index, maxIndex));
      const scrollAmount = currentIndex * cardWidth;
      track.scrollTo({ left: scrollAmount, behavior: "smooth" });
      updateDots();
      updateButtons();
    };

    const updateButtons = () => {
      const maxIndex = getMaxIndex();
      prevBtn.style.opacity = currentIndex <= 0 ? "0.4" : "1";
      nextBtn.style.opacity = currentIndex >= maxIndex ? "0.4" : "1";
    };

    const handleScroll = () => {
      const scrollLeft = track.scrollLeft;
      const newIndex = Math.round(scrollLeft / cardWidth);
      if (newIndex !== currentIndex) {
        currentIndex = Math.min(newIndex, getMaxIndex());
        updateDots();
        updateButtons();
      }
    };

    // Initialize
    updateCardWidth();
    updateDots();
    updateButtons();

    track.addEventListener("scroll", handleScroll);
    prevBtn.addEventListener("click", () => currentIndex > 0 && scrollToIndex(currentIndex - 1));
    nextBtn.addEventListener(
      "click",
      () => currentIndex < getMaxIndex() && scrollToIndex(currentIndex + 1),
    );

    // Auto-play
    let autoplayInterval: NodeJS.Timeout;
    const startAutoplay = () => {
      clearInterval(autoplayInterval);
      autoplayInterval = setInterval(() => {
        if (currentIndex < getMaxIndex()) {
          nextBtn.click();
        } else {
          scrollToIndex(0);
        }
      }, 5000);
    };

    const stopAutoplay = () => clearInterval(autoplayInterval);

    const container = document.querySelector(".reviews-carousel-container");
    container?.addEventListener("mouseenter", stopAutoplay);
    container?.addEventListener("mouseleave", startAutoplay);

    startAutoplay();

    // Resize handler
    const handleResize = () => {
      updateCardWidth();
      updateDots();
      updateButtons();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      track.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      clearInterval(autoplayInterval);
    };
  }, [cmsTestimonials]);

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
                  We design enduring spaces that
                  <br />
                  balance craft, context, and <span className="text-accent">clarity</span>
                </>
              )}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className=" mx-auto text-xs md:text-lg bg-foreground/80 dark:bg-[#D6D2CB] px-1.5 mt-4 rounded-full text-white py-1 w-full dark:text-[#1F1F1F] max-w-3xl  "
            >
              Architecture || Interiors || Urban Planning || Sustainable Design
            </motion.p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.65 }}
          className="mx-auto mt-10 w-full max-w-5xl overflow-hidden rounded-[2rem] border-2 border-ink bg-card shadow-[6px_6px_0_0_var(--ink)] dark:border-border dark:bg-card dark:shadow-[6px_6px_0_0_rgba(255,255,255,0.16)]"
        >
          <div className="grid gap-0 md:grid-cols-[1.15fr_0.85fr]">
            <div className="relative min-h-[18rem] overflow-hidden border-b-2 border-ink bg-background p-6 dark:border-border md:border-b-0 md:border-r-2 md:p-8">
              <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:24px_24px]" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-card/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-foreground/70 dark:border-white/10">
                    <Layers className="h-3.5 w-3.5 text-accent" />
                    Architecture + Construction
                  </div>
                  <h2 className="mt-5 max-w-xl font-display text-3xl font-bold leading-tight md:text-5xl">
                    Built environments with clarity, craft, and measurable performance.
                  </h2>
                </div>
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {[
                    { label: "Sustainable design", icon: Shield },
                    { label: "BIM-led delivery", icon: PenTool },
                    { label: "Turnkey execution", icon: LineChart },
                  ].map(({ label, icon: Icon }) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-ink/15 bg-card/85 p-3 text-left shadow-sm backdrop-blur dark:border-white/10"
                    >
                      <Icon className="mb-2 h-4 w-4 text-accent" />
                      <p className="text-xs font-semibold uppercase tracking-wider text-foreground/70">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-ink p-6 text-cream md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-cream/60">
                {site.hero.name || "Architect Farm"}
              </p>
              <div className="mt-8 space-y-5">
                {[
                  ["01", "Site intelligence", "Climate, access, context, and constraints mapped before concept."],
                  ["02", "Integrated design", "Architecture, interiors, structure, and services coordinated early."],
                  ["03", "Construction certainty", "Detailed documentation and delivery oversight from studio to site."],
                ].map(([number, title, copy]) => (
                  <div key={number} className="border-t border-cream/15 pt-4">
                    <div className="flex items-start gap-4">
                      <span className="font-display text-2xl font-bold text-accent">{number}</span>
                      <div>
                        <h3 className="font-display text-xl font-semibold">{title}</h3>
                        <p className="mt-1 text-sm leading-6 text-cream/70">{copy}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats section */}
        <section className="relative w-full mt-4 flex justify-center items-center mx-auto max-w-6xl px-2 py-4 md:py-14">
          {/* -- Desktop grid (md+) — unchanged -- */}
          <div className="hidden  md:grid gap-3 grid-cols-4  place-items-center ">
            {cmsStats.map((s, i) => (
              <motion.div
                key={s.v}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring" }}
                className="w-full mx-auto rounded-[2rem] border-2 border-ink bg-background p-4 md:p-5 text-center shadow-[5px_5px_0_0_var(--ink)] dark:border-border dark:bg-card dark:shadow-[5px_5px_0_0_rgba(255,255,255,0.16)]"
              >
                <div className="font-display text-2xl md:text-4xl font-bold text-ink md:text-2xl">
                  {s.k}
                </div>
                <div className="mt-1 text-sm text-foreground/70">{s.v}</div>
              </motion.div>
            ))}
          </div>

          {/* -- Mobile marquee (below md) -- */}
          <div className="md:hidden w-full overflow-hidden">
            <motion.div
              className="flex gap-3"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: cmsStats.length * 2.2, // tune speed here
                ease: "linear",
                repeat: Infinity,
              }}
              style={{ width: "max-content" }}
            >
              {/* Duplicate items so the loop is seamless */}
              {[...cmsStats, ...cmsStats].map((s, i) => (
                <div
                  key={i}
                  className="w-[42dvw] shrink-0 rounded-[2rem] border-2 border-ink bg-background px-4 py-5 text-center shadow-[5px_5px_0_0_var(--ink)] dark:border-border dark:bg-card dark:shadow-[5px_5px_0_0_rgba(255,255,255,0.16)]"
                >
                  <div className="font-display text-2xl font-bold text-ink">{s.k}</div>
                  <div className="mt-1 text-sm text-foreground/70">{s.v}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
        <div className="w-full mt-0 mb-12 text-center flex flex-col justify-center items-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mx-auto  mt-2 max-w-5xl text-foreground md:text-lg text-accent"
          >
            We bridge imagination and construction through rigorous planning, refined interiors,
            sustainable thinking, and a collaborative design process from first sketch to handover.
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
      <PortfolioSectionAbout content={portfolioCopy.overview} />
      <PortfolioHeroShowcase
        content={portfolioCopy.sections.heroShowcase}
        items={cmsHeroShowcase}
      />

      {/* FILM REELS */}
      <FilmReelsSection items={cmsReels} />

      <PortfolioGraphicDesign
        content={portfolioCopy.sections.visualAssets}
        items={cmsVisualAssets}
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

      {/* <ServicesSection /> */}

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
              We shape spaces
              <br />
              <span className="relative inline-block">
                that endure
                <Underline className="absolute -bottom-2 left-0 h-3 w-full text-accent" />
              </span>
              .
            </h2>
            <p className="mt-6 max-w-md text-lg text-foreground/70">{site.about.body}</p>
            <p className="mt-4 max-w-md text-base text-foreground/60">
              8+ years blending architecture, interiors, planning, and sustainable detailing into
              one thoughtful studio process.
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-medium text-cream lift"
            >
              Start a conversation <ArrowUpRight className="h-4 w-4" />
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
                { t: "Context-led", icon: TrendingUp },
                { t: "Material-wise", icon: Brain },
                { t: "Detail-driven", icon: BarChart3 },
                { t: "Urban-minded", icon: Globe },
              ].map(({ t, icon: Icon }, i) => (
                <motion.div
                  key={t}
                  whileHover={{ rotate: 0, scale: 1.04 }}
                  initial={{ opacity: 0, scale: 0.8, rotate: i % 2 === 0 ? -2 : 2 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: i % 2 === 0 ? -2 : 2 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`rounded-2xl border-2 border-ink p-5 lift ${
                    i % 2 === 0 ? "bg-accent" : "bg-background"
                  }`}
                >
                  <Icon className="mb-3 h-5 w-5" />
                  <div className="font-display text-xl font-semibold">{t}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ROI TABLE */}
      <ROISection />

      {/* PARTNERS */}
      <TrustSection />

      {/* GOOGLE REVIEWS CAROUSEL - ABOVE TESTIMONIALS */}
      <section className="relative mx-auto max-w-6xl px-5 py-10 reviews-carousel-container">
        <div className="mb-8 text-center">
          <span className="script text-3xl text-accent">Client Notes</span>
          <h2 className="font-display text-4xl font-bold md:text-6xl">
            What our <span className="italic">clients</span> say
            <span className="text-accent">.</span>
          </h2>

          {/* Google Rating Badge */}
          <div className="mt-4 flex justify-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-ink/20 bg-background px-4 py-2 shadow-sm dark:border-border dark:bg-card">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    fill="#6F7377"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#7A8465"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#B08D57"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#B08D57"
                  />
                </svg>
                <span className="text-xl font-bold text-foreground dark:text-white">4.6</span>
              </div>
              <div className="flex items-center gap-0.5">
                <Star className="h-3 w-3 fill-accent text-accent" />
                <Star className="h-3 w-3 fill-accent text-accent" />
                <Star className="h-3 w-3 fill-accent text-accent" />
                <Star className="h-3 w-3 fill-accent text-accent" />
                <Star className="h-3 w-3 fill-accent text-accent" />
              </div>
              <span className="text-xs text-foreground/60 dark:text-gray-400">
                32 reviews on Google
              </span>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Reviews Track */}
          <div
            className="flex gap-4 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            id="reviewsTrack"
          >
            {cmsTestimonials.map((t, i) => {
              const colors = [
                "from-purple-500 to-purple-700",
                "from-green-500 to-green-700",
                "from-blue-500 to-blue-700",
                "from-pink-500 to-pink-700",
              ];

              const initials = t.name
                .split(" ")
                .map((n) => n[0])
                .join("");

              return (
                <motion.a
                  key={i}
                  href={GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="flex-shrink-0 w-[280px] sm:w-[300px] md:w-[320px] snap-start rounded-xl border border-ink/10 bg-background p-5 shadow-sm transition-all hover:shadow-md dark:border-border dark:bg-card cursor-pointer"
                >
                  {/* Header with Avatar */}
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br ${colors[i % colors.length]} flex items-center justify-center text-white font-semibold text-sm`}
                    >
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-foreground dark:text-white">
                        {t.name}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-foreground/50 dark:text-gray-400">
                          {t.co}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] text-green-600 dark:text-green-400">
                          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {t.verified}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(t.stars)].map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-accent text-accent" />
                    ))}
                    {[...Array(5 - t.stars)].map((_, j) => (
                      <Star
                        key={`empty-${j}`}
                        className="h-3.5 w-3.5 text-gray-300 dark:text-gray-600"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-sm text-foreground/80 dark:text-gray-300 leading-relaxed line-clamp-3">
                    "{t.q}"
                  </p>

                  {/* Source */}
                  <div className="mt-3 pt-3 border-t border-ink/10 dark:border-border flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-foreground/40 dark:text-gray-500">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                          fill="#6F7377"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#7A8465"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#B08D57"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#B08D57"
                        />
                      </svg>
                      <span>Google Review</span>
                    </div>
                    <span className="text-xs font-medium text-accent hover:underline">
                      Read more
                    </span>
                  </div>
                </motion.a>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-3 mt-4">
            <button
              id="prevBtn"
              className="w-10 h-10 rounded-full border border-ink/20 bg-background flex items-center justify-center hover:bg-accent/10 transition-colors dark:border-border dark:bg-card"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              id="nextBtn"
              className="w-10 h-10 rounded-full border border-ink/20 bg-background flex items-center justify-center hover:bg-accent/10 transition-colors dark:border-border dark:bg-card"
              aria-label="Next reviews"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-3" id="dotsContainer"></div>
        </div>

        {/* View All Button */}
        <div className="mt-6 text-center">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-ink/20 bg-background px-6 py-2.5 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-border dark:bg-card"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#6F7377"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#7A8465"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#B08D57"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#B08D57"
              />
            </svg>
            View all 32 reviews on Google
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </section>

      {/* ORIGINAL TESTIMONIALS SECTION */}

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

      {/* FOOTER */}
      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 md:flex-row">
          <div className="text-sm text-foreground/60">{site.footer.copyright}</div>
          <div className="flex items-center gap-5 text-sm">
            <a
              href="https://www.instagram.com/imagine_design_studios/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-accent"
            >
              <Instagram className="h-4 w-4" /> Instagram
            </a>
            <a
              href="https://www.facebook.com/imagine.consultants/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-accent"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.5-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.77l-.44 2.91h-2.33V22C18.34 21.24 22 17.08 22 12.06z" />
              </svg>
              Facebook
            </a>
            <a
              href="https://www.imaginedesignstudios.com/"
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
              process.env.NEXT_PUBLIC_WHATSAPP_LINK || "https://wa.me/+917067068673";
            window.open(whatsappLink, "_blank");
          }}
        />

        <CartoonButton
          label="View Projects"
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
