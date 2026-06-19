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
}

const defaultSlides = [
  {
    categoryLabel: "VIDEO EDITING",
    title: "Stacked priority cards",
    description: "Maintain a layered order while the active card stays front and center.",
    outcome: "Generated 2.4M views",
    poster: screenshot5,
    video: videoSources[4],
    accentColor: "from-emerald-950/90",
  },
  {
    categoryLabel: "VIDEO EDITING",
    title: "Smooth spring swaps",
    description: "The stack rebalances with breathing motion and consistent visual weight.",
    outcome: "Improved engagement by 140%",
    poster: screenshot6,
    video: videoSources[1],
    accentColor: "from-sky-950/90",
  },
  {
    categoryLabel: "VIDEO EDITING",
    title: "Depth-aware transitions",
    description: "Scale, offset, and opacity highlight the top card without changing the system language.",
    outcome: "Brand campaign launch",
    poster: screenshot1,
    video: videoSources[2],
    accentColor: "from-amber-950/90",
  },
  {
    categoryLabel: "VIDEO EDITING",
    title: "Tactile UI extension",
    description: "A vertical stack with larger media, clean contrast, and generous spacing.",
    outcome: "150% CTR increase",
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
  title = "Jumbo stacked cards",
  subtitle = "Stack system",
  description = "A natural stack extension using rounded panels, high contrast, and full-scale video.",
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
        className="relative h-[60vh] sm:h-[72vh] md:h-[82vh] mt-12 md:mt-2 overflow-visible"
      >
        <div className="h-full w-full flex items-center justify-center overflow-visible">
          {slides.map((slide, index) => {
            const offset = getOffset(index, carousel.activeIndex, slides.length);
            const isCenter = offset === 0;
            const abs = Math.abs(offset);
            const y = offset * 28;
            const scale = 1 - abs * 0.06;
            const opacity = 1 - abs * 0.2;
            const zIndex = slides.length - abs;

            // Category badge styling
            const badgeStyle = "bg-red-500/25 border-red-500/40 text-red-400";

            return (
              <motion.div
                key={slide.title + "-" + index}
                initial={false}
                animate={{ y, scale, opacity }}
                transition={smooth}
                className="absolute left-1/2 top-1/2 w-[min(42rem,95vw)] sm:w-[min(52rem,92vw)] md:w-[min(58rem,90vw)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.75rem] border border-ink/10 bg-card/95 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.45)] dark:border-white/10 dark:bg-[#0f172a]/95 dark:shadow-[0_34px_100px_-50px_rgba(0,0,0,0.95)]"
                style={{ zIndex }}
              >
                <div className="relative h-[min(46vh,28rem)] bg-muted dark:bg-[#0b0f14]">
                  {slide.video ? (
                    <StackVideo src={slide.video} poster={slide.poster} isActive={isCenter} />
                  ) : (
                    slide.poster && <img src={slide.poster} alt={slide.title} className="h-full w-full object-cover" />
                  )}
                  <div className={`absolute inset-0 bg-gradient-to-t ${slide.accentColor || "from-red-950/80"} via-transparent to-black/35`} />
                  
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
