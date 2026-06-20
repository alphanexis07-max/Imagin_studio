import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useEffect } from "react";

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
import screenshot1 from "@/assets/carousel-samples/screenshot-1.jpg";
import screenshot2 from "@/assets/carousel-samples/screenshot-2.jpg";
import screenshot3 from "@/assets/carousel-samples/screenshot-3.jpg";
import screenshot4 from "@/assets/carousel-samples/screenshot-4.jpg";

const slides = [
  {
    title: "Perspective focus",
    caption: "Three-panel arrangement with a bold center video card.",
    poster: screenshot1,
    video: videoSources[5],
    glow: "shadow-cyan-950/40",
  },
  {
    title: "Card geometry",
    caption: "Side cards angle slightly to keep the focus system clear.",
    poster: screenshot2,
    video: videoSources[0],
    glow: "shadow-orange-950/40",
  },
  {
    title: "Visual hierarchy",
    caption: "Active state is crisp while neighbors remain contextual.",
    poster: screenshot3,
    video: videoSources[1],
    glow: "shadow-emerald-950/40",
  },
  {
    title: "Motion-friendly UI",
    caption: "Spring transitions, not sudden jumps, for every swap.",
    poster: screenshot4,
    video: videoSources[2],
    glow: "shadow-violet-950/40",
  },
];

const computeOffset = (index: number, activeIndex: number, length: number) => {
  const raw = index - activeIndex;
  const half = Math.floor(length / 2);
  return ((raw + length + half) % length) - half;
};

export interface FlankSlide {
  categoryLabel?: string;
  title: string;
  description: string;
  poster?: string;
  video?: string;
  glow?: string;
  ctaText?: string;
  ctaLink?: string;
}

const defaultSlides = [
  {
    categoryLabel: "Perspective focus",
    title: "Perspective focus",
    description: "Three-panel arrangement with a bold center video card.",
    poster: screenshot1,
    video: videoSources[5],
    glow: "shadow-cyan-950/40",
    ctaText: "View Project",
    ctaLink: "#",
  },
  {
    categoryLabel: "Card geometry",
    title: "Card geometry",
    description: "Side cards angle slightly to keep the focus system clear.",
    poster: screenshot2,
    video: videoSources[0],
    glow: "shadow-orange-950/40",
    ctaText: "View Project",
    ctaLink: "#",
  },
  {
    categoryLabel: "Visual hierarchy",
    title: "Visual hierarchy",
    description: "Active state is crisp while neighbors remain contextual.",
    poster: screenshot3,
    video: videoSources[1],
    glow: "shadow-emerald-950/40",
    ctaText: "View Project",
    ctaLink: "#",
  },
  {
    categoryLabel: "Motion-friendly UI",
    title: "Motion-friendly UI",
    description: "Spring transitions, not sudden jumps, for every swap.",
    poster: screenshot4,
    video: videoSources[2],
    glow: "shadow-violet-950/40",
    ctaText: "View Project",
    ctaLink: "#",
  },
];

function CarouselVideo({
  src,
  poster,
  isActive,
}: {
  src: string;
  poster?: string;
  isActive: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isActive) {
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isActive, src]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      className="h-full w-full object-cover"
      muted
      loop
      playsInline
    />
  );
}

interface FlankCarouselProps {
  slides?: FlankSlide[];
  title?: string;
  subtitle?: string;
  description?: string;
}

export function FlankCarousel({
  slides = defaultSlides,
  title = "Flank perspective carousel",
  subtitle = "Perspective system",
  description = "A centered three-card view where the client sees the active video clearly without losing context.",
}: FlankCarouselProps) {
  const carousel = useCarousel({ count: slides.length, initialIndex: 0 });

  return (
    <section aria-label="Flank carousel" className={moduleShellClass}>
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className={moduleHeaderKickerClass}>{subtitle}</p>
          <h3 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground dark:text-white md:text-5xl">
            {title}
          </h3>
        </div>
        <p className={moduleDescriptionClass}>{description}</p>
      </div>

      <motion.div
        tabIndex={0}
        onWheel={carousel.onWheel}
        onKeyDown={carousel.onKeyDown}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={carousel.onDragEnd}
        style={{ perspective: 1400, touchAction: "none" }}
        className="relative h-[60vh] sm:h-[70vh] mt-12 md:mt-4 md:h-[80vh] overflow-visible"
      >
        <div className="h-full w-full flex items-center justify-center overflow-visible">
          {slides.map((slide, index) => {
            const offset = computeOffset(index, carousel.activeIndex, slides.length);
            const isCenter = offset === 0;
            const isVisible = Math.abs(offset) <= 1;
            const x = offset * 250;
            const y = Math.abs(offset) * 20;
            const rotateY = offset * 22;
            const scale = isCenter ? 1 : 0.78;
            const opacity = isCenter ? 1 : 0.48;
            const zIndex = isCenter ? 20 : 10 - Math.abs(offset);
            const openUrl = slide.ctaLink && slide.ctaLink !== "#" ? slide.ctaLink : slide.video || slide.poster;

            // Category badge colors
            const getBadgeStyles = (label: string) => {
              const cleaned = label.toUpperCase();
              if (cleaned.includes("VIDEO")) return "bg-red-500/25 border-red-500/40 text-red-400";
              if (cleaned.includes("GRAPHIC") || cleaned.includes("DESIGN"))
                return "bg-purple-500/25 border-purple-500/40 text-purple-400";
              if (cleaned.includes("WEBSITE") || cleaned.includes("DEVELOPMENT"))
                return "bg-blue-500/25 border-blue-500/40 text-blue-400";
              if (cleaned.includes("SEO"))
                return "bg-green-500/25 border-green-500/40 text-green-400";
              if (cleaned.includes("CONTENT") || cleaned.includes("WRITING"))
                return "bg-orange-500/25 border-orange-500/40 text-orange-400";
              if (
                cleaned.includes("STRATEGIC") ||
                cleaned.includes("PLANNING") ||
                cleaned.includes("CONSULTING")
              )
                return "bg-amber-500/25 border-amber-500/40 text-amber-400";
              if (cleaned.includes("AUDIT") || cleaned.includes("REPORT"))
                return "bg-cyan-500/25 border-cyan-500/40 text-cyan-400";
              if (cleaned.includes("PROJECT") || cleaned.includes("MANAGEMENT"))
                return "bg-indigo-500/25 border-indigo-500/40 text-indigo-400";
              if (cleaned.includes("CRM")) return "bg-teal-500/25 border-teal-500/40 text-teal-400";
              if (cleaned.includes("SALES"))
                return "bg-pink-500/25 border-pink-500/40 text-pink-400";
              return "bg-white/10 border-white/20 text-white";
            };

            const badgeStyle = slide.categoryLabel
              ? getBadgeStyles(slide.categoryLabel)
              : "bg-white/10 border-white/20 text-white";

            return (
              <motion.div
                key={slide.title + "-" + index}
                initial={false}
                animate={{ x, y, rotateY, scale, opacity }}
                // transition={smooth}

                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                }}
                className={`absolute left-1/2 top-1/2 w-[min(42rem,95vw)] sm:w-[min(48rem,92vw)] md:w-[min(52rem,88vw)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.75rem] border border-ink/10 bg-card/95 shadow-[0_28px_80px_-48px_rgba(0,0,0,0.45)] dark:border-white/10 dark:bg-[#111827]/95 dark:shadow-2xl ${slide.glow || "shadow-black/50"}`}
                style={{
                  zIndex,
                  transformStyle: "preserve-3d",
                  pointerEvents: isVisible ? "auto" : "none",
                  willChange: "transform, opacity",
                }}
              >
                <div className="relative h-[min(44vh,28rem)] bg-muted dark:bg-[#0b0f14]">
                  {slide.video ? (
                    <CarouselVideo src={slide.video} poster={slide.poster} isActive={isCenter} />
                  ) : (
                    slide.poster && (
                      <img
                        src={slide.poster}
                        alt={slide.title}
                        className="h-full w-full object-cover"
                      />
                    )
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/35" />
                  {isCenter && openUrl && (
                    <a
                      href={openUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${slide.title}`}
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

                <div className="p-5 sm:p-6 md:p-7">
                  <h4 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-card-foreground dark:text-white">
                    {slide.title}
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground dark:text-gray-400 line-clamp-2">
                    {slide.description}
                  </p>

                  <AnimatePresence>
                    {isCenter && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        // transition={smooth}

                        transition={{
                          duration: 0.2,
                          ease: "easeOut",
                        }}
                        className="overflow-hidden mt-4"
                      >
                        <a
                          href={slide.ctaLink || openUrl || "#"}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2 text-xs font-bold text-cream transition duration-200 hover:bg-ink/90 active:scale-95 z-20 dark:bg-white dark:text-[#111827] dark:hover:bg-white/95"
                        >
                          {slide.ctaText || "View Project"}
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <div className="mt-8 md:mt-0 sm:mt-8 flex items-center justify-center gap-3 sm:gap-4 z-20 relative">
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

