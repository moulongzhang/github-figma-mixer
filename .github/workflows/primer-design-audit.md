---
on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  issues: read
  pull-requests: read

tools:
  github:
    toolsets: [default]
  bash: ["echo", "cat", "ls", "head", "tail", "grep", "wc", "sort", "uniq", "jq"]

network:
  allowed:
    - defaults
    - github
    - node
    - "api.figma.com"
    - "unpkg.com"

mcp-scripts:
  figma-get-file:
    description: "Get Figma file structure. Returns top-level document tree with pages and frames."
    inputs:
      file_key:
        type: string
        required: true
        description: "Figma file key (e.g. GCvY3Qv8czRgZgvl1dG6lp)"
      depth:
        type: number
        default: 2
        description: "Depth of document tree to return"
    script: |
      const token = process.env.FIGMA_TOKEN;
      const res = await fetch(
        `https://api.figma.com/v1/files/${file_key}?depth=${depth || 2}`,
        { headers: { 'X-Figma-Token': token } }
      );
      if (!res.ok) return { error: `Figma API error: ${res.status} ${await res.text()}` };
      return await res.json();
    env:
      FIGMA_TOKEN: "${{ secrets.FIGMA_ACCESS_TOKEN }}"
    timeout: 120

  figma-get-nodes:
    description: "Get detailed node data from a Figma file. Returns full node info including styles, fills, typography, and component references. Max 50 node IDs per call."
    inputs:
      file_key:
        type: string
        required: true
        description: "Figma file key"
      node_ids:
        type: string
        required: true
        description: "Comma-separated node IDs using dash format (e.g. 24939-84755). Max 50."
    script: |
      const token = process.env.FIGMA_TOKEN;
      const ids = node_ids.split(',').map(s => s.trim().replace(/-/g, ':')).join(',');
      const res = await fetch(
        `https://api.figma.com/v1/files/${file_key}/nodes?ids=${encodeURIComponent(ids)}`,
        { headers: { 'X-Figma-Token': token } }
      );
      if (!res.ok) return { error: `Figma API error: ${res.status} ${await res.text()}` };
      return await res.json();
    env:
      FIGMA_TOKEN: "${{ secrets.FIGMA_ACCESS_TOKEN }}"
    timeout: 120

  figma-get-styles:
    description: "Get all published styles from a Figma file (colors, text styles, effects, grids)."
    inputs:
      file_key:
        type: string
        required: true
        description: "Figma file key"
    script: |
      const token = process.env.FIGMA_TOKEN;
      const res = await fetch(
        `https://api.figma.com/v1/files/${file_key}/styles`,
        { headers: { 'X-Figma-Token': token } }
      );
      if (!res.ok) return { error: `Figma API error: ${res.status} ${await res.text()}` };
      return await res.json();
    env:
      FIGMA_TOKEN: "${{ secrets.FIGMA_ACCESS_TOKEN }}"
    timeout: 120

  figma-get-components:
    description: "Get all published components from a Figma file. Returns component names, keys, and descriptions."
    inputs:
      file_key:
        type: string
        required: true
        description: "Figma file key"
    script: |
      const token = process.env.FIGMA_TOKEN;
      const res = await fetch(
        `https://api.figma.com/v1/files/${file_key}/components`,
        { headers: { 'X-Figma-Token': token } }
      );
      if (!res.ok) return { error: `Figma API error: ${res.status} ${await res.text()}` };
      return await res.json();
    env:
      FIGMA_TOKEN: "${{ secrets.FIGMA_ACCESS_TOKEN }}"
    timeout: 120

  fetch-primer-tokens:
    description: "Fetch official Primer design tokens from unpkg CDN. Returns combined token data including dark theme colors, border radius, typography, and spacing values."
    inputs: {}
    script: |
      const base = 'https://unpkg.com/@primer/primitives@11/dist/docs';
      const urls = {
        darkTheme: `${base}/functional/themes/dark.json`,
        radius: `${base}/functional/size/radius.json`,
        baseTypography: `${base}/base/typography/typography.json`,
        functionalTypography: `${base}/functional/typography/typography.json`,
        baseSize: `${base}/base/size/size.json`,
        functionalSize: `${base}/functional/size/size.json`,
      };
      const result = {};
      for (const [key, url] of Object.entries(urls)) {
        const res = await fetch(url);
        if (!res.ok) { result[key] = { error: `${res.status} ${url}` }; continue; }
        result[key] = await res.json();
      }
      return result;
    timeout: 120

safe-outputs:
  create-issue:
    title-prefix: "[design-audit] "
    labels: [design, primer-web, audit]
    close-older-issues: true
---

# Primer Web Design Compliance Audit

You are a design system compliance auditor. Your job is to check whether the UI components in a Figma design file align with the **Primer Web** design system tokens and component standards.

You have custom MCP tools to access the Figma REST API and Primer design tokens. Use them to perform the audit.

## Step 1: Get Primer Web Reference Data

Call the `fetch-primer-tokens` tool to get official Primer design tokens.

The response is a JSON object with these keys:
- **darkTheme**: Functional color tokens for the dark theme (fgColor, bgColor, borderColor semantic names and values)
- **radius**: Border radius tokens (borderRadius-default, borderRadius-small, borderRadius-medium, borderRadius-large, borderRadius-full)
- **baseTypography**: Base typography tokens (lineHeight, fontSize, fontWeight)
- **functionalTypography**: Functional typography tokens applied in themes
- **baseSize**: Base spacing/size primitives (base-size-4, base-size-8, etc.)
- **functionalSize**: Functional size tokens (spacing, padding, gap)

From the response, build internal reference lists:

- **Allowed color tokens**: Look in `darkTheme` for fgColor, bgColor, borderColor semantic names and their `$value` hex values
- **Allowed border radii**: Look in `radius` for borderRadius tokens. Common values: 3px (small), 6px (medium/default), 12px (large), 9999px (full)
- **Allowed font sizes**: Look in `baseTypography` and `functionalTypography` for `fontSize` entries
- **Allowed font weights**: 400 (normal), 500 (medium), 600 (semibold)
- **Allowed spacing**: Look in `baseSize` for `base-size-*` values

## Step 2: Get Figma File Structure

Call `figma-get-file` with:
- `file_key`: `GCvY3Qv8czRgZgvl1dG6lp`
- `depth`: `2`

Target node: `24939-84755`

Identify frames containing UI components (buttons, inputs, cards, etc.) and note their `node_id` values.

## Step 3: Get Detailed Node Data

Call `figma-get-nodes` with:
- `file_key`: `GCvY3Qv8czRgZgvl1dG6lp`
- `node_ids`: comma-separated list of identified node IDs (start with `24939-84755`)

**Important**: Max 50 node IDs per call. Split into multiple calls if needed.

Also call `figma-get-components` and `figma-get-styles` with the same file_key to get component and style metadata.

## Step 4: Violation Detection Rules

### Color Violations
- Extract `fills[].color` (r,g,b values are 0-1 floats). Convert: `hex = round(r*255), round(g*255), round(b*255)`
- Compare against Primer allowed color tokens
- Tolerance: plus or minus 2 per RGB channel is considered matching
- Flag any color NOT in the Primer palette

### Button Component Violations
Flag as "non-compliant button candidate" if:
- Node `name` contains "button", "btn", or "ボタン" (case-insensitive), AND
- `componentId` does NOT reference a Primer Web Figma library component
  (Primer library file_key reference: `YaYe4UooRm4D07GFZFXZ4T`)
- If `componentId` cannot be verified, check component name patterns like "Button/Primary", "Button/Secondary"

### Border Radius Violations
- If `cornerRadius` is NOT one of: 3px, 6px, 12px, 9999px then it is a violation

### Typography Violations
- If `style.fontSize` is NOT in Primer allowed font sizes then it is a violation
- If `style.fontWeight` is NOT 400, 500, or 600 then it is a violation

### Unstyle Detection (Direct Values)
- If a node has NO `styles` property (no Figma styles applied, no component used)
- AND the node has visual properties (fills, strokes, text) then flag as "hardcoded style"

## Step 5: Create Issue Report

Create a GitHub issue with the following structure:

### Title
`Primer Web Design Audit Report`

### Body Structure
1. **Summary**: Overall compliance score (X/Y nodes compliant)
2. **Violation Table**:

| Node Name | Node ID | Violation Type | Expected | Actual | Severity |
|-----------|---------|---------------|----------|--------|----------|

3. **Violation Categories**:
   - 🔴 `critical`: Component not from Primer library
   - 🟡 `warning`: Color/radius/typography deviation
   - 🔵 `info`: Improvement suggestion (e.g., better token to use)

4. **Recommendations**: Specific remediation steps for each violation type

## Important Notes

- Convert Figma color `r,g,b` (0-1 float) to hex by: `Math.round(value * 255)`
- Color comparison tolerance: plus or minus 2 per RGB channel
- Max 50 node IDs per Figma API call, paginate if needed
- If Primer primitives JSON structure differs from expected, adapt parsing accordingly
- Focus on the target node `24939-84755` and its children
