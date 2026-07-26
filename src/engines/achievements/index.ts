import { eventBus } from '../../core/events';
import { storage } from '../../core/storage/LocalStorageAdapter';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlockedAt: string | null;
}

const ACHIEVEMENT_DEFINITIONS: Omit<Achievement, 'unlockedAt'>[] = [
  { id: 'first_solve', title: 'First Blood', description: 'Solve your first problem.' },
  { id: 'perfect_prediction', title: 'Oracle', description: 'Perfectly predict the optimal pattern and complexity.' },
  { id: 'reflection_streak', title: 'Deep Thinker', description: 'Write 5 post-solve reflections.' },
];

class AchievementEngine {
  constructor() {
    this.registerListeners();
  }

  getAchievements(): Achievement[] {
    const unlockedIds = storage.get<Record<string, string>>('dsa_unlocked_achievements') || {};
    return ACHIEVEMENT_DEFINITIONS.map(def => ({
      ...def,
      unlockedAt: unlockedIds[def.id] || null
    }));
  }

  private unlock(id: string) {
    const unlockedIds = storage.get<Record<string, string>>('dsa_unlocked_achievements') || {};
    if (unlockedIds[id]) return; // already unlocked

    unlockedIds[id] = new Date().toISOString();
    storage.save('dsa_unlocked_achievements', unlockedIds);

    const def = ACHIEVEMENT_DEFINITIONS.find(a => a.id === id);
    if (def) {
      eventBus.publish('AchievementUnlocked', { achievementId: id, title: def.title });
    }
  }

  private registerListeners() {
    eventBus.subscribe('ProblemSolved', () => {
      const timeline = eventBus.getTimeline().filter(e => e.type === 'ProblemSolved');
      if (timeline.length === 1) { // First one just added
        this.unlock('first_solve');
      }
    });

    eventBus.subscribe('PredictionSubmitted', (e) => {
      if (e.payload.correctPattern) {
        this.unlock('perfect_prediction');
      }
    });

    eventBus.subscribe('ReflectionAdded', () => {
      const timeline = eventBus.getTimeline().filter(e => e.type === 'ReflectionAdded');
      if (timeline.length === 5) {
        this.unlock('reflection_streak');
      }
    });
  }
}

export const achievementEngine = new AchievementEngine();
