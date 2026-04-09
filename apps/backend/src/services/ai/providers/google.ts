import { CompletionRequest, CompletionResponse, StreamChunk } from '@botty/shared';
import { BaseProvider, AIError } from '../base';

export class GoogleAIProvider extends BaseProvider {
  name = 'google';

  async complete(request: CompletionRequest): Promise<CompletionResponse> {
    const { config, messages, temperature, maxTokens } = request;
    const apiKey = config.apiKey || '';
    
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${config.modelId}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: messages.map((m: any) => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }],
          })),
          generationConfig: {
            temperature,
            maxOutputTokens: maxTokens,
          }
        }),
      });

      if (!response.ok) {
        const error = await response.json() as any;
        throw new AIError(this.name, error.error?.message || 'Unknown error', response.status);
      }

      const data = await response.json() as any;
      return {
        content: data.candidates[0].content.parts[0].text,
      };
    } catch (error: any) {
      if (error instanceof AIError) throw error;
      throw new AIError(this.name, error.message);
    }
  }

  async *stream(request: CompletionRequest): AsyncGenerator<StreamChunk> {
    // Note: Google uses a different endpoint for streaming.
    // For MVP, we'll implement a non-streaming version or use their official SDK if complex.
    // But let's try the streamGenerateContent endpoint.
    const { config, messages, temperature, maxTokens } = request;
    const apiKey = config.apiKey || '';

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${config.modelId}:streamGenerateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: messages.map((m: any) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        })),
        generationConfig: {
          temperature,
          maxOutputTokens: maxTokens,
        }
      }),
    });

    if (!response.ok) {
      const error = await response.json() as any;
      throw new AIError(this.name, error.error?.message || 'Unknown error', response.status);
    }

    const reader = response.body?.getReader();
    if (!reader) throw new AIError(this.name, 'No readable stream found');

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value);
      
      // Google streaming returns a JSON array that grows. We need to parse chunks.
      // This is simplified; a robust parser would handle the JSON array properly.
      try {
        // Find the most recent complete part
        const parts = buffer.split('\"text\": \"');
        if (parts.length > 1) {
          const lastPart = parts[parts.length - 1];
          const text = lastPart.split('\"')[0];
          if (text) {
            yield { content: text, done: false };
            buffer = ''; // Reset buffer after yields
          }
        }
      } catch (e) {
        // Wait for more data
      }
    }
    yield { content: '', done: true };
  }
}
