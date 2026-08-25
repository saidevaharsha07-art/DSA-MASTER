/**
 * Phase 4C — Learning Path Generator
 * Generates personalized, dynamic roadmaps tailored to current knowledge, user goals,
 * available daily time, target rating, weak topics, and memory decay.
 */

import { LearnerProfileMetrics } from '../user-model/universal-user.model';
import { KnowledgeGraphEngine, KnowledgeGraphNode } from '../knowledge-graph/knowledge-graph.engine';

export interface DynamicLearningPathStep {
  stepNumber: number;
  conceptId: string;
  title: string;
  estimatedMinutes: number;
  reasoning: string;
  targetRating: number;
  priority: 'CRITICAL' | 'RECOMMENDED' | 'ENRICHMENT';
}

export interface DynamicLearningPath {
  userId: string;
  goal: string;
  totalEstimatedHours: number;
  steps: DynamicLearningPathStep[];
  generatedAt: string;
}

export class PathGeneratorEngine {
  constructor(private knowledgeGraph: KnowledgeGraphEngine) {}

  public generatePath(profile: LearnerProfileMetrics, goal: string = 'Become 3-Star Expert'): DynamicLearningPath {
    const nodes = this.knowledgeGraph.getAllNodes();
    const steps: DynamicLearningPathStep[] = [];

    // Filter nodes where mastery is below target threshold or in weak topics
    let stepCount = 1;
    nodes.forEach((node) => {
      const isWeak = profile.weaknesses.some((w) => w.toLowerCase().includes(node.name.toLowerCase()));
      const needsImprovement = node.masteryScore < 80;

      if (isWeak || needsImprovement) {
        steps.push({
          stepNumber: stepCount++,
          conceptId: node.id,
          title: node.name,
          estimatedMinutes: Math.max(30, Math.floor(node.difficulty / 25)),
          reasoning: isWeak
            ? `Identified as a weak topic in recent practice. Mastering this bridges a critical gap.`
            : `Mastery score is ${node.masteryScore}%. Targeted practice will raise rating to ${node.difficulty}.`,
          targetRating: node.difficulty,
          priority: isWeak ? 'CRITICAL' : 'RECOMMENDED',
        });
      }
    });

    const totalMinutes = steps.reduce((sum, s) => sum + s.estimatedMinutes, 0);

    return {
      userId: profile.userId,
      goal,
      totalEstimatedHours: parseFloat((totalMinutes / 60).toFixed(1)),
      steps,
      generatedAt: new Date().toISOString(),
    };
  }
}
