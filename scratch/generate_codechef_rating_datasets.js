const fs = require('fs');
const path = require('path');

const srcDataPath = path.join(__dirname, '..', 'src', 'data', 'codechef.json');
const rawProblems = JSON.parse(fs.readFileSync(srcDataPath, 'utf8'));

// Helper to clean Kingdom name
function cleanKingdom(raw) {
  if (!raw) return 'Arrays';
  let cleaned = raw.replace(/^KINGDOM\s+\d+\s+—\s+THE\s+KINGDOM\s+OF\s+/i, '');
  cleaned = cleaned.replace(/^KINGDOM\s+\d+\s+—\s+/i, '');
  return cleaned.trim() || 'Arrays';
}

// Helper to clean Pattern name
function cleanPattern(raw) {
  if (!raw) return 'Basic Array Traversal';
  let cleaned = raw.replace(/^Pattern\s+\d+\.\d+\s+—\s+/i, '');
  return cleaned.trim() || 'Basic Array Traversal';
}

// Map difficulty string to numeric rating
function getNumericRating(p, index) {
  const diff = (p.difficulty || 'Beginner').toLowerCase();
  const offset = (index * 7) % 180;

  if (diff === 'beginner') {
    return Math.min(495, 250 + ((index * 13) % 240));
  } else if (diff === 'easy') {
    return 500 + ((index * 17) % 495);
  } else if (diff === 'medium') {
    const isLower = index % 3 === 0;
    if (isLower) return 1000 + ((index * 19) % 395);
    const isMid = index % 3 === 1;
    if (isMid) return 1400 + ((index * 23) % 195);
    return 1600 + ((index * 29) % 195);
  } else if (diff === 'hard') {
    const isLower = index % 2 === 0;
    if (isLower) return 1800 + ((index * 31) % 195);
    return 2000 + ((index * 37) % 495);
  } else {
    return 2000 + ((index * 41) % 495);
  }
}

// Determine bucket name
function getRatingRange(rating) {
  if (rating < 500) return '500';
  if (rating < 1000) return '500-1000';
  if (rating < 1400) return '1000-1400';
  if (rating < 1600) return '1400-1600';
  if (rating < 1800) return '1600-1800';
  if (rating < 2000) return '1800-2000';
  return '2000-2500';
}

const buckets = {
  '500': [],
  '500-1000': [],
  '1000-1400': [],
  '1400-1600': [],
  '1600-1800': [],
  '1800-2000': [],
  '2000-2500': [],
};

rawProblems.forEach((p, idx) => {
  const rating = getNumericRating(p, idx);
  const ratingRange = getRatingRange(rating);
  const kingdom = cleanKingdom(p.kingdom);
  const pattern = cleanPattern(p.pattern);

  const formatted = {
    id: p.id || `CC-${idx}`,
    problemCode: p.index || p.id || `CC-${idx}`,
    title: p.title || p.id,
    difficulty: rating,
    ratingRange,
    url: p.url || `https://www.codechef.com/problems/${p.id}`,
    tags: Array.isArray(p.tags) && p.tags.length > 0 ? p.tags : ['implementation'],
    kingdom,
    pattern,
    editorialUrl: `https://discuss.codechef.com/search?q=${p.id}%20editorial`,
    videoUrl: `https://www.youtube.com/results?search_query=CodeChef+${p.id}+solution`,
    estimatedTime: p.estimatedTime || 30,
    status: p.status || 'Unsolved',
    attempts: 0,
    accuracy: Math.min(95, Math.max(35, 85 - Math.floor(rating / 40))),
    notes: '',
    favorite: false,
    lastSolved: null,
    masteryScore: 0,
    xp: p.xp || Math.max(10, Math.floor(rating / 20)),
  };

  buckets[ratingRange].push(formatted);
});

// Output directory paths
const srcDir = path.join(__dirname, '..', 'src', 'data', 'codechef');
const publicDir = path.join(__dirname, '..', 'public', 'data', 'codechef');

if (!fs.existsSync(srcDir)) fs.mkdirSync(srcDir, { recursive: true });
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

Object.keys(buckets).forEach((key) => {
  const jsonContent = JSON.stringify(buckets[key], null, 2);
  fs.writeFileSync(path.join(srcDir, `${key}.json`), jsonContent);
  fs.writeFileSync(path.join(publicDir, `${key}.json`), jsonContent);
  console.log(`Wrote ${buckets[key].length} problems to ${key}.json`);
});

console.log('Successfully generated CodeChef rating datasets!');
