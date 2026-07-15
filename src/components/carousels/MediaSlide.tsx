import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export interface MediaSlideProps {
  type: "image" | "video";
  src: string;
  alt?: string;
  poster?: string;
  title: string;
  description: string;
  accentColor?: string;
  className?: string;
}

export function MediaSlide({
  type,
  src,
  alt = "",
  poster = "",
  title,
  description,
  accentColor = "from-orange-900/80",
  className = "",
}: MediaSlideProps) {
  const smooth = {
    type: "spring" as const,
    stiffness: 120,
    damping: 18,
    mass: 1,
  };

  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
  }, [src]);

  return (
    <div className={`relative h-full min-h-[18rem] w-full overflow-hidden rounded-[1.5rem] bg-background ${className}`}>
      {type === "image" ? (
        <motion.img
          src={src}
          alt={alt}
          className={`h-full w-full object-cover transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setReady(true)}
          initial={{ scale: 1.04 }}
          animate={{ scale: 1 }}
          transition={{ ...smooth, duration: 0.6 }}
        />
      ) : (
        <motion.video
          src={src}
          poster={poster}
          className={`h-full w-full object-cover transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => setReady(true)}
          initial={{ scale: 1.04 }}
          animate={{ scale: 1 }}
          transition={{ ...smooth, duration: 0.6 }}
        />
      )}
      <div className={`absolute inset-0 bg-gradient-to-t ${accentColor} via-transparent to-transparent opacity-40`} />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
    </div>
  );
}


