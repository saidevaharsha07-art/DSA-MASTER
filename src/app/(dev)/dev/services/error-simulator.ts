/**
 * Dev Tools Suite — Error Simulator
 * Simulates development error cases (Empty dataset, unknown platform, empty profile) to verify graceful UI handling.
 */

import { PlatformId } from '@/src/platforms/types';
import { ProblemProvider } from '@/src/platforms/problem.provider';
import { PlatformValidator } from '@/src/platforms/validation/platform.validator';

export type SimulatedErrorType = 'UnknownPlatform' | 'EmptyDataset' | 'InvalidUrl' | 'MalformedProfile';

export class DevErrorSimulator {
  private static provider = new ProblemProvider();

  public static simulate(type: SimulatedErrorType): { message: string; data: any } {
    switch (type) {
      case 'UnknownPlatform': {
        const probs = this.provider.getPlatformProblems('cses' as PlatformId);
        return {
          message: "Triggered unknown platform lookup: 'cses'. Returned empty array cleanly.",
          data: probs,
        };
      }
      case 'EmptyDataset': {
        const report = PlatformValidator.validate('codechef', []);
        return {
          message: 'Triggered empty dataset validation report.',
          data: report,
        };
      }
      case 'InvalidUrl': {
        const report = PlatformValidator.validate('codechef', [
          {
            id: 'ERR001',
            title: 'Broken URL Problem',
            platform: 'codechef',
            difficulty: 'Easy',
            rating: 1000,
            topic: 'Arrays',
            pattern: 'Basic',
            url: 'invalid_url_string',
            solved: false,
            metadata: {},
          },
        ]);
        return {
          message: 'Triggered invalid URL warning validation report.',
          data: report,
        };
      }
      case 'MalformedProfile': {
        return {
          message: 'Simulated malformed profile JSON payload.',
          data: { userId: 'err-user', solvedProblemIds: null, streakInfo: undefined },
        };
      }
    }
  }
}
