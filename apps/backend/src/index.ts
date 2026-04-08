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

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', version: '0.1.0' });
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

app.delete('/api/providers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await ProviderService.deleteProvider(id);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Existing Routes
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
    const { name, persona, model } = req.body;
    const agent = await AgentService.updateAgent(req.params.id, { name, persona, model });
    res.json(agent);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/agents/:id', async (req, res) => {
  try {
    await AgentService.deleteAgent(req.params.id);
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/rag/documents', async (req, res) => {
  try {
    const { tenantId, agentId } = req.query;
    // If agentId is provided, list for that agent. Else list for all agents of the tenant.
    let documents;
    if (agentId) {
      const agent = await AgentService.getAgent(agentId as string);
      documents = agent?.knowledgeBases.flatMap(kb => kb.documents) || [];
    } else if (tenantId) {
      const agents = await AgentService.listAgents(tenantId as string);
      documents = agents.flatMap(agent => 
        agent.knowledgeBases.flatMap(kb => kb.documents)
      );
    } else {
      return res.status(400).json({ error: 'tenantId or agentId is required' });
    }
    res.json(documents);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/rag/ingest', async (req, res) => {
  try {
    const { agentId, title, content, sourceUrl } = req.body;
    const agent = await AgentService.getAgent(agentId);
    if (!agent) return res.status(404).json({ error: 'Agent not found' });

    // Ensure agent has at least one KB
    let kb = agent.knowledgeBases[0];
    if (!kb) {
      kb = await prisma.knowledgeBase.create({
        data: { name: 'Default Knowledge Base', agentId },
        include: { documents: true }
      }) as any;
    }

    const doc = await RAGService.ingestDocument(kb.id, title, content, sourceUrl);
    res.json(doc || { message: 'Document already exists in this Knowledge Base' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, agentId } = req.body;
    const agent = await AgentService.getAgent(agentId);
    if (!agent) return res.status(404).json({ error: 'Agent not found' });

    // Extract provider from model string (e.g. "openai/gpt-4o")
    const [providerType, modelId] = agent.model.includes('/') 
      ? agent.model.split('/') 
      : ['openai', agent.model];

    // NEW: Fetch provider config from DB instead of process.env!
    const dbProvider = await ProviderService.getProvider(agent.tenantId, providerType);
    
    const config: ModelConfig = {
      provider: providerType as any,
      modelId: modelId || agent.model,
      apiKey: dbProvider?.apiKey || 
              process.env[`${providerType.toUpperCase()}_API_KEY`] || 
              process.env[`${providerType.toUpperCase()}_AUTH_TOKEN`] || '',
      baseUrl: dbProvider?.baseUrl || 
               process.env[`${providerType.toUpperCase()}_BASE_URL`],
    };

    const provider = ProviderFactory.getProvider(config.provider);
    const response = await provider.complete({
      messages,
      config,
      temperature: 0.7,
    });
    
    res.json({ message: { role: 'assistant', content: response.content } });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
