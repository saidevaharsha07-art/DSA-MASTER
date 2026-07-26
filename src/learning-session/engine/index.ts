import { LearningSessionState } from '../types';
import { eventBus } from '../events';
import { RecognitionReport } from '@/src/recognition/types';
import { getProblem } from '@/src/problem-dna/loader';
import { memoryEngine } from '@/src/memory/engine';

class LearningSessionEngine {
  private currentSession: LearningSessionState | null = null;
  
  public startSession(problemId: string): LearningSessionState {
    this.currentSession = {
      sessionId: crypto.randomUUID(),
      problemId,
      startedAt: new Date().toISOString(),
      endedAt: null,
      elapsedTime: 0,
      state: 'recognition',
      recognitionScore: null,
      patternsDetected: [],
      conceptsLearned: [],
      conceptsImproved: [],
      masteryDelta: {},
      revisionScheduled: [],
      nextProblems: [],
      experiencePoints: 0,
      streakChanges: 0,
    };
    
    eventBus.emit('SessionStarted', this.currentSession);
    return this.currentSession;
  }
  
  public submitRecognition(report: RecognitionReport) {
    if (!this.currentSession) return;
    this.currentSession.recognitionScore = report.score.overallScore;
    this.currentSession.patternsDetected = report.correctlyIdentifiedSignals;
    this.currentSession.state = 'solving';
    
    eventBus.emit('RecognitionCompleted', report);
  }
  
  public async completeSession(status: 'success' | 'failed', timeSpentSeconds: number) {
    if (!this.currentSession) return;
    
    this.currentSession.elapsedTime = timeSpentSeconds;
    this.currentSession.endedAt = new Date().toISOString();
    this.currentSession.state = 'completed';
    
    const problem = await getProblem(this.currentSession.problemId);
    if (!problem) return;
    
    const concepts = [...problem.patterns, ...problem.subPatterns];
    
    if (status === 'success') {
      eventBus.emit('ProblemSolved', { problemId: problem.id, timeSpentSeconds });
      this.currentSession.experiencePoints = 10 * problem.difficulty.length;
    } else {
      eventBus.emit('ProblemFailed', { problemId: problem.id, timeSpentSeconds });
    }
    
    const score = status === 'success' ? 100 : 0;
    
    memoryEngine.recordEvent(problem.id, status === 'success' ? 'problem_solved' : 'problem_failed', score, timeSpentSeconds);
    
    concepts.forEach(conceptId => {
      const stateBefore = memoryEngine.getState().concepts[conceptId]?.masteryScore || 0;
      memoryEngine.recordEvent(conceptId, status === 'success' ? 'problem_solved' : 'problem_failed', score, timeSpentSeconds);
      const stateAfter = memoryEngine.getState().concepts[conceptId].masteryScore;
      
      this.currentSession!.masteryDelta[conceptId] = stateAfter - stateBefore;
      if (stateAfter > stateBefore) {
        this.currentSession!.conceptsImproved.push(conceptId);
      }
      
      this.currentSession!.revisionScheduled.push(conceptId);
    });
    
    eventBus.emit('MemoryUpdated', { memoryChanges: this.currentSession.masteryDelta });
    eventBus.emit('RevisionScheduled', { items: this.currentSession.revisionScheduled });
    
    this.currentSession.nextProblems = status === 'success' ? problem.relatedProblems : problem.patterns;
    
    eventBus.emit('KnowledgeGraphUpdated', { conceptsUpdated: concepts });
    eventBus.emit('DashboardUpdated', { xp: this.currentSession.experiencePoints, streak: 0 });
    
    eventBus.emit('SessionCompleted', this.currentSession);
    
    return this.currentSession;
  }
  
  public cancelSession() {
    if (!this.currentSession) return;
    this.currentSession.state = 'cancelled';
    this.currentSession.endedAt = new Date().toISOString();
    eventBus.emit('SessionCancelled', this.currentSession);
    this.currentSession = null;
  }
  
  public getCurrentSession() {
    return this.currentSession;
  }
}

export const learningSessionEngine = new LearningSessionEngine();
