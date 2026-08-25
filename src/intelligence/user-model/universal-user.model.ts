/**
 * Phase 4A — Universal User Model
 * Complete learner profile tracking strengths, weaknesses, mastery, speed, accuracy,
 * confidence, learning velocity, consistency, burnout risk, revision efficiency,
 * contest temperament, active kingdoms, and platform identities.
 */

export interface LearnerProfileMetrics {
  userId: string;
  username: string;
  strengths: string[]; // e.g. ['Two Pointers', 'Sliding Window', 'Arrays']
  weaknesses: string[]; // e.g. ['Segment Trees', 'Dynamic Programming']
  masteryScore: number; // 0 - 100
  solvingSpeedMs: number; // Avg ms per problem
  accuracy: number; // 0 - 100%
  confidenceScore: number; // 0 - 100
  learningVelocity: number; // Problems solved per week
  consistencyStreak: number; // Consecutive days active
  burnoutRisk: 'LOW' | 'MODERATE' | 'HIGH';
  revisionEfficiency: number; // 0 - 100%
  contestTemperament: 'CALM' | 'BALANCED' | 'AGGRESSIVE' | 'ANXIOUS';
  preferredDifficulty: number; // Target ELO rating (e.g. 1400)
  preferredPlatforms: string[]; // ['codechef', 'codeforces', 'leetcode']
  activeKingdoms: string[];
  completedKingdoms: string[];
  abandonedKingdoms: string[];
  platformIdentities: Record<string, string>; // platform -> handle
  lastUpdated: string;
}

export class UniversalUserModel {
  public static createDefaultProfile(userId: string, username: string = 'Learner'): LearnerProfileMetrics {
    return {
      userId,
      username,
      strengths: ['Basic Array Traversal', 'Two Pointers'],
      weaknesses: ['Dynamic Programming', 'Graph Shortest Path'],
      masteryScore: 68,
      solvingSpeedMs: 1200000, // 20 mins
      accuracy: 78.5,
      confidenceScore: 82,
      learningVelocity: 14, // 14 problems/week
      consistencyStreak: 7,
      burnoutRisk: 'LOW',
      revisionEfficiency: 88.0,
      contestTemperament: 'BALANCED',
      preferredDifficulty: 1400,
      preferredPlatforms: ['codechef', 'codeforces', 'leetcode'],
      activeKingdoms: ['Kingdom of Arrays', 'Kingdom of Two Pointers'],
      completedKingdoms: ['Kingdom of Basic Traversal'],
      abandonedKingdoms: [],
      platformIdentities: {
        codechef: `${username}_cc`,
        codeforces: `${username}_cf`,
        leetcode: `${username}_lc`,
      },
      lastUpdated: new Date().toISOString(),
    };
  }

  public static updateProfileOnAttempt(
    profile: LearnerProfileMetrics,
    attempt: { problemId: string; status: 'accepted' | 'wrong_answer'; topic: string; durationSeconds: number }
  ): LearnerProfileMetrics {
    const isSuccess = attempt.status === 'accepted';
    const newAccuracy = Math.min(100, Math.max(0, profile.accuracy * 0.9 + (isSuccess ? 10 : 0)));
    const newMastery = Math.min(100, Math.max(0, profile.masteryScore + (isSuccess ? 0.5 : -0.2)));

    let updatedStrengths = [...profile.strengths];
    let updatedWeaknesses = [...profile.weaknesses];

    if (isSuccess && !updatedStrengths.includes(attempt.topic)) {
      updatedStrengths.push(attempt.topic);
      updatedWeaknesses = updatedWeaknesses.filter((w) => w !== attempt.topic);
    } else if (!isSuccess && !updatedWeaknesses.includes(attempt.topic)) {
      updatedWeaknesses.push(attempt.topic);
    }

    return {
      ...profile,
      accuracy: parseFloat(newAccuracy.toFixed(1)),
      masteryScore: parseFloat(newMastery.toFixed(1)),
      strengths: updatedStrengths,
      weaknesses: updatedWeaknesses,
      lastUpdated: new Date().toISOString(),
    };
  }
}
