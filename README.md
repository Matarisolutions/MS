# Matari Solutions LLC — Website

Marketing website for **Matari Solutions LLC**, a mission-driven government
contracting firm serving federal, state, and local agencies.

The site is a **static, multi-page website** built from Markdown content and a
shared HTML layout using **[Gulp](https://gulpjs.com/)** and
**[gulp-layout](https://github.com/macoshita/gulp-layout)**. The visual design
is based on the _Secur_ (Cyber Security Services Agency) HTML template
(Bootstrap 5 + Font Awesome 6 Pro), rebranded for Matari Solutions.

---

## How it works

Content is authored as **Markdown files with YAML front-matter** in
`src/pages/`. Each page declares which layout to use and its metadata:

```markdown
---
layout: default.ejs
title: Solutions — Matari Solutions LLC
description: End-to-end government contracting solutions.
---

<div class="breadcumb-wrapper">...</div>
```

At build time, Gulp runs each page through this pipeline (see `gulpfile.js`):

```
src/pages/*.md
   │  gulp-front-matter   → parse the YAML block into file.frontMatter
   │  gulp-markdown       → render Markdown body to HTML (raw HTML passes through)
   │  gulp-layout         → inject that HTML into the page's layout as `contents`,
   │                        with the front-matter fields as template variables
   ▼
dist/*.html
```

The layout (`src/layouts/default.ejs`) is an **EJS** template holding everything
shared across pages — `<head>`, header/nav, mobile menu, footer, and script
tags. The page body is injected where the template has `<%- contents %>`, and
front-matter values are available as locals (`<%= title %>`, `<%= description %>`).

> **Why Markdown + raw HTML?** The Secur components (hero, service cards,
> counters, forms) are rich HTML, so the page bodies are mostly HTML — which
> Markdown passes through untouched. Simple prose can still be written in plain
> Markdown. Keep each top-level HTML block free of blank lines internally
> (separate blocks with a single blank line) so Markdown treats it as one raw
> HTML block.

---

## Project structure

```
.
├── src/
│   ├── layouts/
│   │   └── default.ejs        # Shared shell: head, header, footer, scripts
│   ├── pages/                 # One Markdown file per page (+ front-matter)
│   │   ├── index.md           # Home
│   │   ├── about.md           # About + core values + agencies served
│   │   ├── services.md        # Solutions (Program Mgmt, Advisory, Ops, Tech, Pricing)
│   │   ├── contact.md         # Contact form (Netlify)
│   │   └── thankyou.md        # Post-submit confirmation
│   ├── assets/                # Theme assets: css, js, fonts, img (copied verbatim)
│   │   └── img/
│   │       ├── logo-matari.png        # Matari logo (from the legacy site)
│   │       └── brand/agency-*.png     # Agency logos (IRS, DHS, DoD, DOJ, HHS)
│   └── mail.php               # Optional PHP mail handler (theme default)
├── scripts/                   # Node utilities (image optimization, logo gen)
├── .github/workflows/         # GitHub Actions → build + deploy to Pages
├── dist/                      # Build output (generated — git-ignored)
├── _legacy/                   # Original hand-coded site, kept for reference
├── gulpfile.js                # Bundling, cache-busting, dev server
├── eslint.config.js           # Lint config (our JS only)
├── .prettierrc                # Formatting config
├── package.json
└── .nojekyll                  # Tells GitHub Pages to skip Jekyll processing
```

---

## Getting started (local development)

Requires **Node.js 18+** and npm.

```bash
npm install         # install dependencies

npm run dev         # build + live-reload dev server (BrowserSync, http://localhost:3000)
npm run build       # production build into dist/ (bundled, minified, cache-busted)
npm run clean       # delete dist/

npm run lint        # ESLint (build tooling JS)
npm run format      # Prettier — write
npm run format:check# Prettier — verify (used by CI)
npm run optimize    # re-optimize images in src/assets/img
```

Edit a file under `src/` and the browser reloads automatically.

### Build pipeline

`npm run build` (production) does more than copy files:

- **Bundling** — the theme's 5 stylesheets and 9 scripts are concatenated (in
  dependency order) into a single `app.min.css` and `app.min.js`, cutting 14
  asset requests down to 2. CSS is minified with clean-css; JS with terser. The
  CSS bundle stays in `assets/css/` so the theme's relative `url(...)` font and
  image paths keep resolving.
- **Cache busting** — each bundle is renamed with a content hash
  (`app.<hash>.min.css`) and every HTML reference is rewritten to match, so
  browsers re-download a bundle only when its contents actually change.
- `wave.js` is kept separate (it's home-page-only and inlined mid-body).

`npm run dev` runs the same bundling **without** the hash step, so BrowserSync
can hot-inject CSS and the filenames stay stable across reloads.

---

## Editing content

- **Text / structure of a page** → edit the matching file in `src/pages/`.
- **Header, footer, nav, contact details** → edit `src/layouts/default.ejs`.
- **Images, fonts, CSS, JS** → add to `src/assets/…` and reference them with an
  `assets/…` path (paths are root-relative in the built site).
- **Add a page** → create `src/pages/newpage.md` with front-matter; it builds to
  `dist/newpage.md → newpage.html`. Add a nav link in the layout.

### Contact form

`contact.md` uses a **Netlify Forms** setup: the form has
`data-netlify="true"`, a `form-name` hidden field, a honeypot, and posts to
`thankyou.html`. If you deploy somewhere other than Netlify, wire the form up to
your own handler (e.g. the included `mail.php`) instead.

> Contact details (`info@matarisolutions.com`, etc.) in the layout and contact
> page are **placeholders** — update them with real values before going live.

---

## Deployment

### GitHub Pages (configured)

The repo ships with a GitHub Actions workflow (`.github/workflows/deploy.yml`)
that builds and deploys automatically:

1. In the repo, go to **Settings → Pages → Build and deployment** and set the
   **Source** to **GitHub Actions**.
2. Push to `main`. The workflow runs `npm ci`, lint + format checks,
   `npm run build`, and publishes `dist/` to Pages. `dist/` is **not** committed
   — it's built fresh in CI.

All asset and page links are **relative**, so the site works whether it's served
from a user page (`user.github.io`) or a project subpath
(`user.github.io/repo/`). A generated `404.html` is served for unknown routes.

> **Contact form on GitHub Pages:** Pages is static-only and can't process form
> POSTs, so the Netlify form won't submit there. Wire the form to a static-form
> service (Formspree, Getform, Basin) — or deploy to Netlify instead, where the
> `data-netlify` form works as-is (build command `npm run build`, publish `dist`).

### Anywhere else

`dist/` is plain static files, so any static host works (Netlify, Cloudflare
Pages, S3, etc.). Build with `npm run build` and serve the `dist/` directory.

---

## Credits

- Design template: **Secur — Cyber Security Services Agency** (ThemeForest),
  licensed to Matari Solutions LLC. Bootstrap 5, Swiper, Font Awesome 6 Pro.
- Content and branding: **Matari Solutions LLC**.
