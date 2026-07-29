export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatar: string;
  level: number;
  score: number;
  title: string;
  guildTag?: string;
}

export const MOCK_LEADERBOARD_XP: LeaderboardEntry[] = [
  { rank: 1, userId: 'u1', username: 'AlexSupercoder', avatar: '/avatars/1.png', level: 42, score: 98400, title: 'DP Sage', guildTag: 'AK' },
  { rank: 2, userId: 'u2', username: 'AnanyaDev', avatar: '/avatars/2.png', level: 38, score: 85200, title: 'Graph Warden', guildTag: 'AK' },
  { rank: 3, userId: 'u3', username: 'RahulAlgo', avatar: '/avatars/3.png', level: 31, score: 62100, title: 'Algorithm Knight', guildTag: 'DS' },
  { rank: 4, userId: 'u4', username: 'ArchonCoder', avatar: '/avatars/4.png', level: 18, score: 4800, title: 'Algorithm Knight', guildTag: 'AK' },
];

class LeaderboardService {
  public getGlobalXpLeaderboard(): LeaderboardEntry[] {
    return MOCK_LEADERBOARD_XP;
  }
}

export const leaderboardService = new LeaderboardService();
