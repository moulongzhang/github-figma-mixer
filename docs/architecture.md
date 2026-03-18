# Architecture

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | [Next.js](https://nextjs.org/) (App Router) | 16.1.7 |
| UI Library | [React](https://react.dev/) | 19.2.3 |
| Styling | [Tailwind CSS](https://tailwindcss.com/) v4 | ^4 |
| Language | [TypeScript](https://www.typescriptlang.org/) | ^5 |
| AI Chat | [`@github/copilot-sdk`](https://www.npmjs.com/package/@github/copilot-sdk) | ^0.1.32 |
| Compiler Plugin | `babel-plugin-react-compiler` | 1.0.0 |

## Directory Structure

```
github-figma-mixer/
├── docs/                  # Auto-generated documentation (this folder)
├── scripts/
│   └── postinstall.sh     # ESM compatibility patch for @github/copilot-sdk
├── src/
│   └── app/
│       ├── components/
│       │   └── ChatBot.tsx   # Copilot-powered chat widget (client component)
│       ├── globals.css       # Global styles: Tailwind import, @theme inline, body defaults
│       ├── layout.tsx        # RootLayout: Geist font, metadata, <html lang="ja">, ChatBot
│       ├── page.tsx          # Home page: hero, agenda, speakers, FAQ, location, footer
│       └── favicon.ico
├── .github/               # CI/CD workflows (GitHub Pages deployment)
├── eslint.config.mjs      # ESLint 9 flat config
├── next.config.ts          # Next.js configuration (static export, basePath, React Compiler)
├── postcss.config.mjs      # PostCSS: @tailwindcss/postcss plugin
├── tsconfig.json           # TypeScript compiler options
├── package.json            # Scripts, dependencies, and devDependencies
└── package-lock.json
```

## Build Pipeline — Static Export

The site is built as a **fully static export** using Next.js `output: "export"`. This produces a set of pre-rendered HTML, CSS, and JS files in the `out/` directory with no server runtime required.

```
npm ci                  # Install dependencies (+ postinstall ESM patch)
npm run build           # next build → static export to out/
```

### Key build-time behaviors

- **`basePath: "/github-figma-mixer"`** — all asset and link paths are prefixed for hosting under a subpath.
- **`images.unoptimized: true`** — images are served as-is (required for static export since there is no image optimization server).
- **React Compiler** (`reactCompiler: true`) is enabled, automatically memoizing components via `babel-plugin-react-compiler`.

## Deployment — GitHub Pages

The `out/` directory is deployed to **GitHub Pages** via a GitHub Actions workflow:

1. The workflow triggers on pushes to the main branch.
2. It runs `npm ci && npm run build` to generate static files.
3. The `out/` directory is uploaded as a GitHub Pages artifact and deployed.

The site is served at `https://<owner>.github.io/github-figma-mixer/`.

## Key Architectural Decisions

### React Compiler

The React Compiler (`babel-plugin-react-compiler` 1.0.0) is enabled in `next.config.ts` via `reactCompiler: true`. It automatically applies memoization (equivalent to manual `useMemo`/`useCallback`/`React.memo`) at build time, improving runtime performance without manual optimization.

### Tailwind CSS v4 with `@theme inline`

Tailwind CSS v4 is used with the `@theme inline` directive in `globals.css` to define custom theme tokens (font families) as inline CSS custom properties rather than generating a separate theme layer. The PostCSS integration uses `@tailwindcss/postcss`.

### Figma MCP Image Sourcing

All images (hero, speaker photos, map, icons) are sourced from the **Figma MCP asset API** at `https://www.figma.com/api/mcp/asset/{id}`. This is configured in `next.config.ts` under `images.remotePatterns`. Images are served unoptimized since the site uses static export.

### Copilot SDK Integration

The `@github/copilot-sdk` (v0.1.32) powers the chat assistant. The client-side `ChatBot` component communicates with a backend `/api/chat` endpoint using a streaming SSE (Server-Sent Events) protocol. A `postinstall.sh` script patches the SDK for ESM import compatibility.

### Japanese Locale

The site targets a Japanese audience. The `<html lang="ja">` attribute is set in the root layout, and all user-facing text (navigation, event details, FAQ, chat UI) is in Japanese.
