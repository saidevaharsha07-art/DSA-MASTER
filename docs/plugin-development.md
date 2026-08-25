# Plugin Development Guide

## Creating a Plugin
Implement `IPlugin` from `src/core/plugins/plugin.interface.ts`:

```typescript
import { IPlugin } from '@/src/core/plugins/plugin.interface';

export class CustomAnalyticsPlugin implements IPlugin {
  public readonly id = 'custom-analytics-plugin';
  public readonly name = 'Custom Analytics Plugin';
  public readonly version = '1.0.0';
  public readonly type = 'analytics';
  public readonly description = 'Tracks custom user analytics metrics.';

  public init(): void {
    console.log('CustomAnalyticsPlugin initialized.');
  }

  public register(): Record<string, unknown> {
    return { analyticsEnabled: true };
  }
}
```

## Registering Plugins
```typescript
import { PluginManager } from '@/src/core/plugins/plugin.manager';

PluginManager.registerPlugin(new CustomAnalyticsPlugin());
```
