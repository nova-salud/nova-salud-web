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
    employeeName: 'Juan Pérez',
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
    employeeName: null,
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
    employeeName: 'María López',
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
    employeeName: 'Carlos Rojas',
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
    employeeName: 'Luis Torres',
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
    employeeName: 'Ana García',
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
    employeeName: null,
  },
]