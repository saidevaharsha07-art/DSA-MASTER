/**
 * Core Plugin Architecture — Plugin Registry
 * Stores registered plugins by type and ID.
 */

import { IPlugin, PluginType } from './plugin.interface';

export class PluginRegistry {
  private static plugins: Map<string, IPlugin> = new Map();

  public static register(plugin: IPlugin): void {
    if (this.plugins.has(plugin.id)) {
      console.warn(`[PluginRegistry] Plugin '${plugin.id}' already registered. Overwriting.`);
    }
    this.plugins.set(plugin.id, plugin);
    plugin.init();
  }

  public static getPlugin(id: string): IPlugin | undefined {
    return this.plugins.get(id);
  }

  public static getPluginsByType(type: PluginType): ReadonlyArray<IPlugin> {
    return Array.from(this.plugins.values()).filter((p) => p.type === type);
  }

  public static getAllPlugins(): ReadonlyArray<IPlugin> {
    return Array.from(this.plugins.values());
  }

  public static clear(): void {
    this.plugins.clear();
  }
}
