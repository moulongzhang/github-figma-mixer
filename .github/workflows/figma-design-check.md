---
description: Validates Next.js implementation against Figma design and creates issues for mismatches

on:
  push:
    branches: [main]
    paths:
      - "src/app/components/**"
      - "src/app/page.tsx"
      - "src/app/globals.css"
  workflow_dispatch:

permissions:
  contents: read
  issues: read
  pull-requests: read

safe-outputs:
  create-issue:
    max: 7
  add-comment:
    max: 7

tools:
  github:
    toolsets: [default]

mcp-scripts:
  fetch-figma-design:
    description: "Fetch Figma design data for a specific node from the Figma REST API"
    inputs:
      file_key:
        type: string
        required: true
        description: "Figma file key"
      node_id:
        type: string
        required: true
        description: "Figma node ID (e.g., 10-4167)"
    script: |
      const token = process.env.FIGMA_API_TOKEN;
      if (!token) {
        return { error: "FIGMA_API_TOKEN is not set" };
      }
      const response = await fetch(
        `https://api.figma.com/v1/files/${file_key}/nodes?ids=${node_id}`,
        { headers: { "X-Figma-Token": token } }
      );
      if (!response.ok) {
        return { error: `Figma API returned ${response.status}: ${response.statusText}` };
      }
      return await response.json();
    env:
      FIGMA_API_TOKEN: "${{ secrets.FIGMA_API_TOKEN }}"
---

# Figma Design Consistency Checker

You are a design consistency checker. Your task is to compare this repository's Next.js implementation against a Figma design and create GitHub issues for any mismatches found.

## Context

- **Repository**: moulongzhang/github-figma-mixer
- **Figma Design**: https://www.figma.com/design/iA45JgkQJMaAm1nUWdf36z/GitHub---Figma-Mixer?node-id=10-4167
- **Figma File Key**: `iA45JgkQJMaAm1nUWdf36z`
- **Target Node ID**: `10-4167`

## Step 1: Extract Design Values from Figma

Use the `fetch-figma-design` tool to retrieve design data:

```
fetch-figma-design(file_key: "iA45JgkQJMaAm1nUWdf36z", node_id: "10-4167")
```

**Recursively** traverse the entire node tree from the API response and extract the following properties from every node:

| Property | Source |
|----------|--------|
| Colors (fill/stroke) | `fills[].color` / `strokes[].color` |
| Font size & weight | `style.fontSize` / `style.fontWeight` |
| Padding & gap | `paddingTop` / `paddingRight` / `paddingBottom` / `paddingLeft` / `itemSpacing` |
| Border radius | `cornerRadius` |
| Layout direction | `layoutMode` |

**Color conversion**: Figma returns RGBA values as floats (0–1). Convert to HEX using:

```
hex = '#' + [r, g, b].map(c => Math.round(c * 255).toString(16).padStart(2, '0')).join('')
```

Organize extracted values by section: Navigation, Hero, Agenda, Speakers, FAQ, Location, Footer.

## Step 2: Extract Implementation Values from Code

Read the following component files and extract design values (colors, font sizes, spacing, border radius, layout):

- `src/app/components/Navigation.tsx`
- `src/app/components/HeroSection.tsx`
- `src/app/components/AgendaSection.tsx`
- `src/app/components/SpeakersSection.tsx`
- `src/app/components/FAQSection.tsx`
- `src/app/components/LocationSection.tsx`
- `src/app/components/Footer.tsx`

**Important**: If the above component files don't exist as separate files, check `src/app/page.tsx` where sections may be implemented inline. Identify each section by its semantic content (navigation bar, hero banner, agenda listing, speakers grid, FAQ section, location map, footer).

### Resolving Tailwind CSS Values

This project uses **Tailwind CSS v4** configured via `src/app/globals.css` with `@theme inline`. There is no `tailwind.config.ts` file.

When you encounter Tailwind classes, resolve them to actual values:

**Colors** — Arbitrary value syntax `[#hex]` maps directly to the hex value:
- `text-[#57606a]` → `#57606a`
- `bg-[#f3f4f6]` → `#f3f4f6`
- `border-[#e5e7eb]` → `#e5e7eb`
- `bg-black` → `#000000`
- `bg-white` → `#ffffff`
- `text-white` → `#ffffff`

**Spacing** — Tailwind's default scale where 1 unit = 4px:
- `px-4` = 16px, `px-8` = 32px
- `py-12` = 48px, `py-16` = 64px
- `gap-4` = 16px, `gap-6` = 24px, `gap-8` = 32px
- `p-6` = 24px, `p-8` = 32px

**Font sizes**:
- `text-sm` = 14px, `text-base` = 16px, `text-lg` = 18px
- `text-xl` = 20px, `text-3xl` = 30px, `text-4xl` = 36px, `text-5xl` = 48px

**Font weights**:
- `font-normal` = 400, `font-medium` = 500
- `font-semibold` = 600, `font-bold` = 700

**Border radius**:
- `rounded-lg` = 8px, `rounded-full` = 9999px

**Arbitrary values**: Classes like `h-[600px]`, `max-w-[925px]` contain the actual pixel value directly.

Also check `src/app/globals.css` for any custom theme definitions or global style overrides.

## Step 3: Compare and Determine Mismatches

Compare the Figma design values (Step 1) with the implementation values (Step 2):

### Matching Criteria

- **Colors**: Convert both Figma and implementation values to RGB integers (0–255). Each channel (R, G, B) must be within **±2** to be considered a match.
- **Numeric values (px)**: Font size, padding, gap, and border radius must be an **exact match**.
- **Layout**: Child node order and flex direction (row/column) must match between Figma's `layoutMode` and the implementation's flex direction.

### Organizing Results

Group all mismatches by component/section. For each mismatch, record:
1. The Figma node name and its path in the tree
2. The specific property that differs
3. The Figma value
4. The implementation value
5. A suggested code fix

## Step 4: Create Issues for Mismatches

Before creating issues, search for existing open issues with the `design-mismatch` label to avoid duplicates:
- If an open issue already exists for the same component, **add a comment** to that issue with the updated comparison results instead of creating a new one.
- If no open issue exists for the component, create a new one.

### Issue Format

For each component with mismatches, create **one issue**:

**Title**: `[Design Mismatch] {ComponentName}: Figma design inconsistencies`

**Labels**: `design-mismatch`

**Assignees**: `copilot`

**Body**:

```
## Design Mismatch: {ComponentName}

**File**: `{file_path}`
**Figma Node**: {figma_node_name}

### Differences Found

| Property | Figma Value | Implementation Value | Status |
|----------|-------------|---------------------|--------|
| {property} | {figma_value} | {impl_value} | ❌ Mismatch |

### Suggested Fixes

{For each mismatch, provide a specific code change — include the exact Tailwind class or CSS value to change.}

### References

- [Figma Design](https://www.figma.com/design/iA45JgkQJMaAm1nUWdf36z/GitHub---Figma-Mixer?node-id=10-4167)
```

### Rules

1. **Do NOT create an issue** if a component has zero mismatches.
2. Create at most **one issue per component** (maximum 7 issues total).
3. Be specific in fix suggestions — include the exact Tailwind class or CSS value to use.
4. If no mismatches are found for any component, output a summary confirming the implementation matches the design.
