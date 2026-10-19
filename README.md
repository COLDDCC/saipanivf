# Saipan IVF · Astro Coastal Editorial Demo

This competition concept uses **Astro** as its source framework and outputs static HTML for deployment.

## Local development

```bash
npm install
npm run dev
npm run build
npm run preview
npm run verify # build + run all checks
```

## Quality checks

`npm run check` runs three scripts against `dist/` (run `npm run build` first, or use `npm run verify`):

- `scripts/check-budget.mjs` — budget calculator math and homepage anchors.
- `scripts/check-hero.mjs` — hero carousel behaviour.
- `scripts/check-site.py` — one H1, unique IDs, anchors, internal routes and contact action per page.

The homepage is maintained in `src/pages/index.astro`. Astro generates `dist/index.html` when built. Do **not** edit a separate root `index.html`.

## Cloudflare Pages

- Framework preset: **Astro** (or None with the commands below)
- Build command: `npm run build`
- Build output directory: `dist`
- Production branch: `main`

## Included

Responsive Coastal Editorial hero, IVF/ICSI/third-party consultation overviews, coordination model, Saipan overview, journey, cost breakdown, FAQ, mobile navigation, and a client-side consultation demo.

## Demo limits

This is a **concept demonstration**, not a verified medical-provider website. Imagery and medical-service descriptions are illustrative. No physician credentials, clinical outcomes, prices, visa or citizenship rights are guaranteed. The demo form is local-only and sends/stores no submissions. The images currently link to the earlier `jiusongvip/saipan` repository; replace them with properly licensed local assets for production.
