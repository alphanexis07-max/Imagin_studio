import { useState, useEffect } from "react";
import { Trash2, Edit3, ChevronUp, ChevronDown, X, Plus, UploadCloud } from "lucide-react";
import {
  listCollection,
  upsertItem,
  deleteItem,
  reorderCollection,
  type CollectionName,
} from "@/lib/admin/collections.functions";
import { deleteMedia, uploadMedia } from "@/lib/admin/media.functions";

interface FieldDef {
  key: string;
  label: string;
  type: "text" | "textarea" | "chips" | "image" | "video";
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
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [pendingMediaDeletes, setPendingMediaDeletes] = useState<string[]>([]);
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
    setPendingMediaDeletes([]);
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
    setPendingMediaDeletes([]);
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
      if (pendingMediaDeletes.length) {
        await Promise.all(pendingMediaDeletes.map((url) => deleteMedia({ data: { url } }).catch(() => null)));
        setPendingMediaDeletes([]);
      }

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

  try {
    const current = items.find((item) => item.id === id);

    // Delete database record
    await deleteItem({ data: { collection, id } });

    // Delete media from Cloudinary
    if (current) {
      await Promise.all(
        fields
          .filter(
            (field) => field.type === "image" || field.type === "video"
          )
          .map((field) => String(current[field.key] ?? ""))
          .filter(Boolean)
          .map((url) => deleteMedia({ data: { url } }))
      );
    }

    setItems((prev) => prev.filter((i) => i.id !== id));
    showToast("Deleted");
  } catch (err) {
    console.error(err);
    showToast("Delete failed");
  } finally {
    setDeletingId(null);
  }
}

  async function move(index: number, dir: -1 | 1) {
    const newItems = [...items];
    const swap = index + dir;
    if (swap < 0 || swap >= newItems.length) return;
    [newItems[index], newItems[swap]] = [newItems[swap], newItems[index]];
    setItems(newItems);
    await reorderCollection({ data: { collection, orderedIds: newItems.map((i) => i.id as string) } });
  }


  async function handleUpload(field: FieldDef, file: File | null) {
    if (!file) return;
    setUploadingKey(field.key);
    try {
      const dataUri = await readFileAsDataUri(file);
      const asset = await uploadMedia({
        data: {
          dataUri,
          folder: `alphanexis/portfolio/${collection}`,
          resourceType: field.type === "video" ? "video" : "image",
        },
      });
      const previousUrl = form[field.key];
      setForm((prev) => ({ ...prev, [field.key]: asset.secureUrl }));
      if (previousUrl && previousUrl !== asset.secureUrl) {
        setPendingMediaDeletes((prev) => Array.from(new Set([...prev, previousUrl])));
      }
      showToast("Uploaded. Save the item to publish it.");
    } catch (err) {
      showToast("Upload failed: " + (err as Error).message);
    } finally {
      setUploadingKey(null);
    }
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
                ) : field.type === "image" || field.type === "video" ? (
                  <details className="group max-w-full overflow-hidden rounded-lg border border-dashed border-border bg-muted/30 p-2">
                    <summary className="flex max-w-full cursor-pointer list-none items-center justify-between gap-3 rounded-md px-1 py-1 text-xs font-semibold text-foreground marker:hidden">
                      <span className="min-w-0 truncate">
                        {form[field.key] ? `${field.type === "image" ? "Image" : "Video"} selected` : `No ${field.type} selected`}
                      </span>
                      <span className="shrink-0 text-[10px] uppercase tracking-wider text-muted-foreground group-open:hidden">Edit</span>
                    </summary>
                    <div className="mt-2 space-y-2">
                      {field.type === "image" && form[field.key] ? (
                        <img
                          src={form[field.key]}
                          alt=""
                          className="h-24 w-full rounded-md border border-border object-cover"
                        />
                      ) : null}
                      <input
                        value={form[field.key] ?? ""}
                        onChange={(e) => setForm((p) => ({ ...p, [field.key]: e.target.value }))}
                        title={form[field.key] ?? ""}
                        className="w-full min-w-0 truncate rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                      />
                      <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted">
                        <UploadCloud className="h-3.5 w-3.5" />
                        {uploadingKey === field.key ? "Uploading..." : `Upload ${field.type}`}
                        <input
                          type="file"
                          accept={field.type === "video" ? "video/*" : "image/*"}
                          disabled={uploadingKey === field.key}
                          onChange={(event) => handleUpload(field, event.target.files?.[0] ?? null)}
                          className="sr-only"
                        />
                      </label>
                    </div>
                  </details>
                ) : (
                  <input
                    value={form[field.key] ?? ""}
                    onChange={(e) => setForm((p) => ({ ...p, [field.key]: e.target.value }))}
                    className="w-full min-w-0 rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
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
            const primaryField = fields.find((field) => !["image", "video", "poster", "detailUrl", "projectUrl"].includes(field.key)) ?? fields[0];
            const secondaryField = fields.find((field) => field.key !== primaryField?.key && !["image", "video", "poster"].includes(field.key)) ?? fields[1];
            const title = String(item[primaryField?.key ?? ""] ?? "Untitled item");
            const sub = String(item[secondaryField?.key ?? ""] ?? "");

            return (
              <div
                key={item.id as string}
                className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border p-4 ${editingId === item.id ? "border-accent bg-accent/10" : "border-border bg-card"}`}
              >
                <div className="min-w-0 overflow-hidden">
                  <div className="max-w-full truncate text-sm font-medium" title={title}>{title}</div>
                  {sub && <div className="max-w-full truncate text-xs text-muted-foreground" title={sub}>{sub}</div>}
                </div>
                <div className="sticky right-0 z-10 flex shrink-0 items-center gap-1 rounded-lg bg-card/95 pl-2 backdrop-blur supports-[backdrop-filter]:bg-card/80">
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

function readFileAsDataUri(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error ?? new Error("Could not read file."));
    reader.readAsDataURL(file);
  });
}




