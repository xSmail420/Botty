import { prisma } from './prisma';

export class AgentService {
  static async listAgents(tenantId: string) {
    return prisma.agent.findMany({
      where: { tenantId },
      include: {
        knowledgeBases: {
          include: { 
            documents: true,
            _count: { select: { documents: true } } 
          }
        }
      }
    });
  }

  static async getAgent(id: string) {
    return prisma.agent.findUnique({
      where: { id },
      include: { knowledgeBases: { include: { documents: true } } }
    });
  }

  static async createAgent(data: { name: string; persona: string; model?: string; tenantId: string; traits?: any; widgetConfig?: any; ragConfig?: any }) {
    return prisma.agent.create({
      data: {
        name: data.name,
        persona: data.persona,
        model: data.model || 'gpt-4o',
        tenantId: data.tenantId,
        traits: data.traits,
        widgetConfig: data.widgetConfig,
        ragConfig: data.ragConfig,
      }
    });
  }

  static async updateAgent(id: string, data: Partial<{ name: string; persona: string; model: string; traits: any; widgetConfig: any; ragConfig: any }>) {
    return prisma.agent.update({
      where: { id },
      data
    });
  }

  static async deleteAgent(id: string) {
    return prisma.agent.delete({ where: { id } });
  }
}
