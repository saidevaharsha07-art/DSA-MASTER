export type NodeType = 'phase' | 'topic' | 'pattern' | 'problem-family' | 'checkpoint' | 'boss';
export type NodeState = 'locked' | 'available' | 'learning' | 'mastered' | 'elite';

export interface RoadmapNodeData {
  id: string;
  title: string;
  type: NodeType;
  state: NodeState;
  
  position: { x: number; y: number }; 
  
  mastery: number; 
  timeInvested: number; 
  problemsSolved: number;
  recognitionScore: number | null;
  revisionHealth: number; 
  
  nextNodes: string[];
}
