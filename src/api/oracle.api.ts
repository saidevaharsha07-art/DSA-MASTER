/**
 * API Layer — Oracle API
 */

import { Container } from '@/src/core/container/container';
import { OracleService } from '@/src/intelligence/oracle/services/oracle.service';
import { OracleContextBundle } from '@/src/intelligence/oracle/services/context.service';
import { OracleDashboardSnapshot } from '@/src/intelligence/oracle/models/dashboard.models';

export class OracleApi {
  private static get service(): OracleService {
    if (!Container.has('OracleService')) {
      Container.registerSingleton('OracleService', new OracleService());
    }
    return Container.resolve<OracleService>('OracleService');
  }

  public static async getDashboardSnapshot(bundle: OracleContextBundle): Promise<OracleDashboardSnapshot> {
    return this.service.getDashboardSnapshot(bundle);
  }
}
