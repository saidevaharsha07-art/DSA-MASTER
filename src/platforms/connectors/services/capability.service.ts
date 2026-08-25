/**
 * Connector Capability Evaluation Service
 */

import { IPlatformConnector } from '../providers/connector.interface';
import { ConnectorCapabilities } from '../models/capability.models';

export class CapabilityService {
  public static getCapabilities(connector: IPlatformConnector): ConnectorCapabilities {
    return connector.capabilities();
  }
}
