import crypto from 'crypto';
import { prisma } from './prisma';

export class RAGService {
  /**
   * Generates a stable hash for a document to prevent duplicates.
   */
  static generateHash(content: string): string {
    return crypto.createHash('sha256').update(content).digest('hex');
  }

  /**
   * Ingests a new document into a knowledge base.
   * Returns null if the document already exists (deduplication).
   */
  static async ingestDocument(knowledgeBaseId: string, title: string, content: string, sourceUrl?: string) {
    const hash = this.generateHash(content);

    // Check for duplicates
    const existing = await prisma.document.findUnique({ where: { hash } });
    if (existing) {
      if (existing.knowledgeBaseId === knowledgeBaseId) {
        return null; // Already in this KB
      }
      // If in another KB, we could link it or just copy. Here we copy for isolation.
    }

    return prisma.document.create({
      data: {
        title,
        content,
        hash,
        sourceUrl,
        knowledgeBaseId,
      }
    });
  }

  static async listDocuments(knowledgeBaseId: string) {
    return prisma.document.findMany({ where: { knowledgeBaseId } });
  }
}
