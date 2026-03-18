# Architecture

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js | 16.1.7 |
| UI Library | React | 19.2.3 |
| Language | TypeScript | ^5 |
| Styling | Tailwind CSS | ^4 |
| Font | Geist (via `next/font/google`) | — |
| AI SDK | `@github/copilot-sdk` | ^0.1.32 |

## Project Directory Structure

```
github-figma-mixer/
├── docs/                        # Auto-generated project documentation
├── scripts/
│   └── postinstall.sh           # ESM compatibility patch for @github/copilot-sdk
├── src/
│   └── app/
│       ├── components/
│       │   └── ChatBot.tsx      # Floating AI chatbot widget
│       ├── favicon.ico
│       ├── globals.css          # Global styles and Tailwind theme tokens
│       ├── layout.tsx           # Root layout, metadata, font, and providers
│       └── page.tsx             # Main landing page (all sections)
├── eslint.config.mjs            # ESLint configuration
├── next.config.ts               # Next.js build and deployment settings
├── postcss.config.mjs           # PostCSS + Tailwind CSS plugin
├── package.json                 # Dependencies and npm scripts
└── tsconfig.json                # TypeScript compiler options
```

## Build Pipeline and Static Export

The project is configured for **fully static export** (`output: "export"` in `next.config.ts`). The build produces a static site in the `out/` directory that can be served from any CDN or static hosting provider.

```
npm run build  →  next build  →  out/
```

The `postinstall` script patches `@github/copilot-sdk` to fix an ESM import resolution issue with `vscode-jsonrpc/node`, replacing `from "vscode-jsonrpc/node"` with `from "vscode-jsonrpc/node.js"` in the compiled SDK.

## Deployment Strategy

The site is deployed to **GitHub Pages** from the `out/` directory using a GitHub Actions workflow. The `basePath` is set to `/github-figma-mixer` to match the Pages URL path.

Deployment flow:
1. Push to `main` triggers the Actions workflow (`npm ci && npm run build`).
2. The `out/` directory is published to the `gh-pages` branch (or Pages artifact).
3. The live site is served at `https://<owner>.github.io/github-figma-mixer`.

## Key Architectural Decisions

### React Compiler
`reactCompiler: true` in `next.config.ts` enables the experimental React Compiler (babel plugin `babel-plugin-react-compiler`). This automatically applies memoization optimizations without manual `useMemo`/`useCallback` calls, except where developers choose to retain explicit hooks (e.g., the `useCallback` in `ChatBot.tsx`).

### Tailwind CSS v4
The project uses Tailwind CSS v4, which uses the `@tailwindcss/postcss` plugin rather than the v3 `tailwindcss` PostCSS plugin. Theme customization is done with `@theme inline` in `globals.css` rather than a separate `tailwind.config.js`.

### Copilot SDK Integration
The `ChatBot` component communicates with a backend `/api/chat` endpoint that is expected to proxy to the GitHub Copilot API. The `@github/copilot-sdk` package provides the session management primitives. Because the site is statically exported, the `/api/chat` route must be hosted separately (e.g., as a serverless function or external API).

### Images from Figma
All images (hero banner, speaker photos, map, icons) are sourced from `www.figma.com/api/mcp/asset/*`. Next.js image optimization is disabled (`unoptimized: true`) because the static export cannot run the server-side image optimizer. The `remotePatterns` config explicitly allows the Figma MCP asset domain.

### Language
The UI is primarily in **Japanese**, targeting a Tokyo-based audience. The HTML `lang` attribute is set to `"ja"` in the root layout.
