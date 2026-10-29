"""Search Pexels and download candidate photos with full provenance (run in CI).

Needs env PEXELS_API_KEY. Standard library + Pillow only.
Usage: python3 scripts/visuals/pexels.py --slug pgt-a --query "doctor consultation" --query "laboratory" \
          --per-query 6 --orientation landscape --out photo-candidates
Writes <out>/<slug>/<pexels-id>.jpg (1600px max), candidates.json and contact-sheet.jpg.
Nothing is published to the site here: a person picks a candidate and runs import-photo.py.
"""
import argparse, json, os, sys, time, urllib.parse, urllib.request, datetime
from pathlib import Path
from io import BytesIO

API = 'https://api.pexels.com/v1/search'


def get(url, key=None):
    req = urllib.request.Request(url, headers={'User-Agent': 'saipanivf-guide-photos/1.0', **({'Authorization': key} if key else {})})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read(), dict(r.headers)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--slug', required=True)
    ap.add_argument('--query', action='append', required=True)
    ap.add_argument('--per-query', type=int, default=6)
    ap.add_argument('--orientation', default='landscape', choices=['landscape', 'portrait', 'square'])
    ap.add_argument('--min-width', type=int, default=1600)
    ap.add_argument('--out', default='photo-candidates')
    args = ap.parse_args()
    key = os.environ.get('PEXELS_API_KEY', '').strip()
    if not key:
        sys.exit('PEXELS_API_KEY is not set. Add it as a repository secret (Settings > Secrets and variables > Actions).')
    from PIL import Image, ImageDraw
    out = Path(args.out) / args.slug
    out.mkdir(parents=True, exist_ok=True)
    seen, cands = set(), []
    for q in args.query:
        params = urllib.parse.urlencode({'query': q, 'orientation': args.orientation, 'per_page': min(80, args.per_query * 3), 'size': 'large'})
        data, headers = get(f'{API}?{params}', key)
        print(f'query "{q}": remaining quota {headers.get("X-Ratelimit-Remaining", "?")}')
        n = 0
        for p in json.loads(data)['photos']:
            if p['id'] in seen or p['width'] < args.min_width:
                continue
            seen.add(p['id'])
            img_bytes, _ = get(p['src']['large2x'])
            im = Image.open(BytesIO(img_bytes)).convert('RGB')
            im.thumbnail((1600, 1600))
            im.save(out / f'{p["id"]}.jpg', quality=88)
            cands.append({
                'id': p['id'], 'query': q, 'page': p['url'], 'photographer': p['photographer'],
                'photographer_url': p['photographer_url'], 'pexels_alt': p.get('alt') or '', 'width': p['width'], 'height': p['height'],
                'avg_color': p.get('avg_color'), 'license': 'Pexels License', 'license_url': 'https://www.pexels.com/license/',
                'retrieved': datetime.date.today().isoformat(), 'file': f'{p["id"]}.jpg',
                'human_verified_real': False
            })
            n += 1
            time.sleep(0.3)
            if n >= args.per_query:
                break
    (out / 'candidates.json').write_text(json.dumps(cands, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    # Contact sheet for quick human review: id + photographer under each thumbnail.
    cols, tw, th = 4, 360, 240
    rows = max(1, -(-len(cands) // cols))
    sheet = Image.new('RGB', (cols * tw, rows * (th + 34)), 'white')
    d = ImageDraw.Draw(sheet)
    for i, c in enumerate(cands):
        im = Image.open(out / c['file'])
        im.thumbnail((tw - 10, th - 10))
        x, y = (i % cols) * tw, (i // cols) * (th + 34)
        sheet.paste(im, (x + 5, y + 5))
        d.text((x + 6, y + th + 2), f"{c['id']}  {c['photographer'][:28]}", fill='black')
        d.text((x + 6, y + th + 16), c['query'][:40], fill='gray')
    sheet.save(out / 'contact-sheet.jpg', quality=80)
    print(f'{len(cands)} candidates -> {out}')


if __name__ == '__main__':
    main()
