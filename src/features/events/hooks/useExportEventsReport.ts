import * as XLSX from 'xlsx'
import { format } from 'date-fns'
import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { eventsReportService } from '../services/events-report.service'
import {
  EVENT_TYPE_LABEL,
  EVENT_STATUS_LABEL,
  SEVERITY_LABEL,
  type EventReportItemDto,
  type FindEventsReportParams,
} from '../types/event-report.types'

function toRow(item: EventReportItemDto) {
  return {
    'Tipo': EVENT_TYPE_LABEL[item.type] ?? item.type,
    'Fecha': format(new Date(item.date), 'dd/MM/yyyy'),
    'Trabajador': item.employeeFullName ?? '',
    'Área': item.employeeArea ?? '',
    'Gravedad': item.severity ? (SEVERITY_LABEL[item.severity] ?? item.severity) : '',
    'Estado': item.status ? (EVENT_STATUS_LABEL[item.status] ?? item.status) : '',
    '¿Investigado?': item.hasInvestigation === null ? '—' : item.hasInvestigation ? 'Sí' : 'No',
    'Medidas correctivas': item.correctiveMeasures ?? '',
    'Responsable': item.responsible ?? '',
  }
}

type Filters = Omit<FindEventsReportParams, 'page' | 'pageSize'>

async function exportAction(filters: Filters): Promise<void> {
  const result = await eventsReportService.findAll({ ...filters, page: 1, pageSize: 100 })
  const rows = result.data.map(toRow)

  const ws = XLSX.utils.json_to_sheet(rows)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Reporte de Eventos')
  XLSX.writeFile(wb, 'reporte-eventos.xlsx')
}

export const useExportEventsReport = () => {
  const { execute, isLoading } = useAsyncAction<[Filters], void>(
    exportAction,
    { successMessage: 'Excel exportado correctamente.' },
  )

  return { exportEvents: execute, isLoading }
}
