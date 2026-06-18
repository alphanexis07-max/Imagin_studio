import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Film } from "lucide-react";
import { motion } from "framer-motion";
import { instagramPosts } from "@/data/instagramFeed";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Navbar from "@/components/navbar";

export const Route = createFileRoute("/reels")({ component: Reels });

function extractEmbedUrl(url: string) {
  // Removes query parameters and ensures it ends with /embed/
  try {
    const parsed = new URL(url);
    const basePath = parsed.origin + parsed.pathname;
    const embedBase = basePath.endsWith("/") ? `${basePath}embed/` : `${basePath}/embed/`;
    return `${embedBase}?autoplay=1&mute=1`;
  } catch {
    return url;
  }
}

function Reels() {
  return (
    <main className="relative min-h-screen  overflow-hidden bg-ink text-cream">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.05] mix-blend-screen"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.45) 0.5px, transparent 0.5px)",
          backgroundSize: "3px 3px",
        }}
      />
      <div className="pointer-events-none fixed -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]" />
      <div className="pointer-events-none fixed -bottom-20 right-0 h-[400px] w-[600px] rounded-full bg-film-overlay/20 blur-[100px]" />

      <Navbar />

      <section className="relative mx-auto max-w-7xl px-5 py-16 md:py-24">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/20 bg-cream/5 px-4 py-1.5 text-sm font-semibold uppercase tracking-widest text-cream backdrop-blur-sm"
          >
            <Film className="h-4 w-4 text-accent" /> The Reel Room
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 font-display text-4xl font-bold leading-tight md:text-6xl"
          >
            Client <span className="italic text-accent">Cuts</span> & Edits
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-4 max-w-xl text-cream/70"
          >
            A cohesive collection of our visual storytelling.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {instagramPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "50px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
              className="group relative aspect-[9/16] w-full overflow-hidden rounded-2xl border-2 border-cream/10 bg-black/40 shadow-xl transition-all hover:-translate-y-1 hover:border-cream/30 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
            >
              <iframe
                src={extractEmbedUrl(post.url)}
                className="absolute inset-0 h-full w-full border-none"
                loading="lazy"
                title={`Instagram Reel ${i + 1}`}
                allowtransparency="true"
                allowFullScreen={true}
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
