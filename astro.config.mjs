import { defineConfig } from 'astro/config';

// For a custom domain (Felix.AI), keep base as '/'.
// If deploying to a project page (e.g., /felixai), set base accordingly.
export default defineConfig({
  site: 'https://Felix.AI',
  output: 'static'
});

