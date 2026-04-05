import { CompletionRequest, CompletionResponse, StreamChunk } from '@botty/shared';
import { BaseProvider, AIError } from '../base';

export class AnthropicProvider extends BaseProvider {
  name = 'anthropic';

  async complete(request: CompletionRequest): Promise<CompletionResponse> {
    const { config, messages, temperature, maxTokens } = request;
    
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': config.apiKey || '',
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: config.modelId,
          messages: messages.filter(m => m.role !== 'system'),
          system: messages.find(m => m.role === 'system')?.content,
          max_tokens: maxTokens || 1024,
          temperature,
        }),
      });

      if (!response.ok) {
        const error = await response.json() as any;
        throw new AIError(this.name, error.error?.message || 'Unknown error', response.status);
      }

      const data = await response.json() as any;
      return {
        content: data.content[0].text,
        usage: {
          promptTokens: data.usage.input_tokens,
          completionTokens: data.usage.output_tokens,
        },
      };
    } catch (error: any) {
      if (error instanceof AIError) throw error;
      throw new AIError(this.name, error.message);
    }
  }

  async *stream(request: CompletionRequest): AsyncGenerator<StreamChunk> {
    const { config, messages, temperature, maxTokens } = request;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.apiKey || '',
        'anthropic-version': '2023-06-01',
        'anthropic-experimental': 'streaming',
      },
      body: JSON.stringify({
        model: config.modelId,
        messages: messages.filter(m => m.role !== 'system'),
        system: messages.find(m => m.role === 'system')?.content,
        max_tokens: maxTokens || 1024,
        temperature,
        stream: true,
      }),
    });

    if (!response.ok) {
      const error = await response.json() as any;
      throw new AIError(this.name, error.error?.message || 'Unknown error', response.status);
    }

    const reader = response.body?.getReader();
    if (!reader) throw new AIError(this.name, 'No readable stream found');

    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const events = chunk.split('\n\n');

      for (const event of events) {
        if (!event.trim().startsWith('event: content_block_delta')) continue;
        
        const dataLine = event.split('\n').find(l => l.startsWith('data: '));
        if (!dataLine) continue;

        try {
          const data = JSON.parse(dataLine.replace('data: ', ''));
          const content = data.delta?.text || '';
          if (content) {
            yield { content, done: false };
          }
        } catch (e) {
          console.error('Error parsing Anthropic stream chunk:', e);
        }
      }
    }
    yield { content: '', done: true };
  }
}
