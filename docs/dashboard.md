# Dashboard (Admin Portal)

The Dashboard is a high-fidelity **Next.js 15** application designed for administrators to orchestrate their AI fleet.

## UI Framework: shadcn/ui
The entire UI is built using **shadcn/ui** primitives. We avoid custom CSS wherever possible to maintain consistency and leverage the Radix UI accessibility features.
- **Theme**: Neutral palette (Slate/Zinc) with a dark sidebar and light main content area.
- **Icons**: Lucide React.

## Route Structure

### Public Routes
- `/`: Premium ElevenLabs-style landing page with hero, features, and pricing.
- `/login` / `/signup`: Centered card layouts for authentication.

### Authenticated Routes (`/dashboard/*`)
- `/dashboard/agents`: Grid of configured AI assistants.
- `/dashboard/agents/[id]`: High-fidelity, split-pane agent editor with live-chat preview.
- `/dashboard/providers`: Management of AI API keys and model endpoints.
- `/dashboard/knowledge`: Knowledge base and document management.
- `/dashboard/billing`: Subscription and usage tracking.

## Technical Details

### API Proxying
Next.js acts as a thin client. All data requests to `/api/*` are proxied to the Express backend. This is configured in `next.config.js` to avoid CORS issues in development.

### Component Architecture
- **Dashboard Layout**: Uses `SidebarProvider` and `TooltipProvider` to enable the responsive, collapsible navigation system.
- **Agent Editor**: Implements a real-time testing window that calls the backend `/api/chat` endpoint as you configure the agent's persona.

## UX Principles
- **Empty States**: Every listing page includes a centered dashed-border card with a clear Call-to-Action (CTA) if no data exists.
- **Responsive Design**: The sidebar collapses on mobile, and grids adjust automatically.
