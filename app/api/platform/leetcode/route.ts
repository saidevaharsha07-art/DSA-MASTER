import { NextRequest, NextResponse } from 'next/server';
import { PlatformIntegrationService } from '@backend/platform/platform.service';

/**
 * LeetCode Platform Profile API Route (Thin Adapter)
 * Delegates external fetching and normalization to PlatformIntegrationService.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { status, body: responseBody } = await PlatformIntegrationService.fetchLeetCodeProfile(body?.username);
    return NextResponse.json(responseBody, { status });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch LeetCode profile' }, { status: 500 });
  }
}
