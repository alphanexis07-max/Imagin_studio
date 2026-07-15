"use client"

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import logo from "@/assets/logo.png";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 16);

      const isScrollingDown = currentY > lastScrollY.current && currentY > 80;
      const isScrollingUp = currentY < lastScrollY.current;

      if (isScrollingUp) {
        setShowNav(true);
      } else if (isScrollingDown) {
        setShowNav(false);
      }

      lastScrollY.current = Math.max(currentY, 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const target = document.getElementById(id);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", `#${id}`);
  };

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: showNav ? 0 : -120, opacity: showNav ? 1 : 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-border/80 bg-background/82 shadow-xl shadow-black/5 backdrop-blur-xl" : "border-b border-border/60 bg-background/72 backdrop-blur-md"}`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3.5 sm:px-5 sm:py-4">
        <a href="#" className="flex min-w-0 items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40">
          <img src={logo} alt="Imagine Design Studio" className="h-8 w-8 shrink-0 object-contain" />
          <span className="truncate font-display text-lg font-bold sm:text-xl">Imagine Design Studio</span>
        </a>
        <div className="hidden items-center gap-8 text-sm md:flex">
          {["About", "Portfolio", "Work", "", "Contact"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={scrollToSection(l.toLowerCase())}
              className="story-link text-foreground/70 transition-colors hover:text-foreground"
            >
              {l}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#contact"
            onClick={scrollToSection("contact")}
            className="inline-flex min-h-9 items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:gap-1.5 sm:px-4 sm:py-2 sm:text-sm"
          >
            <span className="hidden min-[390px]:inline">Start a project</span>
            <span className="min-[390px]:hidden">Start</span>
            <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </a>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
