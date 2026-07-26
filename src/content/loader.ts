import { Phase, Topic, PatternModule } from '@/src/types/curriculum';
import { phases, topics, patternRegistry, patternMap } from './registry';
import { validatePatternModule } from '@/src/lib/curriculum/validation';
import { findTopicsByPhase } from '@/src/lib/curriculum/helpers';

export async function getAllPhases(): Promise<Phase[]> {
  return phases.sort((a, b) => a.order - b.order);
}

export async function getTopics(phaseId: string): Promise<Topic[]> {
  return findTopicsByPhase(topics, phaseId);
}

export async function getPatterns(topicId: string): Promise<string[]> {
  return patternRegistry[topicId] || [];
}

export async function getPattern(patternId: string): Promise<PatternModule> {
  const route = patternMap[patternId];
  if (!route) {
    throw new Error(`Pattern '${patternId}' not found in registry`);
  }

  try {
    // Dynamic import to lazy load content modules. 
    // This allows hundreds of patterns to be added without bloating the main bundle.
    const patternModule = await import(`./phases/${route.phaseId}/${route.topicId}/patterns/${patternId}`);
    
    // Strict runtime validation so that malformed content fails fast
    return validatePatternModule(patternModule.default) as PatternModule;
  } catch (error) {
    console.error(`Failed to load pattern: ${patternId}`, error);
    throw error;
  }
}
