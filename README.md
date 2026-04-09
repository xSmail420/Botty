# Project Plan: Agentic Chatbot SaaS (Mono-Repo)

## 1. Project Overview
This project aims to build a production-ready, multi-tenant SaaS platform that allows businesses to deploy high-performance AI conversational assistants. Inspired by the **ElevenLabs Conversational AI** interface, the platform will enable users to configure "agents" with specific personalities, deep knowledge bases, and the ability to execute complex actions through **Model Context Protocol (MCP)** and custom tools.

The final result will be a **mono-repo** containing a centralized management dashboard and a lightweight, dynamically adaptive web widget.

---

## 2. Technical Architecture (Mono-Repo Structure)
The project will utilize a mono-repo architecture (e.g., using **Turborepo** or **pnpm workspaces**) to share types and logic between the dashboard, backend, and widget.

*   **`/apps/dashboard`**: A Next.js application for client onboarding, subscription management (Stripe), and agent configuration.
*   **`/apps/widget`**: A specialized Vite-based project that bundles the chatbot into a single, high-performance JS file for `<script>` tag delivery.
*   **`/apps/backend`**: A Node.js/Express or FastAPI service handling AI orchestration, RAG (Retrieval-Augmented Generation), and MCP client connections.
*   **`/packages/shared`**: Shared TypeScript definitions, validation schemas, and utility functions.

---

## 3. Core Functionalities

### A. Admin Dashboard (The "Control Plane")
The dashboard is where subscribing businesses (tenants) manage their entire AI fleet.

*   **Client Onboarding & SaaS Management**:
    *   Multi-tenant authentication (Sign-up/Login).
    *   Subscription tiers (managed via Stripe) with usage limits (e.g., messages per month, number of agents).
    *   API Key Management for developers to interact with the platform programmatically.
*   **Agent Configuration (The "ElevenLabs Style" Editor)**:
    *   **Identity & Persona**: Set name, avatar, and system prompts to define personality and tone.
    *   **Model Selection**: Choose underlying LLMs (e.g., GPT-4o, Claude 3.5 Sonnet) and set parameters like temperature.
    *   **Knowledge Base (RAG)**: Upload documents (PDF, TXT, CSV) or provide URLs for automated crawling to ground the AI in specific business data.
    *   **Tools & MCP Integration**:
        *   **Server Tools**: Interface for defining REST API endpoints the AI can call.
        *   **Client Tools**: Configuration for actions that should trigger on the user's browser (e.g., `openModal`, `redirect`).
        *   **MCP Servers**: Add remote MCP server URLs (SSE/HTTP) to instantly gain 10,000+ capabilities without writing custom code.
*   **Analytics & Logs**:
    *   Real-time conversation transcripts.
    *   Usage metrics (token consumption, session counts).
    *   Feedback monitoring (User thumbs up/down).[1]

### B. Embeddable Widget (The "Runtime")
A lightweight, adaptive UI that spawns on the client's website.

*   **Embedding Mechanism**:
    *   Spawnable via a simple HTML snippet:
        ```html
        <my-ai-agent agent-id="AGENT_ID"></my-ai-agent>
        <script src="https://cdn.your-saas.com/widget.js" async></script>
        ```
    *   Support for authenticated sessions via a library installable via `npm` and an API key.
*   **Dynamic Adaptation**:
    *   The widget fetches configuration (colors, greeting, persona, icon, theme, configs) dynamically based on the `agent-id`.
    *   **Shadow DOM Isolation**: The widget will render inside a Shadow DOM to ensure host website CSS does not break the chatbot UI.[2, 3]
*   **Interaction Modes**:
    *   **Chat Mode**: Standard text-based interaction.
    *   **Proactive Engagement**: Ability to auto-open on specific pages or after a time delay.[4]

---

## 4. AI & MCP Integration Requirements

*   **MCP Client Implementation**: The backend must act as an **MCP Client**, capable of connecting to remote **MCP Servers** via Server-Sent Events (SSE) or HTTP transports.
*   **Tool Calling Logic**: The assistant must be able to reason about available tools (both custom and MCP) and execute them based on user intent.
*   **Identity Propagation**: For enterprise security, the platform should support passing the end-user's identity (e.g., a JWT) through to the MCP tool calls so the server can enforce user-level permissions.[5]

---

## 5. Security & Multi-Tenancy Requirements

*   **Data Isolation**: Ensure that Knowledge Base embeddings and conversation logs are strictly isolated by `tenant_id` in the database (PostgreSQL + Vector Extension).
*   **Domain Whitelisting**: Allow clients to restrict their widget to specific authorized domains to prevent unauthorized embedding.[1, 6]
*   **Prompt Guards**: Implement real-time monitoring to prevent prompt injection or exfiltration of the system's "personality" and internal data.[7]

---

## 6. Implementation Roadmap

### Phase 1: Foundation (Weeks 1-3)
*   Setup mono-repo infrastructure and shared packages.
*   Deploy basic Next.js Dashboard with authentication and Stripe integration.
*   Implement the core Database schema for Tenants and Agents.

### Phase 2: AI Core & RAG (Weeks 4-6)
*   Develop the Backend AI orchestration layer.
*   Implement the RAG pipeline (document ingestion -> embedding -> retrieval).
*   Integrate the **MCP Client** to support remote tool connections.[8]

### Phase 3: Widget Development (Weeks 7-9)
*   Build the adaptive widget UI with React/Vite.
*   Implement the `<script>` tag loader and Shadow DOM isolation.
*   Enable real-time streaming responses via Server-Sent Events (SSE).

### Phase 4: Scaling & Polish (Weeks 10-12)
*   Add advanced analytics and transcript monitoring to the dashboard.
*   Implement "Client Tools" (allowing the AI to control the host website's DOM).
*   Conduct security audits and performance optimization for the widget bundle.

---

## 7. Success Criteria (Final Result)
1.  **Zero-Code Deployment**: A client can sign up, upload a PDF, and have a working assistant on their site in under 5 minutes.
2.  **Modular Agency**: The assistant can successfully call an external MCP tool (e.g., "Check My Order Status") and return real-time data to the user.
3.  **High-Fidelity UI**: The widget looks and feels like a native part of the host site, with performance comparable to ElevenLabs' components.