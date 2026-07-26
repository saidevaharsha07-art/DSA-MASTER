export interface PointerInfo {
  id: string;
  index: number;
  label: string;
  color?: string;
}

export interface Frame {
  explanation: string;
  highlightedLines: number[];
  variables: Record<string, string | number>;
  arrays?: { id: string; label: string; values: (string | number)[] }[];
  pointers?: PointerInfo[];
}

export interface VisualizationData {
  problemId: string;
  code: string;
  frames: Frame[];
}

// Seed Data for Phase 1
const mockVisualizations: Record<string, VisualizationData> = {
  'problem.lc-1480': {
    problemId: 'problem.lc-1480',
    code: `function runningSum(nums: number[]): number[] {
  for (let i = 1; i < nums.length; i++) {
    nums[i] += nums[i - 1];
  }
  return nums;
}`,
    frames: [
      {
        explanation: 'Initial state: array is [1, 2, 3, 4]. Pointer i starts at index 1.',
        highlightedLines: [2],
        variables: { i: 1 },
        arrays: [{ id: 'nums', label: 'nums', values: [1, 2, 3, 4] }],
        pointers: [{ id: 'i', index: 1, label: 'i', color: '#3b82f6' }]
      },
      {
        explanation: 'Add nums[i-1] (1) to nums[i] (2). The new value is 3.',
        highlightedLines: [3],
        variables: { i: 1 },
        arrays: [{ id: 'nums', label: 'nums', values: [1, 3, 3, 4] }],
        pointers: [{ id: 'i', index: 1, label: 'i', color: '#3b82f6' }]
      },
      {
        explanation: 'Increment i to 2.',
        highlightedLines: [2],
        variables: { i: 2 },
        arrays: [{ id: 'nums', label: 'nums', values: [1, 3, 3, 4] }],
        pointers: [{ id: 'i', index: 2, label: 'i', color: '#3b82f6' }]
      },
      {
        explanation: 'Add nums[i-1] (3) to nums[i] (3). The new value is 6.',
        highlightedLines: [3],
        variables: { i: 2 },
        arrays: [{ id: 'nums', label: 'nums', values: [1, 3, 6, 4] }],
        pointers: [{ id: 'i', index: 2, label: 'i', color: '#3b82f6' }]
      },
      {
        explanation: 'Return the modified array [1, 3, 6, 10].',
        highlightedLines: [5],
        variables: {},
        arrays: [{ id: 'nums', label: 'nums', values: [1, 3, 6, 10] }],
        pointers: []
      }
    ]
  }
};

class VisualizerEngine {
  getVisualization(problemId: string): VisualizationData | null {
    return mockVisualizations[problemId] || null;
  }
}

export const visualizerEngine = new VisualizerEngine();
