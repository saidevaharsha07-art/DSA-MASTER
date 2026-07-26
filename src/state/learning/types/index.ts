export interface DailyMission {
  id: string;
  type: 'Learn' | 'Practice' | 'Revise';
  target: number;
  progress: number;
  xpReward: number;
  isCompleted: boolean;
}

export interface LearningState {
  // Navigation
  currentPhase: string | null;
  currentTopic: string | null;
  currentPattern: string | null;

  // Patterns
  unlockedPatterns: string[];
  completedPatterns: string[];
  patternMastery: Record<string, number>;

  // Problems
  solvedProblems: string[];
  problemAttempts: Record<string, number>;

  // Gamification & Engagement
  dailyXp: number;
  currentStreak: number;
  lastActiveDate: string | null;
  achievements: string[];
  
  // Organization
  bookmarks: string[];
  pinnedNotes: string[];

  // SRS & Time
  revisionQueue: string[];
  learningTimeSeconds: number;

  // Goals
  currentMissions: DailyMission[];
  weeklyGoal: {
    targetXp: number;
    currentXp: number;
  };
  
  // Meta
  interviewReadiness: number;
  isHydrated: boolean;
}
