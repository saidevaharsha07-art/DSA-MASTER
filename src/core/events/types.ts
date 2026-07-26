export type EventType =
  | 'ProblemSolved'
  | 'PatternCompleted'
  | 'AchievementUnlocked'
  | 'ReflectionAdded'
  | 'PredictionSubmitted'
  | 'SessionStarted'
  | 'SessionFinished'
  | 'RevisionCompleted'
  | 'VisualizationFinished'
  | 'SettingsUpdated'
  | 'DataImported';

export interface EventPayload {
  ProblemSolved: { problemId: string; patternId: string; timeTakenSeconds: number };
  PatternCompleted: { patternId: string };
  AchievementUnlocked: { achievementId: string; title: string };
  ReflectionAdded: { problemId: string; patternId: string; concept: string; reflectionText: string };
  PredictionSubmitted: { 
    problemId: string; 
    predictedPatternId: string; 
    predictedComplexity: string; 
    confidence: number;
    correctPattern: boolean;
  };
  SessionStarted: { sessionId: string; timestamp: string };
  SessionFinished: { sessionId: string; durationSeconds: number; problemsSolved: number };
  RevisionCompleted: { patternId: string; retentionScore: number };
  VisualizationFinished: { patternId: string; problemId: string };
  SettingsUpdated: any; // Using any or AppSettings here (will use any to avoid circular import)
  DataImported: null;
}

export interface AppEvent<T extends EventType> {
  type: T;
  payload: EventPayload[T];
  timestamp: string;
}

export type EventCallback<T extends EventType> = (event: AppEvent<T>) => void;
