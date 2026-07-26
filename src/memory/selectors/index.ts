import { MemoryState } from '../types';

export const getWeakConcepts = (state: MemoryState) => {
  return Object.values(state.concepts).filter(c => c.masteryScore < 50);
};

export const getStableConcepts = (state: MemoryState) => {
  return Object.values(state.concepts).filter(c => c.stabilityScore >= 80);
};

export const getForgettingRisk = (state: MemoryState, conceptId: string) => {
  return state.concepts[conceptId]?.forgettingRisk ?? 100;
};

export const getNextReview = (state: MemoryState, conceptId: string) => {
  return state.concepts[conceptId]?.nextReview ?? null;
};

export const getMasteryTimeline = (state: MemoryState, conceptId: string) => {
  const concept = state.concepts[conceptId];
  if (!concept) return [];
  
  return concept.reviewHistory.map(evt => ({
    date: evt.timestamp,
    score: evt.score
  }));
};

export const getDueForReview = (state: MemoryState) => {
  const now = new Date().getTime();
  return Object.values(state.concepts)
    .filter(c => c.nextReview && new Date(c.nextReview).getTime() <= now)
    .sort((a, b) => b.forgettingRisk - a.forgettingRisk);
};
