"use client"

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

const THEME_STORAGE_KEY = "theme-preference";

export function ThemeToggle({ className }: ThemeToggleProps) {
  // Determine initial theme synchronously to avoid visual flips on navigation
  const getInitial = () => {
    if (typeof window === "undefined") return true;
    try {
      const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === "dark") return true;
      if (saved === "light") return false;
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      return true;
    }
  };

  const [isDark, setIsDark] = useState<boolean>(getInitial);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", isDark);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
    } catch {
      // ignore storage write errors
    }
  }, [isDark]);

  return (
    <div
      className={cn(
        "flex w-16 h-8 p-1 rounded-full cursor-pointer transition-all duration-300",
        isDark
          ? "bg-zinc-950 border border-zinc-800"
          : "bg-white border border-zinc-200",
        className,
      )}
      onClick={() => setIsDark(!isDark)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          setIsDark((value) => !value);
        }
      }}
      role="button"
      tabIndex={0}
      aria-pressed={isDark}
    >
      <div className="flex justify-between items-center w-full">
        <div
          className={cn(
            "flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300",
            isDark ? "transform translate-x-0 bg-zinc-800" : "transform translate-x-8 bg-gray-200",
          )}
        >
          {isDark ? (
            <Moon className="w-4 h-4 text-white" strokeWidth={1.5} />
          ) : (
            <Sun className="w-4 h-4 text-gray-700" strokeWidth={1.5} />
          )}
        </div>
        <div
          className={cn(
            "flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300",
            isDark ? "bg-transparent" : "transform -translate-x-8",
          )}
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
          ) : (
            <Moon className="w-4 h-4 text-black" strokeWidth={1.5} />
          )}
        </div>
      </div>
    </div>
  );
}


