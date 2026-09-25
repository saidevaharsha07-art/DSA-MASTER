/**
 * DSA Magna — Backend Platform Service
 * Handles server-side API proxying and profile data normalization for external platforms:
 * CodeChef, Codeforces, and LeetCode.
 */

export class PlatformIntegrationService {
  /**
   * CodeChef profile fetcher
   */
  public static async fetchCodeChefProfile(username: string): Promise<{ status: number; body: any }> {
    if (!username || typeof username !== 'string') {
      return { status: 400, body: { error: 'Username is required' } };
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

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

      return {
        status: 200,
        body: {
          success: true,
          profile: {
            platformUserId: `cc-${username}`,
            handle: username,
            rating,
            maxRating,
            rankTitle,
            solvedCount,
            successRate: null,
            contestCount: profileData.ratingData?.length || null,
            profileUrl: `https://www.codechef.com/users/${username}`,
          },
          contestHistory: [],
        },
      };
    }

    // Honest unprovided response fallback
    return {
      status: 200,
      body: {
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
      },
    };
  }

  /**
   * Codeforces profile fetcher
   */
  public static async fetchCodeforcesProfile(username: string): Promise<{ status: number; body: any }> {
    if (!username || typeof username !== 'string') {
      return { status: 400, body: { error: 'Username/handle is required' } };
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    // 1. Fetch user.info
    const userRes = await fetch(`https://codeforces.com/api/user.info?handles=${encodeURIComponent(username)}`, {
      signal: controller.signal,
    });

    if (!userRes.ok) {
      clearTimeout(timeoutId);
      return { status: 404, body: { error: 'Codeforces handle not found or API error' } };
    }

    const userData = await userRes.json();
    if (userData.status !== 'OK' || !userData.result || userData.result.length === 0) {
      clearTimeout(timeoutId);
      return { status: 404, body: { error: 'Codeforces handle not found' } };
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
      const statusRes = await fetch(
        `https://codeforces.com/api/user.status?handle=${encodeURIComponent(username)}&from=1&count=10000`,
        { signal: controller.signal }
      );
      if (statusRes.ok) {
        const statusData = await statusRes.json();
        if (statusData.status === 'OK' && Array.isArray(statusData.result)) {
          const subs = statusData.result;
          const passedSubmissions = subs.filter((s: any) => s.verdict === 'OK');
          const distinctSolved = new Set(
            passedSubmissions.map((s: any) => `${s.problem.contestId}-${s.problem.index}`)
          );
          solvedCount = distinctSolved.size;
          if (subs.length > 0) {
            successRate = `${((passedSubmissions.length / subs.length) * 100).toFixed(1)}%`;
          }
        }
      }
    } catch (_) {}

    clearTimeout(timeoutId);

    const profile = {
      platformUserId: `cf-${username}`,
      handle: user.handle,
      rating: user.rating ?? null,
      maxRating: user.maxRating ?? null,
      rankTitle: user.rank ?? null,
      solvedCount,
      successRate,
      contestCount: contestHistory.length,
      avatarUrl: user.titlePhoto || user.avatar || null,
      profileUrl: `https://codeforces.com/profile/${user.handle}`,
    };

    return {
      status: 200,
      body: {
        success: true,
        profile,
        contestHistory,
      },
    };
  }

  /**
   * LeetCode profile fetcher
   */
  public static async fetchLeetCodeProfile(username: string): Promise<{ status: number; body: any }> {
    if (!username || typeof username !== 'string') {
      return { status: 400, body: { error: 'Username is required' } };
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
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!lcRes.ok) {
      return { status: 404, body: { error: 'LeetCode profile not found or API error' } };
    }

    const data = await lcRes.json();
    const matchedUser = data?.data?.matchedUser;

    if (!matchedUser) {
      return { status: 404, body: { error: 'LeetCode user not found' } };
    }

    const contestRanking = data?.data?.userContestRanking;
    const contestHistoryRaw = data?.data?.userContestRankingHistory || [];

    const acStats = matchedUser.submitStats?.acSubmissionNum || [];
    const allAc = acStats.find((s: any) => s.difficulty === 'All')?.count ?? 0;

    const totalStats = matchedUser.submitStats?.totalSubmissionNum || [];
    const allTotal = totalStats.find((s: any) => s.difficulty === 'All')?.submissions ?? 0;
    const acTotal = acStats.find((s: any) => s.difficulty === 'All')?.submissions ?? 0;

    const successRate = allTotal > 0 ? `${((acTotal / allTotal) * 100).toFixed(1)}%` : null;

    const attendedContests = contestHistoryRaw.filter((c: any) => c.attended);
    const contestHistory = attendedContests.map((c: any, idx: number) => ({
      id: `rec-lc-${c.contest?.startTime || idx}`,
      platform: 'leetcode',
      contestId: c.contest?.title || `Contest ${idx + 1}`,
      name: c.contest?.title || 'Weekly Contest',
      date: new Date((c.contest?.startTime || 0) * 1000).toISOString(),
      durationMinutes: 90,
      lifecycleState: 'completed',
      rank: c.ranking,
      ratingAfter: Math.round(c.rating || 0),
      problemsSolved: c.problemsSolved,
    }));

    const profile = {
      platformUserId: `lc-${username}`,
      handle: matchedUser.username,
      rating: contestRanking?.rating ? Math.round(contestRanking.rating) : null,
      maxRating: null,
      rankTitle: contestRanking?.globalRanking ? `Global #${contestRanking.globalRanking}` : null,
      solvedCount: allAc,
      successRate,
      contestCount: contestRanking?.attendedContestsCount ?? attendedContests.length,
      profileUrl: `https://leetcode.com/${matchedUser.username}`,
    };

    return {
      status: 200,
      body: {
        success: true,
        profile,
        contestHistory,
      },
    };
  }
}
