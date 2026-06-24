import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Film, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar";
import { getPublicReels } from "@/lib/cms/public.functions";

export const Route = createFileRoute("/reels")({
  loader: () => getPublicReels(),
  component: Reels,
});

function extractEmbedUrl(url: string) {
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
  const reels = Route.useLoaderData();
  console.log(reels);

  return (
    <main className="relative min-h-dvh overflow-hidden bg-background text-foreground">
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.18] dark:opacity-[0.1]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--foreground) 28%, transparent) 0.5px, transparent 0.5px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="pointer-events-none fixed -top-48 left-1/2 h-[34rem] w-[44rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]" />
      <div className="pointer-events-none fixed -bottom-28 right-[-8rem] h-[28rem] w-[36rem] rounded-full bg-primary/10 blur-[110px] dark:bg-accent/10" />

      <Navbar />

      <section className="relative mx-auto max-w-7xl px-4 py-10 sm:px-5 sm:py-14 md:py-20">
        <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <Link
              to="/"
              className="mb-5 inline-flex min-h-10 items-center gap-2 rounded-full border border-border bg-card/80 px-3.5 py-2 text-sm font-semibold text-card-foreground shadow-sm backdrop-blur transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to portfolio
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-accent/35 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground shadow-sm backdrop-blur-sm"
            >
              <Film className="h-4 w-4 text-accent" /> The Reel Room
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="mt-5 font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-7xl"
            >
              Client <span className="italic text-accent">Cuts</span> & Edits
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
              className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg"
            >
              A cohesive collection of visual storytelling, campaign edits, and social-first motion work.
            </motion.p>
          </div>

          <div className="rounded-2xl border border-border bg-card/80 p-4 text-card-foreground shadow-sm backdrop-blur md:min-w-56">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent">
                <PlayCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display text-2xl font-bold leading-none">{reels.length}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">Published reels</p>
              </div>
            </div>
          </div>
        </div>

        {reels.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/70 px-5 py-16 text-center text-card-foreground shadow-sm">
            <Film className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
            <h2 className="font-display text-2xl font-bold">No reels published yet</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              Published reel embeds will appear here once they are added from the admin dashboard.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {reels.map((reel, i) => (
              <motion.article
                key={reel.id}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "50px" }}
                transition={{ duration: 0.35, delay: (i % 4) * 0.06 }}
                className="group overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-[0_18px_55px_-42px_rgba(0,0,0,0.55)] transition duration-200 hover:-translate-y-1 hover:border-accent/45 hover:shadow-[0_24px_70px_-46px_rgba(0,0,0,0.75)]"
              >
                <div className="relative aspect-[9/16] w-full overflow-hidden bg-muted">
                  <iframe
                    src={reel.embedUrl || extractEmbedUrl(reel.url)}
                    className="absolute inset-0 h-full w-full border-none"
                    loading="lazy"
                    title={reel.title || `Reel ${i + 1}`}
                    allow="autoplay; encrypted-media; picture-in-picture; clipboard-write"
                    allowFullScreen
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-foreground/10" />
                </div>
                <div className="border-t border-border px-4 py-3">
                  <p className="truncate text-sm font-semibold" title={reel.title || `Reel ${i + 1}`}>
                    {reel.title || `Reel ${i + 1}`}
                  </p>
                  {reel.tag ? (
                    <p className="mt-1 truncate text-xs text-muted-foreground" title={reel.tag}>
                      {reel.tag}
                    </p>
                  ) : null}
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
