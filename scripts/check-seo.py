from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse
import json, xml.etree.ElementTree as ET

ORIGIN='https://saipanivf.pages.dev'
class Head(HTMLParser):
 def __init__(self):
  super().__init__();self.meta={};self.canonical=None;self.ld=[];self.in_ld=False;self.buf='';self.images=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='meta':self.meta[a.get('name',a.get('property',''))]=a.get('content')
  if tag=='link' and a.get('rel')=='canonical':self.canonical=a.get('href')
  if tag=='script' and a.get('type')=='application/ld+json':self.in_ld=True;self.buf=''
  if tag=='img':self.images.append(a)
 def handle_data(self,data):
  if self.in_ld:self.buf+=data
 def handle_endtag(self,tag):
  if tag=='script' and self.in_ld:self.ld.append(json.loads(self.buf));self.in_ld=False

titles=set();expected=set()
for path in Path('dist').rglob('index.html'):
 page=Head();page.feed(path.read_text());route='/'+str(path.parent.relative_to('dist')).strip('.')
 if route!='/':route+='/'
 if route in ['/en/','/ja/','/zh-hant/']:
  assert 'noindex' in page.meta.get('robots',''),path
  continue
 expected.add(ORIGIN+route)
 assert page.canonical==ORIGIN+route,(path,'canonical')
 for key in ['description','og:title','og:description','og:image','twitter:card']:
  assert page.meta.get(key),(path,key)
 assert page.meta['og:url']==page.canonical
 share=Path('dist')/urlparse(page.meta['og:image']).path.lstrip('/')
 assert share.is_file(),(path,'share image')
 graph=page.ld[0]['@graph'];types=[node['@type'] for node in graph]
 assert 'WebSite' in types and 'WebPage' in types
 if route!='/':
  crumbs=next(node['itemListElement'] for node in graph if node['@type']=='BreadcrumbList')
  assert crumbs[-1]['item']==page.canonical
 for image in page.images:
  if image.get('src','').startswith('/'):
   assert image.get('srcset') and image.get('sizes'),(path,'responsive image')
   for candidate in image['srcset'].split(','):
    assert (Path('dist')/candidate.strip().split()[0].lstrip('/')).is_file(),(path,candidate)
root=ET.parse('dist/sitemap.xml').getroot();ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}
urls=[node.text for node in root.findall('s:url/s:loc',ns)]
assert len(urls)==len(set(urls)) and set(urls)==expected,('sitemap mismatch',set(urls)^expected)
hero=Head();hero.feed(Path('dist/index.html').read_text())
slides=[im for im in hero.images if 'hero-slide-image' in im.get('class','')]
assert len(slides)==4 and slides[0]['loading']=='eager' and slides[0]['fetchpriority']=='high'
assert all(im['loading']=='lazy' for im in slides[1:])
assert slides[0]['src'].startswith('/images/')
print(f'PASS SEO: {len(expected)} indexable pages, sitemap coverage, canonical, JSON-LD, sharing, responsive sources; 3 archived translations noindex; hero priority.')
