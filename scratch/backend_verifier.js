const fs = require('fs');
const path = require('path');

console.log('--- BACKEND SUBSYSTEM VERIFICATION SCAN ---');

const backendSystems = [
  { name: 'Memory Engine', file: 'src/intelligence/memory/engine/memory.engine.ts', key: 'MemoryEngine' },
  { name: 'Oracle Service', file: 'src/intelligence/oracle/services/oracle.service.ts', key: 'OracleService' },
  { name: 'Adaptive Engine', file: 'src/intelligence/adaptive/adaptive.engine.ts', key: 'AdaptiveEngine' },
  { name: 'Contest Engine', file: 'src/intelligence/contests/contest.engine.ts', key: 'ContestEngine' },
  { name: 'Rating Engine', file: 'src/intelligence/ratings/rating.engine.ts', key: 'RatingEngine' },
  { name: 'Achievement Service', file: 'src/intelligence/achievements/services/achievement.service.ts', key: 'AchievementService' },
  { name: 'Notification Service', file: 'src/lib/notifications/services/notification.service.ts', key: 'NotificationService' },
  { name: 'Analytics Service', file: 'src/lib/analytics/services/analytics.service.ts', key: 'AnalyticsService' },
  { name: 'Leaderboard Service', file: 'src/intelligence/leaderboards/services/leaderboard.service.ts', key: 'LeaderboardService' },
  { name: 'Connector Service', file: 'src/platforms/connectors/services/connector.service.ts', key: 'ConnectorService' },
  { name: 'Repositories', file: 'src/curriculum/repository/codechef-rating-db.ts', key: 'CodeChefRatingRepository' }
];

function scanUsages(key) {
  let count = 0;
  const matches = [];
  function search(dir) {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const full = path.join(dir, file);
      if (fs.statSync(full).isDirectory()) {
        if (!full.includes('node_modules') && !full.includes('.next')) search(full);
      } else if (full.endsWith('.ts') || full.endsWith('.tsx')) {
        const text = fs.readFileSync(full, 'utf8');
        if (text.includes(key)) {
          count++;
          matches.push(full.replace(/\\/g, '/'));
        }
      }
    });
  }
  search('src');
  return { count, matches };
}

const auditSummary = backendSystems.map(sys => {
  const exists = fs.existsSync(sys.file);
  const usage = scanUsages(sys.key);
  return {
    name: sys.name,
    key: sys.key,
    file: sys.file,
    exists,
    usageCount: usage.count,
    sampleCallers: usage.matches.filter(m => !m.endsWith(path.basename(sys.file)))
  };
});

console.log(JSON.stringify(auditSummary, null, 2));

fs.writeFileSync('scratch/backend_audit_results.json', JSON.stringify(auditSummary, null, 2));

console.log('\nBackend verification scan complete!');
