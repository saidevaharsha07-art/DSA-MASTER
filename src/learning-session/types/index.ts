import { RecognitionReport } from '@/src/recognition/types';

export type SessionState = 'idle' | 'recognition' | 'solving' | 'completed' | 'cancelled';

export interface LearningSessionState {
  sessionId: string;
  problemId: string;
  startedAt: string;
  endedAt: string | null;
  elapsedTime: number;
  state: SessionState;
  
  recognitionScore: number | null;
  patternsDetected: string[];
  
  conceptsLearned: string[];
  conceptsImproved: string[];
  masteryDelta: Record<string, number>;
  
  revisionScheduled: string[];
  nextProblems: string[];
  
  experiencePoints: number;
  streakChanges: number;
}
