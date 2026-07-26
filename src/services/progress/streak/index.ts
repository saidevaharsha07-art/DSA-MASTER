export interface StreakState {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  recoveryTokens: number;
  activeDates: string[]; // YYYY-MM-DD
}

export function updateStreakOnActivity(state: StreakState): { state: StreakState; streakIncreased: boolean } {
  const today = new Date().toISOString().split('T')[0];

  if (state.activeDates.includes(today)) {
    return { state, streakIncreased: false };
  }

  const newActiveDates = [...state.activeDates, today];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  let newCurrentStreak = state.currentStreak;
  let newTokens = state.recoveryTokens;

  if (state.lastActiveDate === yesterday) {
    newCurrentStreak += 1;
  } else if (state.lastActiveDate === today) {
    // Already logged today
  } else if (state.lastActiveDate && state.recoveryTokens > 0) {
    // Auto-consume recovery token to preserve streak!
    newTokens -= 1;
    newCurrentStreak += 1;
  } else {
    newCurrentStreak = 1;
  }

  const newLongestStreak = Math.max(state.longestStreak, newCurrentStreak);

  const updatedState: StreakState = {
    currentStreak: newCurrentStreak,
    longestStreak: newLongestStreak,
    lastActiveDate: today,
    recoveryTokens: newTokens,
    activeDates: newActiveDates,
  };

  return { state: updatedState, streakIncreased: true };
}
