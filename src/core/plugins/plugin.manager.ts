/**
 * Core Plugin Architecture — Plugin Manager
 * High-level manager orchestrating plugin lifecycles and registration flows.
 */

import { IPlugin, PluginType } from './plugin.interface';
import { PluginRegistry } from './plugin.registry';

export class PluginManager {
  public static async registerPlugin(plugin: IPlugin): Promise<void> {
    await plugin.init();
    PluginRegistry.register(plugin);
  }

  public static getPlugins(type?: PluginType): ReadonlyArray<IPlugin> {
    return type ? PluginRegistry.getPluginsByType(type) : PluginRegistry.getAllPlugins();
  }

  public static getPluginCount(): number {
    return PluginRegistry.getAllPlugins().length;
  }
}
