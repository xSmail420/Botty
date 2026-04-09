import { AgentService } from './agent';
import { ProviderService } from './provider';
import { ProviderFactory } from './ai/factory';
import { ModelConfig } from '@botty/shared';
import { prisma } from './prisma';

export class OrchestrationService {
  static async chat(agentId: string, messages: any[], sessionId: string) {
    const agent = await AgentService.getAgent(agentId);
    if (!agent) throw new Error('Agent not found');

    // 1. Resolve Variables in Persona
    let systemPrompt = agent.persona;
    const variables = {
      user_name: 'User', // Mock: would come from session/auth
      current_env: 'production',
      session_date: new Date().toISOString(),
    };

    Object.entries(variables).forEach(([key, value]) => {
      systemPrompt = systemPrompt.replace(new RegExp(`{{${key}}}`, 'g'), value);
    });

    // 2. Apply Linguistic Traits (Simplified for now)
    const traits = (agent.traits as any) || { conciseness: 0.5, density: 0.5, strictness: 0.8 };
    if (traits.conciseness > 0.7) {
      systemPrompt += '\nRespond very concisely.';
    }
    if (traits.strictness > 0.9) {
      systemPrompt += '\nFollow the instructions exactly without deviation.';
    }

    // 3. Prepare Provider Config
    const [providerType, modelId] = agent.model.includes('/') 
      ? agent.model.split('/') 
      : ['openai', agent.model];

    const dbProvider = await ProviderService.getProvider(agent.tenantId, providerType);
    
    const config: ModelConfig = {
      provider: providerType as any,
      modelId: modelId || agent.model,
      apiKey: dbProvider?.apiKey || process.env[`${providerType.toUpperCase()}_API_KEY`] || '',
      baseUrl: dbProvider?.baseUrl || process.env[`${providerType.toUpperCase()}_BASE_URL`],
    };

    const provider = ProviderFactory.getProvider(config.provider);
    
    const startTime = Date.now();
    const response = await provider.complete({
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
      config,
      temperature: 0.7,
    });
    const latency = Date.now() - startTime;

    // 4. Persistence & Metadata
    const savedMessage = await prisma.message.create({
      data: {
        role: 'assistant',
        content: response.content,
        agentId: agent.id,
        sessionId,
        metadata: {
          latency,
          tokens: 0, // Mock: would come from provider response
          model: agent.model,
          trace: ['System Prompt Resolved', 'Traits Applied', 'Provider Called']
        }
      }
    });

    return {
      message: { role: 'assistant', content: response.content },
      savedMessage
    };
  }
}
