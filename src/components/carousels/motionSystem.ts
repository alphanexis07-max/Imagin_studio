export const smooth = {
  type: "spring" as const,
  // tuned for smooth, less-stutter motion across carousels
  stiffness: 90,
  damping: 24,
  mass: 1,
};

export const videoSources = [
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
];

export const carouselButtonClass =
  "rounded-full border border-ink/15 bg-background/80 text-foreground shadow-[0_16px_40px_-24px_rgba(0,0,0,0.45)] backdrop-blur hover:bg-accent/15 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 h-10 w-10 sm:h-9 sm:w-9 transition-all duration-200 active:scale-95";

export const moduleShellClass =
  "relative w-full overflow-visible opacity-95 transition-opacity duration-500 hover:opacity-100 px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8";

export const moduleHeaderKickerClass =
  "text-xs font-semibold uppercase tracking-[0.28em] text-foreground/55 dark:text-gray-400";

export const moduleDescriptionClass = "max-w-xl text-sm leading-6 text-foreground/65 dark:text-gray-400 md:text-base";
