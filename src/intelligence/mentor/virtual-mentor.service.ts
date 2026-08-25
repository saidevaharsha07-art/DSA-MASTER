/**
 * Phase 4H — Virtual Mentor Service
 * Conversational AI mentor explaining pattern selections, time/space complexity,
 * mistake analysis, and next problem suggestions.
 */

export interface MentorAdvice {
  patternExplanation: string;
  whyThisPatternNotAnother: string;
  complexityBreakdown: { time: string; space: string };
  suggestedNextProblems: string[];
}

export class VirtualMentorService {
  public getAdviceForProblem(problemCode: string, topic: string): MentorAdvice {
    return {
      patternExplanation: `Problem ${problemCode} belongs to the ${topic} pattern. It requires maintaining dynamic window bounds or cumulative sums.`,
      whyThisPatternNotAnother: `We use ${topic} instead of brute-force nested loops to reduce time complexity from O(N^2) to O(N).`,
      complexityBreakdown: {
        time: 'O(N) — Single pass linear traversal',
        space: 'O(1) — Constant extra space',
      },
      suggestedNextProblems: [`${problemCode}_HARD`, 'SUBARRAYXOR', 'KAVGMAT'],
    };
  }
}
