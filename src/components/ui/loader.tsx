import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";

interface LoaderProps {
  className?: string;
  label?: string;
}

const letters = ["L", "O", "A", "D", "I", "N", "G"];

export function Loader({ className, label = "Loading" }: LoaderProps) {
  return (
    <div
      className={cn("loader-grid", className)}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      {letters.map((letter, index) => (
        <div
          className="loader-cube"
          style={{ "--loader-index": index } as CSSProperties}
          key={`${letter}-${index}`}
          aria-hidden="true"
        >
          <div className="loader-face loader-face-front">{letter}</div>
          <div className="loader-face loader-face-back" />
          <div className="loader-face loader-face-right" />
          <div className="loader-face loader-face-left" />
          <div className="loader-face loader-face-top" />
          <div className="loader-face loader-face-bottom" />
        </div>
      ))}
      <span className="sr-only">{label}</span>
    </div>
  );
}
