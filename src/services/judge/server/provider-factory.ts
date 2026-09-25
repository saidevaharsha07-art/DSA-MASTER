import { IServerJudgeProvider } from './judge-provider.interface';
import { judge0ServerProvider } from './judge0-server.provider';
import { localServerProvider } from './local-server.provider';
import { mockServerProvider } from './mock-server.provider';
import { isLocalExecutionAllowed } from '../sandbox/runner';

let customTestProvider: IServerJudgeProvider | null = null;

export function setTestJudgeProvider(provider: IServerJudgeProvider | null) {
  customTestProvider = provider;
}

export function getServerJudgeProvider(): IServerJudgeProvider {
  // 1. Explicit test override (for deterministic test suites)
  if (customTestProvider) {
    return customTestProvider;
  }

  if (process.env.JUDGE_PROVIDER === 'mock') {
    return mockServerProvider;
  }

  // 2. Strict Production Guard:
  // If local execution is NOT allowed (e.g., in production or when flags are false),
  // NEVER return the local host child_process provider. Always return the isolated Judge0 provider.
  if (!isLocalExecutionAllowed()) {
    return judge0ServerProvider;
  }

  // 3. In development / testing environments where local runner is explicitly permitted
  return localServerProvider;
}
