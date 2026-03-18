# Architecture

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.1.7 |
| UI Library | React | 19.2.3 |
| Styling | Tailwind CSS | ^4 |
| Language | TypeScript | ^5 |
| Font | Geist Sans (Google Fonts via `next/font`) | — |
| AI / Chat | `@github/copilot-sdk` | ^0.1.32 |

## Project Structure

```
github-figma-mixer/
├── docs/                        # Auto-generated documentation
├── scripts/
│   └── postinstall.sh           # Post-install ESM compatibility patch
├── src/
│   └── app/
│       ├── components/
│       │   └── ChatBot.tsx      # Floating AI assistant widget
│       ├── favicon.ico
│       ├── globals.css          # Global styles and Tailwind theme
│       ├── layout.tsx           # Root layout with metadata and font
│       └── page.tsx             # Main landing page (single page)
├── eslint.config.mjs
├── next.config.ts               # Next.js configuration
├── next-env.d.ts
├── package.json
├── postcss.config.mjs           # PostCSS / Tailwind CSS pipeline
└── tsconfig.json
```

## Build Pipeline

1. **Development**: `npm run dev` — starts Next.js dev server
2. **Build**: `npm run build` — produces a fully static export in `out/`
3. **Lint**: `npm run lint` — runs ESLint with `eslint-config-next`
4. **Post-install**: `scripts/postinstall.sh` patches `@github/copilot-sdk` to fix an ESM import path issue (`vscode-jsonrpc/node` → `vscode-jsonrpc/node.js`)

## Static Export Configuration

`next.config.ts` sets `output: "export"`, which instructs Next.js to emit a fully static HTML/CSS/JS bundle into `out/`. Because the app has no server-side runtime, all data is embedded at build time.

The `basePath` is set to `/github-figma-mixer`, matching the GitHub Pages repository sub-path.

## Deployment

The app is deployed to **GitHub Pages** via a GitHub Actions workflow (`.github/workflows/pages.yml`):
1. Workflow runs `npm ci && npm run build`
2. Static files from `out/` are published to the `gh-pages` environment

## Key Architectural Decisions

### React Compiler
`reactCompiler: true` in `next.config.ts` enables the experimental React Compiler (via `babel-plugin-react-compiler`). This automatically memoizes components and hooks, reducing the need for manual `useMemo`/`useCallback` usage.

### Image Handling
`images.unoptimized: true` is required for static export (Next.js image optimization requires a server). All images served from `www.figma.com/api/mcp/asset/**` are allowed via `remotePatterns`.

### Copilot SDK Integration
The `ChatBot` component calls a `/api/chat` endpoint at runtime using the Fetch API with Server-Sent Events (SSE) streaming. The `@github/copilot-sdk` library requires an ESM compatibility patch applied by `scripts/postinstall.sh`.

### Single-Page Layout
The entire event site is a single Next.js page (`page.tsx`) with smooth-scroll anchor navigation. There are no dynamic routes or additional pages.
