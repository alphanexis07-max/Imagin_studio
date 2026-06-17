# src/server/storage/

This directory is auto-created at runtime and holds all CMS data.

## Files
- `reels.json` — Film reel entries
- `site.json` — Hero, About, Contact, Footer, Marquee content
- `capabilities.json` — Core capabilities bento grid
- `process.json` — 6-step delivery framework
- `cases.json` — Case studies
- `engagements.json` — Sprint/Retainer/Project cards
- `testimonials.json` — Testimonial quotes
- `stats.json` — Dark stats strip
- `uploads/` — Uploaded images and videos

## Important
- This entire folder is gitignored. Content lives on the server only.
- JSON writes are atomic (write to .tmp then rename) — safe against crashes.
- For production deployments (Cloudflare Workers), use a persistent storage
  layer (KV, D1, or R2) instead of local files. See the Danger Zone tab
  in /admin for export/import.
