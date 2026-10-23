import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { taiwanGuide } from '../src/data/taiwan-region.mjs';

const root = 'dist/zh-hant';
assert.ok(existsSync(root), 'Build zh-hant pages first: npm run build');
const pages = [];
function walk(dir) {
  for (const item of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, item.name);
    if (item.isDirectory()) walk(path);
    else if (item.name === 'index.html') pages.push(path);
  }
}
walk(root);
assert.ok(pages.length > 0, 'No Taiwan pages found');
assert.equal(taiwanGuide.rows.length, 5, 'Expected five regional sections');

const forbidden = [
  /CNMI EVS[\s-]?TAP/i,
  /中國護照可以免簽去塞班/,
  /中國國籍、旅行證和戶口分別確認/,
  /本站提供中文諮詢和就診協調/,
];
const critical = ['faq/index.html', 'guides/travel-checklist/index.html', 'fees/index.html', 'contact/index.html', 'service-scope/index.html'];
for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  const route = relative(root, page).split('\\').join('/');
  assert.match(html, /<html[^>]*lang="zh-TW"/i, route + ' missing zh-TW language');
  for (const rule of forbidden) assert.doesNotMatch(html, rule, route + ' contains mainland-only copy');
  if (critical.includes(route)) {
    assert.match(html, /<link[^>]+rel="canonical"[^>]*>/i, route + ' missing canonical');
    assert.match(html, /hreflang="zh-TW"/i, route + ' missing reciprocal locale');
  }
}
console.log('PASS Taiwan localization: ' + pages.length + ' generated zh-hant pages checked');
