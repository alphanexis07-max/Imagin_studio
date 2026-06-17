import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
}

export function CollectionTab({ collection, label, fields }: Props) {
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
      if (field.type === "chips" && Array.isArray(val)) {
        f[field.key] = val.join(", ");
      } else {
        f[field.key] = String(val ?? "");
      }
    }
    setForm(f);
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm());
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const item: Record<string, unknown> = {};
      for (const field of fields) {
        if (field.type === "chips") {
          item[field.key] = form[field.key].split(",").map((s) => s.trim()).filter(Boolean);
        } else {
          item[field.key] = form[field.key];
        }
      }
      if (editingId) item.id = editingId;

      const result = await upsertItem({ data: { collection, item } }) as Record<string, unknown>;
      if (editingId) {
        setItems((prev) => prev.map((i) => (i.id === editingId ? result : i)));
        showToast("Updated ✓");
        setEditingId(null);
      } else {
        setItems((prev) => [...prev, result]);
        showToast("Added ✓");
      }
      setForm(emptyForm());
    } catch (err) {
      showToast("Error: " + (err as Error).message);
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
      {/* Form */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border-2 border-ink bg-card p-6 shadow-[4px_4px_0_0_var(--ink)]">
          <h2 className="mb-4 font-display text-xl font-bold">
            {editingId ? `Edit ${label.replace(/s$/, "")}` : `Add ${label.replace(/s$/, "")}`}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            {fields.map((field) => (
              <div key={field.key}>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">
                  {field.label}
                  {field.type === "chips" && <span className="ml-1 text-[10px] opacity-60">(comma-separated)</span>}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    value={form[field.key] ?? ""}
                    onChange={(e) => setForm((p) => ({ ...p, [field.key]: e.target.value }))}
                    rows={2}
                    className="w-full rounded-xl border-2 border-ink bg-background px-3 py-2 text-sm outline-none focus:border-accent resize-none"
                  />
                ) : (
                  <input
                    value={form[field.key] ?? ""}
                    onChange={(e) => setForm((p) => ({ ...p, [field.key]: e.target.value }))}
                    className="w-full rounded-xl border-2 border-ink bg-background px-3 py-2 text-sm outline-none focus:border-accent"
                  />
                )}
              </div>
            ))}
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-cream hover:opacity-80 disabled:opacity-40"
              >
                {saving ? "Saving…" : editingId ? "Save" : "Add"}
              </button>
              {editingId && (
                <button type="button" onClick={cancelEdit} className="rounded-xl border-2 border-ink px-3 py-2.5 text-sm hover:bg-muted">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* List */}
      <div>
        <h2 className="mb-4 font-display text-xl font-bold">{items.length} {label}</h2>

        {loading && <div className="py-10 text-center text-muted-foreground">Loading…</div>}

        {!loading && items.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-border py-16 text-center text-muted-foreground">
            <Plus className="mx-auto mb-2 h-8 w-8 opacity-30" />
            <p>No {label.toLowerCase()} yet.</p>
          </div>
        )}

        <div className="space-y-2">
          <AnimatePresence>
            {items.map((item, i) => {
              const primaryField = fields[0];
              const secondaryField = fields[1];
              const title = String(item[primaryField?.key ?? ""] ?? "");
              const sub = String(item[secondaryField?.key ?? ""] ?? "");

              return (
                <motion.div
                  key={item.id as string}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className={`flex items-center gap-3 rounded-xl border-2 p-4 ${editingId === item.id ? "border-accent bg-accent/5" : "border-border bg-card"}`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{title}</div>
                    {sub && <div className="text-xs text-muted-foreground truncate">{sub}</div>}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => move(i, -1)} disabled={i === 0} className="rounded-lg border border-border p-1.5 hover:bg-muted disabled:opacity-30">
                      <ChevronUp className="h-3 w-3" />
                    </button>
                    <button onClick={() => move(i, 1)} disabled={i === items.length - 1} className="rounded-lg border border-border p-1.5 hover:bg-muted disabled:opacity-30">
                      <ChevronDown className="h-3 w-3" />
                    </button>
                    <button onClick={() => startEdit(item)} className="rounded-lg border border-border p-1.5 hover:bg-accent/20">
                      <Edit3 className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id as string)}
                      disabled={deletingId === item.id}
                      className="rounded-lg border border-destructive/30 p-1.5 text-destructive hover:bg-destructive/10 disabled:opacity-40"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 rounded-xl bg-ink px-4 py-2.5 text-sm font-medium text-cream shadow-lg"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
