import { createFileRoute, useRouter, Link, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogOut, ExternalLink } from "lucide-react";
import { logoutAdmin, adminStatus } from "@/lib/admin/auth.functions";
import { AdminSidebar, type AdminTabId } from "@/components/admin/sidebar";
import { ReelsTab } from "./sections/-ReelsTab";
import { SiteTab } from "./sections/-SiteTab";
import { CollectionTab } from "./sections/-CollectionTab";
import { VisualAssetsTab } from "./sections/-VisualAssetsTab";
import { PortfolioSectionsTab } from "./sections/-PortfolioSectionsTab";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/admin/")({
  beforeLoad: async () => {
    const status = await adminStatus();
    if (!status.loggedIn) {
      throw redirect({ to: "/admin/login" });
    }
  },
  component: AdminDashboard,
});

function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTabId>("reels");
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await logoutAdmin();
    router.navigate({ to: "/admin/login" });
  }

  return (
    <div className="admin-shell min-h-screen bg-background text-foreground">
      <AdminSidebar activeTab={activeTab} onSelect={setActiveTab} onLogout={handleLogout}>
        {({ mobileMenuButton }) => (
          <>
            <div className="sticky top-0 z-40 border-b border-border bg-background/95 text-foreground backdrop-blur">
              <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                  {mobileMenuButton}
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-background p-1">
                    <img src={logo} alt="Imagine Design Studio" className="h-full w-full object-contain" />
                  </div>
                  <span className="min-w-0 truncate font-display text-sm font-semibold sm:text-base">Imagine Design Studio</span>
                  <span className="shrink-0 rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[10px] text-foreground sm:text-xs">Logged in</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <Link to="/" className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs hover:bg-muted">
                    <ExternalLink className="h-3 w-3" /> <span>Site</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-destructive px-3 py-1.5 text-xs font-medium text-destructive-foreground hover:opacity-90 disabled:opacity-50"
                  >
                    <LogOut className="h-3 w-3" /> <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-6 md:px-5">
              <div key={activeTab}>
            {activeTab === "reels" && <ReelsTab />}
            {activeTab === "site" && <SiteTab />}
            {activeTab === "portfolio" && <PortfolioSectionsTab />}
            {activeTab === "capabilities" && (
              <CollectionTab
                collection="capabilities"
                label="Capabilities"
                fields={[
                  { key: "key", label: "Key (e.g. 01)", type: "text" },
                  { key: "title", label: "Title", type: "text" },
                  { key: "description", label: "Description", type: "textarea" },
                  { key: "chips", label: "Chips (comma-separated)", type: "chips" },
                  { key: "metric", label: "Metric", type: "text" },
                  { key: "metricLabel", label: "Metric Label", type: "text" },
                  { key: "bg", label: "Background class (e.g. bg-accent)", type: "text" },
                  { key: "icon", label: "Icon name (e.g. Target)", type: "text" },
                ]}
              />
            )}
            {activeTab === "process" && (
              <CollectionTab
                collection="process"
                label="Process Steps"
                fields={[
                  { key: "number", label: "Number (e.g. 01)", type: "text" },
                  { key: "title", label: "Title", type: "text" },
                  { key: "description", label: "Description", type: "textarea" },
                  { key: "icon", label: "Icon name", type: "text" },
                  { key: "bg", label: "Background class", type: "text" },
                ]}
              />
            )}
            {activeTab === "cases" && (
              <CollectionTab
                collection="cases"
                label="Case Studies"
                fields={[
                  { key: "name", label: "Client Name", type: "text" },
                  { key: "sector", label: "Sector / Tags", type: "text" },
                  { key: "year", label: "Year (e.g. '25)", type: "text" },
                  { key: "word", label: "Big display word", type: "text" },
                  { key: "problem", label: "Problem statement", type: "text" },
                  { key: "color", label: "Card color class", type: "text" },
                ]}
              />
            )}
            {activeTab === "engagements" && (
              <CollectionTab
                collection="engagements"
                label="Engagements"
                fields={[
                  { key: "name", label: "Name (e.g. Sprint)", type: "text" },
                  { key: "duration", label: "Duration (e.g. 2-4 wks)", type: "text" },
                  { key: "description", label: "Description", type: "textarea" },
                  { key: "bullets", label: "Bullets (comma-separated)", type: "chips" },
                  { key: "tag", label: "Corner tag (e.g. Fastest)", type: "text" },
                  { key: "bg", label: "Background class", type: "text" },
                ]}
              />
            )}
            {activeTab === "testimonials" && (
              <CollectionTab
                collection="testimonials"
                label="Testimonials"
                fields={[
                  { key: "quote", label: "Quote", type: "textarea" },
                  { key: "author", label: "Author name", type: "text" },
                  { key: "role", label: "Role / Company", type: "text" },
                  { key: "stars", label: "Stars (1-5)", type: "text" },
                ]}
              />
            )}
            {activeTab === "stats" && (
              <CollectionTab
                collection="stats"
                label="Stats"
                fields={[
                  { key: "value", label: "Value (e.g. 6+)", type: "text" },
                  { key: "label", label: "Label (e.g. Years experience)", type: "text" },
                ]}
              />
            )}
            {activeTab === "visualAssets" && <VisualAssetsTab />}
            {activeTab === "marquee" && <MarqueeTab />}
            {activeTab === "contact" && <ContactTab />}
              </div>
            </div>

            <div className="border-t border-border px-4 py-4 text-center text-xs text-muted-foreground md:px-5">
              Admin changes publish into the portfolio content layer. Keep the shared password private and rotate it from <code>.env</code> when access changes.
            </div>
          </>
        )}
      </AdminSidebar>
    </div>
  );
}

/* Marquee Tab */
function MarqueeTab() {
  const [top, setTop] = useState("");
  const [bottom, setBottom] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    import("@/lib/admin/site.functions").then(({ getSite }) =>
      getSite().then((site) => {
        setTop(site.marquee.top.join(", "));
        setBottom(site.marquee.bottom.join(", "));
        setLoaded(true);
      })
    );
  }, []);

  async function handleSave() {
    setSaving(true);
    const { updateSite } = await import("@/lib/admin/site.functions");
    await updateSite({
      data: {
        marquee: {
          top: top.split(",").map((s) => s.trim()).filter(Boolean),
          bottom: bottom.split(",").map((s) => s.trim()).filter(Boolean),
        },
      },
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (!loaded) return <div className="py-10 text-center text-muted-foreground">Loading...</div>;

  return (
    <div className="max-w-2xl space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div><h2 className="font-display text-2xl font-bold">Marquee Text</h2><p className="mt-1 text-sm text-muted-foreground">Separate each phrase with a comma. The public marquee will use the saved order.</p></div>
      <div>
        <label className="mb-1 block text-sm font-medium">Top row (comma-separated words)</label>
        <input value={top} onChange={(e) => setTop(e.target.value)}
          className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20" />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Bottom row (comma-separated words)</label>
        <input value={bottom} onChange={(e) => setBottom(e.target.value)}
          className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20" />
      </div>
      <button onClick={handleSave} disabled={saving}
        className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-40">
        {saving ? "Saving..." : saved ? "Saved" : "Save Marquee"}
      </button>
    </div>
  );
}

/* Contact & Footer Tab */
function ContactTab() {
  const [form, setForm] = useState({
    contact_eyebrow: "", contact_headline: "", contact_blurb: "",
    contact_email: "", contact_bookCallUrl: "", footer_copyright: "",
  });
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    import("@/lib/admin/site.functions").then(({ getSite }) =>
      getSite().then((site) => {
        setForm({
          contact_eyebrow: site.contact.eyebrow,
          contact_headline: site.contact.headline,
          contact_blurb: site.contact.blurb,
          contact_email: site.contact.email,
          contact_bookCallUrl: site.contact.bookCallUrl,
          footer_copyright: site.footer.copyright,
        });
        setLoaded(true);
      })
    );
  }, []);

  async function handleSave() {
    setSaving(true);
    const { updateSite } = await import("@/lib/admin/site.functions");
    await updateSite({
      data: {
        contact: { eyebrow: form.contact_eyebrow, headline: form.contact_headline, blurb: form.contact_blurb, email: form.contact_email, bookCallUrl: form.contact_bookCallUrl },
        footer: { copyright: form.footer_copyright },
      },
    });
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (!loaded) return <div className="py-10 text-center text-muted-foreground">Loading...</div>;

  const fields = [
    { key: "contact_eyebrow" as const, label: "Contact eyebrow" },
    { key: "contact_headline" as const, label: "Contact headline" },
    { key: "contact_blurb" as const, label: "Contact blurb" },
    { key: "contact_email" as const, label: "Email address" },
    { key: "contact_bookCallUrl" as const, label: "Book call URL" },
    { key: "footer_copyright" as const, label: "Footer copyright text" },
  ];

  return (
    <div className="max-w-2xl space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div><h2 className="font-display text-2xl font-bold">Contact & Footer</h2><p className="mt-1 text-sm text-muted-foreground">Update the contact CTA, booking URL, email address, and footer copyright text.</p></div>
      {fields.map((f) => (
        <div key={f.key}>
          <label className="mb-1 block text-sm font-medium">{f.label}</label>
          <input value={form[f.key]} onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20" />
        </div>
      ))}
      <button onClick={handleSave} disabled={saving}
        className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-40">
        {saving ? "Saving..." : saved ? "Saved" : "Save"}
      </button>
    </div>
  );
}





