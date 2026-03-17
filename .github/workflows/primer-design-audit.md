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
  web-fetch:

mcp-servers:
  figma:
    url: "https://mcp.figma.com/mcp"
    headers:
      X-Figma-Token: "${{ secrets.FIGMA_ACCESS_TOKEN }}"
    allowed: ["*"]

network:
  allowed:
    - defaults
    - github
    - "mcp.figma.com"
    - "api.figma.com"
    - "*.figma.com"

safe-outputs:
  create-issue:
    title-prefix: "[design-audit] "
    labels: [design, primer-web, audit]
    close-older-issues: true
---

# Primer Web Design Compliance Audit

You are a design system compliance auditor. Your job is to check whether the UI components in this repository align with the **Primer Web** design system from Figma.

## Figma Source of Truth

The Primer Web component library is located at:
- **File**: `GCvY3Qv8czRgZgvl1dG6lp` (Primer Web)
- **Node**: `24939-84755`

Use the Figma MCP tools to read the component definitions, design tokens (colors, spacing, typography, border radius, shadows), and component variants from this node and its children.

## What to Check

1. **Component inventory**: List all UI components used in this repository's source code (check `components/`, `app/`, and any TSX/JSX files).
2. **Design token alignment**: Compare colors, spacing, font sizes, and other tokens used in the codebase (Tailwind config, CSS, inline styles) against Primer Web's design tokens from Figma.
3. **Component structure**: Check if custom components follow the same structure and variants as defined in the Primer Web Figma library.
4. **Deviations**: Identify any components or styles that do NOT match the Primer Web library.

## Output

Create a GitHub issue with:
- A summary of compliance status
- A table of components checked and their compliance status (✅ compliant / ⚠️ partial / ❌ non-compliant)
- Specific deviations with details (expected vs actual values)
- Recommendations for remediation
