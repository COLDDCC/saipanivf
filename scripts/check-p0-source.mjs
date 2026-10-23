import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {taiwanGuide} from '../src/data/taiwan-region.mjs';
const integration=readFileSync('src/integrations/traditional.mjs','utf8');
const headers=readFileSync('public/_headers','utf8');
assert.match(headers,/^\/\*\s*$/m);
for(const name of ['X-Content-Type-Options','Referrer-Policy','Permissions-Policy','X-Frame-Options'])assert.match(headers,new RegExp('^\\s+'+name+':','m'));
assert.match(integration,/Taiwan content leak/);
assert.match(integration,/CNMI EVS-TAP/);
assert.match(integration,/Traditional Chinese locale missing/);
assert.equal(taiwanGuide.rows.length,5);
for(const [title,body] of taiwanGuide.rows){assert.ok(title.trim());assert.ok(body.trim());}
assert.match(taiwanGuide.rows[0][1],/G-CNMI/);
assert.match(taiwanGuide.rows[2][1],/USD/);
assert.match(taiwanGuide.rows[4][1],/醫療問診語言/);
console.log('PASS P0 source guards: Taiwan data, build leakage check, Cloudflare response headers');
