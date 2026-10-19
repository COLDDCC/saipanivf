import fs from 'node:fs';
import assert from 'node:assert/strict';

const pages = ['dist/index.html', 'dist/zh-hant/index.html', 'dist/en/index.html', 'dist/ja/index.html'];
for (const path of pages) {
  const html = fs.readFileSync(path, 'utf8');
  assert.equal((html.match(/data-slide(?=[\s>])/g) || []).length, 4, `${path}: expected four slides`);
  assert.equal((html.match(/data-slide-to=/g) || []).length, 4, `${path}: expected four slide tabs`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${path}: expected one H1`);
  assert.ok((html.match(/SAIPAN IVF/g) || []).length >= 4, `${path}: persistent IVF identity missing`);
  assert.ok(html.includes('data-hero-prev') && html.includes('data-hero-next') && html.includes('data-hero-pause'), `${path}: carousel controls missing`);
}
console.log('Passed: all four languages share four-slide IVF heroes with one H1 and complete controls.');
