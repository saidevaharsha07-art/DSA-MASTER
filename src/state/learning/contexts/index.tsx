'use client';

import React, { createContext, useReducer, useEffect, ReactNode } from 'react';
import { LearningState } from '../types';
import { LearningAction } from '../actions';
import { saveStateToStorage, loadStateFromStorage } from '../storage';

const initialState: LearningState = {
  currentPhase: null,
  currentTopic: null,
  currentPattern: null,
  unlockedPatterns: [],
  completedPatterns: [],
  patternMastery: {},
  solvedProblems: [],
  problemAttempts: {},
  dailyXp: 0,
  currentStreak: 0,
  lastActiveDate: null,
  achievements: [],
  bookmarks: [],
  pinnedNotes: [],
  revisionQueue: [],
  learningTimeSeconds: 0,
  currentMissions: [],
  weeklyGoal: {
    targetXp: 1000,
    currentXp: 0,
  },
  interviewReadiness: 0,
  isHydrated: false,
};

function learningReducer(state: LearningState, action: LearningAction): LearningState {
  let newState = state;

  switch (action.type) {
    case 'HYDRATE':
      newState = { ...state, ...action.payload, isHydrated: true };
      break;
    case 'SET_CURRENT_LOCATION':
      newState = { ...state, ...action.payload };
      break;
    case 'UNLOCK_PATTERN':
      if (!state.unlockedPatterns.includes(action.payload)) {
        newState = { ...state, unlockedPatterns: [...state.unlockedPatterns, action.payload] };
      }
      break;
    case 'COMPLETE_PATTERN':
      if (!state.completedPatterns.includes(action.payload)) {
        newState = { ...state, completedPatterns: [...state.completedPatterns, action.payload] };
      }
      break;
    case 'UPDATE_PATTERN_MASTERY':
      const currentMastery = state.patternMastery[action.payload.patternId] || 0;
      newState = {
        ...state,
        patternMastery: {
          ...state.patternMastery,
          [action.payload.patternId]: Math.max(0, Math.min(100, currentMastery + action.payload.delta))
        }
      };
      break;
    case 'MARK_PROBLEM_SOLVED':
      if (!state.solvedProblems.includes(action.payload.problemId)) {
        newState = {
          ...state,
          solvedProblems: [...state.solvedProblems, action.payload.problemId],
          dailyXp: state.dailyXp + action.payload.xpGained,
          weeklyGoal: { ...state.weeklyGoal, currentXp: state.weeklyGoal.currentXp + action.payload.xpGained }
        };
      }
      break;
    case 'RECORD_PROBLEM_ATTEMPT':
      newState = {
        ...state,
        problemAttempts: {
          ...state.problemAttempts,
          [action.payload]: (state.problemAttempts[action.payload] || 0) + 1
        }
      };
      break;
    case 'ADD_LEARNING_TIME':
      newState = { ...state, learningTimeSeconds: state.learningTimeSeconds + action.payload };
      break;
    case 'TOGGLE_BOOKMARK':
      newState = {
        ...state,
        bookmarks: state.bookmarks.includes(action.payload)
          ? state.bookmarks.filter(id => id !== action.payload)
          : [...state.bookmarks, action.payload]
      };
      break;
    case 'ADD_TO_REVISION_QUEUE':
      if (!state.revisionQueue.includes(action.payload)) {
        newState = { ...state, revisionQueue: [...state.revisionQueue, action.payload] };
      }
      break;
    case 'RESET_STATE':
      newState = { ...initialState, isHydrated: true };
      break;
    default:
      return state;
  }

  // Persist side effect (if state changed and is fully hydrated)
  if (newState !== state && newState.isHydrated) {
    saveStateToStorage(newState);
  }

  return newState;
}

export const LearningContext = createContext<{
  state: LearningState;
  dispatch: React.Dispatch<LearningAction>;
} | undefined>(undefined);

export function LearningProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(learningReducer, initialState);

  useEffect(() => {
    const loadedState = loadStateFromStorage();
    if (loadedState) {
      dispatch({ type: 'HYDRATE', payload: loadedState });
    } else {
      dispatch({ type: 'HYDRATE', payload: {} }); // Just set hydrated flag
    }
  }, []);

  return (
    <LearningContext.Provider value={{ state, dispatch }}>
      {children}
    </LearningContext.Provider>
  );
}
