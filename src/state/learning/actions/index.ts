import { LearningState } from '../types';

export type LearningAction =
  | { type: 'HYDRATE'; payload: Partial<LearningState> }
  | { type: 'SET_CURRENT_LOCATION'; payload: { phase?: string; topic?: string; pattern?: string } }
  | { type: 'UNLOCK_PATTERN'; payload: string }
  | { type: 'COMPLETE_PATTERN'; payload: string }
  | { type: 'UPDATE_PATTERN_MASTERY'; payload: { patternId: string; delta: number } }
  | { type: 'MARK_PROBLEM_SOLVED'; payload: { problemId: string; xpGained: number } }
  | { type: 'RECORD_PROBLEM_ATTEMPT'; payload: string }
  | { type: 'ADD_LEARNING_TIME'; payload: number }
  | { type: 'UPDATE_DAILY_MISSION'; payload: { missionId: string; progressDelta: number } }
  | { type: 'TOGGLE_BOOKMARK'; payload: string }
  | { type: 'ADD_TO_REVISION_QUEUE'; payload: string }
  | { type: 'RESET_STATE' };
