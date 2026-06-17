import { motion, useTransform } from "framer-motion";
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
import screenshot1 from "@/assets/carousel-samples/screenshot-1.jpg";
import screenshot2 from "@/assets/carousel-samples/screenshot-2.jpg";
import screenshot3 from "@/assets/carousel-samples/screenshot-3.jpg";
import screenshot4 from "@/assets/carousel-samples/screenshot-4.jpg";

const slides = [
  {
    title: "Flow systems",
    subtitle: "A seamless horizontal track that responds to physics-based drag.",
    poster: screenshot1,
    video: videoSources[0],
    accent: "bg-cyan-500",
  },
  {
    title: "Live menu motion",
    subtitle: "Large active title updates with each snap-driven slide change.",
    poster: screenshot2,
    video: videoSources[1],
    accent: "bg-orange-500",
  },
  {
    title: "Endless rhythm",
    subtitle: "A repeatable track feel without creating a new visual system.",
    poster: screenshot3,
    video: videoSources[2],
    accent: "bg-emerald-500",
  },
  {
    title: "Content-led pacing",
    subtitle: "A track structure that supports copy, iconography, and status bars.",
    poster: screenshot4,
    video: videoSources[3],
    accent: "bg-fuchsia-500",
  },
];

export function TricksMenu() {
  const carousel = useCarousel({ count: slides.length, initialIndex: 0 });
  const itemWidth = 420;
  const x = useTransform(carousel.spring, (value) => -value * itemWidth);

  return (
    <section aria-label="Tricks menu carousel" className={moduleShellClass}>
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className={moduleHeaderKickerClass}>Track system</p>
          <h3 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground dark:text-white md:text-5xl">
            Full-width flow track
          </h3>
        </div>
        <p className={moduleDescriptionClass}>
          A responsive horizontal reel track with large previews, clear active state, and smooth snap physics.
        </p>
      </div>

      <div className="relative h-[74vh] overflow-visible py-4">
        <div className="mb-8 text-center">
          <span className="block text-xs font-semibold uppercase tracking-[0.28em] text-foreground/55 dark:text-gray-400">
            Current channel
          </span>
          <h4 className="mt-3 font-display text-4xl font-bold text-foreground dark:text-white md:text-6xl">
            {slides[carousel.activeIndex].title}
          </h4>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-foreground/65 dark:text-gray-400">
            {slides[carousel.activeIndex].subtitle}
          </p>
        </div>

        <motion.div
          tabIndex={0}
          onWheel={carousel.onWheel}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={carousel.onKeyDown}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.16}
          onDragEnd={carousel.onDragEnd}
          className="relative h-[calc(100%-9rem)] overflow-visible"
        >
          <motion.div
            style={{ x }}
            className="h-full w-full flex items-center justify-center gap-7"
            transition={smooth}
          >
            {[...slides, ...slides].map((slide, index) => {
              const realIndex = index % slides.length;
              const isActive = realIndex === carousel.activeIndex;
              return (
                <motion.div
                  key={`${slide.title}-${index}`}
                  whileHover={{ scale: 1.02 }}
                  transition={smooth}
                  className={`flex h-full min-w-[min(25rem,82vw)] flex-col overflow-hidden rounded-[1.5rem] border border-ink/10 bg-card shadow-[0_24px_70px_-48px_rgba(0,0,0,0.45)] dark:border-white/10 dark:bg-[#111827]/90 dark:shadow-[0_28px_80px_-48px_rgba(0,0,0,0.9)] ${
                    isActive ? "opacity-100 ring-1 ring-ink/15 dark:ring-white/20" : "opacity-60"
                  }`}
                >
                  <div className="relative h-[70%] overflow-hidden bg-muted dark:bg-[#0b0f14]">
                    <video
                      src={slide.video}
                      poster={slide.poster}
                      className="h-full w-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
                    <span className={`absolute left-5 top-5 h-2.5 w-10 rounded-full ${slide.accent}`} />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="text-xs uppercase tracking-[0.28em] text-muted-foreground dark:text-gray-400">
                      Slide {realIndex + 1}
                    </div>
                    <div className="mt-3 text-xl font-semibold text-card-foreground dark:text-white">{slide.title}</div>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground dark:text-gray-400">{slide.subtitle}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
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
