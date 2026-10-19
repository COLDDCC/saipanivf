from pathlib import Path
from html.parser import HTMLParser
from collections import defaultdict
import hashlib, re
class Images(HTMLParser):
 def __init__(self):super().__init__();self.images=[]
 def handle_starttag(self,tag,attrs):
  if tag=='img':self.images.append(dict(attrs))
uses=defaultdict(list)
for page in Path('dist').rglob('*.html'):
 html=page.read_text();parser=Images();parser.feed(html)
 for src in set(re.findall(r'url\([\"\']?([^\"\')]+)',html)):
  if src.startswith('/') or src.startswith('http'):uses[src].append(str(page)+' [background]')
 for image in parser.images:
  src=image['src'];uses[src].append(str(page))
  if src.startswith('/'):
   path=Path('dist')/src.lstrip('/')
   assert path.is_file(),(page,'missing image',src)
assert not {k:v for k,v in uses.items() if len(v)>1},'Repeated image URLs: '+str({k:v for k,v in uses.items() if len(v)>1})
content=defaultdict(list)
for src in uses:
 if src.startswith('/'):
  content[hashlib.sha256((Path('dist')/src.lstrip('/')).read_bytes()).hexdigest()].append(src)
assert all(len(paths)==1 for paths in content.values()),'Same image bytes saved under multiple filenames'
print('PASS',sum(map(len,uses.values())),'image placements across all HTML pages; no repeated URLs or duplicate image file contents; local files exist')
