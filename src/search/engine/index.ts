import Fuse from 'fuse.js';
import { SearchResult } from '../types';
import { buildSearchIndex } from '../index/builder';

let searchIndex: SearchResult[] | null = null;
let fuseInstance: Fuse<SearchResult> | null = null;

export async function initializeEngine() {
  if (fuseInstance) return fuseInstance;

  searchIndex = await buildSearchIndex();
  
  fuseInstance = new Fuse(searchIndex, {
    keys: [
      { name: 'title', weight: 3 },
      { name: 'tags', weight: 2 },
      { name: 'preview', weight: 1 },
      { name: 'breadcrumb', weight: 1 },
    ],
    includeScore: true,
    threshold: 0.4,
    ignoreLocation: true,
  });

  return fuseInstance;
}

export async function performSearch(query: string): Promise<SearchResult[]> {
  const fuse = await initializeEngine();
  if (!query.trim()) return [];
  
  const results = fuse.search(query);
  return results.map(r => ({ ...r.item, score: r.score }));
}
