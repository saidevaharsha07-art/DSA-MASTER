import { eventBus } from '../../core/events';
import { curriculumEngine } from '../curriculum';
import { storage } from '../../core/storage/LocalStorageAdapter';

export interface ThinkingState {
  problemId: string;
  predictedPatternId: string | null;
  predictedComplexity: string | null;
  strategy: string;
  confidence: number;
}

class ThinkingEngine {
  startThinkingPhase(problemId: string): void {
    storage.save(`thinking_state_${problemId}`, {
      problemId,
      predictedPatternId: null,
      predictedComplexity: null,
      strategy: '',
      confidence: 50
    });
  }

  getThinkingState(problemId: string): ThinkingState | null {
    return storage.get<ThinkingState>(`thinking_state_${problemId}`);
  }

  updateThinkingState(problemId: string, updates: Partial<ThinkingState>): void {
    storage.update<ThinkingState>(`thinking_state_${problemId}`, (prev) => {
      if (!prev) throw new Error('Thinking state not initialized');
      return { ...prev, ...updates };
    });
  }

  submitPrediction(problemId: string): void {
    const state = this.getThinkingState(problemId);
    if (!state || !state.predictedPatternId || !state.predictedComplexity) {
      throw new Error('Incomplete thinking phase');
    }

    const problem = curriculumEngine.getProblem(problemId);
    const correctPatternId = problem?.patterns?.[0] || '';
    
    const correctPattern = state.predictedPatternId === correctPatternId;

    eventBus.publish('PredictionSubmitted', {
      problemId,
      predictedPatternId: state.predictedPatternId,
      predictedComplexity: state.predictedComplexity,
      confidence: state.confidence,
      correctPattern
    });
  }

  evaluatePrediction(problemId: string) {
    const state = this.getThinkingState(problemId);
    const problem = curriculumEngine.getProblem(problemId);
    if (!state || !problem) return null;

    const correctPatternId = problem.patterns?.[0] || '';
    const isPatternCorrect = state.predictedPatternId === correctPatternId;
    const optimalPattern = curriculumEngine.getPattern(correctPatternId);

    return {
      userPattern: state.predictedPatternId,
      correctPattern: correctPatternId,
      isPatternCorrect,
      explanation: isPatternCorrect 
        ? `Spot on. ${optimalPattern?.title} is perfect here.` 
        : `You chose ${state.predictedPatternId}, but ${optimalPattern?.title} is optimal because of the problem's constraints.`
    };
  }

  submitReflection(problemId: string, patternId: string, concept: string, reflectionText: string): void {
    eventBus.publish('ReflectionAdded', {
      problemId,
      patternId,
      concept,
      reflectionText
    });
  }
}

export const thinkingEngine = new ThinkingEngine();
