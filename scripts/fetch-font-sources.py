"""Download the source fonts that scripts/subset-fonts.py subsets.

Files land in FONT_SOURCES (default /tmp/saipan-font-sources) and are skipped
when already present, so re-running is cheap. Proxies are picked up from the
standard https_proxy environment variables.

Noto Serif CJK sources are pinned to the Serif2.002 release: the full
(region-unified) VF outlines yield subsets roughly 35% larger than the
originals, while the release's per-region Subset TTFs reproduce the checked-in
subsets within 0.4%.
"""
import os
import sys
import urllib.request
import zipfile
from pathlib import Path

SOURCES = Path(os.environ.get('FONT_SOURCES', '/tmp/saipan-font-sources'))

BASE_GF = 'https://raw.githubusercontent.com/google/fonts/main/ofl'
BASE_NOTO = 'https://raw.githubusercontent.com/notofonts/noto-cjk/main'
NOTO_RELEASE_ZIP = 'https://github.com/notofonts/noto-cjk/releases/download/Serif2.002/03_NotoSerifCJK-TTF-VF.zip'

def fetch(url: str, dest: Path, attempts: int = 3):
    import subprocess
    for attempt in range(1, attempts + 1):
        try:
            with urllib.request.urlopen(url, timeout=600) as response:
                dest.write_bytes(response.read())
            return
        except Exception as error:
            print('attempt', attempt, 'failed:', error, flush=True)
            dest.unlink(missing_ok=True)
    # urllib sometimes gets connection-reset through local proxies on large
    # GitHub release assets; curl usually survives.
    result = subprocess.run(['curl', '-fsSL', '--retry', '3', '-o', str(dest), url])
    if result.returncode != 0:
        raise RuntimeError('curl fallback failed with code ' + str(result.returncode))

FILES = {
    'latin.ttf': BASE_GF + '/lora/Lora%5Bwght%5D.ttf',
    'latin-OFL.txt': BASE_GF + '/lora/OFL.txt',
    'sans.ttf': BASE_GF + '/dmsans/DMSans%5Bopsz%2Cwght%5D.ttf',
    'sans-OFL.txt': BASE_GF + '/dmsans/OFL.txt',
}

SOURCES.mkdir(parents=True, exist_ok=True)
failed = False
for name, url in FILES.items():
    dest = SOURCES / name
    if dest.exists() and dest.stat().st_size > 0:
        print('skip', name, flush=True)
        continue
    print('fetch', url, flush=True)
    try:
        with urllib.request.urlopen(url, timeout=120) as response:
            dest.write_bytes(response.read())
    except Exception as error:
        failed = True
        print('FAILED', name, error, flush=True)
        dest.unlink(missing_ok=True)

# noto-cjk ships Japanese under the jp regional suffix.
REGIONS = {'sc': 'SC', 'tc': 'TC', 'ja': 'JP', 'ko': 'KR'}
zip_dest = SOURCES / 'noto-serif-ttf-vf.zip'
if not all((SOURCES / (r + '.ttf')).exists() for r in REGIONS):
    if not (zip_dest.exists() and zip_dest.stat().st_size > 0):
        print('fetch', NOTO_RELEASE_ZIP, flush=True)
        try:
            fetch(NOTO_RELEASE_ZIP, zip_dest)
        except Exception as error:
            failed = True
            print('FAILED noto release zip', error, flush=True)
            zip_dest.unlink(missing_ok=True)
    if zip_dest.exists():
        try:
            with zipfile.ZipFile(zip_dest) as archive:
                for region, upper in REGIONS.items():
                    member = 'Variable/TTF/Subset/NotoSerif' + upper + '-VF.ttf'
                    (SOURCES / (region + '.ttf')).write_bytes(archive.read(member))
                license_name = next(n for n in archive.namelist() if n.endswith('LICENSE.txt') or n == 'LICENSE')
                license_bytes = archive.read(license_name)
        except Exception as error:
            failed = True
            print('FAILED extracting noto subsets', error, flush=True)
        else:
            for region in REGIONS:
                (SOURCES / (region + '-OFL.txt')).write_bytes(license_bytes)

if failed:
    sys.exit(1)
print('sources ready in', SOURCES, flush=True)
