import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCarousel } from "./useCarousel";
import {
  carouselButtonClass,
  moduleDescriptionClass,
  moduleHeaderKickerClass,
  moduleShellClass,
  smooth,
  videoSources,
} from "./motionSystem";
import screenshot5 from "@/assets/carousel-samples/screenshot-5.jpg";
import screenshot6 from "@/assets/carousel-samples/screenshot-6.jpg";
import screenshot1 from "@/assets/carousel-samples/screenshot-1.jpg";

const slides = [
  {
    title: "Clipped Site Frames",
    description: "A soft triangular mask introduces depth while preserving spatial clarity.",
    poster: screenshot5,
    video: videoSources[3],
    accent: "from-orange-600/35",
  },
  {
    title: "Crossfade Material Studies",
    description:
      "Smooth fade and mask transitions keep each material study calm and legible.",
    poster: screenshot6,
    video: videoSources[4],
    accent: "from-cyan-500/30",
  },
  {
    title: "Image-Safe Project Motion",
    description: "Fallback opacity transitions preserve architectural clarity on every breakpoint.",
    poster: screenshot1,
    video: videoSources[5],
    accent: "from-emerald-500/30",
  },
];

export interface TriangleSlide {
  categoryLabel?: string;
  title: string;
  description: string;
  metrics?: { label: string; value: string }[];
  poster?: string;
  video?: string;
  accent?: string;
  detailUrl?: string;
}

const defaultSlides = [
  {
    categoryLabel: "SUSTAINABILITY",
    title: "Clipped Site Frames",
    description: "A soft triangular mask introduces depth while preserving spatial clarity.",
    metrics: [
      { label: "Cooling Load", value: "-28%" },
      { label: "Daylit Areas", value: "82%" },
    ],
    poster: screenshot5,
    video: videoSources[3],
    accent: "from-orange-600/35",
  },
  {
    categoryLabel: "SITE ANALYSIS",
    title: "Crossfade Material Studies",
    description:
      "Smooth fade and mask transitions keep each material study calm and legible.",
    metrics: [
      { label: "Access Points", value: "14" },
      { label: "Public Realm", value: "+38%" },
    ],
    poster: screenshot6,
    video: videoSources[4],
    accent: "from-cyan-500/30",
  },
];

interface TriangleMaskProps {
  slides?: TriangleSlide[];
  title?: string;
  subtitle?: string;
  description?: string;
}

export function TriangleMask({
  slides = defaultSlides,
  title = "Masked project studies",
  subtitle = "Site and material",
  description = "Clip-path transitions with concise project copy, clear video playback, and generous stage height.",
}: TriangleMaskProps) {
  const carousel = useCarousel({ count: slides.length, initialIndex: 0 });

  return (
    <section aria-label="Triangle mask carousel" className={moduleShellClass}>
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className={moduleHeaderKickerClass}>{subtitle}</p>
          <h3 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground dark:text-white md:text-5xl">
            {title}
          </h3>
        </div>
        <p className={moduleDescriptionClass}>{description}</p>
      </div>

      <div
        tabIndex={0}
        onWheel={carousel.onWheel}
        onKeyDown={carousel.onKeyDown}
        onClick={(e) => e.stopPropagation()}
        className="relative h-[60dvh] sm:h-[68dvh] md:h-[72dvh] overflow-visible"
      >
        <div className="h-full w-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            {slides.map((slide, index) => {
              if (index !== carousel.activeIndex) return null;

              // Category badge colors
              const getBadgeStyles = (label: string) => {
                const cleaned = label.toUpperCase();
                if (cleaned.includes("SUSTAINABILITY"))
                  return "bg-green-500/25 border-green-500/40 text-green-400";
                if (cleaned.includes("AUDIT") || cleaned.includes("REPORT"))
                  return "bg-cyan-500/25 border-cyan-500/40 text-cyan-400";
                if (cleaned.includes("ANALYTICS"))
                  return "bg-emerald-500/25 border-emerald-500/40 text-emerald-400";
                return "bg-white/10 border-white/20 text-white";
              };

              const badgeStyle = slide.categoryLabel
                ? getBadgeStyles(slide.categoryLabel)
                : "bg-white/10 border-white/20 text-white";
              const inspectUrl = slide.detailUrl || slide.video || slide.poster;

              return (
                <motion.div
                  key={slide.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                  className="grid h-full w-full items-stretch overflow-hidden rounded-[1.75rem] border border-ink/10 bg-card shadow-[0_28px_80px_-48px_rgba(0,0,0,0.45)] grid-cols-1 sm:grid-cols-1 md:grid-cols-[1.35fr_0.65fr] dark:border-white/10 dark:bg-[#2E3135]/95 dark:shadow-[0_34px_100px_-50px_rgba(0,0,0,0.95)]"
                >
                  <div
                    className="relative min-h-[20rem] sm:min-h-[24rem] md:min-h-[24rem] overflow-hidden bg-muted order-1 md:order-1 dark:bg-[#1F1F1F]"
                    style={{ clipPath: "polygon(0 0, 100% 0, 88% 100%, 0 100%)" }}
                  >
                    {slide.video ? (
                      <video
                        src={slide.video}
                        poster={slide.poster}
                        className="h-full w-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      slide.poster && (
                        <img
                          src={slide.poster}
                          alt={slide.title}
                          className="h-full w-full object-cover"
                        />
                      )
                    )}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${slide.accent || "from-green-950/30"} via-transparent to-black/20`}
                    />
                    {inspectUrl && (
                      <a
                        href={inspectUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Inspect ${slide.title}`}
                        className="absolute inset-0 z-[5]"
                      />
                    )}

                    {slide.categoryLabel && (
                      <span
                        className={`absolute right-4 top-4 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${badgeStyle} backdrop-blur-md z-10`}
                      >
                        {slide.categoryLabel}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col justify-center p-4 sm:p-6 md:p-8 lg:p-10 order-2 md:order-2">
                    <h4 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-card-foreground leading-tight dark:text-white">
                      {slide.title}
                    </h4>
                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground dark:text-gray-400">
                      {slide.description}
                    </p>

                    {slide.metrics && (
                      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-ink/10 pt-5 dark:border-white/10">
                        {slide.metrics.map((metric, mi) => (
                          <div key={metric.label}>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground dark:text-gray-500">
                              {metric.label}
                            </span>
                            <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">
                              {metric.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {/* {inspectUrl && (
                      <a
                        href={inspectUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-6 inline-flex w-fit rounded-full border border-ink/10 bg-foreground px-4 py-2 text-xs font-bold text-background transition hover:opacity-90 dark:border-white/10 dark:bg-white dark:text-[#2E3135]"
                      >
                        Inspect report
                      </a>
                    )} */}
                    {/* <div className="mt-6 h-1 w-24 rounded-full bg-emerald-500 animate-pulse" /> */}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 flex items-center justify-center gap-3 sm:gap-4 z-20 relative">
        <Button
          onClick={carousel.prev}
          aria-label="Previous Slide"
          variant="outline"
          size="icon"
          className={carouselButtonClass}
        >
          <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
        <Button
          onClick={carousel.next}
          aria-label="Next Slide"
          variant="outline"
          size="icon"
          className={carouselButtonClass}
        >
          <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>
    </section>
  );
}



