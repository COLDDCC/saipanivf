import { siteOrigin } from './origin.mjs';
export const site = {
  origin: siteOrigin,
  name: 'Saipan IVF 中文就诊指南',
  sourceChecked: '2026-10-19',
};

// Page-level analytics beacon token (Cloudflare Web Analytics). Empty by
// default: no token, no third-party script. Set CF_BEACON_TOKEN at build time.
export const analyticsToken = process.env.CF_BEACON_TOKEN || import.meta.env.CF_BEACON_TOKEN || '';
