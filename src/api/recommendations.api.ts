/**
 * API Layer — Recommendations API
 */

import { Container } from '@/src/core/container/container';
import { OracleService } from '@/src/intelligence/oracle/services/oracle.service';
import { OracleContextBundle } from '@/src/intelligence/oracle/services/context.service';
import { UnifiedOracleRecommendation } from '@/src/intelligence/oracle/models/recommendation.models';

export class RecommendationsApi {
  private static get service(): OracleService {
    if (!Container.has('OracleService')) {
      Container.registerSingleton('OracleService', new OracleService());
    }
    return Container.resolve<OracleService>('OracleService');
  }

  public static async getRecommendations(bundle: OracleContextBundle): Promise<ReadonlyArray<UnifiedOracleRecommendation>> {
    const { recommendations } = this.service.getRecommendations(bundle);
    return recommendations;
  }
}
