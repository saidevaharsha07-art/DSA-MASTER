/**
 * IoC Service Registry
 * Registers all core backend engines, services, and repositories into the Container.
 */

import { Container } from './container';
import { OracleService } from '@/src/intelligence/oracle/services/oracle.service';
import { MemoryEngine } from '@/src/intelligence/memory/engine/memory.engine';
import { ContestEngine } from '@/src/intelligence/contests/contest.engine';
import { RatingEngine } from '@/src/intelligence/ratings/rating.engine';
import { AdaptiveEngine } from '@/src/intelligence/adaptive/adaptive.engine';
import { AuthService } from '@/src/lib/auth/services/auth.service';
import { SessionService } from '@/src/lib/auth/services/session.service';
import { PermissionService } from '@/src/lib/auth/services/permission.service';
import { SyncService } from '@/src/lib/sync/services/sync.service';
import { ConnectorService } from '@/src/platforms/connectors/services/connector.service';
import { AchievementService } from '@/src/intelligence/achievements/services/achievement.service';
import { LeaderboardService } from '@/src/intelligence/leaderboards/services/leaderboard.service';
import { NotificationService } from '@/src/lib/notifications/services/notification.service';
import { AnalyticsService } from '@/src/lib/analytics/services/analytics.service';
import { BackupService } from '@/src/lib/backup/services/backup.service';
import { RealtimeService } from '@/src/lib/realtime/services/realtime.service';

// Phase 4.0 Global Intelligence Platform imports
import { KnowledgeGraphEngine } from '@/src/intelligence/knowledge-graph/knowledge-graph.engine';
import { PathGeneratorEngine } from '@/src/intelligence/path-generator/path-generator.engine';
import { PredictiveCoachEngine } from '@/src/intelligence/predictive-coach/predictive-coach.engine';
import { CrossPlatformService } from '@/src/intelligence/cross-platform/cross-platform.service';
import { CompanyPrepEngine } from '@/src/intelligence/company-prep/company-prep.engine';
import { AdaptiveRevisionEngine } from '@/src/intelligence/revision/adaptive-revision.engine';
import { VirtualMentorService } from '@/src/intelligence/mentor/virtual-mentor.service';
import { PatternDiscoveryEngine } from '@/src/intelligence/pattern-discovery/pattern-discovery.engine';

import { MemoryRealtimeAdapter } from '@/src/adapters/memory-realtime.adapter';

export function initializeServiceRegistry(): void {
  if (Container.has('OracleService')) return;

  // Initialize Memory Realtime Adapter EventBus subscriber
  MemoryRealtimeAdapter.initialize();

  // Intelligence & Core Engines
  Container.registerSingleton('MemoryEngine', new MemoryEngine());
  Container.registerSingleton('ContestEngine', new ContestEngine());
  Container.registerSingleton('RatingEngine', new RatingEngine());
  Container.registerSingleton('AdaptiveEngine', new AdaptiveEngine());
  Container.registerSingleton('OracleService', new OracleService());

  // Phase 4.0 Global Intelligence Engines
  const kgEngine = new KnowledgeGraphEngine();
  Container.registerSingleton('KnowledgeGraphEngine', kgEngine);
  Container.registerSingleton('PathGeneratorEngine', new PathGeneratorEngine(kgEngine));
  Container.registerSingleton('PredictiveCoachEngine', new PredictiveCoachEngine());
  Container.registerSingleton('CrossPlatformService', new CrossPlatformService());
  Container.registerSingleton('CompanyPrepEngine', new CompanyPrepEngine());
  Container.registerSingleton('AdaptiveRevisionEngine', new AdaptiveRevisionEngine());
  Container.registerSingleton('VirtualMentorService', new VirtualMentorService());
  Container.registerSingleton('PatternDiscoveryEngine', new PatternDiscoveryEngine());

  // Auth & Session Infrastructure
  Container.registerSingleton('AuthService', new AuthService());
  Container.registerSingleton('SessionService', new SessionService());
  Container.registerSingleton('PermissionService', new PermissionService());

  // Offline Sync & Connectors
  Container.registerSingleton('SyncService', new SyncService());
  Container.registerSingleton('ConnectorService', new ConnectorService());

  // Gamification & Intelligence
  Container.registerSingleton('AchievementService', new AchievementService());
  Container.registerSingleton('LeaderboardService', new LeaderboardService());

  // Notifications, Telemetry, Backups & Realtime
  Container.registerSingleton('NotificationService', new NotificationService());
  Container.registerSingleton('AnalyticsService', new AnalyticsService());
  Container.registerSingleton('BackupService', new BackupService());
  Container.registerSingleton('RealtimeService', new RealtimeService());
}
