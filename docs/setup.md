# Setup & Deployment

This guide provides the necessary steps to recreate the Botty AI Platform from scratch or setup a local development environment.

## Prerequisites
- **Node.js**: v20 or higher.
- **pnpm**: v9 or higher (required for workspaces).
- **PostgreSQL**: Local instance or Docker container.
- **Docker**: Optional, for running PostgreSQL.

## 1. Local Installation

```bash
# Clone the repository
git clone https://github.com/your-org/botty-ai.git
cd botty-ai

# Install dependencies
pnpm install

# Setup environment variables
cp apps/backend/.env.example apps/backend/.env
cp apps/dashboard/.env.example apps/dashboard/.env
```

## 2. Database Setup

Ensure your `DATABASE_URL` is correctly set in `apps/backend/.env`.

```bash
# Run migrations to setup the schema
pnpm --filter @botty/backend exec prisma migrate dev --name init

# (Optional) Seed initial data
pnpm --filter @botty/backend exec tsx prisma/seed.ts
```

## 3. Environment Variables Reference

### Backend (`apps/backend/.env`)
- `DATABASE_URL`: PostgreSQL connection string.
- `PORT`: (Default: `3001`).
- `OPENAI_API_KEY`: API key for OpenAI models.
- `ANTHROPIC_API_KEY`: API key for Anthropic models.
- `GOOGLE_API_KEY`: API key for Gemini models.
- `OPENROUTER_API_KEY`: API key for OpenRouter.

### Dashboard (`apps/dashboard/.env`)
- `NEXT_PUBLIC_API_URL`: (Default: `http://localhost:3001`).

## 4. Running the Platform

We use Turborepo to orchestrate the entire stack with a single command:

```bash
# Start all services (Backend, Dashboard, Widget) in development mode
pnpm dev
# OR using turbo directly
npx turbo dev
```

### Accessing the services:
- **Dashboard**: `http://localhost:3000`
- **Backend API**: `http://localhost:3001`
- **Widget Dev Test**: `http://localhost:5173`

## 5. Building for Production

```bash
# Build all packages and apps
npx turbo build
```

The resulting artifacts will be in the `dist` or `.next` folders of each respective app.
