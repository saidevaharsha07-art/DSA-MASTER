import * as fs from 'fs';
import * as path from 'path';
import { curriculumEngine } from '../src/engines/curriculum';

async function generate() {
  console.log("Generating Build-time Indexes...");
  
  const patterns = curriculumEngine.getAllPatterns();
  const problems = curriculumEngine.getAllProblems();
  
  // 1. Generate Knowledge Graph
  const graph = {
    nodes: [
      ...patterns.map(p => ({ id: p.id, type: 'pattern', label: p.title })),
      ...problems.map(p => ({ id: p.id, type: 'problem', label: p.title }))
    ],
    edges: [] as { source: string, target: string, type: string }[]
  };
  
  patterns.forEach(p => {
    p.problemIds.forEach(probId => {
      graph.edges.push({ source: p.id, target: probId, type: 'contains' });
    });
    p.relatedPatternIds.forEach(relId => {
      graph.edges.push({ source: p.id, target: relId, type: 'related' });
    });
  });
  
  // 2. Generate Search Index
  const searchIndex = [
    ...patterns.map(p => ({
      id: p.id,
      type: 'Pattern',
      title: p.title,
      description: p.overview,
      tags: p.tags,
      route: `/topic/${p.slug}`
    })),
    ...problems.map(p => ({
      id: p.id,
      type: 'Problem',
      title: p.title,
      description: `LeetCode ${p.difficulty} - ${p.companies.join(', ')}`,
      tags: p.topics,
      route: `/practice/${p.slug}`
    }))
  ];
  
  const pubDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(pubDir)) {
    fs.mkdirSync(pubDir);
  }
  
  fs.writeFileSync(path.join(pubDir, 'knowledgeGraph.json'), JSON.stringify(graph, null, 2));
  fs.writeFileSync(path.join(pubDir, 'search-index.json'), JSON.stringify(searchIndex, null, 2));
  
  console.log("✅ Wrote knowledgeGraph.json and search-index.json to public/");
}

generate().catch(console.error);
