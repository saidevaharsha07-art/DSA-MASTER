import { AIProvider, AIContext } from './interface';

export class OpenAIAdapter implements AIProvider {
  public id = 'openai';
  public name = 'OpenAI GPT-4o Engine';

  public async generate(prompt: string, context?: AIContext): Promise<string> {
    return `[GPT-4o Mentor]: Analyzing code for ${context?.problemSlug || 'problem'}... Focus on optimizing your loop using a Hash Table to achieve O(N) time complexity.`;
  }
}

export class GeminiAdapter implements AIProvider {
  public id = 'gemini';
  public name = 'Google Gemini 1.5 Pro';

  public async generate(prompt: string, context?: AIContext): Promise<string> {
    return `[Gemini 1.5 Pro]: Excellent effort! You can optimize your space complexity by reusing the input array in-place.`;
  }
}

export class AnthropicAdapter implements AIProvider {
  public id = 'anthropic';
  public name = 'Anthropic Claude 3.5 Sonnet';

  public async generate(prompt: string, context?: AIContext): Promise<string> {
    return `[Claude 3.5 Sonnet]: Let's break down the logic step-by-step. What edge cases occur when the array contains negative numbers?`;
  }
}

export class LocalLLMAdapter implements AIProvider {
  public id = 'local';
  public name = 'Local Llama-3 Sandbox';

  public async generate(prompt: string, context?: AIContext): Promise<string> {
    return `[Local Llama-3]: Offline LLM response for ${prompt}.`;
  }
}

class AIServiceFactory {
  private activeProvider: AIProvider;

  constructor() {
    const providerType = process.env.NEXT_PUBLIC_AI_PROVIDER || 'openai';

    switch (providerType) {
      case 'gemini':
        this.activeProvider = new GeminiAdapter();
        break;
      case 'anthropic':
        this.activeProvider = new AnthropicAdapter();
        break;
      case 'local':
        this.activeProvider = new LocalLLMAdapter();
        break;
      case 'openai':
      default:
        this.activeProvider = new OpenAIAdapter();
        break;
    }
  }

  public getProvider(): AIProvider {
    return this.activeProvider;
  }
}

export const aiServiceFactory = new AIServiceFactory();
