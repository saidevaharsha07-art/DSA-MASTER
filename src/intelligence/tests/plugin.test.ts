/**
 * Unit Test: Plugin Architecture & Registry
 */

import { PluginManager } from '@/src/core/plugins/plugin.manager';
import { IPlugin } from '@/src/core/plugins/plugin.interface';

export async function testPluginArchitecture(): Promise<void> {
  console.log('--- Testing Plugin Architecture & Registry ---');

  const mockPlugin: IPlugin = {
    id: 'test-plugin-1',
    name: 'Test Platform Plugin',
    version: '1.0.0',
    type: 'platform',
    description: 'Unit test mock plugin',
    init: () => {},
    register: () => ({ platformId: 'custom-plat' }),
  };

  await PluginManager.registerPlugin(mockPlugin);

  const plugins = PluginManager.getPlugins('platform');
  if (plugins.length === 0 || !plugins.some((p) => p.id === 'test-plugin-1')) {
    throw new Error('Plugin Architecture registration failed!');
  }

  console.log('[PASS] Plugin registration and type filter query verified.');
}
