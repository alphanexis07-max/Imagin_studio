import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { useCarousel } from "./useCarousel";
import { MediaSlide } from "./MediaSlide";
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
import screenshot5 from "@/assets/carousel-samples/screenshot-5.jpg";
import screenshot6 from "@/assets/carousel-samples/screenshot-6.jpg";

export interface JumboSlide {
  categoryLabel?: string;
  title: string;
  description: string;
  outcome?: string;
  poster?: string;
  video?: string;
  accentColor?: string;
  detailUrl?: string;
}

const defaultSlides = [
  {
    categoryLabel: "RESIDENTIAL",
    title: "Layered Courtyard Study",
    description: "Maintain a layered sequence while the primary room study stays front and center.",
    outcome: "Passive cooling strategy",
    poster: screenshot5,
    video: videoSources[4],
    accentColor: "from-emerald-950/90",
  },
  {
    categoryLabel: "INTERIORS",
    title: "Material Palette Sequence",
    description: "The stack rebalances with measured motion and consistent visual weight.",
    outcome: "Custom joinery package",
    poster: screenshot6,
    video: videoSources[1],
    accentColor: "from-sky-950/90",
  },
  {
    categoryLabel: "URBAN DESIGN",
    title: "Depth-Aware Streetscape",
    description: "Scale, offset, and opacity highlight the active public-realm study.",
    outcome: "Pedestrian-first framework",
    poster: screenshot1,
    video: videoSources[2],
    accentColor: "from-amber-950/90",
  },
  {
    categoryLabel: "HOSPITALITY",
    title: "Retreat Pavilion Study",
    description: "A vertical stack with larger media, clean contrast, and generous breathing room.",
    outcome: "Landscape-led arrival sequence",
    poster: screenshot2,
    video: videoSources[3],
    accentColor: "from-rose-950/90",
  },
];

const getOffset = (index: number, activeIndex: number, count: number) => {
  const diff = index - activeIndex;
  return ((diff + count) % count) - (count > 1 ? Math.floor(count / 2) : 0);
};

function StackVideo({ src, poster, isActive }: { src: string; poster?: string; isActive: boolean }) {
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

interface JumboStackProps {
  slides?: JumboSlide[];
  title?: string;
  subtitle?: string;
  description?: string;
}

export function JumboStack({
  slides = defaultSlides,
  title = "Layered project studies",
  subtitle = "Spatial stack",
  description = "A calm stack of project films using generous media, clear hierarchy, and full-scale video.",
}: JumboStackProps) {
  const carousel = useCarousel({ count: slides.length, initialIndex: 0 });

  return (
    <section aria-label="Jumbo stack carousel" className={moduleShellClass}>
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className={moduleHeaderKickerClass}>{subtitle}</p>
          <h3 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground dark:text-white md:text-5xl">
            {title}
          </h3>
        </div>
        <p className={moduleDescriptionClass} >
          {description}
        </p>
      </div>

      <motion.div
        tabIndex={0}
        onWheel={carousel.onWheel}
        onKeyDown={carousel.onKeyDown}
        onClick={(e) => e.stopPropagation()}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={carousel.onDragEnd}
        whileTap={{ scale: 0.99 }}
        className="relative h-[60dvh] sm:h-[72dvh] md:h-[82dvh] mt-12 md:mt-2 overflow-visible"
      >
        <div className="h-full w-full flex items-center justify-center overflow-visible">
          {slides.map((slide, index) => {
            const offset = getOffset(index, carousel.activeIndex, slides.length);
            const isCenter = offset === 0;
            const abs = Math.abs(offset);
            const y = offset * 28;
            const scale = 1 - abs * 0.06;
            const opacity = 1 - abs * 0.4;
            const zIndex = slides.length - abs;
            const inspectUrl = slide.detailUrl || slide.video || slide.poster;

            // Category badge styling
            const badgeStyle = "bg-red-500/25 border-red-500/40 text-red-400";

            return (
              <motion.div
                key={slide.title + "-" + index}
                initial={false}
                animate={{ y, scale, opacity }}
                transition={smooth}
                className="absolute left-1/2 top-1/2 w-[min(42rem,95vw)] sm:w-[min(52rem,92vw)] md:w-[min(58rem,90vw)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.75rem] border border-ink/10 bg-card/95 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.45)] dark:border-white/10 dark:bg-[#2E3135]/95 dark:shadow-[0_34px_100px_-50px_rgba(0,0,0,0.95)]"
                style={{ zIndex }}
              >
                <div className="relative h-[min(48vh,30rem)] bg-muted dark:bg-[#1F1F1F]">
                  {slide.video ? (
                    <StackVideo src={slide.video} poster={slide.poster} isActive={isCenter} />
                  ) : (
                    slide.poster && <img src={slide.poster} alt={slide.title} className="h-full w-full object-cover" />
                  )}
                  <div className={`absolute inset-0 bg-gradient-to-t ${slide.accentColor || "from-red-950/80"} via-transparent to-black/35`} />
                  {isCenter && inspectUrl && (
                    <a
                      href={inspectUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Inspect ${slide.title}`}
                      className="absolute inset-0 z-[5]"
                    />
                  )}
                  
                  {slide.categoryLabel && (
                    <span className={`absolute right-4 top-4 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${badgeStyle} backdrop-blur-md z-10`}>
                      {slide.categoryLabel}
                    </span>
                  )}

                  {slide.outcome && (
                    <span className="absolute right-4 bottom-4 rounded-lg bg-black/60 border border-white/10 px-3 py-1.5 text-xs font-bold text-emerald-400 backdrop-blur-md z-10">
                      Outcome: {slide.outcome}
                    </span>
                  )}
                </div>

                <div className="p-4 sm:p-6 md:p-8">
                  <h4 className="font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-card-foreground dark:text-white">
                    {slide.title}
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground dark:text-gray-400">
                    {slide.description}
                  </p>
                  {inspectUrl && (
                    <a
                      href={inspectUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex rounded-full border border-ink/10 bg-foreground px-4 py-2 text-xs font-bold text-background transition hover:opacity-90 dark:border-white/10 dark:bg-white dark:text-[#2E3135]"
                    >
                      Inspect work
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <div className="mt-8 md:mt-0 flex items-center justify-center gap-4 z-20 relative">
        <Button onClick={carousel.prev} aria-label="Previous Slide" variant="outline" size="icon" className={carouselButtonClass}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button onClick={carousel.next} aria-label="Next Slide" variant="outline" size="icon" className={carouselButtonClass}>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}



