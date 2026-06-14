import { RoleEnum } from '@/core/enums/role.enum'
import { useAppQuery } from '@/shared/hooks'
import { useAuth } from '@/shared/hooks/useAuth'
import { alertService } from '../services/alert.service'
import { ALERT_ROLES_WITH_ACCESS, getTypesForRole } from '../config/alert-role-config'

export const useAlertsCount = () => {
  const { user } = useAuth()
  const roleTypes = user ? getTypesForRole(user.role) : undefined
  const isEnabled = !!user && (ALERT_ROLES_WITH_ACCESS as readonly RoleEnum[]).includes(user.role)

  const { data } = useAppQuery({
    queryKey: ['alerts-count', user?.role],
    queryFn: () => alertService.getUnresolvedCount(roleTypes),
    enabled: isEnabled,
    refetchInterval: 60_000,
  })

  return data?.count ?? 0
}
