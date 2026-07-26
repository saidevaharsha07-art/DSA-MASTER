import { Phase, Topic } from '@/src/types/curriculum';

export const phases: Phase[] = [
  {
    id: 'phase-01',
    title: 'Foundations',
    description: 'Basic data structures and core algorithmic patterns.',
    order: 1,
  }
];

export const topics: Topic[] = [
  {
    id: 'arrays',
    phaseId: 'phase-01',
    title: 'Arrays',
    description: 'Fundamental array operations and techniques.',
    order: 1,
  }
];

export const patternRegistry: Record<string, string[]> = {
  'arrays': ['prefix-sum']
};

export const patternMap: Record<string, { phaseId: string, topicId: string }> = {
  'prefix-sum': { phaseId: 'phase-01', topicId: 'arrays' }
};
