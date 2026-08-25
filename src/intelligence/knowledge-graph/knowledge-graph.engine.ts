/**
 * Phase 4B — Knowledge Graph Engine
 * Graph node & dependency edge structure modeling concept prerequisites,
 * failure probabilities, forgetting curve rates, visual coordinates, and mastery scores.
 */

export interface KnowledgeGraphNode {
  id: string; // e.g. 'fenwick-tree'
  name: string; // 'Fenwick Tree (Binary Indexed Tree)'
  kingdom: string; // 'Kingdom of Advanced Data Structures'
  difficulty: number; // 1600 ELO
  importance: number; // 1 - 10
  prerequisites: string[]; // ['prefix-sum', 'bit-manipulation']
  recommendedOrder: number; // 42
  relatedConcepts: string[]; // ['segment-tree', 'difference-array']
  failureProbability: number; // 0.25
  forgettingProbability: number; // 0.18
  masteryScore: number; // 0 - 100
  visualCoords: { x: number; y: number };
}

export interface KnowledgeGraphEdge {
  source: string;
  target: string;
  type: 'prerequisite' | 'enhancement' | 'alternative';
  weight: number;
}

export class KnowledgeGraphEngine {
  private nodes: Map<string, KnowledgeGraphNode> = new Map();
  private edges: KnowledgeGraphEdge[] = [];

  constructor() {
    this.seedDefaultKnowledgeGraph();
  }

  private seedDefaultKnowledgeGraph(): void {
    const defaultNodes: KnowledgeGraphNode[] = [
      {
        id: 'arrays',
        name: 'Array Traversal & Manipulation',
        kingdom: 'Kingdom of Arrays',
        difficulty: 400,
        importance: 10,
        prerequisites: [],
        recommendedOrder: 1,
        relatedConcepts: ['prefix-sum', 'two-pointers'],
        failureProbability: 0.05,
        forgettingProbability: 0.08,
        masteryScore: 92,
        visualCoords: { x: 100, y: 100 },
      },
      {
        id: 'prefix-sum',
        name: 'Prefix Sum & Cumulative Array',
        kingdom: 'Kingdom of Prefix Sums',
        difficulty: 800,
        importance: 9,
        prerequisites: ['arrays'],
        recommendedOrder: 2,
        relatedConcepts: ['difference-array', 'sliding-window'],
        failureProbability: 0.12,
        forgettingProbability: 0.15,
        masteryScore: 85,
        visualCoords: { x: 250, y: 150 },
      },
      {
        id: 'difference-array',
        name: 'Difference Arrays & Range Updates',
        kingdom: 'Kingdom of Prefix Sums',
        difficulty: 1200,
        importance: 8,
        prerequisites: ['prefix-sum'],
        recommendedOrder: 3,
        relatedConcepts: ['fenwick-tree'],
        failureProbability: 0.22,
        forgettingProbability: 0.2,
        masteryScore: 78,
        visualCoords: { x: 400, y: 200 },
      },
      {
        id: 'fenwick-tree',
        name: 'Fenwick Tree (Binary Indexed Tree)',
        kingdom: 'Kingdom of Trees',
        difficulty: 1600,
        importance: 8,
        prerequisites: ['prefix-sum', 'difference-array'],
        recommendedOrder: 4,
        relatedConcepts: ['segment-tree'],
        failureProbability: 0.32,
        forgettingProbability: 0.28,
        masteryScore: 65,
        visualCoords: { x: 550, y: 250 },
      },
      {
        id: 'segment-tree',
        name: 'Segment Tree & Range Query Engine',
        kingdom: 'Kingdom of Trees',
        difficulty: 1900,
        importance: 9,
        prerequisites: ['fenwick-tree'],
        recommendedOrder: 5,
        relatedConcepts: ['lazy-propagation'],
        failureProbability: 0.42,
        forgettingProbability: 0.35,
        masteryScore: 54,
        visualCoords: { x: 700, y: 300 },
      },
      {
        id: 'lazy-propagation',
        name: 'Lazy Propagation in Segment Trees',
        kingdom: 'Kingdom of Trees',
        difficulty: 2200,
        importance: 7,
        prerequisites: ['segment-tree'],
        recommendedOrder: 6,
        relatedConcepts: ['persistent-segment-tree'],
        failureProbability: 0.55,
        forgettingProbability: 0.45,
        masteryScore: 40,
        visualCoords: { x: 850, y: 350 },
      },
    ];

    defaultNodes.forEach((node) => {
      this.nodes.set(node.id, node);
      node.prerequisites.forEach((prereq) => {
        this.edges.push({
          source: prereq,
          target: node.id,
          type: 'prerequisite',
          weight: 1.0,
        });
      });
    });
  }

  public getNode(id: string): KnowledgeGraphNode | undefined {
    return this.nodes.get(id);
  }

  public getAllNodes(): KnowledgeGraphNode[] {
    return Array.from(this.nodes.values());
  }

  public getAllEdges(): KnowledgeGraphEdge[] {
    return this.edges;
  }

  public getPrerequisitesFor(id: string): KnowledgeGraphNode[] {
    const node = this.nodes.get(id);
    if (!node) return [];
    return node.prerequisites
      .map((prereqId) => this.nodes.get(prereqId))
      .filter((n): n is KnowledgeGraphNode => n !== undefined);
  }

  public calculateGraphHealth(): { totalNodes: number; totalEdges: number; avgMastery: number } {
    const nodes = this.getAllNodes();
    const sumMastery = nodes.reduce((acc, curr) => acc + curr.masteryScore, 0);
    return {
      totalNodes: nodes.length,
      totalEdges: this.edges.length,
      avgMastery: nodes.length > 0 ? parseFloat((sumMastery / nodes.length).toFixed(1)) : 0,
    };
  }
}
