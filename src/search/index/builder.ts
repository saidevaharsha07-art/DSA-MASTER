import { SearchResult } from '../types';
import { getAllProblems } from '../../problem-dna/loader';

export async function buildSearchIndex(): Promise<SearchResult[]> {
  const index: SearchResult[] = [];
  
  try {
    const problems = await getAllProblems();
    for (const p of problems) {
      index.push({
        id: p.id,
        type: 'problem',
        title: p.title,
        category: p.difficulty,
        breadcrumb: ['Problems', p.title],
        preview: p.mentalModel || p.recognitionSignals[0]?.description || '',
        url: `/problems/${p.id}`,
        tags: [...p.patterns, ...p.subPatterns],
      });
      
      for (const c of p.interview.companies) {
        index.push({
          id: `company-${p.id}-${c.company}`,
          type: 'company',
          title: c.company,
          category: c.frequency,
          breadcrumb: ['Companies', c.company, p.title],
          preview: `Asked at ${c.company} (${c.lastAsked}). Problem: ${p.title}`,
          url: `/problems/${p.id}`,
          tags: [c.company, p.title]
        });
      }
    }
  } catch (error) {
    console.error("Failed to index problems", error);
  }

  return index;
}
