import { CompletionRequest, CompletionResponse, StreamChunk } from '@botty/shared';

export abstract class BaseProvider {
  abstract name: string;

  /**
   * Generates a complete response from the model.
   */
  abstract complete(request: CompletionRequest): Promise<CompletionResponse>;

  /**
   * Returns a generator for streaming responses.
   */
  abstract stream(request: CompletionRequest): AsyncGenerator<StreamChunk>;
}

export class AIError extends Error {
  constructor(public provider: string, message: string, public status?: number) {
    super(`[${provider}] AI Error: ${message}`);
  }
}
