import { useState, useEffect } from "react";
import { Trash2, Edit3, ChevronUp, ChevronDown, X, Plus } from "lucide-react";
import {
  listCollection,
  upsertItem,
  deleteItem,
  reorderCollection,
  type CollectionName,
} from "@/lib/admin/collections.functions";

interface FieldDef {
  key: string;
  label: string;
  type: "text" | "textarea" | "chips";
}

interface Props {
  collection: CollectionName;
  label: string;
  fields: FieldDef[];
  maxItems?: number;
}

export function CollectionTab({ collection, label, fields, maxItems }: Props) {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Record<string, string>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toast, setToast] = useState("");

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  }

  function emptyForm() {
    return Object.fromEntries(fields.map((f) => [f.key, ""]));
  }

  useEffect(() => {
    listCollection({ data: { collection } }).then((data) => {
      setItems(data as Record<string, unknown>[]);
      setLoading(false);
    });
    setForm(emptyForm());
  }, [collection]);

  function startEdit(item: Record<string, unknown>) {
    setEditingId(item.id as string);
    const f: Record<string, string> = {};
    for (const field of fields) {
      const val = item[field.key];
      f[field.key] =
        field.type === "chips" && Array.isArray(val)
          ? val
              .map((entry) =>
                entry && typeof entry === "object"
                  ? `${String((entry as Record<string, unknown>).label ?? "")}:${String((entry as Record<string, unknown>).value ?? "")}`
                  : String(entry),
              )
              .filter(Boolean)
              .join(", ")
          : String(val ?? "");
    }
    setForm(f);
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm());
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!editingId && typeof maxItems === "number" && items.length >= maxItems) {
      showToast(`Limit reached for ${label}`);
      return;
    }
    setSaving(true);
    try {
      const item: Record<string, unknown> = {};
      for (const field of fields) {
        item[field.key] = field.type === "chips"
          ? form[field.key].split(",").map((s) => s.trim()).filter(Boolean)
          : form[field.key];
      }
      if (editingId) item.id = editingId;

      const result = await upsertItem({ data: { collection, item } }) as Record<string, unknown>;
      if (editingId) {
        setItems((prev) => prev.map((i) => (i.id === editingId ? result : i)));
        showToast("Updated");
        setEditingId(null);
      } else {
        setItems((prev) => [...prev, result]);
        showToast("Added");
      }
      setForm(emptyForm());
    } catch (err) {
      const message = (err as Error).message;
      showToast(message === "LIMIT_REACHED" ? `Limit reached for ${label}` : "Error: " + message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this item?")) return;
    setDeletingId(id);
    await deleteItem({ data: { collection, id } });
    setItems((prev) => prev.filter((i) => i.id !== id));
    showToast("Deleted");
    setDeletingId(null);
  }

  async function move(index: number, dir: -1 | 1) {
    const newItems = [...items];
    const swap = index + dir;
    if (swap < 0 || swap >= newItems.length) return;
    [newItems[index], newItems[swap]] = [newItems[swap], newItems[index]];
    setItems(newItems);
    await reorderCollection({ data: { collection, orderedIds: newItems.map((i) => i.id as string) } });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-2 font-display text-xl font-bold">
            {editingId ? `Edit ${label.replace(/s$/, "")}` : `Add ${label.replace(/s$/, "")}`}
          </h2>
          <p className="mb-5 text-sm text-muted-foreground">
            Add, edit, and reorder the content that appears on the public portfolio.
          </p>
          <form onSubmit={handleSubmit} className="space-y-3">
            {fields.map((field) => (
              <div key={field.key}>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">
                  {field.label}
                  {field.type === "chips" && <span className="ml-1 text-[10px] opacity-70">comma-separated</span>}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    value={form[field.key] ?? ""}
                    onChange={(e) => setForm((p) => ({ ...p, [field.key]: e.target.value }))}
                    rows={3}
                    className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                  />
                ) : (
                  <input
                    value={form[field.key] ?? ""}
                    onChange={(e) => setForm((p) => ({ ...p, [field.key]: e.target.value }))}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                  />
                )}
              </div>
            ))}
            <div className="flex gap-2 pt-2">
              {editingId ? (
                <>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-40"
                  >
                    {saving ? "Saving..." : "Save changes"}
                  </button>
                  <button type="button" onClick={cancelEdit} className="rounded-lg border border-border px-3 py-2.5 text-sm hover:bg-muted" aria-label="Cancel edit">
                    <X className="h-4 w-4" />
                  </button>
                </>
              ) : typeof maxItems === "number" && items.length >= maxItems ? (
                <div className="w-full rounded-lg border border-dashed border-border px-4 py-2.5 text-sm text-muted-foreground">
                  Maximum of {maxItems} items reached for {label}. Delete one to add another.
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-40"
                >
                  {saving ? "Saving..." : "Add item"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-end justify-between gap-3">
          <h2 className="font-display text-xl font-bold">{items.length} {label}</h2>
          <p className="text-xs text-muted-foreground">Use arrows to control display order.</p>
        </div>

        {loading && <div className="py-10 text-center text-muted-foreground">Loading...</div>}

        {!loading && items.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border bg-card/60 py-16 text-center text-muted-foreground">
            <Plus className="mx-auto mb-2 h-8 w-8 opacity-30" />
            <p>No {label.toLowerCase()} yet.</p>
          </div>
        )}

        <div className="space-y-2">
          {items.map((item, i) => {
            const primaryField = fields[0];
            const secondaryField = fields[1];
            const title = String(item[primaryField?.key ?? ""] ?? "");
            const sub = String(item[secondaryField?.key ?? ""] ?? "");

            return (
              <div
                key={item.id as string}
                className={`flex items-center gap-3 rounded-xl border p-4 ${editingId === item.id ? "border-accent bg-accent/10" : "border-border bg-card"}`}
              >
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{title}</div>
                  {sub && <div className="truncate text-xs text-muted-foreground">{sub}</div>}
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <button onClick={() => move(i, -1)} disabled={i === 0} className="rounded-lg border border-border p-1.5 hover:bg-muted disabled:opacity-30" aria-label="Move up">
                    <ChevronUp className="h-3 w-3" />
                  </button>
                  <button onClick={() => move(i, 1)} disabled={i === items.length - 1} className="rounded-lg border border-border p-1.5 hover:bg-muted disabled:opacity-30" aria-label="Move down">
                    <ChevronDown className="h-3 w-3" />
                  </button>
                  <button onClick={() => startEdit(item)} className="rounded-lg border border-border p-1.5 hover:bg-accent/20" aria-label="Edit item">
                    <Edit3 className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id as string)}
                    disabled={deletingId === item.id}
                    className="rounded-lg border border-destructive/30 p-1.5 text-destructive hover:bg-destructive/10 disabled:opacity-40"
                    aria-label="Delete item"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-lg border border-border bg-popover px-4 py-2.5 text-sm font-medium text-popover-foreground shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
