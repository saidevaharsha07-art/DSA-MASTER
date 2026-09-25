import { NextRequest, NextResponse } from 'next/server';
import { DatabaseSyncService } from '@backend/db/sync.service';

/**
 * Database State Synchronization Route (Thin Adapter)
 * Delegates persistence, fetching, and authorization validation to DatabaseSyncService.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const domain = searchParams.get('domain');
    const headerUserId = req.headers.get('x-user-id');
    const authHeader = req.headers.get('authorization');

    const { status, body } = DatabaseSyncService.fetchUserData({
      userId,
      domain,
      headerUserId,
      authHeader,
    });

    return NextResponse.json(body, { status });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server database fetch failed' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const headerUserId = req.headers.get('x-user-id');

    const body = await req.json().catch(() => ({}));
    const { userId, domain, payload } = body;

    const { status, body: responseBody } = DatabaseSyncService.saveUserData({
      userId,
      domain,
      payload,
      headerUserId,
      authHeader,
    });

    return NextResponse.json(responseBody, { status });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server database sync failed' }, { status: 500 });
  }
}
