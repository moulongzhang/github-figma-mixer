# Components

## `RootLayout`

**File**: `src/app/layout.tsx`

Root layout component wrapping every page. Sets the HTML document metadata, applies the Geist Sans font variable, and renders the `ChatBot` widget so it appears on all pages.

### Props

```ts
{ children: React.ReactNode }
```

### Metadata

```ts
title: "GitHub + Figma Mixer — Spring Merge: Where Code Meets Design"
description: "コードとデザインが交わる春の夜、GitHubとFigmaが開催するネットワーキングイベントです。"
```

### Key Behaviors

- Loads `Geist` font from Google Fonts, exposed as CSS variable `--font-geist-sans`.
- Sets `lang="ja"` on the `<html>` element.
- Applies `antialiased` Tailwind utility on `<body>`.
- Renders `<ChatBot />` at the body level so the floating widget is always present.

---

## `Home` (default export)

**File**: `src/app/page.tsx`

Main landing page for the "GitHub + Figma Mixer — Spring Merge" event. Composed of six sections rendered in a single page layout.

### Sections

| Section | Anchor | Description |
|---------|--------|-------------|
| Navigation | — | Sticky top nav with links to each section |
| Hero | — | Full-width banner image, event date/venue, and event description |
| Agenda | `#agenda` | Scrollable list of agenda items with date, time, and title |
| Speakers | `#speakers` | Grid of speaker cards with photo, name, role, and company |
| FAQ | `#faq` | Three-column grid of frequently asked questions |
| Location | `#location` | Venue name, address, and map image |
| Footer | — | GitHub logo, X (Twitter) link, and copyright notice |

### Event Data (hardcoded constants)

**Agenda items** (`agendaItems`):

| Time (JST) | Title |
|------------|-------|
| 18:30–21:00 | GitHub x Figma Mixer |
| 18:30–19:00 | 受付 / Check In |
| 19:00–19:05 | 開始のご挨拶 / Opening remarks |
| 19:30–19:40 | FigmaとGitHub Copilotでコードとデザインの意図をつなぐ |
| 19:50–20:00 | GitHub最新情報 |
| 20:10–20:25 | お楽しみイベント |
| 20:50–20:55 | クロージング / Closing |

**Speakers** (`speakers`):

| Name | Role | Company |
|------|------|---------|
| 谷 拓樹 | Designer Advocate | Figma Japan株式会社 |
| William Zhang | SE | GitHub |

### Image Sources

All images are Figma MCP assets loaded via `next/image` with `unoptimized`:

| Constant | Usage |
|----------|-------|
| `heroImage` | Full-width hero banner |
| `speakerTani` | Speaker 谷 拓樹 photo |
| `speakerWilliam` | Speaker William Zhang photo |
| `mapImage` | Venue map image |
| `githubIcon` | Footer GitHub icon |
| `xIcon` | Footer X (Twitter) icon |
| `githubLogo` | Navigation logo |

### Key Tailwind Patterns

- `sticky top-0 z-50` — sticky navigation bar
- `min-h-screen bg-white` — full-height white page
- `mx-auto max-w-[925px]` — constrained content width
- `grid grid-cols-1 gap-6 sm:grid-cols-2` — responsive speaker grid
- `grid grid-cols-1 gap-8 sm:grid-cols-3` — responsive FAQ grid

---

## `CalendarIcon`

**File**: `src/app/page.tsx` (internal)

Inline SVG icon rendered in each agenda item card. Not exported.

```tsx
function CalendarIcon() { ... }
```

Renders a 20×20 calendar SVG in `#57606a` (GitHub muted gray).

---

## `ChatBot` (default export)

**File**: `src/app/components/ChatBot.tsx`

`"use client"` component. Floating AI chatbot widget powered by the GitHub Copilot SDK. Appears as a fixed button in the bottom-right corner of the page.

### Props

None (no props interface).

### State

| State variable | Type | Description |
|---------------|------|-------------|
| `isOpen` | `boolean` | Whether the chat window is visible |
| `messages` | `Message[]` | Conversation history |
| `input` | `string` | Current text field value |
| `isLoading` | `boolean` | Whether a response is being streamed |
| `sessionId` | `string \| null` | Copilot session ID (assigned by server) |

### `Message` Interface

```ts
interface Message {
  role: "assistant" | "user";
  content: string;
}
```

### Key Behaviors

- **Floating action button**: Clicking opens/closes the chat window. Icon toggles between `ChatIcon` (closed) and `CloseIcon` (open).
- **Welcome screen**: When `messages` is empty, shows a welcome message and three quick-action buttons.
- **Quick actions** (`QUICK_ACTIONS`):
  - `"イベントの日程を教えてください"`
  - `"登録方法について"`
  - `"参加費用はいくらですか？"`
- **Streaming responses**: Calls `POST /api/chat` with `{ message, sessionId }`. Reads the response as a Server-Sent Events (SSE) stream, handling three event types:
  - `{ type: "session", sessionId }` — stores the session ID for follow-up messages
  - `{ type: "delta", content }` — appends text tokens to the last assistant message
  - `{ type: "error" }` — displays a Japanese error message
- **Auto-scroll**: The messages area scrolls to the bottom whenever `messages` or `isLoading` changes.
- **Auto-focus**: The text input is focused automatically when the chat window opens.

### Internal Sub-components

| Component | Description |
|-----------|-------------|
| `CopilotIcon` | GitHub Copilot icon SVG; accepts optional `size` prop (default `14`) |
| `CloseIcon` | ✕ close icon SVG (18×18) |
| `SendIcon` | Paper-plane send icon SVG (14×14) |
| `ChatIcon` | Sparkle/star chat icon SVG (18×18) |
| `TypingIndicator` | Three bouncing dots with staggered `animation-delay`, displayed while `isLoading` |

### Dependencies

- `@github/copilot-sdk` — backend session management (used via `/api/chat` endpoint)
- `/api/chat` — backend endpoint that must be separately deployed (not included in the static export)

### Key Tailwind Patterns

- `fixed bottom-6 right-6 z-[100]` — fixed bottom-right position
- `w-[340px]` — fixed chat window width
- `h-[400px] overflow-y-auto` — scrollable message area
- `animate-bounce [animation-delay:*ms]` — staggered typing indicator dots
- `shadow-[0px_8px_30px_0px_rgba(0,0,0,0.12)]` — custom drop shadow on chat window
