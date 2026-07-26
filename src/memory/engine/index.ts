import { MemoryConcept, ReviewHistoryEvent, MistakeHistoryEvent, MemoryState } from '../types';
import { calculateNextReview, calculateForgettingRisk } from '../predictors';
import { loadMemoryState, saveMemoryState } from '../storage';

export class MemoryEngine {
  private state: MemoryState;

  constructor() {
    this.state = loadMemoryState();
  }

  private initConcept(conceptId: string): MemoryConcept {
    if (!this.state.concepts[conceptId]) {
      this.state.concepts[conceptId] = {
        conceptId,
        masteryScore: 0,
        confidenceScore: 0,
        retrievalStrength: 0,
        lastReviewed: null,
        nextReview: new Date().toISOString(),
        reviewHistory: [],
        mistakeHistory: [],
        forgettingRisk: 100,
        learningVelocity: 0,
        stabilityScore: 0,
      };
    }
    return this.state.concepts[conceptId];
  }

  public recordEvent(
    conceptId: string, 
    eventType: ReviewHistoryEvent['eventType'], 
    score: number, 
    timeSpentSeconds: number,
    mistakes?: MistakeHistoryEvent[]
  ) {
    const concept = this.initConcept(conceptId);
    
    const event: ReviewHistoryEvent = {
      timestamp: new Date().toISOString(),
      eventType,
      score,
      timeSpentSeconds
    };
    
    concept.reviewHistory.push(event);
    if (mistakes) {
      concept.mistakeHistory.push(...mistakes);
    }
    
    concept.lastReviewed = event.timestamp;

    const prevMastery = concept.masteryScore;
    
    if (score >= 80) {
      concept.stabilityScore = Math.min(100, concept.stabilityScore + 10);
      concept.masteryScore = Math.min(100, concept.masteryScore + (100 - concept.masteryScore) * 0.2);
    } else {
      concept.stabilityScore = Math.max(0, concept.stabilityScore - 20);
      concept.masteryScore = Math.max(0, concept.masteryScore - 5);
    }
    
    concept.learningVelocity = concept.masteryScore - prevMastery;
    concept.retrievalStrength = score; 
    concept.nextReview = calculateNextReview(concept);
    concept.forgettingRisk = calculateForgettingRisk(concept);
    
    this.state.concepts[conceptId] = concept;
    this.persist();
  }
  
  public updateAllForgettingRisks() {
    for (const id in this.state.concepts) {
      this.state.concepts[id].forgettingRisk = calculateForgettingRisk(this.state.concepts[id]);
    }
    this.persist();
  }

  private persist() {
    saveMemoryState(this.state);
  }

  public getState() {
    return this.state;
  }
}

export const memoryEngine = new MemoryEngine();
