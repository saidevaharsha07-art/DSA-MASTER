/**
 * Permission & Role Evaluation Service
 */

import { PermissionName, UserRoleDefinition } from '../models/permission.models';
import { AuthUser } from '../models/user.models';

export class PermissionService {
  private static roleMap: Map<string, UserRoleDefinition> = new Map([
    ['admin', { role: 'admin', permissions: ['solve_problems', 'submit_contests', 'manage_settings', 'view_dev_tools', 'export_data', 'admin_access'] }],
    ['user', { role: 'user', permissions: ['solve_problems', 'submit_contests', 'manage_settings', 'view_dev_tools', 'export_data'] }],
    ['guest', { role: 'guest', permissions: ['solve_problems', 'view_dev_tools'] }],
  ]);

  public static hasPermission(user: AuthUser | null, permission: PermissionName): boolean {
    if (!user) return false;
    for (const r of user.roles) {
      const def = this.roleMap.get(r);
      if (def && def.permissions.includes(permission)) {
        return true;
      }
    }
    return false;
  }
}
