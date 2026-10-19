from pathlib import Path
from html.parser import HTMLParser
from collections import Counter
class Page(HTMLParser):
 def __init__(self):super().__init__();self.ids=[];self.links=[];self.h1=0;self.prices=0
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a:self.ids.append(a['id'])
  if tag=='a':self.links.append(a.get('href',''))
  if tag=='h1':self.h1+=1
for path in [Path('dist/index.html'),*Path('dist').glob('*/index.html')]:
 page=Page();s=path.read_text();page.feed(s)
 assert page.h1==1,(path,'H1 count',page.h1)
 assert all(n==1 for n in Counter(page.ids).values()),(path,'duplicate IDs')
 for href in page.links:
  assert href and href!='#',(path,'empty link')
  if href.startswith('#'):assert href[1:] in page.ids,(path,'missing anchor',href)
  if href.startswith('/'):
   dest=Path('dist')/href.lstrip('/')
   assert dest.exists(),(path,'missing internal route',href)
 assert 'mailto:info@saipan-ivf.com' in page.links,(path,'missing contact action')
 if path!=Path('dist/index.html'):assert 'aria-current="page"' in s,(path,'missing active language')
 assert '赴岛' not in s,(path,'outdated wording')
 print('PASS',path,'links',len(page.links),'one H1, unique IDs, anchors, routes, contact')
