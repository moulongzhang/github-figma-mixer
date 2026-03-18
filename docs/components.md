# Components

## `RootLayout` — `src/app/layout.tsx`

The root layout wraps every page and provides global configuration.

| Aspect | Detail |
|--------|--------|
| Font | **Geist** (Google Fonts), exposed as `--font-geist-sans` CSS variable |
| Language | `<html lang="ja">` |
| Body classes | `${geistSans.variable} antialiased` |
| Children | Renders `{children}` followed by `<ChatBot />` |

### Metadata

```ts
export const metadata: Metadata = {
  title: "GitHub + Figma Mixer — Spring Merge: Where Code Meets Design",
  description: "コードとデザインが交わる春の夜、GitHubとFigmaが開催するネットワーキングイベントです。",
};
```

---

## `Home` — `src/app/page.tsx`

The default-exported `Home` component renders the full event landing page. It is a **server component** (no `"use client"` directive).

### Event Data Constants

The following constants are defined at module scope:

| Constant | Type | Description |
|----------|------|-------------|
| `heroImage` | `string` | Figma MCP asset URL for the hero banner |
| `speakerTani` | `string` | Figma MCP asset URL for 谷 拓樹's photo |
| `speakerWilliam` | `string` | Figma MCP asset URL for William Zhang's photo |
| `mapImage` | `string` | Figma MCP asset URL for the venue map |
| `githubIcon` | `string` | Figma MCP asset URL for the GitHub icon (footer) |
| `xIcon` | `string` | Figma MCP asset URL for the X (Twitter) icon |
| `githubLogo` | `string` | Figma MCP asset URL for the GitHub logo (navbar) |
| `agendaItems` | `Array<{ date, time, title, speaker? }>` | Seven agenda entries for March 19 |
| `faqItems` | `Array<{ question, answer }>` | Three FAQ entries |
| `speakers` | `Array<{ name, role, company, image }>` | Two speaker profiles |

### Page Sections

The page renders six sections inside a `min-h-screen bg-white` container:

#### 1. Navigation

Sticky top navbar (`sticky top-0 z-50`) with the GitHub logo on the left and four anchor links on the right:

- アジェンダ → `#agenda`
- 登壇者 → `#speakers`
- FAQ → `#faq`
- 場所 → `#location`

#### 2. Hero Section

- Full-width hero image (600px height, `object-cover`)
- Black date & venue banner: **2026年3月19日木曜** / **SPRING VALLEY BREWERY TOKYO**
- Event description block on `bg-[#f3f4f6]` background with event title and two paragraphs of Japanese description text

#### 3. Agenda Section (`#agenda`)

Renders `agendaItems` as a vertical list of cards. Each card shows:
- Date and time in `text-[#57606a]`
- Title in `text-lg font-semibold`
- Optional speaker avatar (32×32 rounded-full)
- A `<CalendarIcon />` on the right side

#### 4. Speakers Section (`#speakers`)

A two-column responsive grid (`grid-cols-1 sm:grid-cols-2`) on a `bg-[#f9fafb]` background. Each speaker card displays:
- 128×128 circular avatar
- Name, role, and company

#### 5. FAQ Section (`#faq`)

A three-column responsive grid (`grid-cols-1 sm:grid-cols-3`). Each FAQ item shows the question in bold and the answer in muted text.

#### 6. Location Section (`#location`)

Center-aligned venue name, address, and a map image (893×405).

#### Footer

GitHub icon, "GitHub" label, X (Twitter) social link (circular black button), and copyright notice.

### Key Tailwind Patterns

- Muted text color: `text-[#57606a]`
- Border color: `border-[#e5e7eb]`
- Max content width: `max-w-[925px]` or `max-w-[893px]`
- Section padding: `px-4 py-16`

---

## `CalendarIcon` — `src/app/page.tsx`

An inline SVG component rendering a 20×20 calendar icon with `#57606a` stroke. Used in each agenda item card.

**Props**: None.

---

## `ChatBot` — `src/app/components/ChatBot.tsx`

A **client component** (`"use client"`) that renders a floating chat widget powered by the Copilot SDK. It appears as a fixed button in the bottom-right corner of the viewport.

### Props

None — `ChatBot` is a self-contained component with no external props.

### State

| State Variable | Type | Default | Description |
|---------------|------|---------|-------------|
| `isOpen` | `boolean` | `false` | Whether the chat window is visible |
| `messages` | `Message[]` | `[]` | Conversation history |
| `input` | `string` | `""` | Current text input value |
| `isLoading` | `boolean` | `false` | Whether a response is being streamed |
| `sessionId` | `string \| null` | `null` | Chat session ID (set by the backend) |

### `Message` Interface

```ts
interface Message {
  role: "assistant" | "user";
  content: string;
}
```

### Streaming SSE Protocol

The `sendMessage` function posts to `/api/chat` with `{ message, sessionId }` and reads the response as a stream. The stream contains newline-delimited SSE events (`data: <json>`):

| Event Type | Fields | Behavior |
|-----------|--------|----------|
| `session` | `{ type: "session", sessionId: string }` | Stores the session ID for subsequent requests |
| `delta` | `{ type: "delta", content: string }` | Appends content to the assistant message (creates message on first delta, updates on subsequent deltas) |
| `error` | `{ type: "error" }` | Displays an error message in Japanese |

On network/fetch errors, a connection error message is shown.

### Quick Actions

Three predefined quick-action buttons are displayed in the welcome screen:

1. `"イベントの日程を教えてください"` — Ask about event schedule
2. `"登録方法について"` — Ask about registration
3. `"参加費用はいくらですか？"` — Ask about participation cost

Clicking a quick action calls `sendMessage` with the action text.

### Internal Sub-Components

| Component | Description |
|-----------|-------------|
| `CopilotIcon` | Copilot logo SVG. Accepts `size` prop (default: 14). |
| `CloseIcon` | 18×18 "X" close button SVG with `#25292e` stroke. |
| `SendIcon` | 14×14 paper-plane SVG with `#57606a` stroke. |
| `ChatIcon` | 18×18 sparkle/star SVG with white stroke (used in the FAB). |
| `TypingIndicator` | Three bouncing dots with staggered `animation-delay` and "入力中..." label. |

### Key Tailwind Patterns

- Fixed positioning: `fixed bottom-6 right-6 z-[100]`
- Chat window width: `w-[340px]`
- Messages area height: `h-[400px]`
- Shadow: `shadow-[0px_8px_30px_0px_rgba(0,0,0,0.12)]`
- Primary green: `bg-[#1f883d]` (Copilot badge, user messages, FAB)
- Welcome icon background: `bg-[#818b98]`
- Border color: `border-[#d1d9e0]`
- Muted text: `text-[#59636e]`
- Dark text: `text-[#010409]`
