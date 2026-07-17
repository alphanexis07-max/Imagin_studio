import { useEffect, useState } from "react";
import { listCollection, upsertItem } from "@/lib/admin/collections.functions";

type VisualAssetItem = Record<string, unknown> & { id?: string; order?: number };

const SLOT_COUNT = 5;

const defaultSlots: VisualAssetItem[] = Array.from({ length: SLOT_COUNT }, (_, index) => ({
  order: index,
  image: "",
  categoryLabel: "ARCHITECTURE",
  subcategory: "",
  title: `Architectural Rendering ${index + 1}`,
  description: "",
}));

export function VisualAssetsTab() {
  const [items, setItems] = useState<VisualAssetItem[]>(defaultSlots);
  const [loading, setLoading] = useState(true);
  const [savingIndex, setSavingIndex] = useState<number | null>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    listCollection({ data: { collection: "visualAssets" } }).then((data) => {
      const loaded = [...(data as VisualAssetItem[])].sort((a, b) => Number(a.order ?? 0) - Number(b.order ?? 0));
      setItems(Array.from({ length: SLOT_COUNT }, (_, index) => ({
        ...defaultSlots[index],
        ...(loaded[index] ?? {}),
        order: index,
      })));
      setLoading(false);
    });
  }, []);

  function updateItem(index: number, key: string, value: string) {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)));
  }

  async function saveItem(index: number) {
    setSavingIndex(index);
    setStatus("");
    try {
      const item = items[index];
      const result = await upsertItem({
        data: {
          collection: "visualAssets",
          item: {
            ...item,
            order: index,
          },
        },
      });
      setItems((prev) => prev.map((entry, i) => (i === index ? { ...(result as VisualAssetItem), order: index } : entry)));
      setStatus(`Slot ${index + 1} saved`);
      setTimeout(() => setStatus(""), 2000);
    } finally {
      setSavingIndex(null);
    }
  }

  if (loading) return <div className="py-10 text-center text-muted-foreground">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-bold">Architectural Renderings</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Edit all 5 Architectural Renderings posts here. Each slot maps directly to one card on the public site.
          </p>
        </div>
        {status ? (
          <span className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            {status}
          </span>
        ) : null}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {items.map((item, index) => (
          <section key={index} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Slot {index + 1}
                </div>
                <h3 className="font-display text-lg font-bold">{String(item.title || `Architectural Rendering ${index + 1}`)}</h3>
              </div>
              <button
                type="button"
                onClick={() => saveItem(index)}
                disabled={savingIndex === index}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-40"
              >
                {savingIndex === index ? "Saving..." : "Save"}
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Image URL / path"
                value={String(item.image ?? "")}
                onChange={(value) => updateItem(index, "image", value)}
                spanFull
              />
              <Field
                label="Category label"
                value={String(item.categoryLabel ?? "")}
                onChange={(value) => updateItem(index, "categoryLabel", value)}
              />
              <Field
                label="Subcategory"
                value={String(item.subcategory ?? "")}
                onChange={(value) => updateItem(index, "subcategory", value)}
              />
              <Field
                label="Title"
                value={String(item.title ?? "")}
                onChange={(value) => updateItem(index, "title", value)}
                spanFull
              />
              <Field
                label="Description"
                value={String(item.description ?? "")}
                onChange={(value) => updateItem(index, "description", value)}
                textarea
                spanFull
              />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  textarea,
  spanFull,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  textarea?: boolean;
  spanFull?: boolean;
}) {
  const className = "w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20";

  return (
    <div className={spanFull ? "sm:col-span-2" : ""}>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={4}
          className={className + " resize-none"}
        />
      ) : (
        <input value={value} onChange={(event) => onChange(event.target.value)} className={className} />
      )}
    </div>
  );
}
