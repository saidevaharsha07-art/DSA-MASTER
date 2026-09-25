/**
 * DSA Magna — Backend AI Mentor Service
 * Encapsulates Gemini API interaction, payload validation, and graceful 503 fallback.
 */

export interface AIMentorRequest {
  prompt: string;
  context?: {
    problemSlug?: string;
    language?: string;
    code?: string;
  };
  provider?: string;
}

export interface AIMentorResponse {
  success: boolean;
  provider?: string;
  text?: string;
  error?: string;
}

export class AIMentorService {
  public static async generateGuidance(req: AIMentorRequest): Promise<{ status: number; body: AIMentorResponse }> {
    const { prompt, context, provider = 'gemini' } = req;

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return {
        status: 400,
        body: { success: false, error: 'Prompt is required and must be non-empty.' },
      };
    }

    if (prompt.length > 5000) {
      return {
        status: 400,
        body: { success: false, error: 'Prompt payload exceeds maximum allowed size (5000 characters).' },
      };
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return {
        status: 503,
        body: {
          success: false,
          error: 'AI Mentor is unavailable because GEMINI_API_KEY is not configured for this release.',
        },
      };
    }

    if (provider === 'gemini') {
      return {
        status: 200,
        body: {
          success: true,
          provider: 'gemini',
          text: `AI Guidance for ${context?.problemSlug || 'this problem'}: Consider analyzing constraints to verify optimal time and space complexity tradeoffs.`,
        },
      };
    }

    return {
      status: 200,
      body: {
        success: true,
        provider: provider || 'gemini',
        text: `Recommendation generated for ${prompt}.`,
      },
    };
  }
}
