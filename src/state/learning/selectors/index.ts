import { LearningState } from '../types';

export const getCurrentPattern = (state: LearningState) => state.currentPattern;

export const getDailyMission = (state: LearningState) => state.currentMissions;

export const getWeakPatterns = (state: LearningState) => {
  return Object.entries(state.patternMastery)
    .filter(([_, score]) => score < 50)
    .map(([patternId]) => patternId);
};

export const getRevisionCount = (state: LearningState) => state.revisionQueue.length;

export const getCompletionPercentage = (state: LearningState, totalPatterns: number) => {
  if (totalPatterns === 0) return 0;
  return Math.round((state.completedPatterns.length / totalPatterns) * 100);
};

export const getInterviewReadiness = (state: LearningState) => state.interviewReadiness;

export const getProblemAttempts = (state: LearningState, problemId: string) => {
  return state.problemAttempts[problemId] || 0;
};

export const isProblemSolved = (state: LearningState, problemId: string) => {
  return state.solvedProblems.includes(problemId);
};

export const isPatternUnlocked = (state: LearningState, patternId: string) => {
  return state.unlockedPatterns.includes(patternId);
};

export const getDailyXp = (state: LearningState) => state.dailyXp;
