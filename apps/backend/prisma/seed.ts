import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import dotenv from 'dotenv'
import path from 'node:path'

dotenv.config({ path: path.join(__dirname, '../.env') })

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  const tenant = await prisma.tenant.upsert({
    where: { domain: 'botty.ai' },
    update: {},
    create: {
      id: 'default-tenant',
      name: 'Botty AI Corp',
      domain: 'botty.ai',
    },
  });

  const agent = await prisma.agent.upsert({
    where: { id: 'default-agent' },
    update: {},
    create: {
      id: 'default-agent',
      name: 'Welcome Bot',
      persona: 'You are a friendly AI assistant.',
      tenantId: tenant.id,
      model: 'gpt-4o',
    },
  });

  console.log({ tenant, agent });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });