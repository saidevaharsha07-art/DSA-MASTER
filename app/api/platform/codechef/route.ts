import { NextRequest, NextResponse } from 'next/server';
import { PlatformIntegrationService } from '@backend/platform/platform.service';

/**
 * CodeChef Platform Profile API Route (Thin Adapter)
 * Delegates external fetching and normalization to PlatformIntegrationService.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { status, body: responseBody } = await PlatformIntegrationService.fetchCodeChefProfile(body?.username);
    return NextResponse.json(responseBody, { status });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch CodeChef profile' }, { status: 500 });
  }
}
