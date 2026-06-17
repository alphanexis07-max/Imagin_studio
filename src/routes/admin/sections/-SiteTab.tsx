import { useState, useEffect } from "react";
import { getSite, updateSite, type SiteData } from "@/lib/admin/site.functions";

export function SiteTab() {
  const [site, setSite] = useState<SiteData | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);

  useEffect(() => {
    getSite().then(setSite);
  }, []);

  async function save(patch: Partial<SiteData>) {
    setSaving(true);
    const updated = await updateSite({ data: patch as Record<string, unknown> });
    setSite(updated);
    setSavedAt(new Date());
    setSaving(false);
  }

  if (!site) return <div className="py-10 text-center text-muted-foreground">Loading…</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold">Hero & About</h2>
        <span className="text-xs text-muted-foreground">
          {saving ? "Saving…" : savedAt ? `Saved ${savedAt.toLocaleTimeString()}` : ""}
        </span>
      </div>

      {/* Hero */}
      <Section title="Hero">
        <Field
          label="Eyebrow pill"
          value={site.hero.eyebrow}
          onChange={(v) => setSite((s) => s && { ...s, hero: { ...s.hero, eyebrow: v } })}
          onBlur={() => save({ hero: site.hero })}
        />
        <Field
          label="Name"
          value={site.hero.name}
          onChange={(v) => setSite((s) => s && { ...s, hero: { ...s.hero, name: v } })}
          onBlur={() => save({ hero: site.hero })}
        />
        <Field
          label="Headline"
          value={site.hero.headline}
          onChange={(v) => setSite((s) => s && { ...s, hero: { ...s.hero, headline: v } })}
          onBlur={() => save({ hero: site.hero })}
        />
        <Field
          label="Portrait URL"
          value={site.hero.portraitUrl}
          onChange={(v) => setSite((s) => s && { ...s, hero: { ...s.hero, portraitUrl: v } })}
          onBlur={() => save({ hero: site.hero })}
        />
        <Field
          label="Sidebar stat value"
          value={site.hero.sidebarStat.value}
          onChange={(v) => setSite((s) => s && { ...s, hero: { ...s.hero, sidebarStat: { ...s.hero.sidebarStat, value: v } } })}
          onBlur={() => save({ hero: site.hero })}
        />
        <Field
          label="Sidebar stat label"
          value={site.hero.sidebarStat.label}
          onChange={(v) => setSite((s) => s && { ...s, hero: { ...s.hero, sidebarStat: { ...s.hero.sidebarStat, label: v } } })}
          onBlur={() => save({ hero: site.hero })}
        />
        <Field
          label="Sidebar quote"
          value={site.hero.sidebarQuote}
          textarea
          onChange={(v) => setSite((s) => s && { ...s, hero: { ...s.hero, sidebarQuote: v } })}
          onBlur={() => save({ hero: site.hero })}
        />
      </Section>

      {/* About */}
      <Section title="About">
        <Field
          label="Eyebrow"
          value={site.about.eyebrow}
          onChange={(v) => setSite((s) => s && { ...s, about: { ...s.about, eyebrow: v } })}
          onBlur={() => save({ about: site.about })}
        />
        <Field
          label="Title"
          value={site.about.title}
          onChange={(v) => setSite((s) => s && { ...s, about: { ...s.about, title: v } })}
          onBlur={() => save({ about: site.about })}
        />
        <Field
          label="Body"
          value={site.about.body}
          textarea
          onChange={(v) => setSite((s) => s && { ...s, about: { ...s.about, body: v } })}
          onBlur={() => save({ about: site.about })}
        />
        <div>
          <label className="mb-1 block text-sm font-medium">Tiles (comma-separated)</label>
          <input
            value={site.about.tiles.join(", ")}
            onChange={(e) =>
              setSite((s) =>
                s && { ...s, about: { ...s.about, tiles: e.target.value.split(",").map((t) => t.trim()) } }
              )
            }
            onBlur={() => save({ about: site.about })}
            className="w-full rounded-xl border-2 border-ink bg-card px-4 py-2.5 text-sm outline-none focus:border-accent"
          />
        </div>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border-2 border-ink bg-card p-6 shadow-[4px_4px_0_0_var(--ink)]">
      <h3 className="mb-4 font-display text-lg font-bold">{title}</h3>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  textarea,
  onChange,
  onBlur,
}: {
  label: string;
  value: string;
  textarea?: boolean;
  onChange: (v: string) => void;
  onBlur: () => void;
}) {
  const cls = "w-full rounded-xl border-2 border-ink bg-background px-4 py-2.5 text-sm outline-none focus:border-accent";
  return (
    <div className={textarea ? "sm:col-span-2" : ""}>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      {textarea ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} onBlur={onBlur} rows={3} className={cls + " resize-none"} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} onBlur={onBlur} className={cls} />
      )}
    </div>
  );
}
