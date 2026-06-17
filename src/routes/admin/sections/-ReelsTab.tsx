import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Edit3, ChevronUp, ChevronDown, X, Plus } from "lucide-react";
import { detectEmbed, type EmbedKind } from "@/lib/admin/embed";
import {
  listReels,
  createReel,
  updateReel,
  deleteReel,
  reorderReels,
  type Reel,
} from "@/lib/admin/reels.functions";

const KIND_COLORS: Record<EmbedKind, string> = {
  youtube: "bg-red-100 text-red-700 border-red-300",
  vimeo: "bg-blue-100 text-blue-700 border-blue-300",
  instagram: "bg-pink-100 text-pink-700 border-pink-300",
  tiktok: "bg-gray-100 text-gray-700 border-gray-300",
  pinterest: "bg-red-50 text-red-600 border-red-200",
  mp4: "bg-green-100 text-green-700 border-green-300",
  unknown: "bg-yellow-100 text-yellow-700 border-yellow-300",
};

const EMPTY_FORM = { url: "", title: "", tag: "", description: "", poster: "" };

export function ReelsTab() {
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [preview, setPreview] = useState<ReturnType<typeof detectEmbed> | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toast, setToast] = useState("");

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }

  async function load() {
    setLoading(true);
    const data = await listReels();
    setReels(data);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  useEffect(() => {
    if (form.url) {
      try {
        setPreview(detectEmbed(form.url));
      } catch {
        setPreview(null);
      }
    } else {
      setPreview(null);
    }
  }, [form.url]);

  function startEdit(reel: Reel) {
    setEditingId(reel.id);
    setForm({ url: reel.url, title: reel.title, tag: reel.tag, description: reel.description, poster: reel.poster });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.url || !form.title || !form.tag) return;
    setSaving(true);
    try {
      if (editingId) {
        const updated = await updateReel({ data: { id: editingId, ...form } });
        setReels((prev) => prev.map((r) => (r.id === editingId ? updated : r)));
        showToast("Reel updated ✓");
        setEditingId(null);
      } else {
        const created = await createReel({ data: form });
        setReels((prev) => [...prev, created]);
        showToast("Reel added ✓");
      }
      setForm(EMPTY_FORM);
    } catch (err) {
      showToast("Error: " + (err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this reel?")) return;
    setDeleting(id);
    await deleteReel({ data: { id } });
    setReels((prev) => prev.filter((r) => r.id !== id));
    showToast("Deleted");
    setDeleting(null);
  }

  async function move(index: number, dir: -1 | 1) {
    const newReels = [...reels];
    const swap = index + dir;
    if (swap < 0 || swap >= newReels.length) return;
    [newReels[index], newReels[swap]] = [newReels[swap], newReels[index]];
    setReels(newReels);
    await reorderReels({ data: { orderedIds: newReels.map((r) => r.id) } });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
      {/* Add/Edit Form */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border-2 border-ink bg-card p-6 shadow-[4px_4px_0_0_var(--ink)]">
          <h2 className="mb-4 font-display text-xl font-bold">
            {editingId ? "Edit Reel" : "Add New Reel"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                URL (YouTube, Vimeo, Instagram, TikTok, Pinterest, or .mp4)
              </label>
              <input
                value={form.url}
                onChange={(e) => setForm((p) => ({ ...p, url: e.target.value }))}
                placeholder="Paste URL…"
                className="w-full rounded-xl border-2 border-ink bg-background px-3 py-2 text-sm outline-none focus:border-accent"
              />
              {preview && (
                <div className="mt-2 flex items-center gap-2">
                  <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${KIND_COLORS[preview.kind]}`}>
                    {preview.kind}
                  </span>
                  {preview.thumb && (
                    <img src={preview.thumb} alt="thumb" className="h-10 w-16 rounded object-cover border border-border" />
                  )}
                  {preview.kind === "unknown" && (
                    <span className="text-xs text-yellow-600">⚠ Unknown URL format</span>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Title</label>
              <input
                value={form.title}
                onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                maxLength={80}
                placeholder="Atlas — Origin"
                className="w-full rounded-xl border-2 border-ink bg-background px-3 py-2 text-sm outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Tag</label>
              <input
                value={form.tag}
                onChange={(e) => setForm((p) => ({ ...p, tag: e.target.value }))}
                maxLength={80}
                placeholder="Brand · Reel"
                className="w-full rounded-xl border-2 border-ink bg-background px-3 py-2 text-sm outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                maxLength={400}
                rows={2}
                placeholder="1–2 sentences…"
                className="w-full rounded-xl border-2 border-ink bg-background px-3 py-2 text-sm outline-none focus:border-accent resize-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                Poster image URL (optional — auto-filled from thumb)
              </label>
              <input
                value={form.poster}
                onChange={(e) => setForm((p) => ({ ...p, poster: e.target.value }))}
                placeholder="https://…"
                className="w-full rounded-xl border-2 border-ink bg-background px-3 py-2 text-sm outline-none focus:border-accent"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={saving || !form.url || !form.title || !form.tag}
                className="flex-1 rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-cream hover:opacity-80 disabled:opacity-40"
              >
                {saving ? "Saving…" : editingId ? "Save Changes" : "Add Reel"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="rounded-xl border-2 border-ink px-3 py-2.5 text-sm hover:bg-muted"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Reels List */}
      <div>
        <h2 className="mb-4 font-display text-xl font-bold">
          {reels.length} Reel{reels.length !== 1 ? "s" : ""}
        </h2>

        {loading && (
          <div className="py-10 text-center text-muted-foreground">Loading…</div>
        )}

        {!loading && reels.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-border py-16 text-center text-muted-foreground">
            <Plus className="mx-auto mb-2 h-8 w-8 opacity-30" />
            <p>No reels yet. Add one using the form.</p>
          </div>
        )}

        <div className="space-y-3">
          <AnimatePresence>
            {reels.map((reel, i) => (
              <motion.div
                key={reel.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`flex gap-3 rounded-2xl border-2 p-4 ${editingId === reel.id ? "border-accent bg-accent/5" : "border-border bg-card"}`}
              >
                {/* Thumb */}
                <div className="h-20 w-28 shrink-0 overflow-hidden rounded-xl border border-border bg-muted">
                  {reel.poster ? (
                    <img src={reel.poster} alt={reel.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-muted-foreground">{reel.kind}</div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className={`inline-block rounded-full border px-1.5 py-0.5 text-[10px] font-medium ${KIND_COLORS[reel.kind as EmbedKind] ?? ""}`}>
                        {reel.kind}
                      </span>
                      <span className="ml-2 text-xs text-muted-foreground">{reel.tag}</span>
                    </div>
                  </div>
                  <div className="mt-1 font-medium text-sm truncate">{reel.title}</div>
                  <p className="text-xs text-muted-foreground truncate">{reel.description}</p>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 flex-col items-center gap-1">
                  <button onClick={() => move(i, -1)} disabled={i === 0} className="rounded-lg border border-border p-1.5 hover:bg-muted disabled:opacity-30">
                    <ChevronUp className="h-3 w-3" />
                  </button>
                  <button onClick={() => move(i, 1)} disabled={i === reels.length - 1} className="rounded-lg border border-border p-1.5 hover:bg-muted disabled:opacity-30">
                    <ChevronDown className="h-3 w-3" />
                  </button>
                  <button onClick={() => startEdit(reel)} className="rounded-lg border border-border p-1.5 hover:bg-accent/20">
                    <Edit3 className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => handleDelete(reel.id)}
                    disabled={deleting === reel.id}
                    className="rounded-lg border border-destructive/30 p-1.5 text-destructive hover:bg-destructive/10 disabled:opacity-40"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Toast */}
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
