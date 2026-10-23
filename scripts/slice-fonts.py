"""Split each CJK heading subset into unicode-range slices.

Each language's heading subset (public/fonts/noto-serif-{sc,tc,ja,ko}.woff2)
holds every h1/h2 character on the site, but a page uses only a fraction of
them. Browsers download a unicode-range face only when the page renders one
of its characters, so slices let each page fetch roughly what it uses.

Slices are chosen from the built HTML: characters used by exactly the same
pages start together, then groups are merged greedily while merging lowers
the summed cost of every page (bytes it downloads + a per-file overhead).
Characters in the subset that no current heading uses go to a final "rest"
slice, so coverage never shrinks: a heading edit can only cost efficiency,
never glyphs.

Run after `npm run build` (npm run fonts:slice). Writes
  public/fonts/cjk/noto-serif-<k>-<n>.woff2
  public/fonts/cjk/manifest.json
  src/data/cjk-font-faces.json   (per-language @font-face CSS, inlined by the
                                 layouts on pages of that language only)
Requires fonttools and brotli. Deterministic for the same inputs.
"""
from pathlib import Path
from html.parser import HTMLParser
from fontTools.ttLib import TTFont
from fontTools import subset
import hashlib, io, json, os, sys

root = Path(__file__).resolve().parents[1]
fonts = root / 'public/fonts'
out = fonts / 'cjk'
FAMILIES = {'sc': 'SIVF Serif SC', 'tc': 'SIVF Serif TC', 'ja': 'SIVF Serif JP', 'ko': 'SIVF Serif KR'}
# A request has a cost beyond its bytes (headers, a slot in the connection);
# expressed in bytes so it can be traded against glyph data.
REQUEST_COST = int(os.environ.get('SLICE_REQUEST_COST', 4000))


class Headings(HTMLParser):
    def __init__(self):
        super().__init__(); self.level = 0; self.text = ''
    def handle_starttag(self, tag, attrs):
        if tag in ('h1', 'h2'): self.level += 1
    def handle_endtag(self, tag):
        if tag in ('h1', 'h2'): self.level = max(0, self.level - 1)
    def handle_data(self, data):
        if self.level: self.text += data


def bucket(page):
    first = page.relative_to(root / 'dist').parts[0]
    if first in ('en', 'es', 'de', 'fr', 'images', '_astro', 'fonts'): return None
    return {'zh-hant': 'tc', 'ja': 'ja', 'ko': 'ko'}.get(first, 'sc')


def build(source_bytes, codepoints):
    font = TTFont(io.BytesIO(source_bytes), recalcTimestamp=False)
    options = subset.Options(); options.flavor = 'woff2'; options.layout_features = ['*']
    options.name_IDs = ['*']; options.name_legacy = True; options.name_languages = ['*']; options.notdef_outline = True
    sub = subset.Subsetter(options=options); sub.populate(unicodes=codepoints); sub.subset(font)
    buf = io.BytesIO(); font.flavor = 'woff2'; font.save(buf)
    return buf.getvalue()


def ranges(codepoints):
    cps = sorted(codepoints); parts = []; start = prev = cps[0]
    for cp in cps[1:] + [None]:
        if cp is not None and cp == prev + 1: prev = cp; continue
        parts.append(f'U+{start:X}' if start == prev else f'U+{start:X}-{prev:X}')
        if cp is not None: start = prev = cp
    return ','.join(parts)


def kerning_components(font, wanted):
    """Map each wanted codepoint that takes part in a 'kern' pair to the set of
    wanted codepoints it is connected to through kerning (union-find)."""
    gpos = font['GPOS'].table if 'GPOS' in font else None
    if not gpos: return {}
    to_cp = {}
    for cp, g in font.getBestCmap().items():
        if cp in wanted: to_cp.setdefault(g, cp)
    parent = {}
    def find(x):
        while parent.setdefault(x, x) != x: parent[x] = parent[parent[x]]; x = parent[x]
        return x
    def link(a, b):
        if a in to_cp and b in to_cp: parent[find(to_cp[a])] = find(to_cp[b])
    moves = lambda v: v is not None and any(getattr(v, a, 0) for a in ('XAdvance', 'XPlacement', 'YAdvance', 'YPlacement'))
    lookups = {i for fr in gpos.FeatureList.FeatureRecord if fr.FeatureTag == 'kern' for i in fr.Feature.LookupListIndex}
    for i in sorted(lookups):
        lookup = gpos.LookupList.Lookup[i]
        for st in lookup.SubTable:
            if lookup.LookupType == 9: st = st.ExtSubTable
            if getattr(st, 'LookupType', 2) != 2: continue
            if st.Format == 1:
                for first, pairset in zip(st.Coverage.glyphs, st.PairSet):
                    for rec in pairset.PairValueRecord:
                        if moves(getattr(rec, 'Value1', None)) or moves(getattr(rec, 'Value2', None)): link(first, rec.SecondGlyph)
            elif st.Format == 2:
                cls1, cls2 = {}, {}
                for g in st.Coverage.glyphs: cls1.setdefault(st.ClassDef1.classDefs.get(g, 0), []).append(g)
                for g, c in st.ClassDef2.classDefs.items(): cls2.setdefault(c, []).append(g)
                for c1, rec1 in enumerate(st.Class1Record):
                    for c2, rec2 in enumerate(rec1.Class2Record):
                        if c2 == 0 or not (moves(getattr(rec2, 'Value1', None)) or moves(getattr(rec2, 'Value2', None))): continue
                        for a in cls1.get(c1, []):
                            for b in cls2.get(c2, []): link(a, b)
    comps = {}
    for cp in list(parent):
        comps.setdefault(find(cp), set()).add(cp)
    return {cp: comp for comp in comps.values() if len(comp) > 1 for cp in comp}


if not (root / 'dist').exists():
    sys.exit('Build first: npm run build')
lora = set(TTFont(fonts / 'lora.woff2').getBestCmap())
pages = {k: {} for k in FAMILIES}
for page in sorted((root / 'dist').rglob('index.html')):
    k = bucket(page)
    if not k: continue
    parser = Headings(); parser.feed(page.read_text(encoding='utf-8'))
    # Lora comes first in every heading stack, so it renders what it covers.
    pages[k][page.relative_to(root / 'dist').parent.as_posix()] = {ord(c) for c in parser.text if not c.isspace() and ord(c) not in lora}

out.mkdir(exist_ok=True)
for old in out.glob('noto-serif-*.woff2'): old.unlink()
manifest = {}; faces = {}
report = []
for k, family in FAMILIES.items():
    source_woff2 = (fonts / f'noto-serif-{k}.woff2').read_bytes()
    # Decode once; every slice and probe below is cut from the plain TrueType data.
    decoded = TTFont(io.BytesIO(source_woff2), recalcTimestamp=False); decoded.flavor = None; buf = io.BytesIO(); decoded.save(buf); source = buf.getvalue()
    cmap = set(decoded.getBestCmap())
    page_sets = {p: s & cmap for p, s in pages[k].items()}
    page_ids = sorted(page_sets)
    used = set().union(*page_sets.values()) if page_sets else set()
    # Cost model from real encodes: fixed size of a one-glyph file, then each glyph's own bytes.
    empty = len(build(source, {min(used or cmap)}))
    probe = sorted(used)
    cache_file = root / '.astro' / f'slice-probe-{hashlib.sha256(source_woff2).hexdigest()[:16]}.json'
    glyph_bytes = {int(c): b for c, b in json.loads(cache_file.read_text()).items()} if cache_file.exists() else {}
    for cp in probe:
        if cp not in glyph_bytes:
            glyph_bytes[cp] = max(1, len(build(source, {min(used), cp})) - empty) if cp != min(used) else max(1, empty // 20)
    cache_file.parent.mkdir(exist_ok=True); cache_file.write_text(json.dumps(glyph_bytes))
    overhead = empty + REQUEST_COST
    # Initial groups: characters with the same set of pages, except that
    # characters the font kerns against each other (kana and punctuation in
    # Noto Serif JP) stay in one group: positioning cannot cross font files.
    linked = kerning_components(decoded, set(probe))
    groups = {}
    for cp in probe:
        if cp in linked: continue
        sig = frozenset(p for p in page_ids if cp in page_sets[p])
        groups.setdefault(sig, set()).add(cp)
    groups = [(sig, cps, sum(glyph_bytes[c] for c in cps)) for sig, cps in groups.items()]
    for component in {id(c): c for c in linked.values()}.values():
        groups.append((frozenset(p for p in page_ids if page_sets[p] & component), set(component), sum(glyph_bytes[c] for c in component)))
    cost = lambda sig, w: len(sig) * (overhead + w)
    while True:
        best = None
        for i in range(len(groups)):
            si, ci, wi = groups[i]
            for j in range(i + 1, len(groups)):
                sj, cj, wj = groups[j]
                delta = cost(si | sj, wi + wj) - cost(si, wi) - cost(sj, wj)
                key = (delta, min(ci | cj))
                if delta < 0 and (best is None or key < best[0]): best = (key, i, j)
        if not best: break
        _, i, j = best
        si, ci, wi = groups[i]; sj, cj, wj = groups[j]
        groups[i] = (si | sj, ci | cj, wi + wj); del groups[j]
    groups.sort(key=lambda g: (-len(g[0]), min(g[1])))
    slices = [g[1] for g in groups]
    rest = cmap - used
    if rest: slices.append(rest)
    entries = []; css = []
    for n, cps in enumerate(slices):
        data = build(source, cps)
        name = f'noto-serif-{k}-{n}.woff2'
        (out / name).write_bytes(data)
        entries.append({'file': name, 'bytes': len(data), 'sha256': hashlib.sha256(data).hexdigest(), 'codepoints': sorted(cps), 'rest': cps is rest})
        css.append(f"@font-face{{font-family:'{family}';src:url('/fonts/cjk/{name}') format('woff2');font-style:normal;font-weight:600;font-display:swap;unicode-range:{ranges(cps)}}}")
    faces[k] = ''.join(css)
    manifest[k] = {'family': family, 'source': f'noto-serif-{k}.woff2', 'sourceSha256': hashlib.sha256(source_woff2).hexdigest(), 'slices': entries}
    per_page = sorted(sum(e['bytes'] for e in entries if set(e['codepoints']) & s) for s in page_sets.values())
    report.append(f"{k}: {len(source_woff2):>7,} B whole subset → {len(entries)} slices; per page min {per_page[0]:,} / median {per_page[len(per_page)//2]:,} / max {per_page[-1]:,} B")
    files = sorted(sum(1 for e in entries if set(e['codepoints']) & s) for s in page_sets.values())
    report.append(f"    one-glyph file {empty:,} B; files per page min {files[0]} / median {files[len(files)//2]} / max {files[-1]}")

(out / 'manifest.json').write_text(json.dumps(manifest, indent=1) + '\n', encoding='utf-8')
(root / 'src/data/cjk-font-faces.json').write_text(json.dumps(faces, indent=1, ensure_ascii=False) + '\n', encoding='utf-8')
print('\n'.join(report))
