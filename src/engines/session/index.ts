import { eventBus } from '../../core/events';
import { storage } from '../../core/storage/LocalStorageAdapter';

export interface ActiveSession {
  id: string;
  startTime: string;
  problemsSolved: number;
}

class SessionEngine {
  startSession(): void {
    const current = this.getActiveSession();
    if (current) return;

    const sessionId = `session-${Date.now()}`;
    const startTime = new Date().toISOString();
    
    const newSession: ActiveSession = {
      id: sessionId,
      startTime,
      problemsSolved: 0
    };
    
    storage.save('dsa_active_session', newSession);
    eventBus.publish('SessionStarted', { sessionId, timestamp: startTime });
  }

  getActiveSession(): ActiveSession | null {
    return storage.get<ActiveSession>('dsa_active_session');
  }

  recordProblemSolved(): void {
    const session = this.getActiveSession();
    if (session) {
      storage.save('dsa_active_session', { ...session, problemsSolved: session.problemsSolved + 1 });
    }
  }

  finishSession(): void {
    const session = this.getActiveSession();
    if (!session) return;

    const durationSeconds = Math.floor((Date.now() - new Date(session.startTime).getTime()) / 1000);
    
    eventBus.publish('SessionFinished', { 
      sessionId: session.id, 
      durationSeconds, 
      problemsSolved: session.problemsSolved 
    });

    storage.remove('dsa_active_session');
  }
}

export const sessionEngine = new SessionEngine();

// Subscribe to ProblemSolved to track session stats
eventBus.subscribe('ProblemSolved', () => {
  sessionEngine.recordProblemSolved();
});
