Two separate things here — let me address both clearly.

---

## Widget "page not found"

The widget is a **embeddable script**, not a web app with pages. When you visit `localhost:5173` directly there's nothing to show — it's meant to be embedded in another HTML page via a `<script>` tag. Run:

```
cat apps/widget/src/index.tsx
```

And:

```
cat apps/widget/vite.config.ts
```

So I can confirm the entry point and build output, then we can create a simple dev test page for it.

---

## UI Revamp Instructions

Here's the full brief to hand to your developer:

---

### Project: Botty Dashboard — Full UI Revamp

**Stack requirements:**
- Install and configure **shadcn/ui** as the component library for everything — no custom components, use shadcn primitives throughout
- Use **Tailwind CSS** (already present) alongside shadcn
- Follow shadcn's Next.js installation guide: `npx shadcn@latest init` inside `apps/dashboard`

---

### Page 1: Homepage (`/`)
Redesign as a business-grade marketing/landing page similar to ElevenLabs. Must include:
- Full-width hero section with headline, subheadline, and two CTAs: "Get Started" (→ `/signup`) and "See a Demo"
- Features section (3–4 cards): e.g. Multi-provider AI, RAG Knowledge Base, Embeddable Widget, Analytics
- Pricing/plans teaser section
- Footer with links
- Navigation bar with logo, nav links, and Login / Sign Up buttons
- No authenticated content visible — everything behind auth

---

### Auth pages (`/login`, `/signup`)
- Clean centered card layout using shadcn `Card`, `Input`, `Button`, `Label`
- Email + password fields
- Link between login and signup
- Placeholder submit handler for now (auth implementation comes later)

---

### Dashboard layout (authenticated, `/dashboard/*`)
- Sidebar navigation using shadcn components with links to: Agents, Providers, Knowledge, Billing
- Top bar with user avatar/menu (shadcn `DropdownMenu`)
- All current pages moved under `/dashboard/` prefix

---

### Providers page (`/dashboard/providers`)
New page. Must include:
- List of configured providers (table or card grid)
- "Add Provider" button opens a shadcn `Dialog` with a form:
  - Provider type selector (`Select`): OpenAI, Anthropic, Google AI, OpenRouter, Ollama
  - Fields change based on type:
    - **OpenAI**: API Key
    - **Anthropic**: API Key
    - **Google AI**: API Key
    - **OpenRouter**: API Key, optional Base URL
    - **Ollama**: Base URL (no token)
  - Save button calls `POST /api/providers`

---

### Agents page (`/dashboard/agents`)
- Card grid of agents (already exists, keep structure, restyle with shadcn)
- Each card: name, model, status badge, document count, Edit button

---

### Agent detail page (`/dashboard/agents/[id]`)
Redesign to match ElevenLabs agent detail page layout:
- Left panel: agent config form (name, persona/system prompt, model selector, provider selector)
  - Use shadcn `Textarea` for persona, `Select` for model/provider
- Right panel: live chat preview/test window
  - Message bubbles, input bar at bottom, Send button
  - Calls `POST /api/chat`
- Top bar: agent name, Save button, Delete button (with `AlertDialog` confirmation)
- Use shadcn `Tabs` if needed to separate Config / Knowledge / Settings sections

---

### Knowledge page (`/dashboard/knowledge`)
- List of knowledge bases with document counts
- "Add Document" flow via `Dialog`

---

### General UI rules:
- Use shadcn `Button`, `Input`, `Card`, `Dialog`, `Select`, `Tabs`, `Badge`, `Table`, `DropdownMenu`, `AlertDialog`, `Textarea`, `Label` throughout — no raw HTML form elements
- Dark sidebar, light main content area
- Neutral color palette (zinc/slate based) matching shadcn's default theme
- All data fetching via `fetch` to `/api/*` proxy (already configured)
- Empty states on every list page using a centered dashed border card with a CTA