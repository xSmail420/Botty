import { prisma } from './prisma';

export interface AnalyticsStats {
  totalCallVolume: number;
  medianLatency: number;
  successRate: number;
  tokenVelocity: number;
}

export class AnalyticsService {
  static async getStats(tenantId: string): Promise<AnalyticsStats> {
    const messages = await prisma.message.findMany({
      where: {
        agent: { tenantId }
      },
      orderBy: { createdAt: 'desc' },
      take: 1000 // Last 1000 messages for stats
    });

    const totalCallVolume = messages.length;
    
    const latencies = messages
      .map((m: any) => (m.metadata as any)?.latency)
      .filter((l: any) => typeof l === 'number') as number[];
    
    const medianLatency = latencies.length > 0 
      ? latencies.sort((a: number, b: number) => a - b)[Math.floor(latencies.length / 2)] 
      : 0;

    const successRate = 99.4; // Mock for now, would depend on error flags in metadata
    const tokenVelocity = 1.2; // Mock for now

    return {
      totalCallVolume,
      medianLatency,
      successRate,
      tokenVelocity
    };
  }

  static async listLogs(tenantId: string, limit = 50) {
    return prisma.message.findMany({
      where: {
        agent: { tenantId }
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: {
        agent: {
          select: { name: true, model: true }
        }
      }
    });
  }

  static async getLogDetail(id: string) {
    return prisma.message.findUnique({
      where: { id },
      include: {
        agent: true
      }
    });
  }
}
