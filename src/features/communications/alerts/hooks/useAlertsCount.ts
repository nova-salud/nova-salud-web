import { RoleEnum } from '@/core/enums/role.enum'
import { useAppQuery } from '@/shared/hooks'
import { useAuth } from '@/shared/hooks/useAuth'
import { alertService } from '../services/alert.service'
import { ALERT_ROLES_WITH_ACCESS } from '../config/alert-role-config'

export const useAlertsCount = () => {
  const { user } = useAuth()
  const isEnabled = !!user && (ALERT_ROLES_WITH_ACCESS as readonly RoleEnum[]).includes(user.role)

  const { data } = useAppQuery({
    queryKey: ['alerts-count', user?.role],
    queryFn: () => alertService.getUnresolvedCount(),
    enabled: isEnabled,
    refetchInterval: 60_000,
  })

  return data?.count ?? 0
}
