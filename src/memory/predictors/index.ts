import { MemoryConcept } from '../types';

export function calculateNextReview(concept: MemoryConcept): string {
  if (concept.reviewHistory.length === 0) {
    return new Date().toISOString();
  }
  
  let interval = 1;
  if (concept.stabilityScore > 80) interval = 14;
  else if (concept.stabilityScore > 50) interval = 7;
  else if (concept.stabilityScore > 20) interval = 3;
  
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + interval);
  return nextDate.toISOString();
}

export function calculateForgettingRisk(concept: MemoryConcept): number {
  if (!concept.lastReviewed) return 100;
  
  const lastReviewTime = new Date(concept.lastReviewed).getTime();
  const now = new Date().getTime();
  const daysSinceReview = (now - lastReviewTime) / (1000 * 60 * 60 * 24);
  
  const decayRate = Math.max(0.01, (100 - concept.stabilityScore) / 100);
  
  const risk = Math.min(100, Math.max(0, (daysSinceReview * decayRate * 10)));
  return risk;
}
