import fs from 'node:fs';
import assert from 'node:assert/strict';

const pages = ['dist/index.html', 'dist/zh-hant/index.html', 'dist/en/index.html', 'dist/ja/index.html'];
for (const path of pages) {
  const html = fs.readFileSync(path, 'utf8');
  assert.ok(html.includes('data-cost-checker'), `${path}: cost scope checker missing`);
  assert.ok(html.includes('data-contact-form'), `${path}: contact form missing`);
  assert.equal((html.match(/<input type="checkbox"/g) || []).length, 10, `${path}: expected 10 quote-scope items`);
  assert.ok(!html.includes('$15,000') && !html.includes('26,100'), `${path}: unconfirmed price remains`);
  assert.ok(html.includes('mailto:info@saipan-ivf.com'), `${path}: direct email action missing`);
}
console.log('Passed: all four languages use the same quote checklist and contain no hypothetical package prices.');
