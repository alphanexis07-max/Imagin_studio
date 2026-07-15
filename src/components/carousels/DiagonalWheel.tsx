import { motion, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
import screenshot2 from "@/assets/carousel-samples/screenshot-2.jpg";
import screenshot3 from "@/assets/carousel-samples/screenshot-3.jpg";
import screenshot4 from "@/assets/carousel-samples/screenshot-4.jpg";

export interface DiagonalSlide {
  categoryLabel?: string;
  title: string;
  description: string;
  poster?: string;
  video?: string;
  accent?: string;
}

const defaultSlides: DiagonalSlide[] = [
  {
    categoryLabel: "INTERIOR DESIGN",
    title: "Diagonal Material Cadence",
    description: "Tilted grid with dynamic overlap and large spatial media surfaces.",
    poster: screenshot2,
    video: videoSources[2],
    accent: "from-indigo-500",
  },
  {
    categoryLabel: "ARCHITECTURE",
    title: "Tilted Composition",
    description: "Cards shift diagonally through facade, massing, and threshold studies.",
    poster: screenshot3,
    video: videoSources[3],
    accent: "from-violet-500",
  },
  {
    categoryLabel: "URBAN DESIGN",
    title: "Rhythmic Public Realm",
    description: "A diagonal wheel that feels like a kinetic gallery for project films.",
    poster: screenshot4,
    video: videoSources[1],
    accent: "from-sky-500",
  },
];

interface DiagonalWheelProps {
  slides?: DiagonalSlide[];
  title?: string;
  subtitle?: string;
  description?: string;
}

export function DiagonalWheel({
  slides = defaultSlides,
  title = "Diagonal project gallery",
  subtitle = "Diagonal studies",
  description = "Tilted cards with strong media focus, optimized for autoplaying project previews.",
}: DiagonalWheelProps) {
  const carousel = useCarousel({ count: slides.length, initialIndex: 0 });

  return (
    <section aria-label="Diagonal wheel carousel" className={moduleShellClass}>
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className={moduleHeaderKickerClass}>{subtitle}</p>
          <h3 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground dark:text-white md:text-5xl">
            {title}
          </h3>
        </div>
        <p className={moduleDescriptionClass}>
          {description}
        </p>
      </div>

      <motion.div
        tabIndex={0}
        onWheel={carousel.onWheel}
        onKeyDown={carousel.onKeyDown}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={carousel.onDragEnd}
        style={{ touchAction: "none" }}
        className="relative h-[60dvh] sm:h-[74dvh] md:h-[86dvh] overflow-visible"
      >
        <div className="absolute inset-0 flex items-center justify-center overflow-visible">
          {slides.map((slide, index) => {
            const zIndex = slides.length - Math.abs(index - (carousel.activeIndex ?? 0));

            // derive smooth motion from the shared carousel spring
            const x = useTransform(carousel.spring, (v) => (index - v) * 260);
            const y = useTransform(carousel.spring, (v) => (index - v) * 26);
            const rotate = useTransform(carousel.spring, (v) => (index - v) * -8);
            const scale = useTransform(carousel.spring, (v) => Math.max(0.86, 1 - Math.abs(index - v) * 0.06));
            const opacity = useTransform(carousel.spring, (v) => Math.max(0.35, 1 - Math.abs(index - v) * 0.22));

            return (
              <motion.div
                key={slide.title}
                initial={false}
                style={{
                  x,
                  y,
                  rotate,
                  scale,
                  opacity,
                  zIndex,
                  transformStyle: "preserve-3d",
                  willChange: "transform, opacity",
                }}
                className="absolute inset-0 flex items-center justify-center px-4"
              >
                <div className="w-full max-w-[70rem]">
                  <MediaSlide
                    type="video"
                    src={slide.video}
                    poster={slide.poster}
                    title={slide.title}
                    description={slide.description}
                    accentColor={slide.accent}
                  />
                  <div className="p-8">
                    <div className="text-xs uppercase tracking-[0.28em] text-muted-foreground dark:text-gray-400">Wheel {index + 1}</div>
                    <h4 className="mt-3 font-display text-3xl font-bold text-foreground dark:text-white md:text-4xl">{slide.title}</h4>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground dark:text-gray-400">{slide.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="absolute inset-x-0 bottom-8 z-20 flex items-center justify-center gap-4">
          <Button onClick={carousel.prev} aria-label="Previous Slide" variant="outline" size="icon" className={carouselButtonClass}> 
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button onClick={carousel.next} aria-label="Next Slide" variant="outline" size="icon" className={carouselButtonClass}>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </section>
  );
}


