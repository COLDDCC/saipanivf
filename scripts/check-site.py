from pathlib import Path
from html.parser import HTMLParser
from collections import Counter
from urllib.parse import urlsplit, unquote
class Page(HTMLParser):
 def __init__(self):super().__init__();self.ids=[];self.links=[];self.h1=0;self.prices=0
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a:self.ids.append(a['id'])
  if tag=='a':self.links.append(a.get('href',''))
  if tag=='h1':self.h1+=1
for path in [Path('dist/index.html'),*Path('dist').rglob('*/index.html')]:
 page=Page();s=path.read_text(encoding='utf-8');page.feed(s)
 assert page.h1==1,(path,'H1 count',page.h1)
 assert all(n==1 for n in Counter(page.ids).values()),(path,'duplicate IDs')
 for href in page.links:
  assert href and href!='#',(path,'empty link')
  if href.startswith('#'):assert href[1:] in page.ids,(path,'missing anchor',href)
  if href.startswith('/'):
   parts=urlsplit(href)
   dest=Path('dist')/parts.path.lstrip('/')
   assert dest.exists(),(path,'missing internal route',href)
   if parts.fragment:
    target=dest/'index.html' if dest.is_dir() else dest
    other=Page();other.feed(target.read_text(encoding='utf-8'))
    assert unquote(parts.fragment) in other.ids,(path,'missing cross-page answer',href)
 assert 'mailto:info@saipan-ivf.com' in page.links,(path,'missing contact action')
 if path.parts[1] in ['en','ja','ko','es','de','fr','zh-hant']:assert 'aria-current="page"' in s,(path,'missing active language')
 assert '赴岛' not in s,(path,'outdated wording')
 print('PASS',path,'links',len(page.links),'one H1, unique IDs, anchors, routes, contact')
