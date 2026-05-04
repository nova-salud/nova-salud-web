import { parseBackendError } from '@/core/utils/parse-backend-error'
import { useState, useCallback, useEffect } from 'react'
import type { FindAlertsDto } from '../types/find-alerts.dto'
import type { AlertResponseDto } from '../types/alert-response.dto'
import { alertService } from '../services/alert.service'
import { AlertType } from '../types/alert-type.enum'
import { AlertPriority } from '../types/alert-priority.enum'

export const mockAlerts: AlertResponseDto[] = [
  {
    id: 1,
    type: AlertType.EMO_OVERDUE,
    title: 'Evaluación médica ocupacional',
    message: 'EMO vencida por 5 días',
    priority: AlertPriority.HIGH,
    isResolved: false,
    metadata: {
      historyId: 10,
      band: 'OVERDUE',
      daysRemaining: -5,
    },
    createdAt: '2026-05-10T10:00:00Z',
  },
  {
    id: 2,
    type: AlertType.LOW_STOCK,
    title: 'Stock bajo',
    message: 'Stock bajo (2 / 10)',
    priority: AlertPriority.HIGH,
    isResolved: false,
    metadata: {
      medicationId: 5,
      stock: 2,
      minimumStock: 10,
    },
    createdAt: '2026-05-10T09:30:00Z',
  },
  {
    id: 3,
    type: AlertType.REQUIREMENT_PENDING_CONFIRMATION,
    title: 'Pendiente de confirmación',
    message: 'Doctor no ha confirmado recepción',
    priority: AlertPriority.MEDIUM,
    isResolved: false,
    metadata: {
      requirementId: 7,
    },
    createdAt: '2026-05-09T14:20:00Z',
  },
  {
    id: 4,
    type: AlertType.ACCIDENT_REPORTED,
    title: 'Accidente registrado',
    message: 'Accidente registrado - Juan Pérez',
    priority: AlertPriority.LOW,
    isResolved: false,
    metadata: {
      accidentId: 3,
    },
    createdAt: '2026-05-08T11:00:00Z',
  },
  {
    id: 5,
    type: AlertType.LONG_OPEN_CASE,
    title: 'Caso prolongado',
    message: 'Caso abierto por más de 7 días',
    priority: AlertPriority.HIGH,
    isResolved: false,
    metadata: {
      accidentCaseId: 12,
    },
    createdAt: '2026-05-07T08:15:00Z',
  },
]

export const useAlerts = (query?: FindAlertsDto) => {
  const [data, setData] = useState<AlertResponseDto[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAlerts = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await alertService.findAll(query)
      setData(mockAlerts)
    } catch (error) {
      setData([])
      setError(parseBackendError(error))
    } finally {
      setIsLoading(false)
    }
  }, [query])

  useEffect(() => {
    void fetchAlerts()
  }, [fetchAlerts])

  return {
    data,
    isLoading,
    error,
    refetch: fetchAlerts,
  }
}