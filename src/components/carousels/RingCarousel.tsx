import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCarousel } from "./useCarousel";
import { MediaSlide, type MediaSlideProps } from "./MediaSlide";
import {
  carouselButtonClass,
  moduleDescriptionClass,
  moduleHeaderKickerClass,
  moduleShellClass,
  smooth,
  videoSources,
} from "./motionSystem";
import screenshot1 from "@/assets/carousel-samples/screenshot-1.jpg";

const slides: (MediaSlideProps & { title: string; description: string })[] = [
  {
    type: "video",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    poster: screenshot1,
    title: "Circular Brand Motion",
    description: "Rotate narrative cards with cinematic depth and intuitive index snapping.",
    accentColor: "from-orange-950/90",
  },
  {
    type: "video",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    poster: screenshot1,
    title: "3D Content Rhythm",
    description: "A polished cylinder effect that keeps every card visible on its own axis.",
    accentColor: "from-cyan-950/90",
  },
  {
    type: "video",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    poster: screenshot1,
    title: "Momentum Navigation",
    description: "Drag, wheel, and keyboard control with spring-led snap behavior.",
    accentColor: "from-emerald-950/90",
  },
  {
    type: "video",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    poster: screenshot1,
    title: "Focused Storytelling",
    description: "Scale and opacity separate the active slide from the supporting stack.",
    accentColor: "from-violet-950/90",
  },
];

function getRingOffset(index: number, activeIndex: number, count: number) {
  const raw = index - activeIndex;
  const half = Math.floor(count / 2);
  const wrapped = ((raw + count + half) % count) - half;
  return wrapped;
}

import { useRef, useEffect } from "react";

export interface RingSlide {
  categoryLabel?: string;
  title: string;
  description: string;
  keyFeatures?: string[];
  techStack?: string[];
  businessBenefit?: string;
  poster?: string;
  video?: string;
  accentColor?: string;
}

const defaultSlides = [
  {
    categoryLabel: "CRM SOFTWARE",
    title: "Circular Brand Motion",
    description: "Rotate narrative cards with cinematic depth and intuitive index snapping.",
    keyFeatures: ["Automated CRM Sync", "Real-Time User Attribution", "Multi-Channel Messaging"],
    techStack: ["React", "FastAPI", "PostgreSQL"],
    businessBenefit: "Reduced client management overhead by 40%",
    poster: screenshot1,
    video: videoSources[0],
    accentColor: "from-orange-950/90",
  },
  {
    categoryLabel: "PROJECT MANAGEMENT",
    title: "3D Content Rhythm",
    description: "A polished cylinder effect that keeps every card visible on its own axis.",
    keyFeatures: ["Custom Sprint Planner", "Interactive Gantt Charts", "Direct Slack Webhooks"],
    techStack: ["Next.js", "Express", "MongoDB"],
    businessBenefit: "Boosted team shipping velocity by 30%",
    poster: screenshot1,
    video: videoSources[1],
    accentColor: "from-cyan-950/90",
  },
];

function RingVideo({ src, poster, isActive }: { src: string; poster?: string; isActive: boolean }) {
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

interface RingCarouselProps {
  slides?: RingSlide[];
  title?: string;
  subtitle?: string;
  description?: string;
}

export function RingCarousel({
  slides = defaultSlides,
  title = "Cylinder-style visual carousel",
  subtitle = "Ring system",
  description = "An advanced rotating card system with video playback and responsive motion.",
}: RingCarouselProps) {
  const carousel = useCarousel({ count: slides.length, initialIndex: 0 });

  return (
    <section aria-label="Ring carousel" className={moduleShellClass}>
      <div className="mb-18 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
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
        style={{ perspective: 1200, touchAction: "none" }}
        className="relative h-[60vh]  sm:h-[72vh] md:h-[80vh] select-none overflow-visible"
      >
        <div className="h-full w-full flex items-center justify-center overflow-visible">
          {slides.map((slide, index) => {
            const offset = getRingOffset(index, carousel.activeIndex, slides.length);
            const isCenter = offset === 0;
            // animate rotate using spring by deriving from carousel.spring
            const angle = (index - carousel.activeIndex) * 40;
            const scale = Math.max(0.72, 1 - Math.abs(offset) * 0.12);
            const opacity = Math.max(0.3, 1 - Math.abs(offset) * 0.26);
            const zIndex = slides.length - Math.abs(offset);

            // Category badge colors
            const getBadgeStyles = (label: string) => {
              const cleaned = label.toUpperCase();
              if (cleaned.includes("CRM")) return "bg-teal-500/25 border-teal-500/40 text-teal-400";
              if (cleaned.includes("PROJECT") || cleaned.includes("MANAGEMENT")) return "bg-indigo-500/25 border-indigo-500/40 text-indigo-400";
              if (cleaned.includes("SALES") || cleaned.includes("APP")) return "bg-pink-500/25 border-pink-500/40 text-pink-400";
              if (cleaned.includes("BUSINESS") || cleaned.includes("AUTOMATION")) return "bg-amber-500/25 border-amber-500/40 text-amber-400";
              return "bg-white/10 border-white/20 text-white";
            };

            const badgeStyle = slide.categoryLabel ? getBadgeStyles(slide.categoryLabel) : "bg-white/10 border-white/20 text-white";

            return (
              <motion.div
                key={slide.title + "-" + index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ rotateY: angle, scale, opacity, y: 0 }}
                className={cn(
                  "absolute left-1/2 mt-4 top-1/2 w-[min(42rem,95vw)] sm:w-[min(48rem,92vw)] md:w-[min(52rem,88vw)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.5rem] border border-ink/10 bg-card/95 shadow-[0_28px_80px_-48px_rgba(0,0,0,0.45)] dark:border-white/10 dark:bg-[#111827]/95 dark:shadow-[0_30px_90px_-45px_rgba(0,0,0,0.95)]",
                  zIndex > 0 ? "" : "pointer-events-none",
                )}
                style={{
                  zIndex,
                  transformStyle: "preserve-3d",
                  transformPerspective: 1200,
                  willChange: "transform, opacity",
                }}
                transition={smooth}
              >
                <div className="relative h-[min(40vh,24rem)] bg-muted dark:bg-[#0b0f14]">
                  {slide.video ? (
                    <RingVideo src={slide.video} poster={slide.poster} isActive={isCenter} />
                  ) : (
                    slide.poster && <img src={slide.poster} alt={slide.title} className="h-full w-full object-cover" />
                  )}
                  <div className={`absolute inset-0 bg-gradient-to-t ${slide.accentColor || "from-teal-950/80"} via-transparent to-black/35`} />
                  
                  {slide.categoryLabel && (
                    <span className={`absolute left-4 top-4 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${badgeStyle} backdrop-blur-md z-10`}>
                      {slide.categoryLabel}
                    </span>
                  )}
                </div>

                <div className="p-4 sm:p-6 md:p-6 lg:p-8">
                  <h4 className="font-display text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold leading-tight text-card-foreground dark:text-white">
                    {slide.title}
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground dark:text-gray-400">{slide.description}</p>
                  
                  {/* Detailed software metadata */}
                  <div className="mt-4 grid grid-cols-2 gap-4 border-t border-ink/10 pt-4 text-left dark:border-white/10">
                    {slide.keyFeatures && (
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground dark:text-gray-500">Key Features</span>
                        <ul className="mt-1 space-y-1 text-xs text-foreground/75 dark:text-gray-300">
                          {slide.keyFeatures.map((feat) => (
                            <li key={feat} className="flex items-center gap-1.5">
                              <span className="h-1 w-1 rounded-full bg-teal-400" />
                              {feat}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div>
                      {slide.techStack && (
                        <div className="mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground dark:text-gray-500">Stack</span>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {slide.techStack.map((tech) => (
                              <span key={tech} className="rounded border border-ink/10 bg-ink/5 px-1.5 py-0.5 text-[9px] font-mono text-foreground/70 dark:border-white/10 dark:bg-white/5 dark:text-gray-300">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {slide.businessBenefit && (
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground dark:text-gray-500">Benefit</span>
                          <p className="text-xs font-semibold text-teal-300 leading-tight mt-0.5">{slide.businessBenefit}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <div className="mt-6 hidden md:flex sm:mt-8 md:mt-8 flex items-center justify-center gap-3 sm:gap-4 z-20 relative">
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
