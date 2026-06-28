import * as XLSX from 'xlsx'
import { format, differenceInDays } from 'date-fns'
import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { env } from '@/config/env'
import { medicalRestService } from '../services/medical-rest.service'
import type { MedicalRestContingency, MedicalRestResponseDto, MedicalRestType } from '../types'

const TYPE_LABEL: Record<MedicalRestType, string> = {
  CITT: 'CITT',
  PARTICULAR: 'Particular',
}

const CONTINGENCY_LABEL: Record<MedicalRestContingency, string> = {
  COMMON_DISEASE: 'Enfermedad común',
  WORK_ACCIDENT: 'Acc. de trabajo',
  TRANSIT_ACCIDENT: 'Acc. de tránsito',
  EMERGENCY: 'Emergencia',
  COMMON_ACCIDENT: 'Acc. común',
}

const COLUMNS = [
  'Empleado', 'Historia Clínica', 'Especialidad', 'Tipo', 'Contingencia',
  'Diagnóstico', 'Fecha inicio', 'Fecha fin', 'Días DM', 'Días subsidiados',
  'Observaciones', 'Documento',
]

function toRow(item: MedicalRestResponseDto) {
  const daysDm = differenceInDays(new Date(item.endDate), new Date(item.startDate)) + 1
  return {
    'Empleado': item.employeeFullName ?? '',
    'Historia Clínica': item.clinicalHistoryId,
    'Especialidad': item.specialtyName ?? '',
    'Tipo': item.type ? TYPE_LABEL[item.type] : '',
    'Contingencia': item.contingency ? CONTINGENCY_LABEL[item.contingency] : '',
    'Diagnóstico': item.diagnosis ?? '',
    'Fecha inicio': format(new Date(item.startDate), 'dd/MM/yyyy'),
    'Fecha fin': format(new Date(item.endDate), 'dd/MM/yyyy'),
    'Días DM': daysDm,
    'Días subsidiados': Math.max(0, daysDm - 30),
    'Observaciones': item.notes ?? '',
    'Documento': item.fileUrl ? 'Descargar' : '',
    _fileUrl: item.fileUrl ? `${env.fileBaseUrl}${item.fileUrl}` : '',
  }
}

type Filters = {
  employeeFullName?: string
  startDateFrom?: string
  startDateTo?: string
}

const DOC_COL = XLSX.utils.encode_col(COLUMNS.indexOf('Documento'))

async function exportAction(filters: Filters): Promise<void> {
  const result = await medicalRestService.findAll({ ...filters, page: 1, pageSize: 100 })
  const rows = result.data.map(toRow)

  const ws = XLSX.utils.json_to_sheet(rows, { header: [...COLUMNS, '_fileUrl'] })

  rows.forEach((row, i) => {
    if (!row._fileUrl) return
    const cellAddr = `${DOC_COL}${i + 2}`
    if (ws[cellAddr]) {
      ws[cellAddr].l = { Target: row._fileUrl, Tooltip: 'Descargar documento' }
    }
  })

  const hiddenColIdx = COLUMNS.length
  if (!ws['!cols']) ws['!cols'] = []
  ws['!cols'][hiddenColIdx] = { hidden: true }

  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Descansos Médicos')
  XLSX.writeFile(wb, 'descansos-medicos.xlsx')
}

export const useExportMedicalRests = () => {
  const { execute, isLoading } = useAsyncAction<[Filters], void>(
    exportAction,
    { successMessage: 'Excel exportado correctamente.' },
  )

  return { exportMedicalRests: execute, isLoading }
}
