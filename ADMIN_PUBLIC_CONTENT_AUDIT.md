# Admin vs Public Content Audit

## Overview
This audit compares the admin-editable content available in `src/lib/admin` and `src/routes/admin` against the public homepage content in `src/routes/index.tsx`.

## What admin currently manages

### Site data (`src/lib/admin/site.functions.ts`)
- `hero`
  - `eyebrow`
  - `name`
  - `headline`
  - `portraitUrl`
  - `sidebarStat` value and label
  - `sidebarQuote`
- `about`
  - `eyebrow`
  - `title`
  - `body`
  - `tiles`
- `contact`
  - `eyebrow`
  - `headline`
  - `blurb`
  - `email`
  - `bookCallUrl`
- `footer`
  - `copyright`
  - `socials` (schema supports this, but the admin UI currently only exposes copyright)
- `marquee`
  - `top` word list
  - `bottom` word list

### Collection data (`src/lib/admin/collections.functions.ts`)
- `capabilities`
- `process`
- `cases`
- `engagements`
- `testimonials`
- `stats`

### Reels data (`src/lib/admin/reels.functions.ts`)
- `reels` CRUD + reorder
- URL paste support for:
  - YouTube
  - Vimeo
  - Instagram
  - TikTok
  - Pinterest
  - direct `.mp4`

### Admin UI (`src/routes/admin/index.tsx`)
- Tabs for:
  - Film Reels
  - Hero & Site
  - Capabilities
  - Process
  - Case Studies
  - Engagements
  - Testimonials
  - Stats
  - Marquee
  - Contact & Footer

## What the public homepage currently renders

### Public homepage sections in `src/routes/index.tsx`
- `CoreCapabilitiesSection`
- `ProcessSection`
- `FilmReelsSection`
- `CaseStudiesSection`
- `FlexibleSection`
- `ROISection`
- `TrustSection`

### Hardcoded data arrays used on the homepage
- `capabilities`
- `steps`
- `cases`
- `engagements`
- `filmReels`
- `stats`
- `partners`

## Key gaps

- The homepage still uses hardcoded arrays instead of loading admin-managed JSON data.
- `FilmReelsSection` does not consume `reels.json` or `listReels()`.
- `capabilities`, `process`, `cases`, `engagements`, `stats`, and `testimonials` are editable in admin but not wired to the homepage.
- `footer.socials` is defined in the admin schema but not editable through the UI.
- `ROISection` and `TrustSection` content is not exposed to admin.
- Navigation labels, page CTA text, and other hardcoded copy are not currently managed by the admin.

## Recommended next steps

1. Wire `src/routes/index.tsx` to load admin-managed data from `site.json`, collection JSONs, and `reels.json`.
2. Ensure `FilmReelsSection` renders admin-supplied reels instead of the hardcoded `filmReels` array.
3. Add admin UI controls for `footer.socials` if social links need editing.
4. Consider adding admin editable data for `ROISection` and `TrustSection` if they should be content-managed.
5. Validate the live site after the data wiring to confirm admin updates reflect immediately.

## Conclusion
The admin panel is functionally built for content management, but the public homepage does not yet consume those editable sources. The next implementation step is to connect the homepage data flow to the admin-managed storage layer.
