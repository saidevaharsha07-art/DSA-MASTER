import { curriculumEngine } from '../curriculum';
import { metadataEngine } from '../metadata';
import { storage } from '../../core/storage/LocalStorageAdapter';

export const memoryEngine = {
  getUserProfile: () => {
    const stats = metadataEngine.getGlobalStats();
    const stored = storage.get<any>('dsa_user_profile');
    
    return stored || {
      name: "Learner",
      xp: 1250,
      streak: 4,
      currentWorld: "Array Valley",
      currentPatternId: "pattern.sliding-window",
      worldProgress: 24, // 24% completed of Phase 1
    };
  },
  
  getWeakestPattern: () => {
    return curriculumEngine.getPattern("pattern.sliding-window");
  },
  
  getDueRevisions: () => {
    return [
      curriculumEngine.getPattern("pattern.prefix-sum")
    ].filter(Boolean) as NonNullable<ReturnType<typeof curriculumEngine.getPattern>>[];
  },
  
  getRecentActivity: () => {
    return {
      type: "solved",
      problemId: "problem.lc-209",
      timestamp: new Date().toISOString()
    };
  },

  getAIMentorFeedback: () => {
    // In Phase 5 of Sprint 5, we'll read actual mistake timelines to drive this.
    return {
      observation: "You are doing well recognizing the Sliding Window setup, but you often forget to shrink the window correctly when the condition is violated. Let's practice that today."
    };
  },

  getInterviewReadiness: () => {
    return 15; // 15% ready for FAANG
  },

  // Map state
  getPatternMastery: (patternId: string): number => {
    // Using storage to let session engine or practice engine increment mastery
    const masteries = storage.get<Record<string, number>>('dsa_pattern_mastery') || {};
    if (masteries[patternId] !== undefined) return masteries[patternId];
    
    if (patternId === "pattern.prefix-sum") return 100;
    if (patternId === "pattern.sliding-window") return 45;
    return 0; // locked/unstarted
  }
};
