'use client';

import { useContext } from 'react';
import { LearningContext } from '../contexts';
import * as selectors from '../selectors';

export function useLearning() {
  const context = useContext(LearningContext);
  if (context === undefined) {
    throw new Error('useLearning must be used within a LearningProvider');
  }

  const { state, dispatch } = context;

  // Bind selectors to current state
  const boundSelectors = {
    currentPattern: selectors.getCurrentPattern(state),
    dailyMission: selectors.getDailyMission(state),
    weakPatterns: selectors.getWeakPatterns(state),
    revisionCount: selectors.getRevisionCount(state),
    completionPercentage: (totalPatterns: number) => selectors.getCompletionPercentage(state, totalPatterns),
    interviewReadiness: selectors.getInterviewReadiness(state),
    isProblemSolved: (problemId: string) => selectors.isProblemSolved(state, problemId),
    problemAttempts: (problemId: string) => selectors.getProblemAttempts(state, problemId),
    isPatternUnlocked: (patternId: string) => selectors.isPatternUnlocked(state, patternId),
    dailyXp: selectors.getDailyXp(state),
  };

  return {
    state,
    dispatch,
    ...boundSelectors,
  };
}
