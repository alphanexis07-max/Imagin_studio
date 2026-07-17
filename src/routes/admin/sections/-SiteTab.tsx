import { useState, useEffect } from "react";
import { DEFAULT_SITE } from "@/lib/cms/defaults";
import { getSite, updateSite, type SiteData } from "@/lib/admin/site.functions";
import { uploadMedia } from "@/lib/admin/media.functions";

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

  if (!site) return <div className="py-10 text-center text-muted-foreground">Loading...</div>;

  const portfolio = site.portfolio ?? DEFAULT_SITE.portfolio;

  function updatePortfolio(updater: (value: SiteData["portfolio"]) => SiteData["portfolio"]) {
    setSite((current) =>
      current
        ? {
            ...current,
            portfolio: updater(current.portfolio ?? DEFAULT_SITE.portfolio),
          }
        : current,
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-bold">Hero & About</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            These fields update the first public impression of the portfolio. Most changes save when the field loses focus.
          </p>
        </div>
        <span className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
          {saving ? "Saving..." : savedAt ? `Saved ${savedAt.toLocaleTimeString()}` : "Ready"}
        </span>
      </div>

      <Section title="Hero" description="Edit the headline, portrait, sidebar stat, and short quote shown in the hero area.">
        <Field label="Eyebrow pill" value={site.hero.eyebrow} onChange={(v) => setSite((s) => s && { ...s, hero: { ...s.hero, eyebrow: v } })} onBlur={() => save({ hero: site.hero })} />
        <Field label="Name" value={site.hero.name} onChange={(v) => setSite((s) => s && { ...s, hero: { ...s.hero, name: v } })} onBlur={() => save({ hero: site.hero })} />
        <Field label="Headline" value={site.hero.headline} onChange={(v) => setSite((s) => s && { ...s, hero: { ...s.hero, headline: v } })} onBlur={() => save({ hero: site.hero })} />
        <Field label="Portrait URL" value={site.hero.portraitUrl} onChange={(v) => setSite((s) => s && { ...s, hero: { ...s.hero, portraitUrl: v } })} onBlur={() => save({ hero: site.hero })} />
        <MediaUpload
          label="Upload portrait"
          accept="image/*"
          folder="alphanexis/portrait"
          onUploaded={(url) => {
            const hero = { ...site.hero, portraitUrl: url };
            setSite((s) => s && { ...s, hero });
            save({ hero });
          }}
        />
        <Field label="Sidebar stat value" value={site.hero.sidebarStat.value} onChange={(v) => setSite((s) => s && { ...s, hero: { ...s.hero, sidebarStat: { ...s.hero.sidebarStat, value: v } } })} onBlur={() => save({ hero: site.hero })} />
        <Field label="Sidebar stat label" value={site.hero.sidebarStat.label} onChange={(v) => setSite((s) => s && { ...s, hero: { ...s.hero, sidebarStat: { ...s.hero.sidebarStat, label: v } } })} onBlur={() => save({ hero: site.hero })} />
        <Field label="Sidebar quote" value={site.hero.sidebarQuote} textarea onChange={(v) => setSite((s) => s && { ...s, hero: { ...s.hero, sidebarQuote: v } })} onBlur={() => save({ hero: site.hero })} />
      </Section>

      <Section title="About" description="Keep this concise. The public about section has limited space on mobile.">
        <Field label="Eyebrow" value={site.about.eyebrow} onChange={(v) => setSite((s) => s && { ...s, about: { ...s.about, eyebrow: v } })} onBlur={() => save({ about: site.about })} />
        <Field label="Title" value={site.about.title} onChange={(v) => setSite((s) => s && { ...s, about: { ...s.about, title: v } })} onBlur={() => save({ about: site.about })} />
        <Field label="Body" value={site.about.body} textarea onChange={(v) => setSite((s) => s && { ...s, about: { ...s.about, body: v } })} onBlur={() => save({ about: site.about })} />
        <div>
          <label className="mb-1 block text-sm font-medium">Tiles</label>
          <input
            value={site.about.tiles.join(", ")}
            onChange={(e) =>
              setSite((s) =>
                s && { ...s, about: { ...s.about, tiles: e.target.value.split(",").map((t) => t.trim()) } }
              )
            }
            onBlur={() => save({ about: site.about })}
            className={fieldClassName}
          />
          <p className="mt-1 text-xs text-muted-foreground">Separate each tile with a comma.</p>
        </div>
      </Section>

      <Section title="Portfolio Copy" description="Update the global portfolio heading and each section's headline text separately.">
        <Field
          label="Portfolio eyebrow"
          value={portfolio.overview.eyebrow}
          onChange={(v) => updatePortfolio((p) => ({ ...p, overview: { ...p.overview, eyebrow: v } }))}
          onBlur={() => save({ portfolio })}
        />
        <Field
          label="Portfolio title"
          value={portfolio.overview.title}
          onChange={(v) => updatePortfolio((p) => ({ ...p, overview: { ...p.overview, title: v } }))}
          onBlur={() => save({ portfolio })}
        />
        <Field
          label="Portfolio description"
          value={portfolio.overview.description}
          textarea
          onChange={(v) => updatePortfolio((p) => ({ ...p, overview: { ...p.overview, description: v } }))}
          onBlur={() => save({ portfolio })}
        />

        <Field
          label="Hero showcase eyebrow"
          value={portfolio.sections.heroShowcase.eyebrow}
          onChange={(v) => updatePortfolio((p) => ({ ...p, sections: { ...p.sections, heroShowcase: { ...p.sections.heroShowcase, eyebrow: v } } }))}
          onBlur={() => save({ portfolio })}
        />
        <Field
          label="Hero showcase title"
          value={portfolio.sections.heroShowcase.title}
          onChange={(v) => updatePortfolio((p) => ({ ...p, sections: { ...p.sections, heroShowcase: { ...p.sections.heroShowcase, title: v } } }))}
          onBlur={() => save({ portfolio })}
        />
        <Field
          label="Hero showcase description"
          value={portfolio.sections.heroShowcase.description}
          textarea
          onChange={(v) => updatePortfolio((p) => ({ ...p, sections: { ...p.sections, heroShowcase: { ...p.sections.heroShowcase, description: v } } }))}
          onBlur={() => save({ portfolio })}
        />

        <Field
          label="Walkthroughs eyebrow"
          value={portfolio.sections.videoEditing.eyebrow}
          onChange={(v) => updatePortfolio((p) => ({ ...p, sections: { ...p.sections, videoEditing: { ...p.sections.videoEditing, eyebrow: v } } }))}
          onBlur={() => save({ portfolio })}
        />
        <Field
          label="Walkthroughs title"
          value={portfolio.sections.videoEditing.title}
          onChange={(v) => updatePortfolio((p) => ({ ...p, sections: { ...p.sections, videoEditing: { ...p.sections.videoEditing, title: v } } }))}
          onBlur={() => save({ portfolio })}
        />
        <Field
          label="Walkthroughs description"
          value={portfolio.sections.videoEditing.description}
          textarea
          onChange={(v) => updatePortfolio((p) => ({ ...p, sections: { ...p.sections, videoEditing: { ...p.sections.videoEditing, description: v } } }))}
          onBlur={() => save({ portfolio })}
        />

        <Field
          label="Architectural Renderings eyebrow"
          value={portfolio.sections.visualAssets.eyebrow}
          onChange={(v) => updatePortfolio((p) => ({ ...p, sections: { ...p.sections, visualAssets: { ...p.sections.visualAssets, eyebrow: v } } }))}
          onBlur={() => save({ portfolio })}
        />
        <Field
          label="Architectural Renderings title"
          value={portfolio.sections.visualAssets.title}
          onChange={(v) => updatePortfolio((p) => ({ ...p, sections: { ...p.sections, visualAssets: { ...p.sections.visualAssets, title: v } } }))}
          onBlur={() => save({ portfolio })}
        />
        <Field
          label="Architectural Renderings description"
          value={portfolio.sections.visualAssets.description}
          textarea
          onChange={(v) => updatePortfolio((p) => ({ ...p, sections: { ...p.sections, visualAssets: { ...p.sections.visualAssets, description: v } } }))}
          onBlur={() => save({ portfolio })}
        />

        <Field
          label="Design coordination eyebrow"
          value={portfolio.sections.softwareSystems.eyebrow}
          onChange={(v) => updatePortfolio((p) => ({ ...p, sections: { ...p.sections, softwareSystems: { ...p.sections.softwareSystems, eyebrow: v } } }))}
          onBlur={() => save({ portfolio })}
        />
        <Field
          label="Design coordination title"
          value={portfolio.sections.softwareSystems.title}
          onChange={(v) => updatePortfolio((p) => ({ ...p, sections: { ...p.sections, softwareSystems: { ...p.sections.softwareSystems, title: v } } }))}
          onBlur={() => save({ portfolio })}
        />
        <Field
          label="Design coordination description"
          value={portfolio.sections.softwareSystems.description}
          textarea
          onChange={(v) => updatePortfolio((p) => ({ ...p, sections: { ...p.sections, softwareSystems: { ...p.sections.softwareSystems, description: v } } }))}
          onBlur={() => save({ portfolio })}
        />

        <Field
          label="Project Management & Analytics eyebrow"
          value={portfolio.sections.seoAnalytics.eyebrow}
          onChange={(v) => updatePortfolio((p) => ({ ...p, sections: { ...p.sections, seoAnalytics: { ...p.sections.seoAnalytics, eyebrow: v } } }))}
          onBlur={() => save({ portfolio })}
        />
        <Field
          label="Project Management & Analytics title"
          value={portfolio.sections.seoAnalytics.title}
          onChange={(v) => updatePortfolio((p) => ({ ...p, sections: { ...p.sections, seoAnalytics: { ...p.sections.seoAnalytics, title: v } } }))}
          onBlur={() => save({ portfolio })}
        />
        <Field
          label="Project Management & Analytics description"
          value={portfolio.sections.seoAnalytics.description}
          textarea
          onChange={(v) => updatePortfolio((p) => ({ ...p, sections: { ...p.sections, seoAnalytics: { ...p.sections.seoAnalytics, description: v } } }))}
          onBlur={() => save({ portfolio })}
        />

        <Field
          label="Consulting eyebrow"
          value={portfolio.sections.strategicConsulting.eyebrow}
          onChange={(v) => updatePortfolio((p) => ({ ...p, sections: { ...p.sections, strategicConsulting: { ...p.sections.strategicConsulting, eyebrow: v } } }))}
          onBlur={() => save({ portfolio })}
        />
        <Field
          label="Consulting title"
          value={portfolio.sections.strategicConsulting.title}
          onChange={(v) => updatePortfolio((p) => ({ ...p, sections: { ...p.sections, strategicConsulting: { ...p.sections.strategicConsulting, title: v } } }))}
          onBlur={() => save({ portfolio })}
        />
        <Field
          label="Consulting description"
          value={portfolio.sections.strategicConsulting.description}
          textarea
          onChange={(v) => updatePortfolio((p) => ({ ...p, sections: { ...p.sections, strategicConsulting: { ...p.sections.strategicConsulting, description: v } } }))}
          onBlur={() => save({ portfolio })}
        />

        <Field
          label="Design narrative eyebrow"
          value={portfolio.sections.contentWriting.eyebrow}
          onChange={(v) => updatePortfolio((p) => ({ ...p, sections: { ...p.sections, contentWriting: { ...p.sections.contentWriting, eyebrow: v } } }))}
          onBlur={() => save({ portfolio })}
        />
        <Field
          label="Design narrative title"
          value={portfolio.sections.contentWriting.title}
          onChange={(v) => updatePortfolio((p) => ({ ...p, sections: { ...p.sections, contentWriting: { ...p.sections.contentWriting, title: v } } }))}
          onBlur={() => save({ portfolio })}
        />
        <Field
          label="Design narrative description"
          value={portfolio.sections.contentWriting.description}
          textarea
          onChange={(v) => updatePortfolio((p) => ({ ...p, sections: { ...p.sections, contentWriting: { ...p.sections.contentWriting, description: v } } }))}
          onBlur={() => save({ portfolio })}
        />
      </Section>
    </div>
  );
}

function Section({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h3 className="font-display text-lg font-bold">{title}</h3>
      <p className="mb-5 mt-1 text-sm text-muted-foreground">{description}</p>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function MediaUpload({
  label,
  accept,
  folder,
  onUploaded,
}: {
  label: string;
  accept: string;
  folder: string;
  onUploaded: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);

  async function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const dataUri = await readFileAsDataUri(file);
      const asset = await uploadMedia({
        data: {
          dataUri,
          folder,
          resourceType: file.type.startsWith("video/") ? "video" : "image",
        },
      });
      onUploaded(asset.secureUrl);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  return (
    <div>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      <input
        type="file"
        accept={accept}
        disabled={uploading}
        onChange={onChange}
        className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-primary-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-50"
      />
      <p className="mt-1 text-xs text-muted-foreground">
        {uploading ? "Uploading to Cloudinary..." : "After upload, the Cloudinary URL is saved into the portrait field."}
      </p>
    </div>
  );
}

function readFileAsDataUri(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

const fieldClassName = "w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20";

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
  return (
    <div className={textarea ? "sm:col-span-2" : ""}>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      {textarea ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} onBlur={onBlur} rows={3} className={fieldClassName + " resize-none"} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} onBlur={onBlur} className={fieldClassName} />
      )}
    </div>
  );
}
