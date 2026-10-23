#!/usr/bin/env node
// Build-output audit for Saipan IVF.
//
// Run after `npm run build`:
//   node scripts/audit-dist.mjs            # report only (exit 0)
//   node scripts/audit-dist.mjs --strict   # exit 1 when any "error" finding exists
//   node scripts/audit-dist.mjs --dist=dist --out=reports
//
// What it measures, per built page (dist/**/index.html):
//   - Page weight: HTML + local CSS + local JS + eager images + the heading font
//     a page of that language will download. Compared against BUDGET below.
//   - SEO: title/description length, canonical, og:image metadata, hreflang set
//     (every alternate URL must exist in dist), JSON-LD types, sitemap consistency.
//   - Accessibility heuristics: missing alt, alt identical to the H1, duplicate
//     ids, target=_blank without rel=noopener, empty links/buttons, multiple H1.
//
// Dependency-free on purpose (Node built-ins only) so it can run anywhere.

import fs from 'node:fs';
import path from 'node:path';

const args = Object.fromEntries(process.argv.slice(2).map(a => {
  const [k, v] = a.replace(/^--/, '').split('=');
  return [k, v ?? true];
}));
const DIST = path.resolve(args.dist || 'dist');
const OUT = path.resolve(args.out || 'reports');
const STRICT = Boolean(args.strict);
const ORIGIN = (process.env.SITE_ORIGIN || 'https://saipanivf.pages.dev').replace(/\/$/, '');

// Budgets in bytes (transfer size before compression is used as a proxy;
// Cloudflare serves Brotli, so real transfer is usually 25-35% of HTML/CSS/JS).
const BUDGET = {
  total: Number(args.budgetTotal || 600_000),
  html: Number(args.budgetHtml || 120_000),
  css: Number(args.budgetCss || 60_000),
  js: Number(args.budgetJs || 40_000),
  eagerImages: Number(args.budgetImages || 250_000),
  fonts: Number(args.budgetFonts || 170_000),
};
const TITLE = [15, 65];
const DESCRIPTION = [50, 160];

// Heading fonts each language downloads (see src/styles/typography.css).
const FONTS_BY_LANG = {
  'zh-CN': ['lora', 'dm-sans', 'noto-serif-sc'],
  'zh-TW': ['lora', 'dm-sans', 'noto-serif-tc'],
  ja: ['lora', 'dm-sans', 'noto-serif-ja'],
  ko: ['lora', 'dm-sans', 'noto-serif-ko'],
  en: ['lora', 'dm-sans'], es: ['lora', 'dm-sans'], de: ['lora', 'dm-sans'], fr: ['lora', 'dm-sans'],
};

if (!fs.existsSync(DIST)) {
  console.error(`dist folder not found at ${DIST}. Run "npm run build" first.`);
  process.exit(2);
}

// ---------- tiny HTML helpers (regex-based; good enough for audit output) ----------
const tagRe = name => new RegExp(`<${name}\\b([^>]*)>`, 'gi');
function attrs(raw) {
  const out = {};
  for (const m of raw.matchAll(/([:@\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g)) {
    out[m[1].toLowerCase()] = m[2] ?? m[3] ?? m[4] ?? '';
  }
  return out;
}
const tags = (html, name) => [...html.matchAll(tagRe(name))].map(m => attrs(m[1]));
const decode = s => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ');
const textOf = s => decode(s.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
const charLen = s => [...s].reduce((n, ch) => n + (/[　-鿿가-힯＀-￯]/.test(ch) ? 2 : 1), 0); // CJK counts double (SERP width)

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}
const fileSize = urlPath => {
  const clean = decodeURIComponent(urlPath.split(/[?#]/)[0]);
  const p = path.join(DIST, clean);
  try { return fs.statSync(p).size; } catch { return null; }
};
const isLocal = u => u && u.startsWith('/') && !u.startsWith('//');
const routeOf = file => '/' + path.relative(DIST, path.dirname(file)).split(path.sep).join('/') + '/';
const norm = r => r.replace(/\/\/+/g, '/');

// ---------- collect ----------
const htmlFiles = walk(DIST).filter(f => f.endsWith('index.html'));
const builtRoutes = new Set(htmlFiles.map(f => norm(routeOf(f))));
const findings = [];
const add = (level, route, rule, detail) => findings.push({ level, route, rule, detail });
const pages = [];
const altAcrossSite = new Map();

for (const file of htmlFiles) {
  const route = norm(routeOf(file));
  const html = fs.readFileSync(file, 'utf8');
  const lang = (html.match(/<html\b[^>]*\blang="([^"]+)"/i) || [])[1] || '?';
  const head = (html.match(/<head\b[\s\S]*?<\/head>/i) || [''])[0];
  const metas = tags(head, 'meta');
  const links = tags(head, 'link');
  const meta = key => metas.find(m => m.name === key || m.property === key)?.content;
  const noindex = /noindex/i.test(meta('robots') || '');

  // ----- weight -----
  const css = links.filter(l => /stylesheet/i.test(l.rel) && isLocal(l.href)).map(l => l.href);
  const js = tags(html, 'script').filter(s => isLocal(s.src)).map(s => s.src);
  const imgs = tags(html, 'img');
  const eager = imgs.filter(i => i.loading !== 'lazy' && isLocal(i.src)).map(i => i.src);
  const preloads = links.filter(l => l.rel === 'preload' && l.as === 'image' && isLocal(l.href)).map(l => l.href);
  const sum = list => [...new Set(list)].reduce((n, u) => n + (fileSize(u) ?? 0), 0);
  const inlineBytes = [...html.matchAll(/<(script|style)\b[^>]*>([\s\S]*?)<\/\1>/gi)].reduce((n, m) => n + Buffer.byteLength(m[2]), 0);
  const fontBytes = (FONTS_BY_LANG[lang] || []).reduce((n, f) => n + (fileSize(`/fonts/${f}.woff2`) ?? 0), 0);
  const weight = {
    html: Buffer.byteLength(html),
    inline: inlineBytes,
    css: sum(css),
    js: sum(js),
    eagerImages: sum([...eager, ...preloads]),
    fonts: fontBytes,
  };
  weight.total = weight.html + weight.css + weight.js + weight.eagerImages + weight.fonts;
  for (const k of ['total', 'html', 'css', 'js', 'eagerImages', 'fonts']) {
    if (weight[k] > BUDGET[k]) add(k === 'total' ? 'error' : 'warn', route, `budget:${k}`, `${kb(weight[k])} > budget ${kb(BUDGET[k])}`);
  }
  for (const u of [...css, ...js, ...eager]) if (fileSize(u) === null) add('error', route, 'missing-asset', u);

  // ----- SEO -----
  const title = decode((head.match(/<title>([\s\S]*?)<\/title>/i) || [, ''])[1]).trim();
  const desc = decode(meta('description') || '');
  if (!title) add('error', route, 'title', 'missing');
  else if (charLen(title) < TITLE[0] || charLen(title) > TITLE[1]) add('warn', route, 'title-length', `${charLen(title)} width units (target ${TITLE.join('–')}): "${title}"`);
  if (!desc) add('error', route, 'description', 'missing');
  else if (charLen(desc) < DESCRIPTION[0] || charLen(desc) > DESCRIPTION[1]) add('info', route, 'description-length', `${charLen(desc)} width units (target ${DESCRIPTION.join('–')})`);
  const canonical = links.find(l => l.rel === 'canonical')?.href;
  if (!canonical) add('error', route, 'canonical', 'missing');
  else if (!canonical.startsWith(ORIGIN)) add('error', route, 'canonical-origin', canonical);
  else if (!noindex && norm(new URL(canonical).pathname) !== route) add('warn', route, 'canonical-mismatch', canonical);
  for (const k of ['og:image', 'og:image:width', 'og:image:height', 'og:image:alt', 'og:title', 'og:description', 'og:url']) {
    if (!meta(k)) add(k.startsWith('og:image:') ? 'warn' : 'error', route, 'open-graph', `${k} missing`);
  }
  const alternates = links.filter(l => l.rel === 'alternate' && l.hreflang);
  if (!noindex) {
    const langs = new Set(alternates.map(a => a.hreflang));
    if (!langs.has('x-default')) add('warn', route, 'hreflang', 'x-default missing');
    if (!langs.has(lang)) add('error', route, 'hreflang', `self language ${lang} missing from alternates`);
    for (const a of alternates) {
      try {
        const u = new URL(a.href);
        if (u.origin !== ORIGIN || !builtRoutes.has(norm(u.pathname))) add('error', route, 'hreflang-target', `${a.hreflang} → ${a.href} not built`);
      } catch { add('error', route, 'hreflang-target', `invalid ${a.href}`); }
    }
  }
  const ldTypes = [];
  for (const m of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const data = JSON.parse(m[1]);
      const visit = n => { if (Array.isArray(n)) n.forEach(visit); else if (n && typeof n === 'object') { if (n['@type']) ldTypes.push([].concat(n['@type']).join('|')); Object.values(n).forEach(visit); } };
      visit(data);
    } catch (e) { add('error', route, 'json-ld', `invalid JSON: ${e.message}`); }
  }
  const pageKind = route.match(/(?:^|\/)(faq|treatments\/[^/]+|guides\/[^/]+|about|team)\/$/)?.[1];
  if (pageKind === 'faq' && !ldTypes.includes('FAQPage')) add('info', route, 'schema', 'FAQ page without FAQPage structured data');
  if (pageKind?.startsWith('treatments/') && !ldTypes.some(t => /MedicalProcedure|MedicalWebPage/.test(t))) add('info', route, 'schema', 'treatment page without MedicalWebPage/MedicalProcedure');
  if (pageKind?.startsWith('guides/') && !ldTypes.some(t => /Article|MedicalWebPage/.test(t))) add('info', route, 'schema', 'guide without Article/MedicalWebPage (no dateModified/reviewedBy)');
  if (route === '/' && !ldTypes.some(t => /Organization|MedicalBusiness|MedicalClinic/.test(t))) add('info', route, 'schema', 'home page without Organization/MedicalBusiness');

  // ----- accessibility heuristics -----
  const body = (html.match(/<body\b[\s\S]*<\/body>/i) || [''])[0];
  const h1s = [...body.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => textOf(m[1]));
  if (h1s.length === 0) add('error', route, 'h1', 'missing');
  if (h1s.length > 1) add('warn', route, 'h1', `${h1s.length} h1 elements`);
  for (const i of imgs) {
    if (!('alt' in i)) add('error', route, 'img-alt', `missing alt: ${i.src || i['data-src']}`);
    else if (i.alt && h1s.includes(i.alt.trim())) add('warn', route, 'img-alt-redundant', `alt repeats the H1 ("${i.alt}") — use a description or alt=""`);
    if (i.alt) { const key = `${lang}|${i.alt}`; altAcrossSite.set(key, (altAcrossSite.get(key) || new Set()).add(i.src || i['data-src'])); }
    if (!i.width || !i.height) add('warn', route, 'img-dimensions', `no width/height (CLS risk): ${i.src || i['data-src']}`);
  }
  const ids = [...body.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
  const dup = ids.filter((id, n) => ids.indexOf(id) !== n);
  if (dup.length) add('error', route, 'duplicate-id', [...new Set(dup)].join(', '));
  for (const m of body.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const a = attrs(m[1]);
    if (a.target === '_blank' && !/noopener|noreferrer/.test(a.rel || '')) add('warn', route, 'target-blank', a.href);
    if (!textOf(m[2]) && !a['aria-label'] && !/<img\b[^>]*alt="[^"]+"/i.test(m[2])) add('error', route, 'empty-link', a.href);
  }
  for (const m of body.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)) {
    const b = attrs(m[1]);
    if (!textOf(m[2]) && !b['aria-label'] && !b['aria-labelledby']) add('error', route, 'empty-button', b.class || b.id || '(button)');
  }

  pages.push({ route, lang, noindex, title, weight, ldTypes: [...new Set(ldTypes)] });
}

// ---------- sitemap consistency ----------
const sitemapPath = path.join(DIST, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  const inSitemap = new Set(locs.map(l => { try { return norm(new URL(l).pathname); } catch { return l; } }));
  for (const l of locs) {
    const p = (() => { try { return norm(new URL(l).pathname); } catch { return null; } })();
    if (!p || !builtRoutes.has(p)) add('error', 'sitemap.xml', 'sitemap-404', l);
  }
  for (const pg of pages) {
    if (pg.noindex && inSitemap.has(pg.route)) add('error', pg.route, 'sitemap-noindex', 'noindex page listed in sitemap');
    if (!pg.noindex && !inSitemap.has(pg.route)) add('warn', pg.route, 'sitemap-missing', 'indexable page not in sitemap');
  }
  if (!/<lastmod>/.test(xml)) add('info', 'sitemap.xml', 'sitemap-lastmod', 'no <lastmod>: crawlers cannot prioritise updated pages');
} else add('error', 'sitemap.xml', 'sitemap', 'missing');

for (const [key, srcs] of altAcrossSite) if (srcs.size > 2) add('info', key.split('|')[0], 'alt-reused', `same alt "${key.split('|')[1]}" on ${srcs.size} different images`);

// headers / redirects presence (Cloudflare Pages)
if (!fs.existsSync(path.join(DIST, '_headers'))) add('warn', '(site)', 'headers', 'no _headers: no security headers or long-cache rules');
if (!fs.existsSync(path.join(DIST, '_redirects'))) add('info', '(site)', 'redirects', 'no _redirects file');

// ---------- report ----------
function kb(n) { return (n / 1024).toFixed(0) + ' KB'; }
const order = { error: 0, warn: 1, info: 2 };
findings.sort((a, b) => order[a.level] - order[b.level] || a.rule.localeCompare(b.rule) || a.route.localeCompare(b.route));
const count = l => findings.filter(f => f.level === l).length;
const byLang = {};
for (const p of pages) (byLang[p.lang] ||= []).push(p.weight.total);
const heaviest = [...pages].sort((a, b) => b.weight.total - a.weight.total).slice(0, 12);

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, 'audit.json'), JSON.stringify({ generatedAt: new Date().toISOString(), budget: BUDGET, pages, findings }, null, 2));

const ruleSummary = Object.entries(findings.reduce((m, f) => { const k = `${f.level}|${f.rule}`; m[k] = (m[k] || 0) + 1; return m; }, {}))
  .sort((a, b) => order[a[0].split('|')[0]] - order[b[0].split('|')[0]] || b[1] - a[1]);
const md = [
  `# Site audit — ${new Date().toISOString().slice(0, 10)}`,
  '',
  `Pages: **${pages.length}** · errors **${count('error')}** · warnings **${count('warn')}** · info **${count('info')}**`,
  '',
  '## Findings by rule',
  '', '| Level | Rule | Count |', '|---|---|---|',
  ...ruleSummary.map(([k, n]) => `| ${k.split('|')[0]} | ${k.split('|')[1]} | ${n} |`),
  '',
  '## Average page weight by language',
  '', '| Lang | Pages | Avg total | Max total |', '|---|---|---|---|',
  ...Object.entries(byLang).map(([l, w]) => `| ${l} | ${w.length} | ${kb(w.reduce((a, b) => a + b, 0) / w.length)} | ${kb(Math.max(...w))} |`),
  '',
  '## Heaviest pages',
  '', '| Page | Total | HTML | CSS | JS | Eager img | Fonts |', '|---|---|---|---|---|---|---|',
  ...heaviest.map(p => `| ${p.route} | ${kb(p.weight.total)} | ${kb(p.weight.html)} | ${kb(p.weight.css)} | ${kb(p.weight.js)} | ${kb(p.weight.eagerImages)} | ${kb(p.weight.fonts)} |`),
  '',
  '## All findings',
  '', '| Level | Page | Rule | Detail |', '|---|---|---|---|',
  ...findings.map(f => `| ${f.level} | ${f.route} | ${f.rule} | ${String(f.detail).replace(/\|/g, '\\|')} |`),
  '',
].join('\n');
fs.writeFileSync(path.join(OUT, 'audit.md'), md);

console.log(`Audited ${pages.length} pages → ${path.relative(process.cwd(), OUT)}/audit.md`);
console.log(`errors ${count('error')} · warnings ${count('warn')} · info ${count('info')}`);
for (const [k, n] of ruleSummary.slice(0, 15)) console.log(`  ${k.padEnd(32)} ${n}`);

// In GitHub Actions, surface one annotation per rule so results are visible
// on the run page without downloading the report.
if (process.env.GITHUB_ACTIONS) {
  const esc = s => String(s).replace(/%/g, '%25').replace(/\r?\n/g, ' ').replace(/::/g, ': :');
  const level = { error: 'error', warn: 'warning', info: 'notice' };
  for (const [key, n] of ruleSummary) {
    const [lvl, rule] = key.split('|');
    const examples = findings.filter(f => f.level === lvl && f.rule === rule).slice(0, 3).map(f => `${f.route}: ${f.detail}`).join(' ; ');
    console.log(`::${level[lvl]} title=audit ${rule} (${n})::${esc(examples)}`);
  }
  const weights = Object.entries(byLang).map(([l, w]) => `${l} avg ${kb(w.reduce((a, b) => a + b, 0) / w.length)} max ${kb(Math.max(...w))}`).join(' · ');
  console.log(`::notice title=audit page weight by language::${esc(weights)}`);
}

if (STRICT && count('error')) process.exit(1);
