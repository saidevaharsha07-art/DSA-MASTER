import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username } = body;

    if (!username || typeof username !== 'string') {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          username
          submitStats: submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
            totalSubmissionNum {
              difficulty
              count
              submissions
            }
          }
          profile {
            ranking
            reputation
            starRating
          }
        }
        userContestRanking(userSlug: $username) {
          rating
          globalRanking
          totalParticipants
          topPercentage
          attendedContestsCount
        }
        userContestRankingHistory(userSlug: $username) {
          attended
          rating
          ranking
          trendDirection
          problemsSolved
          totalProblems
          finishTimeInSeconds
          contest {
            title
            startTime
          }
        }
      }
    `;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const lcRes = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      body: JSON.stringify({ query, variables: { username } }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!lcRes.ok) {
      return NextResponse.json({ error: `LeetCode API returned status ${lcRes.status}` }, { status: lcRes.status });
    }

    const json = await lcRes.json();

    if (json.errors || !json.data?.matchedUser) {
      return NextResponse.json({ error: 'LeetCode user not found or GraphQL error' }, { status: 404 });
    }

    const user = json.data.matchedUser;
    const contest = json.data.userContestRanking;
    const history = json.data.userContestRankingHistory || [];

    const acStats = user.submitStats?.acSubmissionNum || [];
    const totalStats = user.submitStats?.totalSubmissionNum || [];

    const solvedCount = acStats.find((s: any) => s.difficulty === 'All')?.count || 0;
    const totalAcSubmissions = acStats.find((s: any) => s.difficulty === 'All')?.submissions || 0;
    const totalAllSubmissions = totalStats.find((s: any) => s.difficulty === 'All')?.submissions || 0;

    let successRate: string | null = null;
    if (totalAllSubmissions > 0) {
      successRate = `${Math.round((totalAcSubmissions / totalAllSubmissions) * 100)}%`;
    }

    const rating = contest?.rating ? Math.round(contest.rating) : null;
    const rankTitle = user.profile?.ranking ? `#${user.profile.ranking}` : contest?.globalRanking ? `#${contest.globalRanking}` : null;
    const contestCount = contest?.attendedContestsCount ?? (history.filter((h: any) => h.attended).length || null);

    const contestRecords = history
      .filter((h: any) => h.attended || h.ranking > 0)
      .map((h: any, idx: number) => ({
        id: `rec-lc-${idx}`,
        platform: 'leetcode',
        contestId: h.contest?.title || `Contest ${idx + 1}`,
        name: h.contest?.title || `LeetCode Contest`,
        date: h.contest?.startTime ? new Date(h.contest.startTime * 1000).toISOString() : new Date().toISOString(),
        durationMinutes: 90,
        lifecycleState: 'completed',
        rank: h.ranking || null,
        ratingAfter: h.rating ? Math.round(h.rating) : null,
        solvedCount: h.problemsSolved || 0,
      }));

    return NextResponse.json({
      success: true,
      profile: {
        platformUserId: `lc-${username}`,
        handle: username,
        rating,
        maxRating: rating,
        rankTitle,
        solvedCount,
        successRate,
        contestCount,
        profileUrl: `https://leetcode.com/${username}/`,
      },
      contestHistory: contestRecords,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch LeetCode profile' }, { status: 500 });
  }
}
