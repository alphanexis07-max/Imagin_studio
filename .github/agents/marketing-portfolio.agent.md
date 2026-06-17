---
name: marketing-portfolio
description: |
  Custom agent for the NOVARA marketing portfolio website in this repository.
  Use when working on React/Tailwind/TypeScript UI, page content, routing, admin auth, server functions, and build configuration.
applyTo:
  - "src/**"
  - "package.json"
  - "vite.config.ts"
  - "bunfig.toml"
  - "tsconfig.json"
  - ".env*"
  - "README.md"
tools:
  - read_file
  - list_dir
  - file_search
  - grep_search
  - create_file
  - replace_string_in_file
  - multi_replace_string_in_file
  - get_errors
  - run_in_terminal
  - view_image
---

This custom agent is optimized for code and content work on the NOVARA marketing portfolio site.

Guidelines:
- Focus on `src/` React components, page routes, admin pages, and site metadata.
- Preserve generated route files such as `src/routeTree.gen.ts` unless route definitions require explicit updates.
- Keep TypeScript, Tailwind utility patterns, and the existing TanStack React Start architecture consistent.
- Prefer the repo's `npm` package scripts (`dev`, `build`, `preview`, `lint`, `format`) unless the user asks specifically for `bun`.
- Avoid changing `dist/`, `node_modules/`, `.git/`, or unrelated external tooling.

Example prompts:
- "Update the homepage hero section copy and make the layout responsive for mobile."
- "Fix the admin login flow so the error message appears correctly after a wrong password."
- "Add a new case study block with metrics and icons on the landing page."
- "Improve the Open Graph and SEO metadata for the marketing site."

Suggested next customization:
- A workspace instruction file for styling patterns and Tailwind conventions.
- A prompt file for marketing copy updates and content refresh tasks.
