# Repository Guidelines

This is the Felix.AI portfolio site built with Astro and deployed to GitHub Pages. Follow these conventions to keep contributions consistent and deploys predictable.

## Project Structure & Module Organization
- `src/pages/` – Route-based pages (`.astro`, `.md`, `.mdx`).
- `src/components/` – Reusable UI components.
- `src/layouts/` – Shared layouts for pages.
- `public/` – Static assets served at root (favicons, images). Add `public/CNAME` for custom domains (e.g., `Felix.AI`).
- `astro.config.mjs` – Astro configuration (set `site` and `base` for Pages).
- `package.json` – Scripts and dependencies.

## Build, Test, and Development Commands
- `npm install` – Install dependencies (pnpm/bun also fine).
- `npm run dev` – Start local dev server with HMR.
- `npm run build` – Production build into `dist/`.
- `npm run preview` – Preview the built site locally.
- Optional: `npm run lint` and `npm run format` if configured (ESLint/Prettier).

## Coding Style & Naming Conventions
- Use TypeScript where practical; `.astro` for pages/components.
- Indentation: 2 spaces; wrap at ~100 chars.
- Components: PascalCase (`HeroBanner.astro`), files/dirs: kebab-case (`blog-posts/`).
- Run Prettier and ESLint (flat config in `eslint.config.mjs`) before committing; avoid inline styles unless scoped and minimal.

## Testing Guidelines
- Unit/component tests: Vitest + @testing-library if present (`*.test.ts`).
- E2E (optional): Playwright for critical flows (navigation, links, metadata).
- Keep tests deterministic and offline; mock network and timers.

## Deploying to GitHub Pages
- Set `site` in `astro.config.mjs` to the public URL.
- For project pages, also set `base: '/<repo>'`; for a custom domain add `public/CNAME` and configure DNS.
- Use the Astro Pages action or `actions/deploy-pages` workflow. Build artifact should be `dist/`.

## Commit & Pull Request Guidelines
- Conventional Commits (`feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `chore:`).
- PRs include: clear summary, screenshots of visual changes, linked issues, and notes on testing. Keep diffs focused and accessible (aria labels, color contrast).
