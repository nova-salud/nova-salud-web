import { useState } from 'react'
import { useNavigate } from 'react-router'
import { PageContainer } from '@/shared/components'
import { useAlerts, useResolveAlert } from '../hooks'
import { useNotificationsContext } from '../../notifications/hooks'
import { AlertPriority, type AlertResponseDto } from '../types'
import { AlertFilter, AlertList, AlertResolveModal, AlertSummaryCards } from '../components'
import { resolveAlertNavigation } from '../../utils/resolve-alert-navigation'

const PRIORITY_ORDER = { HIGH: 0, MEDIUM: 1, LOW: 2 }

const AlertsPage = () => {
  const { data, isLoading, refetch, onChangeFilters, pagination } = useAlerts()
  const { resolveAlert, isLoading: isResolving } = useResolveAlert()
  const { refetch: refetchNotifications } = useNotificationsContext()
  const navigate = useNavigate()

  const [selectedAlert, setSelectedAlert] = useState<AlertResponseDto | null>(null)

  const sorted = [...data].sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority])

  const summary = {
    high: data.filter(a => a.priority === AlertPriority.HIGH).length,
    medium: data.filter(a => a.priority === AlertPriority.MEDIUM).length,
    low: data.filter(a => a.priority === AlertPriority.LOW).length,
  }

  const handleResolve = async () => {
    if (!selectedAlert) return
    await resolveAlert(selectedAlert.id)
    setSelectedAlert(null)
    await Promise.all([refetch(), refetchNotifications()])
  }

  return (
    <PageContainer title="Alertas" description="Monitoreo operativo del sistema">
      <div className="space-y-6">
        <AlertFilter onChangeFilters={onChangeFilters} />

        <AlertSummaryCards {...summary} />
        
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
