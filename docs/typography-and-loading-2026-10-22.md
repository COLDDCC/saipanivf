# Typography and loading refinement — 2026-10-22

Applied https://github.com/bilioveloso/font-pairing-skill/blob/main/SKILL.md:
healthcare/wellness pairing, display/body contrast, restrained font weights,
self-hosted subsets, swap rendering and script-specific fallbacks.

- Lora 600 for Latin h1/h2, Noto Serif SC/TC/JP/KR 600 for regional h1/h2.
- DM Sans 400–700 for Latin body/UI and numbers; explicit native CJK sans-serif
  fallbacks for reading. h3, buttons and fields remain sans-serif.
- Island-blue palette, photography, existing compact title sizes retained.
- WOFF2 payloads: Lora 24,836 bytes; DM Sans 28,580; SC 113,948;
  TC 124,020; JP 133,520; KR 80,604. A page uses its own language fonts;
  Latin pages do not download CJK subsets. No external Google Fonts requests.
- CJK font subsets cover current h1/h2 glyphs. check:loading checks all 184 pages
  against actual cmap-derived manifest, file byte counts and SHA256. Future
  heading changes require regeneration if introducing new characters.
- Homepage styles now load only on home routes. Before adding typography,
  foreign inner-page CSS decreased 64,086 to 54,014 bytes. Typography adds its
  own shared CSS and font resources; this is a visual-quality tradeoff, not a
  claim of a smaller total download than system fonts.
- Responsive home image preload exactly matches first hero img src/srcset/sizes.
- Added intrinsic dimensions for 82 image sources and async decoding defaults.

Validation: full npm run verify passes, including 184-page glyph/integrity and
loading checks, consultation, mobile content parity and all existing checks.
Taste source lint: 5 changed source files, zero failures/warnings. Desktop live
review pending deployment. No measured Lighthouse, LCP/CLS or emulated mobile
results are claimed; source/content checks do not replace device screenshots.
