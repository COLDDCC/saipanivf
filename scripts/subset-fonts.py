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
  h=Headings();h.feed(p.read_text());chars[k].update(h.text)
manifest={}
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
 path=out/(name+'.woff2');font.save(path)
 shutil.copy(sources/(k+'-OFL.txt'),out/(name+'-OFL.txt'))
 manifest[name]={'bytes':path.stat().st_size,'glyphs':len(font.getBestCmap()),'codepoints':list(font.getBestCmap()),'sha256':hashlib.sha256(path.read_bytes()).hexdigest()};print(name,manifest[name],flush=True)
(out/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
