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
    title: "Courtyard Spatial Sequence",
    description: "Rotate through project frames with depth, rhythm, and clear spatial hierarchy.",
    accentColor: "from-orange-950/90",
  },
  {
    type: "video",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    poster: screenshot1,
    title: "Material Study Rotation",
    description: "A polished carousel for comparing stone, timber, plaster, and light conditions.",
    accentColor: "from-cyan-950/90",
  },
  {
    type: "video",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    poster: screenshot1,
    title: "Masterplan Navigation",
    description: "Drag, wheel, and keyboard control through a sequence of urban design studies.",
    accentColor: "from-emerald-950/90",
  },
  {
    type: "video",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    poster: screenshot1,
    title: "Focused Project Story",
    description: "Scale and opacity separate the active project from the supporting studies.",
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
  projectUrl?: string;
}

const defaultSlides = [
  {
    categoryLabel: "COMMERCIAL DESIGN",
    title: "Studio Workplace Sequence",
    description: "Rotate through workplace rooms with cinematic depth and clear circulation.",
    keyFeatures: ["Flexible Planning", "Acoustic Rooms", "Custom Joinery"],
    techStack: ["BIM", "Lighting Study", "Material Library"],
    businessBenefit: "Improved collaboration and client presentation flow",
    poster: screenshot1,
    video: videoSources[0],
    accentColor: "from-orange-950/90",
  },
  {
    categoryLabel: "URBAN PLANNING",
    title: "District Massing Rhythm",
    description: "A polished cylinder effect that keeps each urban study visible on its own axis.",
    keyFeatures: ["Walkable Blocks", "Transit Links", "Public Realm"],
    techStack: ["GIS", "Massing Study", "Phasing Plan"],
    businessBenefit: "Created a clear framework for resilient district growth",
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
        style={{ perspective: 1200, touchAction: "none" }}
        className="relative h-[60dvh]  sm:h-[72dvh] md:h-[80dvh] select-none overflow-visible"
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
            const openUrl = slide.projectUrl || slide.video || slide.poster;

            // Category badge colors
            const getBadgeStyles = (label: string) => {
              const cleaned = label.toUpperCase();
              if (cleaned.includes("COMMERCIAL")) return "bg-teal-500/25 border-teal-500/40 text-teal-400";
              if (cleaned.includes("PROJECT") || cleaned.includes("MANAGEMENT"))
                return "bg-indigo-500/25 border-indigo-500/40 text-indigo-400";
              if (cleaned.includes("RESIDENTIAL") || cleaned.includes("INTERIOR"))
                return "bg-pink-500/25 border-pink-500/40 text-pink-400";
              if (cleaned.includes("SUSTAINABLE") || cleaned.includes("ADAPTIVE"))
                return "bg-amber-500/25 border-amber-500/40 text-amber-400";
              return "bg-white/10 border-white/20 text-white";
            };

            const badgeStyle = slide.categoryLabel
              ? getBadgeStyles(slide.categoryLabel)
              : "bg-white/10 border-white/20 text-white";

            return (
              <motion.div
                key={slide.title + "-" + index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ rotateY: angle, scale, opacity, y: 0 }}
                className={cn(
                  "absolute left-1/2 mt-4 top-1/2 w-[min(42rem,95vw)] sm:w-[min(48rem,92vw)] md:w-[min(52rem,88vw)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.5rem] border border-ink/10 bg-card/95 shadow-[0_28px_80px_-48px_rgba(0,0,0,0.45)] dark:border-white/10 dark:bg-[#2E3135]/95 dark:shadow-[0_30px_90px_-45px_rgba(0,0,0,0.95)]",
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
                <div className="relative h-[min(60vh,24rem)] bg-muted dark:bg-[#1F1F1F]">
                  {slide.video ? (
                    <RingVideo src={slide.video} poster={slide.poster} isActive={isCenter} />
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
                    className={`absolute inset-0 bg-gradient-to-t ${slide.accentColor || "from-teal-950/80"} via-transparent to-black/35`}
                  />
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

                <div className="p-4 flex flex-col md:flex-row items-center justify-between sm:p-6 md:p-6 lg:p-8">
                  <div >
                    <h4 className="font-display text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold leading-tight text-card-foreground dark:text-white">
                      {slide.title}
                    </h4>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground dark:text-gray-400">
                      {slide.description}
                    </p>
                  </div>

                  {/* Detailed software metadata */}
                  {/* <div className="mt-4 grid grid-cols-2 gap-4 border-t border-ink/10 pt-4 text-left dark:border-white/10">
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
                  </div> */}
                  {openUrl && (
                    <a
                      href={openUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 mr-auto md:mr-2 inline-flex rounded-full border border-ink/10 bg-foreground px-4 py-2 text-xs font-bold text-background transition hover:opacity-90 dark:border-white/10 dark:bg-white dark:text-[#2E3135]"
                    >
                      Open project
                    </a>
                  )}
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


