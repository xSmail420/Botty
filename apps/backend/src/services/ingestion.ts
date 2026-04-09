import crypto from 'crypto';
import { prisma } from './prisma';

export interface IngestionSource {
  type: 'pdf' | 'url' | 'text';
  title: string;
  sourceUrl?: string;
  content?: string;
}

export class IngestionService {
  static generateHash(content: string): string {
    return crypto.createHash('sha256').update(content).digest('hex');
  }

  static async ingest(agentId: string, source: IngestionSource) {
    let content = source.content || '';

    // Mock processing for PDF and URL
    if (source.type === 'pdf') {
      content = `[Simulated PDF Extraction Content for ${source.title}]\n` + content;
    } else if (source.type === 'url') {
      content = `[Simulated URL Crawl Content for ${source.sourceUrl}]\n` + content;
    }

    const hash = this.generateHash(content);

    // Find or create default knowledge base for the agent
    let kb = await prisma.knowledgeBase.findFirst({ where: { agentId } });
    if (!kb) {
      kb = await prisma.knowledgeBase.create({
        data: { name: 'Default Knowledge Base', agentId }
      });
    }

    const existing = await prisma.document.findUnique({ where: { hash } });
    if (existing) return { status: 'already_exists', document: existing };

    const doc = await prisma.document.create({
      data: {
        title: source.title,
        content: content,
        hash: hash,
        sourceUrl: source.sourceUrl,
        knowledgeBaseId: kb.id,
      }
    });

    return { status: 'success', document: doc };
  }
}
