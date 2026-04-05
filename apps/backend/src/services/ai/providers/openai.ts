import { CompletionRequest, CompletionResponse, StreamChunk } from '@botty/shared';
import { BaseProvider, AIError } from '../base';

export class OpenAIProvider extends BaseProvider {
  name = 'openai';

  async complete(request: CompletionRequest): Promise<CompletionResponse> {
    const { config, messages, temperature, maxTokens } = request;
    const baseUrl = config.baseUrl || 'https://api.openai.com/v1';
    
    try {
      const response = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey}`,
        },
        body: JSON.stringify({
          model: config.modelId,
          messages,
          temperature,
          max_tokens: maxTokens,
        }),
      });

      if (!response.ok) {
        const error = await response.json() as any;
        throw new AIError(this.name, error.error?.message || 'Unknown error', response.status);
      }

      const data = await response.json() as any;
      return {
        content: data.choices[0].message.content,
        usage: {
          promptTokens: data.usage.prompt_tokens,
          completionTokens: data.usage.completion_tokens,
        },
      };
    } catch (error: any) {
      if (error instanceof AIError) throw error;
      throw new AIError(this.name, error.message);
    }
  }

  async *stream(request: CompletionRequest): AsyncGenerator<StreamChunk> {
    const { config, messages, temperature, maxTokens } = request;
    const baseUrl = config.baseUrl || 'https://api.openai.com/v1';

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model: config.modelId,
        messages,
        temperature,
        max_tokens: maxTokens,
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
      const lines = chunk.split('\n').filter(line => line.trim().startsWith('data: '));

      for (const line of lines) {
        const dataStr = line.replace(/^data: /, '').trim();
        if (dataStr === '[DONE]') {
          yield { content: '', done: true };
          return;
        }

        try {
          const data = JSON.parse(dataStr);
          const content = data.choices[0].delta?.content || '';
          if (content) {
            yield { content, done: false };
          }
        } catch (e) {
          console.error('Error parsing stream chunk:', e);
        }
      }
    }
  }
}
