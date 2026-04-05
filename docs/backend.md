# Backend & AI Orchestration

The Botty AI Backend is the "Brain" of the platform, built with Express and Prisma. It handles model orchestration, data persistence, and knowledge retrieval.

## Core Services

### AI Orchestration (Adapter Pattern)
We use a **Provider Factory** and **BaseProvider** abstract class to support multiple AI providers without polluting the chat logic.
- **Provider Types**: OpenAI, Anthropic, Google Gemini, OpenRouter, Ollama.
- **Factory**: Resolves the correct adapter based on the requested model string (e.g., `openai/gpt-4o`).
- **Key Resolution**: The system first looks for an API key in the `AIProvider` database model for the current tenant. If missing, it falls back to environment variables.

### RAG Service (Knowledge Base)
The Retrieval-Augmented Generation (RAG) service grounds agents in tenant-specific data.
- **Deduplication**: Uses SHA-256 hashing to ensure the same document content isn't indexed twice.
- **Ingestion**: Currently supports URL and text-based ingestion with placeholders for Vector DB integration (Pinecone/Milvus).

### MCP Client
The backend includes a **Model Context Protocol (MCP)** client. This allows agents to:
- Discover tools available on remote MCP servers.
- Execute those tools via the backend proxy.

## API Architecture

### Key Endpoints
- `POST /api/chat`: The main AI interaction endpoint. It orchestrates context, persona, and model completion.
- `GET/POST /api/providers`: Manages AI provider configurations and credentials.
- `GET/POST /api/agents`: Handles agent lifecycle and configuration.
- `POST /api/rag/ingest`: Manages the knowledge base ingestion pipeline.

## Database & Persistence

We use **Prisma** with a PostgreSQL backend.
- **Tenant Isolation**: Every entity (`Agent`, `KnowledgeBase`, `AIProvider`) is linked to a `Tenant`.
- **Unique Constraints**: Providers are unique per tenant/type to prevent duplicate configurations.
