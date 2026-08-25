/**
 * Leaderboard Repository Interface & Mock Memory Implementation
 * Abstracted repository allowing future cloud databases (Supabase, Firebase, Postgres).
 */

import { PublicProfileSummary } from '../models/profile-summary.models';
import { LeaderboardEntry } from '../models/leaderboard-entry.models';

export interface ILeaderboardRepository {
  getProfileByUsername(username: string): Promise<PublicProfileSummary | null>;
  getAllProfiles(): Promise<ReadonlyArray<PublicProfileSummary>>;
  saveProfile(profile: PublicProfileSummary): Promise<void>;
}

export class MockLeaderboardRepository implements ILeaderboardRepository {
  private profiles: Map<string, PublicProfileSummary> = new Map();

  constructor() {
    this.seedMockData();
  }

  private seedMockData(): void {
    const mocks: PublicProfileSummary[] = [
      {
        userId: 'usr-1',
        username: 'tourist',
        xp: 15400,
        globalRank: 1,
        rating: 3800,
        streak: 42,
        learningScore: 98,
        kingdomProgressPercent: 100,
        patternProgressPercent: 100,
        contestCount: 150,
        memoryHealthScore: 99,
        oracleScore: 99,
        badges: [],
        titles: [{ id: 't1', title: 'Grandmaster', description: 'Top Ranked Coder', unlockedAt: '2026-01-01' }],
        achievementCount: 25,
        joinedDate: '2025-01-01',
        country: 'International',
        college: 'ITMO',
      },
      {
        userId: 'usr-2',
        username: 'petr',
        xp: 12100,
        globalRank: 2,
        rating: 3400,
        streak: 15,
        learningScore: 94,
        kingdomProgressPercent: 90,
        patternProgressPercent: 85,
        contestCount: 120,
        memoryHealthScore: 92,
        oracleScore: 95,
        badges: [],
        titles: [{ id: 't2', title: 'Master', description: 'Elite Competitor', unlockedAt: '2025-06-01' }],
        achievementCount: 20,
        joinedDate: '2025-02-01',
        country: 'Switzerland',
        college: 'MSU',
      },
      {
        userId: 'usr-3',
        username: 'saideva',
        xp: 4500,
        globalRank: 3,
        rating: 1650,
        streak: 7,
        learningScore: 78,
        kingdomProgressPercent: 65,
        patternProgressPercent: 60,
        contestCount: 12,
        memoryHealthScore: 82,
        oracleScore: 80,
        badges: [],
        titles: [{ id: 't3', title: 'Problem Slayer', description: 'Solved 7 consecutive days', unlockedAt: '2026-07-30' }],
        achievementCount: 8,
        joinedDate: '2026-03-15',
        country: 'India',
        college: 'IIIT',
      },
    ];

    mocks.forEach((p) => this.profiles.set(p.username.toLowerCase(), p));
  }

  public async getProfileByUsername(username: string): Promise<PublicProfileSummary | null> {
    return this.profiles.get(username.toLowerCase()) || null;
  }

  public async getAllProfiles(): Promise<ReadonlyArray<PublicProfileSummary>> {
    return Array.from(this.profiles.values());
  }

  public async saveProfile(profile: PublicProfileSummary): Promise<void> {
    this.profiles.set(profile.username.toLowerCase(), profile);
  }
}
