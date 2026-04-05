# System Architecture

Botty AI is built using a **Mono-repo Architecture** powered by `pnpm` workspaces and `Turborepo`. This ensures maximum code reuse, type safety across the stack, and high-performance builds.

## Directory Structure

```text
/
├── apps/
│   ├── backend/          # Express + Prisma (AI Orchestration)
│   ├── dashboard/        # Next.js 15 (Admin Portal)
│   └── widget/           # Vite + React (Embeddable Widget)
├── packages/
│   ├── shared/           # Zod schemas, shared types, and constants
│   └── ui/               # Shared React components (not used by shadcn)
├── docs/                 # Project documentation
└── .gemini/              # AI-specific configuration and logs
```

## Core Technologies

### Orchestration: Turborepo
We use Turborepo to manage parallel tasks (build, dev, lint). It uses a remote-cache-ready system to ensure that tasks that haven't changed are never re-run.
- **Command**: `npx turbo dev` starts all services.
- **Configuration**: `turbo.json` defines task dependencies.

### Type Safety: TypeScript 6.0
The entire codebase is strictly typed. We use `moduleResolution: "bundler"` for modern ESM support and centralized `tsconfig` files in the root to enforce standards.

### Data Modeling: Prisma
Prisma serves as our ORM, providing a type-safe interface to the PostgreSQL database.
- **Schema**: Located in `apps/backend/prisma/schema.prisma`.
- **Multi-Tenancy**: Enforced at the database level via `tenantId` relations.

### Styling: Tailwind CSS v4
The project utilizes the latest version of Tailwind CSS for styling, providing high performance and a modern developer experience.

## Communication Flow

1. **Dashboard ↔ Backend**: Next.js uses standard `fetch` calls to the Express API (proxied via `next.config.js`).
2. **Widget ↔ Backend**: The embeddable widget communicates directly with the Backend AI endpoints using the same shared types.
3. **Backend ↔ LLMs**: The Backend uses its AI Adapter system to translate unified requests into provider-specific payloads (OpenAI, Anthropic, etc.).
