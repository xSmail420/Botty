# Botty AI Platform Documentation

Welcome to the official documentation for **Botty AI**, a premium multi-tenant AI chatbot SaaS platform. This suite of documents provides a comprehensive guide to understanding, building, and extending every layer of the platform.

## Documentation Map

- [**Architecture Overview**](./architecture.md): Deep dive into the mono-repo structure, Turborepo orchestration, and shared packages.
- [**Backend & AI Orchestration**](./backend.md): Details on the Express server, Prisma schema, RAG pipeline, and the multi-provider AI Adapter system.
- [**Dashboard (Admin Portal)**](./dashboard.md): Information on the Next.js 15 frontend, shadcn/ui integration, and the Agentic Control Plane.
- [**AI Chat Widget**](./widget.md): Implementation details of the Shadow DOM isolated widget and the custom element integration script.
- [**Setup & Deployment**](./setup.md): Step-by-step instructions for local development and production environment configuration.

## Project Vision

Botty AI is designed as a **Model-Agnostic AI Orchestration Layer**. Unlike simple chatbot builders that lock you into a single provider, Botty allows tenants to bring their own API keys for OpenAI, Anthropic, Google Gemini, and even local Ollama models, all managed from a centralized, premium dashboard.

### Key Features
- **Shadow DOM Isolation**: The widget remains completely invisible to host-page CSS conflicts.
- **RAG by Default**: Built-in Knowledge Base support with SHA-256 deduplication and vector-ready grounding.
- **MCP Native**: Prepared for Model Context Protocol (MCP) to allow agents to execute real-world tools.
- **Premium Aesthetics**: Built with shadcn/ui and Tailwind CSS v4 for a high-end SaaS feel.
