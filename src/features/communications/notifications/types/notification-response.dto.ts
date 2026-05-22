import type { AlertMetadata } from '../../alerts/types/alert-metadata'
import { AlertPriority } from '../../alerts/types/alert-priority.enum'
import { AlertType } from '../../alerts/types/alert-type.enum'

export interface NotificationResponseDto {
  id: number
  isRead: boolean
  createdAt: string
  alertId: number
  alertType: AlertType
  alertPriority: AlertPriority
  alertTitle: string
  alertMessage: string
  employeeName: string | null
  employeeId: number | null
  metadata?: AlertMetadata | null
}

export const MOCK_NOTIFICATIONS: NotificationResponseDto[] = [
  {
    id: 1,
    isRead: false,
    createdAt: new Date().toISOString(),
    alertId: 101,
    alertType: AlertType.EMO_OVERDUE,
    alertPriority: AlertPriority.HIGH,
    alertTitle: 'EMO vencida',
    alertMessage: 'Evaluación médica ocupacional vencida',
    employeeId: 29,
    employeeName: 'Juan Pérez',
    metadata: {
      historyId: 301,
      band: 'OVERDUE',
      daysRemaining: 0,
    },
  },
  {
    id: 2,
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    alertId: 102,
    alertType: AlertType.LOW_STOCK,
    alertPriority: AlertPriority.MEDIUM,
    alertTitle: 'Stock bajo',
    alertMessage: 'Paracetamol por debajo del mínimo',
    employeeId: null,
    employeeName: null,
    metadata: {
      medicationId: 14,
      stock: 8,
      minimumStock: 20,
    },
  },
  {
    id: 3,
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    alertId: 103,
    alertType: AlertType.RESPIRATORY,
    alertPriority: AlertPriority.HIGH,
    alertTitle: 'Síntomas respiratorios',
    alertMessage: 'Frecuencia alta de síntomas respiratorios',
    employeeId: 17,
    employeeName: 'María López',
    metadata: {
      clinicalHistoryId: 502,
      respiratoryCount: 4,
    },
  },
  {
    id: 4,
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    alertId: 104,
    alertType: AlertType.ACCIDENT_REPORTED,
    alertPriority: AlertPriority.HIGH,
    alertTitle: 'Accidente reportado',
    alertMessage: 'Nuevo accidente registrado',
    employeeId: 34,
    employeeName: 'Carlos Rojas',
    metadata: {
      accidentId: 88,
    },
  },
  {
    id: 5,
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    alertId: 105,
    alertType: AlertType.HIGH_FREQUENCY,
    alertPriority: AlertPriority.MEDIUM,
    alertTitle: 'Alta frecuencia de atenciones',
    alertMessage: 'Más de 5 atenciones en 30 días',
    employeeId: 41,
    employeeName: 'Luis Torres',
    metadata: {
      clinicalHistoryId: 610,
      attentionsCount: 6,
    },
  },
  {
    id: 6,
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    alertId: 106,
    alertType: AlertType.PENDING_DISCHARGE,
    alertPriority: AlertPriority.MEDIUM,
    alertTitle: 'Alta pendiente',
    alertMessage: 'Paciente pendiente de alta médica',
    employeeId: 22,
    employeeName: 'Ana García',
    metadata: {
      accidentCaseId: 45,
    },
  },
  {
    id: 7,
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    alertId: 107,
    alertType: AlertType.REQUIREMENT_PENDING,
    alertPriority: AlertPriority.LOW,
    alertTitle: 'Requerimiento pendiente',
    alertMessage: 'Solicitud de medicamentos sin atender',
    employeeId: null,
    employeeName: null,
    metadata: {
      requirementId: 73,
    },
  },
  {
    id: 8,
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    alertId: 108,
    alertType: AlertType.REQUIREMENT_PENDING_CONFIRMATION,
    alertPriority: AlertPriority.MEDIUM,
    alertTitle: 'Confirmación pendiente',
    alertMessage: 'Requerimiento entregado pendiente de confirmación',
    employeeId: null,
    employeeName: null,
    metadata: {
      requirementId: 81,
    },
  },
  {
    id: 9,
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    alertId: 109,
    alertType: AlertType.ACTIVE_RESTRICTIONS,
    alertPriority: AlertPriority.HIGH,
    alertTitle: 'Restricción activa',
    alertMessage: 'Trabajador con restricciones activas',
    employeeId: 55,
    employeeName: 'Roberto Mendoza',
    metadata: {
      accidentCaseId: 91,
    },
  },
  {
    id: 10,
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    alertId: 110,
    alertType: AlertType.LONG_OPEN_CASE,
    alertPriority: AlertPriority.HIGH,
    alertTitle: 'Caso prolongado',
    alertMessage: 'Caso abierto por más de 30 días',
    employeeId: 63,
    employeeName: 'Patricia Salazar',
    metadata: {
      accidentCaseId: 103,
    },
  },
]