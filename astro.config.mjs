import { defineConfig } from "astro/config";

import traditional from "./src/integrations/traditional.mjs";

export default defineConfig({ site: "https://saipanivf.pages.dev", output: "static", integrations: [traditional()] });
