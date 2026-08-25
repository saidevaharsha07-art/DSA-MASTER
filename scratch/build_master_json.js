const fs = require('fs');
const path = require('path');

console.log('=== BUILDING MASTER CODECHEF PRACTICE COMPLETE JSON ===');

const divFiles = [
  '500.json',
  '500-1000.json',
  '1000-1400.json',
  '1400-1600.json',
  '1600-1800.json',
  '1800-2000.json',
  '2000-2500.json'
];

let allProblems = [];
const seenCodes = new Set();

divFiles.forEach(file => {
  const filePath = path.join('src/data/codechef', file);
  if (fs.existsSync(filePath)) {
    const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (Array.isArray(raw)) {
      raw.forEach(p => {
        const code = p.problemCode || p.id || p.code;
        if (code && !seenCodes.has(code)) {
          seenCodes.add(code);
          allProblems.push({
            id: code,
            problemCode: code,
            title: p.title || p.name || code,
            difficulty: p.difficulty || 500,
            rating: p.rating || p.difficulty || 500,
            ratingRange: p.ratingRange || '',
            url: p.url || `https://www.codechef.com/problems/${code}`,
            tags: Array.isArray(p.tags) ? p.tags : [p.kingdom || 'Arrays', p.pattern || 'General'],
            kingdom: p.kingdom || 'Kingdom of Arrays',
            pattern: p.pattern || 'Array Traversal',
            editorialUrl: p.editorialUrl || `https://www.google.com/search?q=site:codechef.com+${code}+editorial`,
            videoUrl: p.videoUrl || `https://www.youtube.com/results?search_query=codechef+${code}+solution`,
            estimatedTime: p.estimatedTime || 30,
            xp: p.xp || 25,
            section: p.section || 'General Practice',
            practicePath: p.practicePath || 'Practice',
            starPath: p.starPath || '1-Star Path',
            company: p.company || 'General Tech',
            interviewTopic: p.interviewTopic || p.pattern || 'General',
            interviewCategory: p.interviewCategory || 'General'
          });
        }
      });
    }
  }
});

console.log(`Total Master Combined Problems: ${allProblems.length}`);

// Save to data/codechef and public/data/codechef and src/data/codechef.json
const targets = [
  'data/codechef/codechef_practice_complete.json',
  'public/data/codechef/codechef_practice_complete.json',
  'src/data/codechef.json'
];

targets.forEach(t => {
  const dir = path.dirname(t);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(t, JSON.stringify(allProblems, null, 2));
  console.log(`Saved ${allProblems.length} records to ${t}`);
});

console.log('=== MASTER JSON BUILD COMPLETE ===');
