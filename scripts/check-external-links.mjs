#!/usr/bin/env node
// External source-link checker.
//
// The site cites ~50 external sources (HFEA, NHS, CBP, State Dept, MOJ, clinic
// pages...). Government sites move pages often; a dead citation on a medical
// page costs trust. This script finds every https:// URL in src/ (and dist/ if
// built), checks it, and writes reports/external-links.md.
//
//   node scripts/check-external-links.mjs            # report only
//   node scripts/check-external-links.mjs --strict   # exit 1 on broken links
//   node scripts/check-external-links.mjs --concurrency=4 --timeout=20000
//
// Status classes:
//   ok        2xx
//   redirect  3xx to a different URL (update the citation to the final URL)
//   blocked   401/403/429 or bot challenge — the site refuses scripts; check by hand
//   broken    404/410/5xx or DNS failure — fix
//   error     timeout / TLS / network — retry later or check by hand

import fs from 'node:fs';
import path from 'node:path';

const args = Object.fromEntries(process.argv.slice(2).map(a => {
  const [k, v] = a.replace(/^--/, '').split('=');
  return [k, v ?? true];
}));
const STRICT = Boolean(args.strict);
const CONCURRENCY = Number(args.concurrency || 6);
const TIMEOUT = Number(args.timeout || 15000);
const OUT = path.resolve(args.out || 'reports');
const ROOTS = ['src', 'functions', 'public', 'dist'].filter(d => fs.existsSync(d));
const EXT = /\.(astro|ts|mjs|js|json|html|md|xml)$/;

// Origins never worth checking (our own site, schema namespaces, CDNs, assets).
const ORIGIN = (process.env.SITE_ORIGIN || 'https://saipanivf.pages.dev').replace(/\/$/, '');
const IGNORE = [
  ORIGIN,
  'https://schema.org', 'http://www.sitemaps.org', 'https://www.sitemaps.org', 'http://www.w3.org', 'https://www.w3.org',
  'https://static.cloudflareinsights.com', 'https://cloudflareinsights.com',
  'https://fonts.googleapis.com', 'https://fonts.gstatic.com',
];
const UA = 'Mozilla/5.0 (compatible; SaipanIVF-LinkCheck/1.0; +' + ORIGIN + '/editorial-policy/)';

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => {
    if (['node_modules', '.git', 'images', 'fonts', '_astro'].includes(e.name)) return [];
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : EXT.test(e.name) ? [p] : [];
  });
}

// url -> Set(files)
const found = new Map();
for (const root of ROOTS) {
  for (const file of walk(root)) {
    const text = fs.readFileSync(file, 'utf8');
    for (const m of text.matchAll(/https?:\/\/[^\s"'`<>()\\{}|]+/g)) {
      let url = m[0].replace(/&amp;/g, '&').replace(/[.,;:!?)\]}]+$/, '');
      if (url.includes('${')) continue; // template literal
      try { url = new URL(url).href; } catch { continue; }
      if (IGNORE.some(i => url.startsWith(i))) continue;
      const rel = file.startsWith('dist') ? 'dist/*' : file;
      (found.get(url) || found.set(url, new Set()).get(url)).add(rel);
    }
  }
}

async function request(url, method) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT);
  try {
    return await fetch(url, {
      method, redirect: 'manual', signal: ctrl.signal,
      headers: { 'User-Agent': UA, Accept: 'text/html,application/xhtml+xml,*/*;q=0.8', 'Accept-Language': 'en,zh;q=0.8' },
    });
  } finally { clearTimeout(timer); }
}

async function check(url) {
  let current = url, hops = 0, lastStatus = 0;
  try {
    while (hops < 6) {
      let res = await request(current, 'HEAD');
      if ([403, 405, 501].includes(res.status) || res.status === 400) res = await request(current, 'GET'); // many servers reject HEAD
      lastStatus = res.status;
      if (res.status >= 300 && res.status < 400 && res.headers.get('location')) {
        current = new URL(res.headers.get('location'), current).href;
        hops++;
        continue;
      }
      const cf = res.headers.get('cf-mitigated') === 'challenge' || res.headers.get('server')?.includes('AkamaiGHost') && res.status === 403;
      const cls = res.status < 300 ? (current === url || sameEnough(url, current) ? 'ok' : 'redirect')
        : cf || [401, 403, 429, 999].includes(res.status) ? 'blocked'
        : 'broken';
      return { url, status: res.status, final: current, cls, hops };
    }
    return { url, status: lastStatus, final: current, cls: 'error', note: 'too many redirects' };
  } catch (e) {
    const code = e.cause?.code || e.name;
    const cls = code === 'ENOTFOUND' ? 'broken' : 'error';
    return { url, status: 0, final: current, cls, note: code };
  }
}
// Treat trailing-slash or http→https upgrades as non-redirects.
function sameEnough(a, b) {
  const n = u => u.replace(/^http:/, 'https:').replace(/\/$/, '').replace('://www.', '://');
  return n(a) === n(b);
}

const urls = [...found.keys()].sort();
console.log(`Checking ${urls.length} external URLs (concurrency ${CONCURRENCY})…`);
const results = [];
let next = 0;
await Promise.all(Array.from({ length: Math.min(CONCURRENCY, urls.length) }, async () => {
  while (next < urls.length) {
    const url = urls[next++];
    let r = await check(url);
    if (r.cls === 'error') r = await check(url); // one retry
    results.push(r);
    process.stdout.write(r.cls === 'ok' ? '.' : r.cls[0].toUpperCase());
  }
}));
process.stdout.write('\n');

// If nothing at all could be reached, the runner has no network: don't blame the links.
if (results.length > 3 && results.every(r => r.status === 0)) {
  console.warn('No URL was reachable — the runner appears to have no outbound network. Marking all as "error".');
  for (const r of results) { r.cls = 'error'; r.note = `network unavailable (${r.note})`; }
}

const order = ['broken', 'error', 'redirect', 'blocked', 'ok'];
results.sort((a, b) => order.indexOf(a.cls) - order.indexOf(b.cls) || a.url.localeCompare(b.url));
const tally = Object.fromEntries(order.map(c => [c, results.filter(r => r.cls === c).length]));

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, 'external-links.json'), JSON.stringify({ generatedAt: new Date().toISOString(), tally, results: results.map(r => ({ ...r, files: [...found.get(r.url)] })) }, null, 2));
const md = [
  `# External links — ${new Date().toISOString().slice(0, 10)}`,
  '',
  order.map(c => `${c}: **${tally[c]}**`).join(' · '),
  '',
  '| Status | Code | URL | Final URL / note | Used in |',
  '|---|---|---|---|---|',
  ...results.filter(r => r.cls !== 'ok').map(r => `| ${r.cls} | ${r.status || ''} | ${r.url} | ${r.final !== r.url ? r.final : r.note || ''} | ${[...found.get(r.url)].join('<br>')} |`),
  '',
  `<details><summary>${tally.ok} OK links</summary>`,
  '',
  ...results.filter(r => r.cls === 'ok').map(r => `- ${r.url}`),
  '</details>',
  '',
].join('\n');
fs.writeFileSync(path.join(OUT, 'external-links.md'), md);
console.log(order.map(c => `${c} ${tally[c]}`).join(' · '));
for (const r of results.filter(r => r.cls === 'broken' || r.cls === 'redirect')) console.log(`  ${r.cls.padEnd(8)} ${r.status} ${r.url}${r.final !== r.url ? ' → ' + r.final : ''}`);
if (process.env.GITHUB_ACTIONS) {
  for (const r of results.filter(r => ['broken', 'redirect'].includes(r.cls)).slice(0, 10)) console.log(`::warning title=link ${r.cls} ${r.status || r.note || ''}::${r.url}${r.final !== r.url ? ' -> ' + r.final : ''} (${[...found.get(r.url)].join(', ')})`);
  console.log(`::notice title=external links::${order.map(c => `${c} ${tally[c]}`).join(' · ')}`);
}
if (STRICT && tally.broken) process.exit(1);
