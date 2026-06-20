import { useState, useEffect } from "react";
import { Trash2, Edit3, ChevronUp, ChevronDown, X, Plus } from "lucide-react";
import { detectEmbed, type EmbedKind } from "@/lib/admin/embed";
import { uploadMedia } from "@/lib/admin/media.functions";
import {
  listReels,
  createReel,
  updateReel,
  deleteReel,
  reorderReels,
  type Reel,
} from "@/lib/admin/reels.functions";

const KIND_COLORS: Record<EmbedKind, string> = {
  youtube: "border-destructive/30 bg-destructive/10 text-destructive",
  vimeo: "border-accent/40 bg-accent/10 text-foreground",
  instagram: "border-accent/40 bg-accent/10 text-foreground",
  tiktok: "border-border bg-muted text-muted-foreground",
  pinterest: "border-destructive/30 bg-destructive/10 text-destructive",
  mp4: "border-accent/40 bg-accent/10 text-foreground",
  unknown: "border-border bg-muted text-muted-foreground",
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
  const [uploading, setUploading] = useState<"poster" | "video" | null>(null);

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
        showToast("Reel updated");
        setEditingId(null);
      } else {
        const created = await createReel({ data: form });
        setReels((prev) => [...prev, created]);
        showToast("Reel added");
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

  async function uploadFile(file: File, target: "poster" | "video") {
    setUploading(target);
    try {
      const dataUri = await readFileAsDataUri(file);
      const asset = await uploadMedia({
        data: {
          dataUri,
          folder: target === "video" ? "alphanexis/reels" : "alphanexis/posters",
          resourceType: target === "video" ? "video" : "image",
        },
      });
      setForm((current) => ({
        ...current,
        [target === "video" ? "url" : "poster"]: asset.secureUrl,
      }));
      showToast(`${target === "video" ? "Video" : "Poster"} uploaded`);
    } catch (error) {
      showToast("Upload failed: " + (error as Error).message);
    } finally {
      setUploading(null);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-2 font-display text-xl font-bold">
            {editingId ? "Edit reel" : "Add reel"}
          </h2>
          <p className="mb-5 text-sm text-muted-foreground">
            Use a video URL or upload a video to Cloudinary. Title and tag are required before saving.
          </p>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">
                Video URL or uploaded video
              </label>
              <input
                value={form.url}
                onChange={(e) => setForm((p) => ({ ...p, url: e.target.value }))}
                placeholder="Paste YouTube, Vimeo, Instagram, TikTok, Pinterest, or MP4 URL"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
              {preview && (
                <div className="mt-2 flex items-center gap-2">
                  <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${KIND_COLORS[preview.kind]}`}>
                    {preview.kind}
                  </span>
                  {preview.thumb && (
                    <img src={preview.thumb} alt="Preview thumbnail" className="h-10 w-16 rounded object-cover border border-border" />
                  )}
                  {preview.kind === "unknown" && (
                    <span className="text-xs text-muted-foreground">URL format is not recognized yet.</span>
                  )}
                </div>
              )}
              <input
                type="file"
                accept="video/*"
                disabled={uploading !== null}
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) uploadFile(file, "video");
                  event.target.value = "";
                }}
                className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-xs file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-primary-foreground disabled:opacity-50"
              />
              {uploading === "video" && (
                <p className="mt-1 text-xs text-muted-foreground">Uploading video to Cloudinary...</p>
              )}
            </div>

            <TextField label="Title" value={form.title} onChange={(value) => setForm((p) => ({ ...p, title: value }))} placeholder="Atlas - Origin" maxLength={80} />
            <TextField label="Tag" value={form.tag} onChange={(value) => setForm((p) => ({ ...p, tag: value }))} placeholder="Brand / Reel" maxLength={80} />

            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                maxLength={400}
                rows={3}
                placeholder="One or two short sentences."
                className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
            </div>

            <TextField
              label="Poster image URL"
              value={form.poster}
              onChange={(value) => setForm((p) => ({ ...p, poster: value }))}
              placeholder="https://..."
              helper="Optional. Use a poster to keep the public reel cards polished while videos load."
            />

            <input
              type="file"
              accept="image/*"
              disabled={uploading !== null}
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) uploadFile(file, "poster");
                event.target.value = "";
              }}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-primary-foreground disabled:opacity-50"
            />
            {uploading === "poster" && (
              <p className="-mt-2 text-xs text-muted-foreground">Uploading poster to Cloudinary...</p>
            )}

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                disabled={saving || !form.url || !form.title || !form.tag}
                className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-40"
              >
                {saving ? "Saving..." : editingId ? "Save changes" : "Add reel"}
              </button>
              {editingId && (
                <button type="button" onClick={cancelEdit} className="rounded-lg border border-border px-3 py-2.5 text-sm hover:bg-muted" aria-label="Cancel edit">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-end justify-between gap-3">
          <h2 className="font-display text-xl font-bold">
            {reels.length} Reel{reels.length !== 1 ? "s" : ""}
          </h2>
          <p className="text-xs text-muted-foreground">Use arrows to control showcase order.</p>
        </div>

        {loading && <div className="py-10 text-center text-muted-foreground">Loading...</div>}

        {!loading && reels.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border bg-card/60 py-16 text-center text-muted-foreground">
            <Plus className="mx-auto mb-2 h-8 w-8 opacity-30" />
            <p>No reels yet. Add one using the form.</p>
          </div>
        )}

        <div className="space-y-3">
          {reels.map((reel, i) => (
            <div
              key={reel.id}
              className={`flex gap-3 rounded-2xl border p-4 ${editingId === reel.id ? "border-accent bg-accent/10" : "border-border bg-card"}`}
            >
              <div className="h-20 w-28 shrink-0 overflow-hidden rounded-xl border border-border bg-muted">
                {reel.poster ? (
                  <img src={reel.poster} alt={reel.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-muted-foreground">{reel.kind}</div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div>
                  <span className={`inline-block rounded-full border px-1.5 py-0.5 text-[10px] font-medium ${KIND_COLORS[reel.kind as EmbedKind] ?? ""}`}>
                    {reel.kind}
                  </span>
                  <span className="ml-2 text-xs text-muted-foreground">{reel.tag}</span>
                </div>
                <div className="mt-1 truncate text-sm font-medium">{reel.title}</div>
                <p className="truncate text-xs text-muted-foreground">{reel.description}</p>
              </div>

              <div className="flex shrink-0 flex-col items-center gap-1">
                <button onClick={() => move(i, -1)} disabled={i === 0} className="rounded-lg border border-border p-1.5 hover:bg-muted disabled:opacity-30" aria-label="Move up">
                  <ChevronUp className="h-3 w-3" />
                </button>
                <button onClick={() => move(i, 1)} disabled={i === reels.length - 1} className="rounded-lg border border-border p-1.5 hover:bg-muted disabled:opacity-30" aria-label="Move down">
                  <ChevronDown className="h-3 w-3" />
                </button>
                <button onClick={() => startEdit(reel)} className="rounded-lg border border-border p-1.5 hover:bg-accent/20" aria-label="Edit reel">
                  <Edit3 className="h-3 w-3" />
                </button>
                <button
                  onClick={() => handleDelete(reel.id)}
                  disabled={deleting === reel.id}
                  className="rounded-lg border border-destructive/30 p-1.5 text-destructive hover:bg-destructive/10 disabled:opacity-40"
                  aria-label="Delete reel"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
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

function TextField({
  label,
  value,
  onChange,
  placeholder,
  helper,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helper?: string;
  maxLength?: number;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-muted-foreground">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        placeholder={placeholder}
        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
      {helper && <p className="mt-1 text-xs text-muted-foreground">{helper}</p>}
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
