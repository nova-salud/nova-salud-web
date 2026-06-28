export type EventReportType = 'ATTENTION' | 'ACCIDENT' | 'INCIDENT'
export type EventReportTypeFilter = EventReportType | 'ALL'

export const EVENT_TYPE_LABEL: Record<EventReportType, string> = {
  ATTENTION: 'Atención',
  ACCIDENT: 'Accidente',
  INCIDENT: 'Incidente',
}

export const EVENT_STATUS_LABEL: Record<string, string> = {
  OPEN: 'Abierto',
  IN_PROGRESS: 'En progreso',
  CLOSED: 'Cerrado',
  COMPLETED: 'Completado',
}

export const SEVERITY_LABEL: Record<string, string> = {
  LOW: 'Bajo',
  MEDIUM: 'Medio',
  HIGH: 'Alto',
  INCIDENT: 'Incidente',
  MINOR_ACCIDENT: 'Acc. Leve',
  DISABLING_ACCIDENT: 'Acc. Incapacitante',
  FATAL_ACCIDENT: 'Acc. Fatal',
}

export type EventReportItemDto = {
  id: number
  type: EventReportType
  date: string
  employeeId: number | null
  employeeFullName: string | null
  employeeArea: string | null
  severity: string | null
  classification: string | null
  status: string
  hasInvestigation: boolean | null
  correctiveMeasures: string | null
  responsible: string | null
  sourceId: number
}

export type FindEventsReportParams = {
  type?: EventReportTypeFilter
  employeeFullName?: string
  dateFrom?: string
  dateTo?: string
  page?: number
  pageSize?: number
}
