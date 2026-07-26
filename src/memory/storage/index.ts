import { MemoryState } from '../types';

const MEMORY_STORAGE_KEY = 'dsa_master_memory_engine_v1';

export function saveMemoryState(state: MemoryState) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(MEMORY_STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save memory state', error);
  }
}

export function loadMemoryState(): MemoryState {
  if (typeof window === 'undefined') return { concepts: {}, version: 1 };
  try {
    const item = localStorage.getItem(MEMORY_STORAGE_KEY);
    if (!item) return { concepts: {}, version: 1 };
    return JSON.parse(item);
  } catch (error) {
    console.error('Failed to load memory state', error);
    return { concepts: {}, version: 1 };
  }
}
