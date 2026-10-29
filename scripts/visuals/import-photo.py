"""Import ONE human-approved Pexels candidate into the site.

Usage:
  python3 scripts/visuals/import-photo.py --candidates photo-candidates/pgt-a --id 1234567 \
     --name pgt-a-consultation --alt "医生在诊室向患者解释检查报告" \
     --reviewer "张三" --real-photo-confirmed

Refuses to run without --real-photo-confirmed: the reviewer has opened the Pexels page,
checked the photographer's profile and confirmed the image is a real photograph (not
AI-generated or composited) and does not suggest a real clinician or patient of this centre.
Writes 1200px stock + 400/800 responsive WebP, updates image-variants.json,
image-dimensions.json and docs/stock-images.json. Requires Pillow.
"""
import argparse, json, datetime
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]


def save(im, path, width):
    im = im.copy()
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    path.parent.mkdir(parents=True, exist_ok=True)
    im.save(path, 'WEBP', quality=78, method=6)
    return im.size


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--candidates', required=True)
    ap.add_argument('--id', required=True, type=int)
    ap.add_argument('--name', required=True)
    ap.add_argument('--alt', required=True)
    ap.add_argument('--reviewer', required=True)
    ap.add_argument('--real-photo-confirmed', action='store_true')
    a = ap.parse_args()
    if not a.real_photo_confirmed:
        raise SystemExit('Refusing: a person must confirm this is a real photograph (--real-photo-confirmed).')
    cdir = Path(a.candidates)
    meta = next((c for c in json.loads((cdir / 'candidates.json').read_text()) if c['id'] == a.id), None)
    if not meta:
        raise SystemExit(f'id {a.id} not in candidates.json')
    stock = f'/images/stock/{a.name}.webp'
    if (ROOT / 'public' / stock.lstrip('/')).exists():
        raise SystemExit(f'{stock} already exists; choose another --name')
    im = Image.open(cdir / meta['file']).convert('RGB')
    w, h = save(im, ROOT / 'public' / stock.lstrip('/'), 1200)
    srcset = []
    for size in (400, 800):
        if w > size:
            save(im, ROOT / f'public/images/responsive/{a.name}-{size}.webp', size)
            srcset.append(f'/images/responsive/{a.name}-{size}.webp {size}w')
    srcset.append(f'{stock} {w}w')
    for file, value in (('src/data/image-variants.json', ', '.join(srcset)), ('src/data/image-dimensions.json', [w, h])):
        p = ROOT / file
        d = json.loads(p.read_text())
        d[stock] = value
        p.write_text(json.dumps(d, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    ledger = ROOT / 'docs/stock-images.json'
    items = json.loads(ledger.read_text())
    items.append({
        'name': a.name, 'id': a.id, 'title': meta['pexels_alt'] or a.alt, 'alt': a.alt, 'src': stock,
        'source': meta['page'], 'photographer': meta['photographer'], 'photographerUrl': meta['photographer_url'],
        'license': 'Pexels License', 'licenseUrl': 'https://www.pexels.com/license/', 'retrieved': meta['retrieved'],
        'width': w, 'height': h, 'bytes': (ROOT / 'public' / stock.lstrip('/')).stat().st_size, 'placements': [],
        'humanVerifiedReal': True, 'reviewer': a.reviewer, 'reviewedOn': datetime.date.today().isoformat()
    })
    ledger.write_text(json.dumps(items, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'Imported {stock} ({w}x{h}) with {len(srcset) - 1} responsive variants. Use it via <ResponsiveImage src="{stock}" .../> or the SiteLayout heads map.')


if __name__ == '__main__':
    main()
