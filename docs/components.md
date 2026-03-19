# Components

## `Home` — Main Landing Page

**File**: `src/app/page.tsx`

The default export. Renders the full event landing page as a single scroll-able document.

**Sections (top to bottom)**:

| Section | HTML Element | Anchor ID |
|---------|-------------|-----------|
| Navigation bar | `<nav>` | — |
| Hero image | `<section>` | — |
| Date / venue banner | `<div>` inside hero | — |
| Event description | `<div>` inside hero | — |
| Agenda | `<section>` | `#agenda` |
| Speakers | `<section>` | `#speakers` |
| FAQ | `<section>` | `#faq` |
| Location / map | `<section>` | `#location` |
| Footer | `<footer>` | — |
| Chatbot | `<ChatBot />` | — |

**Static data arrays** (defined at module level):

- `agendaItems` — 7 schedule entries for 2026-03-19, each with `date`, `time`, `title`, and optional `speaker` image URL
- `faqItems` — 3 FAQ entries with `question` and `answer` (Japanese text)
- `speakers` — 2 speaker objects: `name`, `role`, `company`, `image`

**Asset URLs** — All images are fetched from `https://www.figma.com/api/mcp/asset/` and rendered with `next/image` using `unoptimized` prop.

**Props**: None (no props — this is a page component).

---

## `ChatBot` — AI Event Assistant Widget

**File**: `src/app/components/ChatBot.tsx`

Client component (`"use client"`) that renders a fixed floating chat button and expandable chat window powered by GitHub Copilot.

**Props**: None.

**State**:

| State | Type | Description |
|-------|------|-------------|
| `isOpen` | `boolean` | Controls chat window visibility |
| `messages` | `Message[]` | Conversation history |
| `input` | `string` | Current text input value |
| `isLoading` | `boolean` | True while awaiting streaming response |
| `sessionId` | `string \| null` | Session identifier returned by the API |

**`Message` interface**:

```ts
interface Message {
  role: "assistant" | "user";
  content: string;
}
```

**Quick actions** (pre-defined prompts shown on first open):
- `"イベントの日程を教えてください"` — Ask about event schedule
- `"登録方法について"` — Ask about registration
- `"参加費用はいくらですか？"` — Ask about participation cost

**API communication**:
- Sends `POST /api/chat` with `{ message, sessionId }` body
- Response body is read as a streaming SSE (Server-Sent Events) stream
- Supported event types from stream:
  - `session` — carries a `sessionId` string
  - `delta` — carries incremental `content` to append to the assistant message
  - `error` — triggers an error message in Japanese

**Behaviours**:
- Chat window auto-scrolls to the latest message
- Input field auto-focuses when the window opens
- Floating button toggles between green (closed) and light-grey (open) states
- Displays `TypingIndicator` (three bouncing dots) while `isLoading` is true

**Sub-components** (all internal, not exported):

| Component | Purpose |
|-----------|---------|
| `CopilotIcon` | GitHub Copilot SVG icon; accepts `size?: number` prop |
| `CloseIcon` | × close SVG icon |
| `SendIcon` | Paper-plane send SVG icon |
| `ChatIcon` | Sparkle/star SVG icon for the FAB |
| `TypingIndicator` | Animated three-dot typing indicator |

**Tailwind patterns**:
- Fixed positioning: `fixed bottom-6 right-6 z-[100]`
- Chat window: `w-[328px]`, `h-[400px]` scrollable message area
- User messages: green bubble `bg-[#1f883d] text-white`
- Assistant messages: bordered white bubble `border border-[#d1d9e0] bg-white`

---

## `RootLayout` — Root HTML Shell

**File**: `src/app/layout.tsx`

Next.js App Router root layout. Wraps all pages in the HTML document shell.

**Props**:

| Prop | Type | Description |
|------|------|-------------|
| `children` | `React.ReactNode` | Page content |

**Metadata** (exported `metadata` constant):

| Field | Value |
|-------|-------|
| `title` | `"GitHub + Figma Mixer — Spring Merge: Where Code Meets Design"` |
| `description` | Japanese event description |

**Font**: Geist Sans loaded via `next/font/google` with CSS variable `--font-geist-sans`.

**Note**: `ChatBot` is also rendered inside `RootLayout` body in addition to `page.tsx`. This means `ChatBot` is mounted once from the layout and once from the page — this is likely a duplication that should be resolved.

---

## `CalendarIcon` — Inline SVG Icon

**File**: `src/app/page.tsx` (internal, not exported)

A small 20×20 calendar SVG icon rendered in each agenda card.

**Props**: None.
