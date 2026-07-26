import { LearningSessionState } from '../types';

export type LearningEventType =
  | 'SessionStarted'
  | 'RecognitionCompleted'
  | 'ProblemSolved'
  | 'ProblemFailed'
  | 'MemoryUpdated'
  | 'RevisionScheduled'
  | 'KnowledgeGraphUpdated'
  | 'DashboardUpdated'
  | 'SessionCompleted'
  | 'SessionCancelled';

type EventCallback = (payload: any) => void;

class EventBus {
  private listeners: Record<string, EventCallback[]> = {};

  subscribe(event: LearningEventType, callback: EventCallback): () => void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
    
    return () => {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    };
  }

  emit(event: LearningEventType, payload: any) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => {
        try {
          cb(payload);
        } catch (e) {
          console.error(`Error in event listener for ${event}:`, e);
        }
      });
    }
  }
}

export const eventBus = new EventBus();
