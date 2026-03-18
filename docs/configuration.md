# Configuration

## `next.config.ts`

```ts
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/github-figma-mixer",
  reactCompiler: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.figma.com",
        pathname: "/api/mcp/asset/**",
      },
    ],
  },
};
```

| Option | Value | Purpose |
|--------|-------|---------|
| `output` | `"export"` | Produces a fully static site in `out/` (no Node.js server required) |
| `basePath` | `"/github-figma-mixer"` | Sub-path for GitHub Pages deployment at `<org>.github.io/github-figma-mixer` |
| `reactCompiler` | `true` | Enables the React Compiler for automatic memoization |
| `images.unoptimized` | `true` | Disables server-side image optimization (required for static export) |
| `images.remotePatterns` | `www.figma.com/api/mcp/asset/**` | Allows `next/image` to load assets from Figma's MCP asset API |

---

## `tsconfig.json`

| Option | Value | Purpose |
|--------|-------|---------|
| `target` | `ES2017` | Compile output compatible with modern browsers |
| `lib` | `dom, dom.iterable, esnext` | Browser DOM and ESNext globals |
| `strict` | `true` | Enables all strict TypeScript checks |
| `noEmit` | `true` | TypeScript is used for type-checking only; Next.js/Babel handles emission |
| `module` | `esnext` | Use ES modules |
| `moduleResolution` | `bundler` | Resolve modules like a bundler (supports exports/imports fields) |
| `jsx` | `react-jsx` | Use the React 17+ JSX transform |
| `incremental` | `true` | Cache build info for faster re-compiles |
| `paths` | `@/* → ./src/*` | Alias `@/` to the `src/` directory |
| `plugins` | `[{ "name": "next" }]` | Enables Next.js TypeScript plugin for IDE-level type hints |

---

## `package.json` Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `next dev` | Start local development server with hot reload |
| `build` | `next build` | Build and export static site to `out/` |
| `start` | `next start` | Start production Next.js server (not used for static export) |
| `lint` | `eslint` | Run ESLint |
| `postinstall` | `sh scripts/postinstall.sh` | Patch `@github/copilot-sdk` for ESM compatibility |

### Runtime Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@github/copilot-sdk` | ^0.1.32 | GitHub Copilot API client for the AI chat feature |
| `next` | 16.1.7 | Next.js framework |
| `react` | 19.2.3 | React UI library |
| `react-dom` | 19.2.3 | React DOM renderer |

### Dev Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@tailwindcss/postcss` | ^4 | Tailwind CSS PostCSS integration |
| `@types/node` | ^20 | Node.js type definitions |
| `@types/react` | ^19 | React type definitions |
| `@types/react-dom` | ^19 | React DOM type definitions |
| `babel-plugin-react-compiler` | 1.0.0 | React Compiler Babel plugin |
| `eslint` | ^9 | JavaScript/TypeScript linter |
| `eslint-config-next` | 16.1.7 | Next.js ESLint configuration |
| `tailwindcss` | ^4 | Tailwind CSS utility-first CSS framework |
| `typescript` | ^5 | TypeScript compiler |

---

## `postcss.config.mjs`

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

Configures PostCSS to process Tailwind CSS v4 via the official `@tailwindcss/postcss` plugin.

---

## `src/app/globals.css`

```css
@import "tailwindcss";

@theme inline {
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

html {
  scroll-behavior: smooth;
}

body {
  background: #ffffff;
  color: #000000;
  font-family: "Mona Sans", Arial, Helvetica, sans-serif;
}
```

- Uses Tailwind CSS v4 `@import "tailwindcss"` syntax
- Maps `--font-geist-sans` (set by `next/font`) to the Tailwind `--font-sans` variable
- Enables smooth scrolling globally (used by anchor navigation)
- Sets base body font to Mona Sans with Arial/Helvetica fallbacks

---

## Environment Variables

The `ChatBot` component calls `POST /api/chat` at runtime. The API route is expected to use the following secret (set in the deployment environment, not committed to source):

| Variable | Purpose |
|----------|---------|
| `GITHUB_TOKEN` (or similar) | Authentication token for the GitHub Copilot SDK |

> **Note**: Secrets are configured in the GitHub repository settings and accessed via the Actions workflow — they are never stored in source files.

---

## `scripts/postinstall.sh`

Patches `node_modules/@github/copilot-sdk/dist/session.js` after `npm install` to fix an ESM import resolution bug:

```
from "vscode-jsonrpc/node"  →  from "vscode-jsonrpc/node.js"
```

This is required because `vscode-jsonrpc` uses ESM package exports that require the `.js` extension to resolve correctly in the Node.js ESM loader.
