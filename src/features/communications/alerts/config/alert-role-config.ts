import { RoleEnum } from '@/core/enums/role.enum'
import { AlertType } from '../types/alert-type.enum'

export const ALERT_ROLE_CONFIG: Partial<Record<RoleEnum, AlertType[]>> = {
  [RoleEnum.OCCUPATIONAL_DOCTOR]: [
    AlertType.HIGH_FREQUENCY,
    AlertType.RESPIRATORY,
    AlertType.REQUIREMENT_PENDING_CONFIRMATION,
    AlertType.LOW_STOCK,
    AlertType.EMO_60_DAYS,
    AlertType.EMO_30_DAYS,
    AlertType.EMO_OVERDUE,
  ],
  [RoleEnum.NURSE]: [
    AlertType.HIGH_FREQUENCY,
    AlertType.RESPIRATORY,
    AlertType.LOW_STOCK,
  ],
  [RoleEnum.SST]: [
    AlertType.RESPIRATORY,
    AlertType.ACCIDENT_REPORTED,
    AlertType.LONG_OPEN_CASE,
    AlertType.ACTIVE_RESTRICTIONS,
    AlertType.PENDING_DISCHARGE,
    AlertType.EMO_60_DAYS,
    AlertType.EMO_30_DAYS,
    AlertType.EMO_OVERDUE,
    AlertType.SYSTEM,
  ],
  [RoleEnum.HR]: [
    AlertType.REQUIREMENT_PENDING,
    AlertType.REQUIREMENT_PENDING_CONFIRMATION,
    AlertType.LOW_STOCK,
  ],
  [RoleEnum.MANAGEMENT]: [
    AlertType.PENDING_DISCHARGE,
    AlertType.EMO_30_DAYS,
    AlertType.EMO_OVERDUE,
    AlertType.SYSTEM,
  ],
  [RoleEnum.SUPERVISOR]: [
    AlertType.ACCIDENT_REPORTED,
    AlertType.ACTIVE_RESTRICTIONS,
  ],
  // ADMIN: sin entrada → ve todo sin filtro de tipos
}

export const ALERT_ROLES_WITH_ACCESS = [
  RoleEnum.ADMIN,
  RoleEnum.SST,
  RoleEnum.OCCUPATIONAL_DOCTOR,
  RoleEnum.NURSE,
  RoleEnum.HR,
  RoleEnum.MANAGEMENT,
  RoleEnum.SUPERVISOR,
] as const

export const getTypesForRole = (role: RoleEnum): AlertType[] | undefined =>
  role === RoleEnum.ADMIN ? undefined : ALERT_ROLE_CONFIG[role]
