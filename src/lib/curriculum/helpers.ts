import { Phase, Topic } from '@/src/types/curriculum';

export function findPhaseById(phases: Phase[], id: string): Phase | undefined {
  return phases.find(phase => phase.id === id);
}

export function findTopicsByPhase(topics: Topic[], phaseId: string): Topic[] {
  return topics.filter(topic => topic.phaseId === phaseId).sort((a, b) => a.order - b.order);
}

export function validateUniqueIds<T extends { id: string }>(items: T[]): boolean {
  const ids = items.map(item => item.id);
  return new Set(ids).size === ids.length;
}
