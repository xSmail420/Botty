import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! })
})

async function main() {
  console.log('🌱 Starting seeding...')

  // 1. Create Tenant
  const tenant = await prisma.tenant.upsert({
    where: { domain: 'demo.botty.ai' },
    update: {},
    create: {
      name: 'Demo Workspace',
      domain: 'demo.botty.ai',
    },
  })

  // 2. Create AI Provider
  await prisma.aIProvider.upsert({
    where: {
      tenantId_type: {
        tenantId: tenant.id,
        type: 'openai',
      },
    },
    update: {},
    create: {
      name: 'Default OpenAI',
      type: 'openai',
      apiKey: process.env.OPENAI_API_KEY || 'sk-placeholder',
      tenantId: tenant.id,
    },
  })

  // 3. Create Agent
  const agent = await prisma.agent.create({
    data: {
      name: 'Curator Assistant',
      persona: 'You are a high-performance editorial assistant. You help rewrite abstracts and technical documentation to be academic yet accessible.',
      model: 'gpt-4o',
      tenantId: tenant.id,
      traits: {
        conciseness: 0.8,
        density: 0.6,
        strictness: 0.9,
      },
      widgetConfig: {
        primaryColor: '#5300B7',
        accentColor: '#818CF8',
        title: 'How can I assist you?',
        ctaLabel: 'Start Conversation',
      },
      ragConfig: {
        chunkSize: 512,
        overlap: 10,
        hybridSearch: true,
        rerank: false,
      },
    },
  })

  // 4. Create Knowledge Base & Documents
  const kb = await prisma.knowledgeBase.create({
    data: {
      name: 'Product Docs',
      agentId: agent.id,
    },
  })

  await prisma.document.createMany({
    data: [
      {
        title: 'API_Reference_V3.pdf',
        sourceUrl: 'https://docs.example.com/api',
        hash: 'hash_1',
        knowledgeBaseId: kb.id,
      },
      {
        title: 'Architecture_Blueprints.pdf',
        sourceUrl: 'https://docs.example.com/arch',
        hash: 'hash_2',
        knowledgeBaseId: kb.id,
      },
    ],
  })

  // 5. Create Sample Messages for Analytics
  await prisma.message.createMany({
    data: [
      {
        role: 'user',
        content: 'Rewrite this abstract.',
        agentId: agent.id,
        sessionId: 'session_1',
        metadata: { latency: 120, tokens: 45, model: 'gpt-4o' },
      },
      {
        role: 'assistant',
        content: 'Sure, here is the revised version...',
        agentId: agent.id,
        sessionId: 'session_1',
        metadata: { latency: 1250, tokens: 180, model: 'gpt-4o' },
      },
    ],
  })

  console.log('✅ Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })