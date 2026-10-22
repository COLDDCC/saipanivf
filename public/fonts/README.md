# Saipan IVF web typography

Heading fonts: Lora (Latin) and Noto Serif SC / TC / JP / KR (regional CJK).
Body: DM Sans for Latin; native language sans-serif stacks for CJK reading and UI.
Only headings use serif fonts. All fonts are licensed under SIL OFL 1.1; individual
license notices are retained alongside each subset. Source: Google Fonts official
repository, https://github.com/google/fonts/tree/main/ofl (lora, dmsans,
notoserifsc, notoseriftc, notoserifjp, notoserifkr), retrieved 2026-10-22.

Fonts are self-hosted WOFF2, font-display: swap. CJK headings are subset from the
current built HTML, at weight 600; Latin heading weight is 600; body is variable
400–700 at optical size 16. Only fonts used by the current script download.

After changing headings, run `npm run verify`. Missing glyphs fail check:loading.
To regenerate, obtain the upstream variable TTF and OFL.txt into FONT_SOURCES as
sc/tc/ja/ko/latin/sans.ttf and corresponding *-OFL.txt. With Python fonttools and
brotli installed, build the HTML, run `FONT_SOURCES=/path python scripts/subset-fonts.py`,
then rebuild and verify. Do not place the full upstream TTF files on the website.
`manifest.json` records byte counts, cmap coverage, and SHA256 for verification.
