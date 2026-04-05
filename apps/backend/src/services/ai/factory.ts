import { ProviderType } from '@botty/shared';
import { BaseProvider } from './base';
import { OpenAIProvider } from './providers/openai';
import { AnthropicProvider } from './providers/anthropic';
import { GoogleAIProvider } from './providers/google';

export class ProviderFactory {
  private static providers: Record<string, BaseProvider> = {
    openai: new OpenAIProvider(),
    openrouter: new OpenAIProvider(), // Reused as it is OpenAI-compatible
    ollama: new OpenAIProvider(),     // Reused as it is OpenAI-compatible
    anthropic: new AnthropicProvider(),
    google: new GoogleAIProvider(),
  };

  static getProvider(type: ProviderType): BaseProvider {
    const provider = this.providers[type];
    if (!provider) {
      throw new Error(`Unsupported provider type: ${type}`);
    }
    return provider;
  }
}
