import { useState } from 'react'
import { useNavigate } from 'react-router'
import { PageContainer } from '@/shared/components'
import { useAuth } from '@/shared/hooks/useAuth'
import { useAlerts, useResolveAlert } from '../hooks'
import { useNotificationsContext } from '../../notifications/hooks'
import type { AlertResponseDto } from '../types'
import { AlertFilter, AlertList, AlertResolveModal, AlertSummaryCards } from '../components'
import { resolveAlertNavigation } from '../../utils/resolve-alert-navigation'
import { getTypesForRole } from '../config/alert-role-config'

const PRIORITY_ORDER = { HIGH: 0, MEDIUM: 1, LOW: 2 }

const AlertsPage = () => {
  const { user } = useAuth()
  const roleTypes = user ? getTypesForRole(user.role) : undefined
  const { data, isLoading, refetch, onChangeFilters, pagination, summary } = useAlerts()
  const { resolveAlert, isLoading: isResolving } = useResolveAlert()
  const { refetch: refetchNotifications } = useNotificationsContext()
  const navigate = useNavigate()

  const [selectedAlert, setSelectedAlert] = useState<AlertResponseDto | null>(null)

  const sorted = [...data].sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority])

  const handleResolve = async () => {
    if (!selectedAlert) return
    await resolveAlert(selectedAlert.id)
    setSelectedAlert(null)
    await Promise.all([refetch(), refetchNotifications()])
  }

  return (
    <PageContainer title="Alertas" description="Monitoreo operativo del sistema">
      <div className="space-y-6">
        <AlertFilter onChangeFilters={onChangeFilters} allowedTypes={roleTypes} />

        <AlertSummaryCards high={summary.high} medium={summary.medium} low={summary.low} />
        
        <AlertList
          alerts={sorted}
          isLoading={isLoading}
          pagination={pagination}
          onNavigate={(alert) => navigate(resolveAlertNavigation(alert))}
          onResolve={setSelectedAlert}
        />

        <AlertResolveModal
          alert={selectedAlert}
          isLoading={isResolving}
          onConfirm={handleResolve}
          onClose={() => setSelectedAlert(null)}
        />
      </div>
    </PageContainer>
  )
}

export default AlertsPage
