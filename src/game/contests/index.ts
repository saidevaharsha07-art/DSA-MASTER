export type EloTier = 
  | 'Bronze'
  | 'Silver'
  | 'Gold'
  | 'Platinum'
  | 'Diamond'
  | 'Master'
  | 'Grandmaster'
  | 'Legend';

export interface Contest {
  id: string;
  title: string;
  type: 'Daily' | 'Weekly' | 'Guild War' | 'Marathon';
  startTime: string;
  durationMinutes: number;
  registeredCount: number;
  prizePoolXp: number;
  status: 'upcoming' | 'live' | 'ended';
}

export const MOCK_CONTESTS: Contest[] = [
  {
    id: 'c_weekly_102',
    title: 'Weekly Archon Tournament #102',
    type: 'Weekly',
    startTime: '2026-07-28T18:00:00Z',
    durationMinutes: 90,
    registeredCount: 1420,
    prizePoolXp: 10000,
    status: 'upcoming',
  },
  {
    id: 'c_guild_war_04',
    title: 'Guild Clash: DP Mastery War',
    type: 'Guild War',
    startTime: '2026-07-30T12:00:00Z',
    durationMinutes: 120,
    registeredCount: 48,
    prizePoolXp: 25000,
    status: 'upcoming',
  },
];

export function getEloTier(rating: number): EloTier {
  if (rating < 1200) return 'Bronze';
  if (rating < 1400) return 'Silver';
  if (rating < 1600) return 'Gold';
  if (rating < 1800) return 'Platinum';
  if (rating < 2000) return 'Diamond';
  if (rating < 2200) return 'Master';
  if (rating < 2400) return 'Grandmaster';
  return 'Legend';
}

class ContestService {
  public getUpcomingContests(): Contest[] {
    return MOCK_CONTESTS;
  }
}

export const contestService = new ContestService();
