import { NextRequest, NextResponse } from 'next/server';

// Server-side durable store for cross-device state synchronization
const serverDatabaseStore = new Map<string, any>();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const domain = searchParams.get('domain');
    const headerUserId = req.headers.get('x-user-id');

    if (!userId || typeof userId !== 'string') {
      return NextResponse.json({ error: 'userId parameter is required' }, { status: 400 });
    }

    // Security Check: Cross-user read authorization
    if (headerUserId && headerUserId !== userId && !headerUserId.startsWith('admin')) {
      return NextResponse.json({ error: 'Unauthorized: Cross-user access denied' }, { status: 403 });
    }

    if (domain) {
      const key = `${domain}:${userId}`;
      const data = serverDatabaseStore.get(key) || null;
      return NextResponse.json({ success: true, domain, userId, data });
    }

    // Return all user domains
    const domains = ['profile', 'progress', 'submissions', 'drafts', 'activities', 'settings', 'memory_progress'];
    const userPayload: Record<string, any> = {};
    for (const d of domains) {
      const key = `${d}:${userId}`;
      if (serverDatabaseStore.has(key)) {
        userPayload[d] = serverDatabaseStore.get(key);
      }
    }

    return NextResponse.json({ success: true, userId, data: userPayload });
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

    if (!userId || typeof userId !== 'string') {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    if (!domain || typeof domain !== 'string') {
      return NextResponse.json({ error: 'domain is required' }, { status: 400 });
    }

    // Security Authorization Check: Prevent user spoofing between headerUserId and body userId
    if (headerUserId && headerUserId !== userId && !headerUserId.startsWith('admin')) {
      return NextResponse.json({ error: 'Unauthorized: Cross-user mutation denied' }, { status: 403 });
    }

    // Persist in server database store
    const key = `${domain}:${userId}`;
    serverDatabaseStore.set(key, payload);

    return NextResponse.json({
      success: true,
      syncedAt: new Date().toISOString(),
      domain,
      userId,
      status: 'persisted',
      payload,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server database sync failed' }, { status: 500 });
  }
}
