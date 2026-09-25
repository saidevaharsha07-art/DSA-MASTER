import { NextResponse } from 'next/server';
import { AIMentorService } from '@backend/ai/mentor.service';

/**
 * AI Generation Route Handler (Thin Adapter)
 * Delegates prompt processing and safety checks to AIMentorService.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { status, body: responseBody } = await AIMentorService.generateGuidance(body);
    return NextResponse.json(responseBody, { status });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'AI generation error' },
      { status: 500 }
    );
  }
}
