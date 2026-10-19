# Saipan IVF · Astro Coastal Editorial Demo

This competition concept uses **Astro** as its source framework and outputs static HTML for deployment.

## Local development

```bash
npm install
npm run dev
npm run build
npm run preview
```

The homepage is maintained in `src/pages/index.astro`. Astro generates `dist/index.html` when built. Do **not** edit a separate root `index.html`.

## Cloudflare Pages

- Framework preset: **Astro** (or None with the commands below)
- Build command: `npm run build`
- Build output directory: `dist`
- Production branch: `main`

## Included

All four languages use the shared `SitePage.astro` structure and localized content in `src/data/content.ts`. The site includes a four-slide IVF hero, a clear service-relationship explanation, patient-question-based service routes, plain-language terminology, a visit sequence, a written-quote scope checker, team information, FAQ, mobile navigation, and an email-draft contact form.

## Demo limits

This is a **concept demonstration**, not a verified medical-provider website. Imagery and medical-service descriptions are illustrative. No physician credentials, clinical outcomes, prices, visa or citizenship rights are guaranteed. The form opens a draft in the visitor's own email application and stores no submission. The images currently link to the earlier `jiusongvip/saipan` repository; replace them with properly licensed local assets for production.
