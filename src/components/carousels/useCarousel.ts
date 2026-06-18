import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { type MotionValue, useMotionValue, useReducedMotion, useSpring, type PanInfo } from "framer-motion";
import { smooth } from "./motionSystem";

function wrapIndex(index: number, count: number) {
  const wrapped = index % count;
  return wrapped < 0 ? wrapped + count : wrapped;
}

export type UseCarouselOptions = {
  count: number;
  initialIndex?: number;
  loop?: boolean;
  stiffness?: number;
  damping?: number;
  mass?: number;
};

export type UseCarouselReturn = {
  activeIndex: number;
  progress: MotionValue<number>;
  spring: MotionValue<number>;
  next: () => void;
  prev: () => void;
  jumpTo: (index: number) => void;
  onWheel: (event: React.WheelEvent) => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
  onDragEnd: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  reducedMotion: boolean;
};

export function useCarousel({
  count,
  initialIndex = 0,
  loop = true,
  stiffness = smooth.stiffness,
  damping = smooth.damping,
  mass = smooth.mass,
}: UseCarouselOptions): UseCarouselReturn {
  const [activeIndex, setActiveIndex] = useState(() => wrapIndex(initialIndex, count));
  const reducedMotion = useReducedMotion();
  const progress = useMotionValue(activeIndex);
  const wheelLockRef = useRef(0);
  const spring = useSpring(progress, {
    stiffness: reducedMotion ? Math.max(stiffness, 280) : stiffness,
    damping: reducedMotion ? Math.max(damping, 38) : damping,
    mass,
  });

  useEffect(() => {
    progress.set(activeIndex);
  }, [activeIndex, progress]);

  const jumpTo = useCallback(
    (nextIndex: number) => {
      setActiveIndex((current) => {
        if (count < 2) return 0;
        if (!loop) {
          return Math.min(Math.max(nextIndex, 0), count - 1);
        }
        return wrapIndex(nextIndex, count);
      });
    },
    [count, loop],
  );

  const next = useCallback(() => {
    jumpTo(activeIndex + 1);
  }, [activeIndex, jumpTo]);

  const prev = useCallback(() => {
    jumpTo(activeIndex - 1);
  }, [activeIndex, jumpTo]);

  const onWheel = useCallback(
    (event: React.WheelEvent) => {
      const horizontalIntent =
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.shiftKey ? event.deltaY : 0;

      if (Math.abs(horizontalIntent) < 24) return;

      event.preventDefault();
      event.stopPropagation();

      const now = Date.now();
      if (now - wheelLockRef.current < 420) return;
      wheelLockRef.current = now;

      if (horizontalIntent > 0) {
        next();
      } else {
        prev();
      }
    },
    [next, prev],
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        prev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        next();
      }
    },
    [next, prev],
  );

  // Enable drag-based navigation with mobile-optimized thresholds
  const onDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const offset = info.offset.x;
      const velocity = info.velocity.x;
      // Lower thresholds for touch on mobile devices for better responsiveness
      const offsetThreshold = 40; // Reduced from 50 for easier swiping
      const velocityThreshold = 400; // Reduced from 500 for faster swipe detection

      if (offset < -offsetThreshold || velocity < -velocityThreshold) {
        next();
      } else if (offset > offsetThreshold || velocity > velocityThreshold) {
        prev();
      } else {
        progress.set(activeIndex);
      }
    },
    [next, prev, activeIndex, progress],
  );

  return useMemo(
    () => ({
      activeIndex,
      progress,
      spring,
      next,
      prev,
      jumpTo,
      onWheel,
      onKeyDown,
      onDragEnd,
      reducedMotion,
    }),
    [activeIndex, onDragEnd, onKeyDown, onWheel, jumpTo, next, prev, progress, reducedMotion, spring],
  );
}
