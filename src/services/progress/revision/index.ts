import { ConfidenceRating } from '../types';

export const REVISION_INTERVALS_DAYS = [1, 3, 7, 14, 30, 45, 60, 75, 90];

export function calculateNextRevisionDate(currentStage: number, confidence: ConfidenceRating): { nextStage: number; nextDate: string } {
  let nextStage = currentStage;

  switch (confidence) {
    case 'very_easy':
      nextStage = Math.min(REVISION_INTERVALS_DAYS.length - 1, currentStage + 2);
      break;
    case 'easy':
      nextStage = Math.min(REVISION_INTERVALS_DAYS.length - 1, currentStage + 1);
      break;
    case 'medium':
      nextStage = currentStage;
      break;
    case 'hard':
      nextStage = Math.max(0, currentStage - 1);
      break;
    case 'forgot_everything':
      nextStage = 0;
      break;
  }

  const daysToAdd = REVISION_INTERVALS_DAYS[nextStage] || 1;
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + daysToAdd);

  return {
    nextStage,
    nextDate: nextDate.toISOString().split('T')[0],
  };
}
