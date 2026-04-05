import { z } from 'zod';

export const ProviderTypeSchema = z.enum(['openai', 'anthropic', 'google', 'openrouter', 'ollama']);
export type ProviderType = z.infer<typeof ProviderTypeSchema>;

export const ModelConfigSchema = z.object({
  provider: ProviderTypeSchema,
  modelId: z.string(),
  apiKey: z.string().optional(),
  baseUrl: z.string().optional(),
});
export type ModelConfig = z.infer<typeof ModelConfigSchema>;

export interface AIServiceMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface CompletionRequest {
  messages: AIServiceMessage[];
  config: ModelConfig;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

export interface CompletionResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
  };
}

export interface StreamChunk {
  content: string;
  done: boolean;
}
