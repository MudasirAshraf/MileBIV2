// useDashboardAccess.ts
import { useMemo } from "react";

export const useDashboardAccess = (user, dashboard) => {
  return useMemo(() => {
    if (!user || !dashboard) return true;
    if (dashboard.userId === user.id) return true;

    return (
      dashboard.dashboardPermissions?.some(
        (perm) =>
          perm.userId === user.id &&
          perm.permission !== 0 &&
          perm.permission !== 1
      ) ?? false
    );
  }, [user, dashboard]);
};
