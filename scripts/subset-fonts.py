from pathlib import Path
from html.parser import HTMLParser
from fontTools.ttLib import TTFont
from fontTools import subset
from fontTools.varLib.instancer import instantiateVariableFont
import shutil,json,hashlib,os
sources=Path(os.environ.get('FONT_SOURCES','/tmp/saipan-font-sources'))
root=Path(__file__).resolve().parents[1]; out=root/'public/fonts';out.mkdir(exist_ok=True)
class Headings(HTMLParser):
 def __init__(self):super().__init__();self.level=0;self.text=''
 def handle_starttag(self,t,a):
  if t in ('h1','h2'):self.level+=1
 def handle_endtag(self,t):
  if t in ('h1','h2'):self.level=max(0,self.level-1)
 def handle_data(self,s):
  if self.level:self.text+=s
chars={k:set() for k in ('sc','tc','ja','ko')}
for p in (root/'dist').rglob('index.html'):
 first=p.relative_to(root/'dist').parts[0]; k={'zh-hant':'tc','ja':'ja','ko':'ko'}.get(first,'sc' if first not in ('en','es','de','fr') else None)
 if k:
  h=Headings();h.feed(p.read_text(encoding='utf-8'));chars[k].update(h.text)
manifest={}
prev={}
if (out/'manifest.json').exists():
 prev=json.loads((out/'manifest.json').read_text(encoding='utf-8'))
regressions=[]
for k in ('sc','tc','ja','ko','latin','sans'):
 font=TTFont(sources/(k+'.ttf'))
 if k!='sans':font=instantiateVariableFont(font,{'wght':600},inplace=True)
 else:font=instantiateVariableFont(font,{'opsz':16,'wght':(400,700)},inplace=True)
 options=subset.Options();options.flavor='woff2';options.layout_features=['*']
 sub=subset.Subsetter(options=options)
 codes=set(range(0x20,0x250))|set(range(0x2000,0x2070))
 if k in chars:codes.update(map(ord,chars[k]))
 sub.populate(unicodes=codes);sub.subset(font);font.flavor='woff2'
 name={'latin':'lora','sans':'dm-sans'}.get(k,'noto-serif-'+k)
 path=out/(name+'.woff2')
 if k=='latin':
  # The upstream Lora OFL reserves its font name: rename the modified subset.
  names={1:'SIVF Editorial',2:'SemiBold',3:'SIVFEditorial-SemiBold-1',4:'SIVF Editorial SemiBold',6:'SIVFEditorial-SemiBold',16:'SIVF Editorial',17:'SemiBold'}
  for record in font['name'].names:
   if record.nameID in names:record.string=names[record.nameID].encode(record.getEncoding(),errors='replace')
 font.save(path)
 shutil.copy(sources/(k+'-OFL.txt'),out/(name+'-OFL.txt'))
 manifest[name]={'bytes':path.stat().st_size,'glyphs':len(font.getBestCmap()),'codepoints':list(font.getBestCmap()),'sha256':hashlib.sha256(path.read_bytes()).hexdigest()};print(name,manifest[name]['bytes'],'bytes,',manifest[name]['glyphs'],'glyphs',flush=True)
 old=prev.get(name)
 if old and manifest[name]['bytes']>old['bytes']*1.10:
  regressions.append(name+': '+str(old['bytes'])+' -> '+str(manifest[name]['bytes']))
(out/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n',encoding='utf-8')
dist=root/'dist/fonts'
if dist.exists():
 for name in manifest:
  shutil.copy(out/(name+'.woff2'),dist/(name+'.woff2'))
 (dist/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n',encoding='utf-8')
if regressions:
 print('REGRESSED (over 10% larger than previous subsets):',', '.join(regressions),flush=True)
 print('Check the downloaded source font version in scripts/fetch-font-sources.py.',flush=True)
 import sys;sys.exit(1)
