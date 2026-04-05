import { z } from 'zod';

export const MessageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string(),
  timestamp: z.string().optional(),
});

export type Message = z.infer<typeof MessageSchema>;

export const AgentSchema = z.object({
  id: z.string(),
  name: z.string(),
  persona: z.string(),
  avatar: z.string().optional(),
  model: z.string(),
  knowledgeIds: z.array(z.string()).optional(),
});

export type Agent = z.infer<typeof AgentSchema>;

export const TenantSchema = z.object({
  id: z.string(),
  name: z.string(),
  domain: z.string(),
  stripeId: z.string().optional(),
});

export type Tenant = z.infer<typeof TenantSchema>;
export * from './models';
