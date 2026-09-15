/**
 * Connector Manager (Registers all official connectors into PluginManager and Registry)
 */

import { ConnectorRegistry } from '../providers/connector.registry';
import { MockPlatformConnector } from '../providers/mock.connector';
import { CodeforcesConnector } from '../providers/codeforces.connector';
import { LeetCodeConnector } from '../providers/leetcode.connector';
import { CodeChefConnector } from '../providers/codechef.connector';
import { MentorPickConnector } from '../providers/mentorpick.connector';
import { GeeksForGeeksConnector } from '../providers/geeksforgeeks.connector';
import { PluginManager } from '@/src/core/plugins/plugin.manager';

export class ConnectorManager {
  constructor() {
    this.registerAll();
  }

  public registerAll(): void {
    const mock = new MockPlatformConnector();
    const cf = new CodeforcesConnector();
    const lc = new LeetCodeConnector();
    const cc = new CodeChefConnector();
    const mp = new MentorPickConnector();
    const gfg = new GeeksForGeeksConnector();

    [mock, cf, lc, cc, mp, gfg].forEach((c) => {
      ConnectorRegistry.register(c);
      PluginManager.registerPlugin({
        id: `plugin-connector-${c.platformId}`,
        name: c.name,
        version: '1.0.0',
        type: 'platform',
        description: `Connector plugin for platform '${c.platformId}'`,
        init: () => {},
        register: () => ({ connector: c }),
      });
    });
  }
}
