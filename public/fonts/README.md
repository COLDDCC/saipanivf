# Saipan IVF web typography

Heading fonts: Lora (Latin) and Noto Serif SC / TC / JP / KR (regional CJK).
Body: DM Sans for Latin; native language sans-serif stacks for CJK reading and UI.
Only headings use serif fonts. All fonts are licensed under SIL OFL 1.1; individual
license notices are retained alongside each subset. The modified Lora subset is
internally renamed SIVF Editorial to respect its Reserved Font Name. Source: Google Fonts official
repository, https://github.com/google/fonts/tree/main/ofl (lora, dmsans,
notoserifsc, notoseriftc, notoserifjp, notoserifkr), retrieved 2026-10-22.

Fonts are self-hosted WOFF2, font-display: swap. CJK headings are subset from the
current built HTML, at weight 600; Latin heading weight is 600; body is variable
400–700 at optical size 16. Only fonts used by the current script download.

After changing headings, run `npm run verify`. Missing glyphs fail check:loading.
To regenerate, run `npm run fonts:regen` (builds the HTML, downloads pinned
upstream sources — Noto Serif CJK Serif2.002 per-region Subset TTFs plus Lora
and DM Sans from the Google Fonts repository — into FONT_SOURCES, subsets, and
re-checks). The script fails if any regenerated subset is over 10% larger than
the checked-in one. Requires Python fonttools and brotli. Do not place the full
upstream TTF files on the website.
`manifest.json` records byte counts, cmap coverage, and SHA256 for verification.

CJK heading faces are served as unicode-range slices (`public/fonts/cjk/`), not
as the whole subsets: a page downloads only the slices its headings use (about
25–35 KB for Chinese and Korean pages and about 55–65 KB for Japanese pages,
instead of 80–135 KB). `scripts/slice-fonts.py` cuts the slices from the subsets
above using the built HTML, keeps characters the font kerns against each other
in one slice (Japanese kana and punctuation), and writes
`src/data/cjk-font-faces.json`, which the layouts inline on pages of that
language only. After `fonts:regen`, or when headings change a lot, run
`npm run fonts:slice`; check:loading fails when slices are stale or a page's
slices exceed 60% of its whole subset. The whole subsets stay in this folder as
the slicing source.
