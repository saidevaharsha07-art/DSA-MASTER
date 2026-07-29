export interface KingdomNode {
  slug: string;
  name: string;
  kingdomTitle: string;
  order: number;
  unlocked: boolean;
  completed: boolean;
  x: number; // Map coordinate %
  y: number; // Map coordinate %
  nextKingdoms: string[];
}

export const WORLD_MAP_KINGDOMS: KingdomNode[] = [
  { slug: 'basic-arrays', name: 'Arrays', kingdomTitle: 'Kingdom of Beginnings', order: 1, unlocked: true, completed: true, x: 10, y: 50, nextKingdoms: ['2d-arrays'] },
  { slug: '2d-arrays', name: '2D Arrays', kingdomTitle: 'Kingdom of Accumulation', order: 2, unlocked: true, completed: false, x: 22, y: 35, nextKingdoms: ['two-pointers'] },
  { slug: 'two-pointers', name: 'Two Pointers', kingdomTitle: 'Twin Rivers', order: 3, unlocked: true, completed: false, x: 34, y: 50, nextKingdoms: ['sliding-window'] },
  { slug: 'sliding-window', name: 'Sliding Window', kingdomTitle: 'Moving Horizon', order: 4, unlocked: false, completed: false, x: 46, y: 30, nextKingdoms: ['fast-slow-pointers'] },
  { slug: 'fast-slow-pointers', name: 'Fast & Slow Pointers', kingdomTitle: 'Temporal Loops', order: 5, unlocked: false, completed: false, x: 58, y: 65, nextKingdoms: ['linked-lists'] },
  { slug: 'linked-lists', name: 'Linked Lists', kingdomTitle: 'Chained Spire', order: 6, unlocked: false, completed: false, x: 70, y: 40, nextKingdoms: ['stacks-queues'] },
  { slug: 'stacks-queues', name: 'Stacks & Queues', kingdomTitle: 'Vault of Sequences', order: 7, unlocked: false, completed: false, x: 82, y: 55, nextKingdoms: ['binary-search'] },
  { slug: 'binary-search', name: 'Binary Search', kingdomTitle: 'Hidden Truth', order: 8, unlocked: false, completed: false, x: 90, y: 30, nextKingdoms: [] },
];

class WorldMapService {
  private currentKingdomSlug = 'basic-arrays';

  public getCurrentLocation(): string {
    return this.currentKingdomSlug;
  }

  public travelToKingdom(slug: string): boolean {
    const kingdom = WORLD_MAP_KINGDOMS.find((k) => k.slug === slug);
    if (kingdom && kingdom.unlocked) {
      this.currentKingdomSlug = slug;
      return true;
    }
    return false;
  }

  public getWorldMapNodes(): KingdomNode[] {
    return WORLD_MAP_KINGDOMS;
  }
}

export const worldMapService = new WorldMapService();
