const fs = require('fs');
const path = require('path');

// Gather precise details for Phase 2 Runtime Integration Audit

const runtimeTree = {
  entryPoint: 'src/app/layout.tsx',
  layout: 'src/app/(app)/layout.tsx',
  providers: ['AuthProvider', 'AppBackendProvider'],
  iocInitialization: 'initializeServiceRegistry() (src/core/container/service-registry.ts)',
  registeredServices: [
    'MemoryEngine', 'ContestEngine', 'RatingEngine', 'AdaptiveEngine', 'OracleService',
    'AuthService', 'SessionService', 'PermissionService', 'SyncService', 'ConnectorService',
    'AchievementService', 'LeaderboardService', 'NotificationService', 'AnalyticsService',
    'BackupService', 'RealtimeService'
  ],
  contextState: [
    'profile', 'snapshot (OracleDashboardSnapshot)', 'bundle (OracleContextBundle)',
    'activeStrategyName', 'isLoading', 'error'
  ],
  eventBusSubscriptions: ['ProblemSolved', 'AchievementUnlocked', 'MemoryReviewed', 'StrategyChanged']
};

console.log('Runtime Tree Summary:', JSON.stringify(runtimeTree, null, 2));

fs.writeFileSync('scratch/runtime_audit_details.json', JSON.stringify(runtimeTree, null, 2));
