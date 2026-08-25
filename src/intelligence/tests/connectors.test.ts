/**
 * Unit Test: Official Platform Connectors & Gateway (Milestone 5.3)
 */

import { ConnectorService } from '@/src/platforms/connectors/services/connector.service';
import { ConnectorRegistry } from '@/src/platforms/connectors/providers/connector.registry';
import { PluginManager } from '@/src/core/plugins/plugin.manager';
import { EventBus } from '@/src/core/events/event-bus';

export async function testPlatformConnectors(): Promise<void> {
  console.log('--- Testing Milestone 5.3 Official Platform Connectors & Gateway ---');

  const connectorService = new ConnectorService();

  // 1. Check Connector Registration & Plugin System Integration
  const mockConn = ConnectorRegistry.getConnector('mock');
  const cfConn = ConnectorRegistry.getConnector('codeforces');
  const lcConn = ConnectorRegistry.getConnector('leetcode');

  if (!mockConn || !cfConn || !lcConn) {
    throw new Error('Platform connector registration failed!');
  }
  console.log('[PASS] Platform connector registration verified across Mock, Codeforces, LeetCode.');

  // 2. Capability Detection Matrix
  const mockCap = mockConn.capabilities();
  const codechefConn = ConnectorRegistry.getConnector('codechef');
  const ccCap = codechefConn?.capabilities();

  if (!mockCap.supportsProfiles || ccCap?.supportsSubmissions === true) {
    throw new Error('Platform connector capability matrix verification failed!');
  }
  console.log('[PASS] Connector capability matrix (CodeChef ToS submission restriction) verified.');

  // 3. Search Request & EventBus Emission
  let requestStarted = false;
  let requestFinished = false;

  const unsub1 = EventBus.subscribe('ConnectorRequestStarted', () => { requestStarted = true; });
  const unsub2 = EventBus.subscribe('ConnectorRequestFinished', () => { requestFinished = true; });

  const res = await connectorService.searchProblems('mock', { keyword: 'Arrays', page: 1, pageSize: 5 });
  unsub1();
  unsub2();

  if (res.items.length === 0 || !requestStarted || !requestFinished) {
    throw new Error('Connector problem search or EventBus notification failed!');
  }
  console.log(`[PASS] Connector search execution and EventBus publication verified (${res.items.length} items returned).`);

  // 4. PluginManager Verification
  const plugins = PluginManager.getPlugins('platform');
  if (plugins.length < 4) {
    throw new Error('PluginManager connector plugin registration failed!');
  }
  console.log('[PASS] PluginManager connector plugin integration verified.');
}
