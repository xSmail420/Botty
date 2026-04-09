import dotenv from 'dotenv'
import path from 'node:path'
dotenv.config({ path: path.join(__dirname, '../.env') })

import express from 'express';
import cors from 'cors';
import { AgentService } from './services/agent';
import { RAGService } from './services/rag';
import { ProviderService } from './services/provider';
import { ProviderFactory } from './services/ai/factory';
import { ModelConfig } from '@botty/shared';
import { prisma } from './services/prisma';

import { AnalyticsService } from './services/analytics';
import { IngestionService } from './services/ingestion';
import { OrchestrationService } from './services/orchestration';

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', version: '0.1.0' });
});

// Analytics API
app.get('/api/analytics/status', async (req, res) => {
  try {
    const { tenantId } = req.query;
    const stats = await AnalyticsService.getStats(tenantId as string);
    res.json(stats);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/analytics/logs', async (req, res) => {
  try {
    const { tenantId, limit } = req.query;
    const logs = await AnalyticsService.listLogs(tenantId as string, limit ? parseInt(limit as string) : 50);
    res.json(logs);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Providers API
app.get('/api/providers', async (req, res) => {
  try {
    const { tenantId } = req.query;
    const providers = await ProviderService.listProviders(tenantId as string);
    res.json(providers);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/providers', async (req, res) => {
  try {
    const { tenantId, type, name, apiKey, baseUrl } = req.body;
    const provider = await ProviderService.upsertProvider({
      tenantId, type, name, apiKey, baseUrl
    });
    res.json(provider);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Agents API
app.get('/api/agents', async (req, res) => {
  try {
    const { tenantId } = req.query;
    const agents = await AgentService.listAgents(tenantId as string);
    res.json(agents);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/agents/:id', async (req, res) => {
  try {
    const agent = await AgentService.getAgent(req.params.id);
    if (!agent) return res.status(404).json({ error: 'Agent not found' });
    res.json(agent);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/agents', async (req, res) => {
  try {
    const { tenantId, name, persona, model } = req.body;
    const agent = await AgentService.createAgent({ tenantId, name, persona, model });
    res.json(agent);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/agents/:id', async (req, res) => {
  try {
    const { name, persona, model, traits, widgetConfig, ragConfig } = req.body;
    const agent = await prisma.agent.update({
      where: { id: req.params.id },
      data: { name, persona, model, traits, widgetConfig, ragConfig }
    });
    res.json(agent);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Knowledge API
app.get('/api/rag/documents', async (req, res) => {
  try {
    const { agentId } = req.query;
    if (!agentId) return res.status(400).json({ error: 'agentId is required' });
    const agent = await AgentService.getAgent(agentId as string);
    const documents = agent?.knowledgeBases.flatMap((kb: any) => kb.documents) || [];
    res.json(documents);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/rag/ingest', async (req, res) => {
  try {
    const { agentId, title, content, sourceUrl, type } = req.body;
    const result = await IngestionService.ingest(agentId, { title, content, sourceUrl, type });
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, agentId, sessionId } = req.body;
    const result = await OrchestrationService.chat(agentId, messages, sessionId || 'default-session');
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
