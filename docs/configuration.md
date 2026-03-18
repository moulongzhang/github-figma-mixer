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
| `output` | `"export"` | Produces a fully static site in `out/` — no Node.js server required at runtime |
| `basePath` | `"/github-figma-mixer"` | Matches the GitHub Pages URL sub-path |
| `reactCompiler` | `true` | Enables the experimental React Compiler for automatic memoization |
| `images.unoptimized` | `true` | Disables server-side image optimization (required for static export) |
| `images.remotePatterns` | Figma MCP asset domain | Allows `next/image` to reference `www.figma.com/api/mcp/asset/**` URLs |

---

## `tsconfig.json`

| Option | Value | Purpose |
|--------|-------|---------|
| `target` | `"ES2017"` | Compile to ES2017 syntax |
| `lib` | `["dom", "dom.iterable", "esnext"]` | Include browser and ESNext type definitions |
| `strict` | `true` | Enable all strict type-checking flags |
| `noEmit` | `true` | Type-check only; Next.js handles actual compilation |
| `esModuleInterop` | `true` | Allow default imports from CommonJS modules |
| `module` | `"esnext"` | Output ESM module syntax |
| `moduleResolution` | `"bundler"` | Use bundler-aware module resolution (for Webpack/Turbopack) |
| `resolveJsonModule` | `true` | Allow importing `.json` files |
| `isolatedModules` | `true` | Ensure each file can be transpiled independently |
| `jsx` | `"react-jsx"` | Use the new JSX transform (no `import React` required) |
| `incremental` | `true` | Cache build information for faster subsequent type-checks |
| `plugins` | `[{ "name": "next" }]` | Enable the Next.js TypeScript plugin for IDE support |
| `paths` | `{ "@/*": ["./src/*"] }` | Path alias: `@/` resolves to `src/` |

---

## `package.json` Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `next dev` | Start the Next.js development server |
| `build` | `next build` | Build the project for production (outputs to `out/`) |
| `start` | `next start` | Start a production Next.js server (not used for static export) |
| `lint` | `eslint` | Run ESLint on the project |
| `postinstall` | `sh scripts/postinstall.sh` | Patch `@github/copilot-sdk` for ESM compatibility after install |

---

## Dependencies

### Runtime

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 16.1.7 | Next.js framework |
| `react` | 19.2.3 | React library |
| `react-dom` | 19.2.3 | React DOM renderer |
| `@github/copilot-sdk` | ^0.1.32 | GitHub Copilot SDK for the chatbot backend |

### Development

| Package | Version | Purpose |
|---------|---------|---------|
| `typescript` | ^5 | TypeScript compiler |
| `tailwindcss` | ^4 | Tailwind CSS framework |
| `@tailwindcss/postcss` | ^4 | PostCSS plugin for Tailwind CSS v4 |
| `babel-plugin-react-compiler` | 1.0.0 | Babel plugin enabling the React Compiler |
| `eslint` | ^9 | JavaScript/TypeScript linter |
| `eslint-config-next` | 16.1.7 | Next.js ESLint rule set |
| `@types/node` | ^20 | TypeScript types for Node.js |
| `@types/react` | ^19 | TypeScript types for React |
| `@types/react-dom` | ^19 | TypeScript types for React DOM |

---

## PostCSS (`postcss.config.mjs`)

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

Uses the `@tailwindcss/postcss` plugin (Tailwind CSS v4) as the sole PostCSS plugin.

---

## Global CSS (`src/app/globals.css`)

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

- `@import "tailwindcss"` — includes Tailwind's base, components, and utilities layers (v4 syntax).
- `@theme inline` block maps the Next.js Geist font CSS variables to Tailwind's `--font-sans` and `--font-mono` design tokens.
- `scroll-behavior: smooth` enables smooth anchor navigation.
- The body font stack uses "Mona Sans" (GitHub's brand font) with Arial/Helvetica as fallbacks.

---

## `scripts/postinstall.sh`

A shell script executed automatically after `npm install`. It patches `@github/copilot-sdk` to fix an ESM import resolution issue:

```sh
# Replaces:
from "vscode-jsonrpc/node"
# With:
from "vscode-jsonrpc/node.js"
```

This resolves a `Cannot find module 'vscode-jsonrpc/node'` error caused by the SDK omitting the `.js` extension required by strict ESM resolution.

---

## Environment Variables

The chatbot widget calls a `/api/chat` endpoint. That endpoint (which must be deployed separately for the static site) is expected to use the following secret:

| Variable | Purpose |
|----------|---------|
| `GITHUB_TOKEN` (or equivalent Copilot API credential) | Authenticates requests to the GitHub Copilot API from the `/api/chat` backend |

> Secrets are never embedded in the static export. They are consumed exclusively by the backend chat API.
