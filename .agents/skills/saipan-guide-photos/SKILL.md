---
name: saipan-guide-photos
description: Find real, licence-clean stock photos for Saipan IVF guides through the team's Pexels API key in GitHub Actions, then import one human-approved photo with provenance. Never AI-generated images. Use when a guide needs a real photograph (cover or section image).
---

# Saipan IVF Guide Photos (Pexels, via CI)

Use with `saipan-guide-editor`. Colleagues need **no API key of their own**: searches run in GitHub Actions with the repository secret `PEXELS_API_KEY` (one team key, set once by a repo admin in Settings → Secrets and variables → Actions). Local machines and agent sandboxes usually cannot reach Pexels; do not try to work around that.

## Rules
- Source: Pexels only, via its official API (Pexels prohibits uploading generative-AI content). No scraping, no other sites, no AI-generated or AI-edited images.
- A person must open each chosen photo's Pexels page and confirm: real photograph (not AI/composite), photographer profile has a normal body of work, nothing implies a real clinician/patient/embryo of this centre, no identifiable minors, no visible brands/text. Record the reviewer's name.
- Prefer hands, objects, rooms, travel, paperwork, nature over faces. People shots: adults, neutral context, no medical procedure close-ups.
- One photo per page per locale (image-uniqueness check). Alt text describes the photo, not the article.

## 1. Request candidates (pick one way)
**A. Commit a request file** (works from any agent session that can push):
```json
// photo-requests/pgt-a.json
{"slug": "pgt-a", "queries": ["doctor explaining report to patient", "laboratory glassware"], "perQuery": 6, "orientation": "landscape"}
```
Push it on any branch; the `Find guide photos (Pexels)` workflow runs.
**B. Run the workflow manually** in GitHub → Actions → Find guide photos → Run workflow (slug + queries separated by `;`).

The workflow publishes `photos/<slug>` with `<pexels-id>.jpg` (≤1600px), `candidates.json` (photographer, page URL, licence, retrieved date) and `contact-sheet.jpg`. If the secret is missing it fails with that message.

## 2. Review
```bash
git fetch origin photos/pgt-a && git worktree add /tmp/photos-pgt-a origin/photos/pgt-a
```
Look at `contact-sheet.jpg`, then each candidate's Pexels page (`page` in candidates.json). Shortlist 1–3 and show them to the editor with photographer + link. Do not import before the human check above.

## 3. Import the approved photo
```bash
python3 -m pip install pillow   # if needed
python3 scripts/visuals/import-photo.py --candidates /tmp/photos-pgt-a/pgt-a --id 1234567 \
  --name pgt-a-consultation --alt "医生在诊室向患者解释检查报告" --reviewer "姓名" --real-photo-confirmed
```
Creates `public/images/stock/<name>.webp` (≤1200px) + `-400/-800` responsive variants, updates `src/data/image-variants.json`, `src/data/image-dimensions.json` and `docs/stock-images.json` (`humanVerifiedReal: true`, reviewer, date). Then use it:
- as a page header: add `"guides/<slug>": ["/images/stock/<name>.webp", "<alt>"]` to `heads` in `src/layouts/SiteLayout.astro`;
- in content: `<ResponsiveImage src="/images/stock/<name>.webp" alt="…" loading="lazy" sizes="(max-width: 700px) 100vw, 700px" />`.
Update `placements` in `docs/stock-images.json`, run `npm run verify`, and delete the `photos/<slug>` branch after merge.

## Acceptance
- Ledger row has Pexels page, photographer, licence, retrieved date, `humanVerifiedReal: true`, reviewer.
- Mobile first screen still shows the answer box (cover crop ≤ ~120px tall on 390px, as other guides).
- `npm run verify` passes (responsive srcset, file exists, unique per locale).
