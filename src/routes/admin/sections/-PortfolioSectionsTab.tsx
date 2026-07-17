import type { ReactNode } from "react";
import { CollectionTab } from "./-CollectionTab";

export function PortfolioSectionsTab() {
  return (
    <div className="space-y-10">
      <SectionShell
        title="Hero Showcase"
        description="Five featured project cards that appear at the top of the portfolio."
      >
        <CollectionTab
          collection="heroShowcase"
          label="Hero Showcase"
          maxItems={10}
          fields={[
            { key: "categoryLabel", label: "Category label", type: "text" },
            { key: "title", label: "Title", type: "text" },
            { key: "description", label: "Description", type: "textarea" },
            { key: "video", label: "Video URL", type: "video" },
            { key: "poster", label: "Poster image URL", type: "image" },
            { key: "glow", label: "Glow class", type: "text" },
            { key: "ctaText", label: "CTA text", type: "text" },
            { key: "ctaLink", label: "CTA / open URL", type: "text" },
          ]}
        />
      </SectionShell>

      <SectionShell title="Spatial Walkthroughs" description="Four project film cards with poster, outcome, and accent styling.">
        <CollectionTab
          collection="videoEditing"
          label="Spatial Walkthroughs"
          maxItems={4}
          fields={[
            { key: "categoryLabel", label: "Category label", type: "text" },
            { key: "title", label: "Title", type: "text" },
            { key: "description", label: "Description", type: "textarea" },
            { key: "outcome", label: "Outcome", type: "text" },
            { key: "video", label: "Video URL", type: "video" },
            { key: "poster", label: "Poster image URL", type: "image" },
            { key: "detailUrl", label: "Inspect/open URL", type: "text" },
            { key: "accentColor", label: "Accent class", type: "text" },
          ]}
        />
      </SectionShell>

      <SectionShell title="Architectural Renderings" description="Posts for the public Architectural Renderings section.">
        <CollectionTab
          collection="visualAssets"
          label="Architectural Renderings"
          maxItems={15}
          fields={[
            { key: "image", label: "Image URL / path", type: "image" },
            { key: "detailUrl", label: "Inspect/open URL", type: "text" },
            { key: "categoryLabel", label: "Category label", type: "text" },
            { key: "subcategory", label: "Subcategory", type: "text" },
            { key: "title", label: "Title", type: "text" },
            { key: "description", label: "Description", type: "textarea" },
          ]}
        />
      </SectionShell>

      <SectionShell title="Design Coordination" description="Four documentation or delivery cards with features, tools, and poster.">
        <CollectionTab
          collection="softwareSystems"
          label="Design Coordination"
          maxItems={4}
          fields={[
            { key: "categoryLabel", label: "Category label", type: "text" },
            { key: "title", label: "Title", type: "text" },
            { key: "description", label: "Description", type: "textarea" },
            { key: "keyFeatures", label: "Key features (comma-separated)", type: "chips" },
            { key: "techStack", label: "Tools / deliverables (comma-separated)", type: "chips" },
            { key: "businessBenefit", label: "Project benefit", type: "text" },
            { key: "poster", label: "Poster image URL", type: "image" },
            { key: "video", label: "Video URL", type: "video" },
            { key: "projectUrl", label: "Project / reference URL", type: "text" },
            { key: "accentColor", label: "Accent class", type: "text" },
          ]}
        />
      </SectionShell>

      <SectionShell title="Project Management & Analytics" description="Posts for the public Project Management & Analytics section.">
        <CollectionTab
          collection="seoAnalytics"
          label="Project Management & Analytics"
          maxItems={4}
          fields={[
            { key: "categoryLabel", label: "Category label", type: "text" },
            { key: "title", label: "Title", type: "text" },
            { key: "description", label: "Description", type: "textarea" },
            { key: "metrics", label: "Metrics (label:value pairs, comma-separated)", type: "chips" },
            { key: "poster", label: "Poster image URL", type: "image" },
            { key: "video", label: "Video URL", type: "video" },
            { key: "detailUrl", label: "Inspect/open URL", type: "text" },
            { key: "accent", label: "Accent class", type: "text" },
          ]}
        />
      </SectionShell>

      <SectionShell title="Strategic Consulting" description="Two consulting case cards with narrative fields and results.">
        <CollectionTab
          collection="strategicConsulting"
          label="Strategic Consulting"
          maxItems={2}
          fields={[
            { key: "categoryLabel", label: "Category label", type: "text" },
            { key: "title", label: "Title", type: "text" },
            { key: "challenge", label: "Challenge", type: "textarea" },
            { key: "solution", label: "Solution", type: "textarea" },
            { key: "execution", label: "Execution", type: "textarea" },
            { key: "results", label: "Results (label:value pairs, comma-separated)", type: "chips" },
          ]}
        />
      </SectionShell>

      <SectionShell title="Design Narrative" description="Three concept, brief, or specification cards with headline and excerpt content.">
        <CollectionTab
          collection="contentWriting"
          label="Design Narrative"
          maxItems={3}
          fields={[
            { key: "categoryLabel", label: "Category label", type: "text" },
            { key: "type", label: "Type", type: "text" },
            { key: "headline", label: "Headline", type: "text" },
            { key: "metrics", label: "Metrics", type: "text" },
            { key: "excerpt", label: "Excerpt", type: "textarea" },
          ]}
        />
      </SectionShell>
    </div>
  );
}

function SectionShell({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="font-display text-2xl font-bold">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </section>
  );
}
