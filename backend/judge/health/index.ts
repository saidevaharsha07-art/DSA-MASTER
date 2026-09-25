import { JudgeProvider } from '../providers/interface';

export class ProviderHealthMonitor {
  private providers: JudgeProvider[];
  private activeProviderIndex = 0;

  constructor(providers: JudgeProvider[]) {
    this.providers = providers;
  }

  public async getActiveProvider(): Promise<JudgeProvider> {
    const current = this.providers[this.activeProviderIndex];
    const isHealthy = await current.health();

    if (isHealthy) {
      return current;
    }

    // Failover to next healthy provider
    for (let i = 0; i < this.providers.length; i++) {
      if (i === this.activeProviderIndex) continue;
      const provider = this.providers[i];
      const healthy = await provider.health();
      if (healthy) {
        this.activeProviderIndex = i;
        console.warn(`[JudgeHealth] Primary provider failed. Automatically failed over to ${provider.name}`);
        return provider;
      }
    }

    // Default to fallback provider
    return this.providers[0];
  }
}
