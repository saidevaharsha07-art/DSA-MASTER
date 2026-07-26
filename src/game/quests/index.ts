import { Quest } from '../player/types';

export const DEFAULT_DAILY_QUESTS: Quest[] = [
  {
    id: 'q_daily_1',
    title: 'Solve 3 Easy Problems',
    description: 'Solve 3 easy difficulty problems in the Practice Arena.',
    targetCount: 3,
    currentCount: 1,
    xpReward: 150,
    coinReward: 30,
    completed: false,
    type: 'daily',
  },
  {
    id: 'q_daily_2',
    title: 'Complete 1 Spaced Revision',
    description: 'Review 1 problem in the Revision Sanctuary.',
    targetCount: 1,
    currentCount: 1,
    xpReward: 100,
    coinReward: 20,
    completed: true,
    type: 'daily',
  },
  {
    id: 'q_daily_3',
    title: 'Gain 150 XP',
    description: 'Earn 150 XP today across any learning activity.',
    targetCount: 150,
    currentCount: 150,
    xpReward: 100,
    coinReward: 25,
    completed: true,
    type: 'daily',
  },
];

export const DEFAULT_WEEKLY_QUESTS: Quest[] = [
  {
    id: 'q_weekly_1',
    title: 'Complete 20 Problems',
    description: 'Solve 20 problems across any DSA kingdom this week.',
    targetCount: 20,
    currentCount: 12,
    xpReward: 800,
    coinReward: 150,
    completed: false,
    type: 'weekly',
  },
  {
    id: 'q_weekly_2',
    title: 'Earn 1000 XP',
    description: 'Accumulate 1,000 XP this week.',
    targetCount: 1000,
    currentCount: 750,
    xpReward: 500,
    coinReward: 100,
    completed: false,
    type: 'weekly',
  },
];
