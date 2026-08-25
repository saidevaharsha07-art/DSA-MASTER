import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username } = body;

    if (!username || typeof username !== 'string') {
      return NextResponse.json({ error: 'Username/handle is required' }, { status: 400 });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    // 1. Fetch user.info
    const userRes = await fetch(`https://codeforces.com/api/user.info?handles=${encodeURIComponent(username)}`, {
      signal: controller.signal,
    });

    if (!userRes.ok) {
      clearTimeout(timeoutId);
      return NextResponse.json({ error: 'Codeforces handle not found or API error' }, { status: 404 });
    }

    const userData = await userRes.json();
    if (userData.status !== 'OK' || !userData.result || userData.result.length === 0) {
      clearTimeout(timeoutId);
      return NextResponse.json({ error: 'Codeforces handle not found' }, { status: 404 });
    }

    const user = userData.result[0];

    // 2. Fetch user.rating
    let contestHistory: any[] = [];
    try {
      const ratingRes = await fetch(`https://codeforces.com/api/user.rating?handle=${encodeURIComponent(username)}`, {
        signal: controller.signal,
      });
      if (ratingRes.ok) {
        const ratingData = await ratingRes.json();
        if (ratingData.status === 'OK' && Array.isArray(ratingData.result)) {
          contestHistory = ratingData.result.map((r: any) => ({
            id: `rec-cf-${r.contestId}`,
            platform: 'codeforces',
            contestId: String(r.contestId),
            name: r.contestName,
            date: new Date(r.ratingUpdateTimeSeconds * 1000).toISOString(),
            durationMinutes: 120,
            lifecycleState: 'completed',
            rank: r.rank,
            ratingBefore: r.oldRating,
            ratingAfter: r.newRating,
            ratingChange: r.newRating - r.oldRating,
          }));
        }
      }
    } catch (_) {}

    // 3. Fetch user.status (for solved count & success rate)
    let solvedCount: number | null = null;
    let successRate: string | null = null;

    try {
      const statusRes = await fetch(`https://codeforces.com/api/user.status?handle=${encodeURIComponent(username)}&from=1&count=10000`, {
        signal: controller.signal,
      });
      if (statusRes.ok) {
        const statusData = await statusRes.json();
        if (statusData.status === 'OK' && Array.isArray(statusData.result)) {
          const subs = statusData.result;
          const solvedSet = new Set<string>();
          let acCount = 0;

          subs.forEach((s: any) => {
            if (s.verdict === 'OK' && s.problem) {
              const pKey = `${s.problem.contestId || ''}_${s.problem.index}`;
              solvedSet.add(pKey);
              acCount++;
            }
          });

          solvedCount = solvedSet.size;
          if (subs.length > 0) {
            successRate = `${Math.round((acCount / subs.length) * 100)}%`;
          }
        }
      }
    } catch (_) {}

    clearTimeout(timeoutId);

    return NextResponse.json({
      success: true,
      profile: {
        platformUserId: `cf-${user.handle}`,
        handle: user.handle,
        rating: user.rating ?? null,
        maxRating: user.maxRating ?? null,
        rankTitle: user.rank ? `${user.rank.charAt(0).toUpperCase() + user.rank.slice(1)}` : null,
        solvedCount,
        successRate,
        contestCount: contestHistory.length > 0 ? contestHistory.length : null,
        profileUrl: `https://codeforces.com/profile/${user.handle}`,
      },
      contestHistory,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch Codeforces profile' }, { status: 500 });
  }
}
