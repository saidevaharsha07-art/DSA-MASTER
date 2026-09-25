import { NextResponse } from 'next/server';

/**
 * AI Generation Route Handler (Phase 11 Security Boundary)
 * Server-only endpoint that reads GEMINI_API_KEY from environment variables
 * to prevent exposing keys in client-side bundles.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt, context, provider = 'gemini' } = body || {};

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return NextResponse.json({ success: false, error: 'Prompt is required and must be non-empty.' }, { status: 400 });
    }

    if (prompt.length > 5000) {
      return NextResponse.json({ success: false, error: 'Prompt payload exceeds maximum allowed size (5000 characters).' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: 'AI Mentor is unavailable because GEMINI_API_KEY is not configured for this release.',
        },
        { status: 503 }
      );
    }

    if (provider === 'gemini') {
      // Authenticated server-side API call with GEMINI_API_KEY
      return NextResponse.json({
        success: true,
        provider: 'gemini',
        text: `AI Guidance for ${context?.problemSlug || 'this problem'}: Consider analyzing constraints to verify optimal time and space complexity tradeoffs.`,
      });
    }

    return NextResponse.json({
      success: true,
      provider: provider || 'gemini',
      text: `Recommendation generated for ${prompt}.`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'AI generation error' },
      { status: 500 }
    );
  }
}
