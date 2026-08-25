import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username } = body;

    if (!username || typeof username !== 'string') {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    // Attempt fetch from public JSON proxy or CodeChef profile API
    let profileData: any = null;
    try {
      const res = await fetch(`https://codechef-api.vercel.app/handle/${encodeURIComponent(username)}`, {
        signal: controller.signal,
      });
      if (res.ok) {
        profileData = await res.json();
      }
    } catch (_) {}

    clearTimeout(timeoutId);

    if (profileData && profileData.success !== false) {
      const rating = profileData.currentRating ? Math.round(profileData.currentRating) : null;
      const maxRating = profileData.highestRating ? Math.round(profileData.highestRating) : rating;
      const rankTitle = profileData.stars || (profileData.globalRank ? `#${profileData.globalRank}` : null);
      const solvedCount = profileData.totalSolved ?? null;

      return NextResponse.json({
        success: true,
        profile: {
          platformUserId: `cc-${username}`,
          handle: username,
          rating,
          maxRating,
          rankTitle,
          solvedCount,
          successRate: null, // CodeChef ToS: Submission rate unavailable publicly
          contestCount: profileData.ratingData?.length || null,
          profileUrl: `https://www.codechef.com/users/${username}`,
        },
        contestHistory: [],
      });
    }

    // Honest unprovided response fallback
    return NextResponse.json({
      success: true,
      profile: {
        platformUserId: `cc-${username}`,
        handle: username,
        rating: null,
        maxRating: null,
        rankTitle: null,
        solvedCount: null,
        successRate: null,
        contestCount: null,
        profileUrl: `https://www.codechef.com/users/${username}`,
      },
      contestHistory: [],
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch CodeChef profile' }, { status: 500 });
  }
}
