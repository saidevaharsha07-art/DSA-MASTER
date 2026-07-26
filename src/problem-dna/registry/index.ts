export const problemRegistry: Record<string, () => Promise<{ default: any }>> = {
  'lc-560': () => import('../problems/phase-01/arrays/lc-560'),
};

export const problemList = Object.keys(problemRegistry);
