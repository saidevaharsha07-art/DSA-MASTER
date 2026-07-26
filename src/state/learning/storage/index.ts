import { LearningState } from '../types';

export const LEARNING_STORAGE_KEY = 'dsa_master_learning_state_v1';

export function saveStateToStorage(state: LearningState) {
  if (typeof window === 'undefined') return;
  try {
    const stateToSave = { ...state, isHydrated: false };
    localStorage.setItem(LEARNING_STORAGE_KEY, JSON.stringify(stateToSave));
  } catch (error) {
    console.error('Failed to save learning state', error);
  }
}

export function loadStateFromStorage(): Partial<LearningState> | null {
  if (typeof window === 'undefined') return null;
  try {
    const item = localStorage.getItem(LEARNING_STORAGE_KEY);
    if (!item) return null;
    return JSON.parse(item);
  } catch (error) {
    console.error('Failed to load learning state', error);
    return null;
  }
}

export function clearStateFromStorage() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(LEARNING_STORAGE_KEY);
}
