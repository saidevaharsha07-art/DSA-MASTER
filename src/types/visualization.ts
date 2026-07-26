export type DataType = 'array' | 'matrix' | 'tree' | 'graph';

export type ElementColor = 'default' | 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'cyan';

export interface VizElement {
  id: string;
  value: string | number;
  color?: ElementColor;
  highlighted?: boolean;
}

export interface VizArray {
  id: string;
  label?: string;
  elements: VizElement[];
}

export interface VizPointer {
  id: string;
  label: string;
  targetId: string; // Refers to VizElement.id
  position: 'top' | 'bottom' | 'left' | 'right';
  color: ElementColor;
}

export interface FrameState {
  arrays?: VizArray[];
  // Future extensibility
  matrices?: any[];
  trees?: any[];
  graphs?: any[];
  pointers?: VizPointer[];
}

export interface VizFrame {
  id: string;
  title?: string;
  explanation: string;
  state: FrameState;
}

export interface VisualizationModel {
  id: string;
  type: DataType;
  title: string;
  frames: VizFrame[];
}
