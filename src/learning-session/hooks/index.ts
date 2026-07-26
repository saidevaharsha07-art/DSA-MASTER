'use client';
import { useState, useEffect } from 'react';
import { eventBus, LearningEventType } from '../events';
import { learningSessionEngine } from '../engine';
import { LearningSessionState } from '../types';

export function useLearningSession() {
  const [session, setSession] = useState<LearningSessionState | null>(learningSessionEngine.getCurrentSession());

  useEffect(() => {
    const unsubStart = eventBus.subscribe('SessionStarted', (payload) => setSession(payload as LearningSessionState));
    const unsubComplete = eventBus.subscribe('SessionCompleted', (payload) => setSession(payload as LearningSessionState));
    const unsubCancel = eventBus.subscribe('SessionCancelled', () => setSession(null));
    
    return () => {
      unsubStart();
      unsubComplete();
      unsubCancel();
    };
  }, []);

  return {
    session,
    startSession: (problemId: string) => learningSessionEngine.startSession(problemId),
    submitRecognition: (report: any) => learningSessionEngine.submitRecognition(report),
    completeSession: (status: 'success' | 'failed', timeSpent: number) => learningSessionEngine.completeSession(status, timeSpent),
    cancelSession: () => learningSessionEngine.cancelSession()
  };
}

export function useLearningEvent(event: LearningEventType, callback: (payload: any) => void) {
  useEffect(() => {
    return eventBus.subscribe(event, callback);
  }, [event, callback]);
}
