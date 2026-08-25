'use client';

import { useAuth } from './useAuth';
import { PermissionService } from '../services/permission.service';
import { PermissionName } from '../models/permission.models';

export function usePermissions() {
  const { user } = useAuth();

  const can = (permission: PermissionName): boolean => {
    return PermissionService.hasPermission(user, permission);
  };

  return { can, roles: user?.roles || [] };
}
