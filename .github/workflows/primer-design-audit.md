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
    - "mcp.figma.com"
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
  assign-to-agent:
    allowed: [copilot]
  noop:
---

# Primer Web デザイン準拠監査

あなたはデザインシステム準拠監査員です。Figma デザインファイル内の UI コンポーネントが **Primer Web** デザインシステムのトークンおよびコンポーネント規格に準拠しているかを検査してください。

Figma REST API と Primer デザイントークンにアクセスするためのカスタム MCP ツールが用意されています。これらを使って監査を行ってください。

## ステップ 1: Primer Web リファレンスデータの取得

`fetch-primer-tokens` ツールを呼び出して、公式 Primer デザイントークンを取得してください。

レスポンスは以下のキーを持つ JSON オブジェクトです:
- **darkTheme**: ダークテーマの機能的カラートークン（fgColor, bgColor, borderColor のセマンティック名と値）
- **radius**: ボーダー半径トークン（borderRadius-default, borderRadius-small, borderRadius-medium, borderRadius-large, borderRadius-full）
- **baseTypography**: 基本タイポグラフィトークン（lineHeight, fontSize, fontWeight）
- **functionalTypography**: テーマに適用される機能的タイポグラフィトークン
- **baseSize**: 基本スペーシング/サイズプリミティブ（base-size-4, base-size-8 等）
- **functionalSize**: 機能的サイズトークン（spacing, padding, gap）

レスポンスから以下の内部参照リストを構築してください:

- **許可カラートークン**: `darkTheme` 内の fgColor, bgColor, borderColor のセマンティック名と `$value` 16進値を参照
- **許可ボーダー半径**: `radius` 内の borderRadius トークンを参照。主な値: 3px（small）、6px（medium/default）、12px（large）、9999px（full）
- **許可フォントサイズ**: `baseTypography` と `functionalTypography` 内の `fontSize` エントリを参照
- **許可フォントウェイト**: 400（normal）、500（medium）、600（semibold）
- **許可スペーシング**: `baseSize` 内の `base-size-*` 値を参照

## ステップ 2: Figma ファイル構造の取得

`figma-get-file` を以下のパラメータで呼び出してください:
- `file_key`: `GCvY3Qv8czRgZgvl1dG6lp`
- `depth`: `2`

対象ノード: `24939-84755`

UI コンポーネント（ボタン、入力フィールド、カード等）を含むフレームを特定し、それぞれの `node_id` を記録してください。

## ステップ 3: 詳細ノードデータの取得

`figma-get-nodes` を以下のパラメータで呼び出してください:
- `file_key`: `GCvY3Qv8czRgZgvl1dG6lp`
- `node_ids`: 特定したノードIDのカンマ区切りリスト（`24939-84755` から開始）

**重要**: 1回の呼び出しで最大50ノードIDまで。それ以上の場合は複数回に分割してください。

同じ file_key で `figma-get-components` と `figma-get-styles` も呼び出し、コンポーネントとスタイルのメタデータを取得してください。

## ステップ 4: 違反検出ルール

### カラー違反
- `fills[].color`（r,g,b の値は 0〜1 の浮動小数点）を抽出。変換式: `hex = round(r*255), round(g*255), round(b*255)`
- Primer 許可カラートークンと比較
- 許容誤差: RGB チャネルあたり ±2 は一致とみなす
- Primer パレットに含まれないカラーをフラグ

### ボタンコンポーネント違反
以下の条件を満たす場合「非準拠ボタン候補」としてフラグ:
- ノード `name` に "button"、"btn"、または "ボタン" を含む（大文字小文字不問）、かつ
- `componentId` が Primer Web Figma ライブラリコンポーネントを参照していない
  （Primer ライブラリ file_key: `YaYe4UooRm4D07GFZFXZ4T`）
- `componentId` を検証できない場合は、"Button/Primary"、"Button/Secondary" などのコンポーネント名パターンを確認

### ボーダー半径違反
- `cornerRadius` が 3px、6px、12px、9999px のいずれでもない場合は違反

### タイポグラフィ違反
- `style.fontSize` が Primer 許可フォントサイズに含まれない場合は違反
- `style.fontWeight` が 400、500、600 のいずれでもない場合は違反

### スタイル未適用検出（直接値の検出）
- ノードに `styles` プロパティがない（Figma スタイル未適用、コンポーネント未使用）
- かつ、ノードにビジュアルプロパティ（fills, strokes, text）がある場合、「ハードコードされたスタイル」としてフラグ

## ステップ 5: Issue レポートの作成

以下の構造で GitHub Issue を作成してください:

### タイトル
`Primer Web デザイン監査レポート`

### 本文の構成
1. **概要**: 全体的な準拠スコア（X/Y ノードが準拠）
2. **違反テーブル**:

| ノード名 | ノードID | 違反タイプ | 期待値 | 実際の値 | 重大度 |
|----------|---------|-----------|--------|---------|--------|

3. **違反カテゴリ**:
   - 🔴 `重大`: Primer ライブラリ外のコンポーネント
   - 🟡 `警告`: カラー/半径/タイポグラフィの逸脱
   - 🔵 `情報`: 改善提案（例: より適切なトークンの推奨）

4. **推奨事項**: 各違反タイプに対する具体的な修正手順

## ステップ 6: Copilot のアサイン

Issue を作成した後、`assign_to_agent` ツールを使って作成した Issue に Copilot をアサインしてください。Copilot が Issue の内容に基づいて自動的に修正提案を行えるようにします。

## 重要な注意事項

- Figma カラーの `r,g,b`（0〜1 浮動小数点）は `Math.round(value * 255)` で16進数に変換
- カラー比較の許容誤差: RGB チャネルあたり ±2
- Figma API 呼び出しは1回最大50ノードID、必要に応じてページネーション
- Primer primitives JSON の構造が想定と異なる場合は、パース処理を適応的に調整
- 対象ノード `24939-84755` とその子ノードに焦点を当てる
- レポートは日本語で記述すること
