# Website image inventory — 2026-10-19

The current site has 70 distinct photograph placements across the simplified Chinese pages and the existing Traditional Chinese, English and Japanese pages, including CSS backgrounds. All image URLs are unique and no local images have duplicate SHA-256 contents.

65 generic editorial images are downloaded from Pexels and served locally as optimized WebP. They illustrate laboratory tools, preparation, documents, travel and family planning; they are not used as named staff or patient testimonials. Each file, original photo page, title, license URL, dimensions, download date and placement is listed in `stock-images.json`.

License checked: https://www.pexels.com/license/ and https://help.pexels.com/hc/en-us/articles/360042295214-Can-I-use-the-photos-and-videos-for-a-commercial-project . Pexels permits free commercial use without mandatory attribution; restrictions, including no implied endorsement, continue to apply.

The actual building exterior and the three named team portraits remain from https://www.saipan-ivf.com/about/ and https://www.saipan-ivf.com/Resources/ . Their placement is limited to the homepage. The existing Saipan lagoon aerial remains as one geographic hero photograph from the prior project, not reclassified as Pexels stock.

All selected stock images were visually inspected in contact sheets before use. Existing dimensions, lazy loading and local delivery are retained. `npm run check:images` detects repeated photograph URLs (including CSS backgrounds), identical image file contents and missing local files. It runs as part of `npm run verify`.
