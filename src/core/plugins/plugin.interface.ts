/**
 * Core Plugin Architecture — Interface Contract
 * Defines extension points for Platforms, Recommendation Strategies, Analytics Providers, AI Providers, Visualizers, and Data Handlers.
 */

export type PluginType =
  | 'platform'
  | 'strategy'
  | 'analytics'
  | 'ai'
  | 'visualizer'
  | 'import_export';

export interface IPlugin {
  readonly id: string;
  readonly name: string;
  readonly version: string;
  readonly type: PluginType;
  readonly description: string;
  init(): Promise<void> | void;
  register(): Record<string, unknown>;
}
