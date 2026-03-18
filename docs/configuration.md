# Configuration

## `next.config.ts`

```ts
import type { NextConfig } from "next";

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

export default nextConfig;
```

| Option | Value | Purpose |
|--------|-------|---------|
| `output` | `"export"` | Produces a fully static site in `out/` (no Node.js server required) |
| `basePath` | `"/github-figma-mixer"` | Prefixes all routes and assets for GitHub Pages subpath hosting |
| `reactCompiler` | `true` | Enables the React Compiler via `babel-plugin-react-compiler` for automatic memoization |
| `images.unoptimized` | `true` | Disables Next.js image optimization (required for static export) |
| `images.remotePatterns` | Figma MCP asset API | Allows `<Image>` to load images from `https://www.figma.com/api/mcp/asset/**` |

---

## `tsconfig.json`

| Option | Value | Purpose |
|--------|-------|---------|
| `target` | `"ES2017"` | JavaScript output target |
| `lib` | `["dom", "dom.iterable", "esnext"]` | Available type libraries |
| `strict` | `true` | Enables all strict type-checking options |
| `module` | `"esnext"` | ECMAScript module system |
| `moduleResolution` | `"bundler"` | Bundler-style module resolution (works with Next.js) |
| `jsx` | `"react-jsx"` | Uses the automatic JSX runtime (no `import React` needed) |
| `incremental` | `true` | Enables incremental compilation for faster rebuilds |
| `paths` | `{ "@/*": ["./src/*"] }` | Alias `@/` to `src/` for cleaner imports |
| `plugins` | `[{ "name": "next" }]` | Enables the Next.js TypeScript plugin |

**Includes**: `next-env.d.ts`, `**/*.ts`, `**/*.tsx`, `.next/types/**/*.ts`, `.next/dev/types/**/*.ts`, `**/*.mts`

**Excludes**: `node_modules`

---

## `package.json` — Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `next dev` | Start the development server |
| `build` | `next build` | Build the static export to `out/` |
| `start` | `next start` | Start the production server (not used for static export) |
| `lint` | `eslint` | Run ESLint 9 with flat config |
| `postinstall` | `sh scripts/postinstall.sh` | Patch `@github/copilot-sdk` for ESM compatibility |

## `package.json` — Dependencies

### Runtime

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | `16.1.7` | Next.js framework |
| `react` | `19.2.3` | React UI library |
| `react-dom` | `19.2.3` | React DOM renderer |
| `@github/copilot-sdk` | `^0.1.32` | GitHub Copilot SDK for the chat assistant backend |

### Dev

| Package | Version | Purpose |
|---------|---------|---------|
| `tailwindcss` | `^4` | Tailwind CSS v4 utility framework |
| `@tailwindcss/postcss` | `^4` | PostCSS plugin for Tailwind CSS v4 |
| `typescript` | `^5` | TypeScript compiler |
| `@types/node` | `^20` | Node.js type definitions |
| `@types/react` | `^19` | React type definitions |
| `@types/react-dom` | `^19` | React DOM type definitions |
| `eslint` | `^9` | ESLint v9 linter |
| `eslint-config-next` | `16.1.7` | Next.js ESLint configuration |
| `babel-plugin-react-compiler` | `1.0.0` | React Compiler Babel plugin |

---

## `postcss.config.mjs`

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

Uses the `@tailwindcss/postcss` plugin, which is the Tailwind CSS v4 PostCSS integration. No additional PostCSS plugins are configured.

---

## `globals.css` — `src/app/globals.css`

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

| Directive / Rule | Purpose |
|-----------------|---------|
| `@import "tailwindcss"` | Imports the full Tailwind CSS v4 framework |
| `@theme inline` | Defines custom theme tokens as inline CSS custom properties |
| `--font-sans` | Maps to the Geist Sans font variable set in `layout.tsx` |
| `--font-mono` | Maps to the Geist Mono font variable |
| `html { scroll-behavior: smooth }` | Enables smooth scrolling for anchor links |
| `body` | White background, black text, "Mona Sans" font stack |

---

## `postinstall.sh` — `scripts/postinstall.sh`

```bash
#!/bin/sh
# Patch @github/copilot-sdk to fix ESM import resolution for vscode-jsonrpc
SESSION_FILE="node_modules/@github/copilot-sdk/dist/session.js"
if [ -f "$SESSION_FILE" ]; then
  sed -i '' 's|from "vscode-jsonrpc/node"|from "vscode-jsonrpc/node.js"|g' "$SESSION_FILE" 2>/dev/null || \
  sed -i 's|from "vscode-jsonrpc/node"|from "vscode-jsonrpc/node.js"|g' "$SESSION_FILE" 2>/dev/null
  echo "Patched @github/copilot-sdk for ESM compatibility"
fi
```

This script runs automatically after `npm install` (via the `postinstall` lifecycle hook). It patches the `@github/copilot-sdk` package to fix ESM import resolution for `vscode-jsonrpc/node` by appending the `.js` file extension. The script handles both macOS (`sed -i ''`) and Linux (`sed -i`) variants.

---

## Environment Variables

The `ChatBot` component communicates with a `/api/chat` backend endpoint. The chat backend (powered by `@github/copilot-sdk`) expects the following environment variables at runtime:

| Variable | Required | Description |
|----------|----------|-------------|
| Backend-specific credentials | Yes | The `/api/chat` endpoint requires appropriate Copilot SDK authentication. Refer to the `@github/copilot-sdk` documentation for details. |

> **Note**: For static export (`output: "export"`), the `/api/chat` endpoint must be hosted separately since API routes are not included in static builds. The chat functionality requires a running backend server.
