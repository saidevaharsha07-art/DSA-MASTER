/**
 * Permission & Role Models
 */

export type PermissionName =
  | 'solve_problems'
  | 'submit_contests'
  | 'manage_settings'
  | 'view_dev_tools'
  | 'export_data'
  | 'admin_access';

export interface UserRoleDefinition {
  readonly role: string;
  readonly permissions: ReadonlyArray<PermissionName>;
}
