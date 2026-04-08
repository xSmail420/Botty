import { prisma } from './prisma';

export class ProviderService {
  /**
   * List all configured providers for a tenant.
   */
  static async listProviders(tenantId: string) {
    return prisma.aIProvider.findMany({
      where: { tenantId },
      orderBy: { name: 'asc' },
    });
  }

  /**
   * Upsert a provider configuration.
   */
  static async upsertProvider(data: {
    tenantId: string;
    type: string;
    name: string;
    apiKey?: string;
    baseUrl?: string;
  }) {
    return prisma.aIProvider.upsert({
      where: {
        tenantId_type: {
          tenantId: data.tenantId,
          type: data.type,
        },
      },
      update: {
        name: data.name,
        apiKey: data.apiKey,
        baseUrl: data.baseUrl,
      },
      create: {
        tenantId: data.tenantId,
        type: data.type,
        name: data.name,
        apiKey: data.apiKey,
        baseUrl: data.baseUrl,
      },
    });
  }

  /**
   * Get a specific provider config by type for a tenant.
   */
  static async getProvider(tenantId: string, type: string) {
    return prisma.aIProvider.findUnique({
      where: {
        tenantId_type: {
          tenantId,
          type,
        },
      },
    });
  }
  /**
   * Delete a provider configuration.
   */
  static async deleteProvider(id: string) {
    return prisma.aIProvider.delete({
      where: { id },
    });
  }
}
