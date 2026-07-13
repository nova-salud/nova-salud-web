import { useState } from 'react'
import { format, startOfYear, endOfYear } from 'date-fns'
import { Button } from '@/shared/components/ui/form'
import { DataTable } from '@/shared/components/ui/table/DataTable'
import { getFileUrl } from '@/shared/utils'
import { useMedicalRests } from '../hooks/useMedicalRests'
import { useMedicalRestsSummary } from '../hooks/useMedicalRestsSummary'
import { getMedicalRestDays } from '../utils/medical-rest-days.util'
import type { MedicalRestType } from '../types'
import MedicalRestFormSidebar from './MedicalRestFormSidebar'

const TYPE_LABEL: Record<MedicalRestType, string> = {
  CITT: 'CITT',
  PARTICULAR: 'Particular',
}

type Props = {
  clinicalHistoryId: number
  accidentId?: number
  attentionId?: number
  isReadOnly?: boolean
}

export const ClinicalHistoryMedicalRestsSection = ({ clinicalHistoryId, accidentId, attentionId, isReadOnly = false }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const { data, isLoading, refetch, pagination } =
    useMedicalRests({ clinicalHistoryId, accidentId, attentionId })

  const currentYear = new Date().getFullYear()
  const { summary, refetch: refetchSummary } = useMedicalRestsSummary({
    clinicalHistoryId,
    startDateFrom: format(startOfYear(new Date()), 'yyyy-MM-dd'),
    startDateTo: format(endOfYear(new Date()), 'yyyy-MM-dd'),
  })

  return (
    <div className="px-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-bold text-slate-900">Descansos médicos</h2>
          {!isLoading && (
            <span className="rounded-xl bg-slate-100 px-3 py-1 text-xs text-slate-600">{pagination.total}</span>
          )}
          <span className="rounded-xl bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
            Acumulado {currentYear}: {summary.totalDays} días
          </span>
        </div>

        {!isReadOnly && (
          <Button type="button" className="w-auto" onClick={() => setIsSidebarOpen(true)}>
            Registrar DM
          </Button>
        )}
      </div>

      <p className="mb-4 text-sm text-slate-500">Descansos médicos emitidos al trabajador.</p>

      <DataTable
        variant="plain"
        data={data}
        isLoading={isLoading}
        emptyMessage="No hay descansos médicos registrados."
        columns={['Inicio', 'Fin', 'Días DM', 'Días subsidiados', 'Tipo', 'Especialidad', 'Archivo']}
        renderRow={(item) => (
          <>
            <td className="px-6 py-5 text-slate-700">
              {format(new Date(item.startDate), 'dd/MM/yyyy')}
            </td>
            <td className="px-6 py-5 text-slate-700">
              {format(new Date(item.endDate), 'dd/MM/yyyy')}
            </td>
            <td className="px-6 py-5 text-sm text-slate-600">
              {getMedicalRestDays(item.startDate, item.endDate)}
            </td>
            <td className="px-6 py-5 text-sm text-slate-600">
              {item.subsidizedDays ?? '—'}
            </td>
            <td className="px-6 py-5 text-sm text-slate-600">
              {item.type ? TYPE_LABEL[item.type] : '—'}
            </td>
            <td className="px-6 py-5 text-sm text-slate-600">
              {item.specialtyName ?? '—'}
            </td>
            <td className="px-6 py-5">
              {item.fileUrl ? (
                <Button
                  type="button"
                  variant="outline"
                  className="w-auto rounded-xl px-3 py-2 text-xs"
                  onClick={() => window.open(getFileUrl(item.fileUrl!), '_blank')}
                >
                  Ver PDF
                </Button>
              ) : (
                <span className="text-xs text-slate-400">Sin archivo</span>
              )}
            </td>
          </>
        )}
        pagination={pagination}
      />

      <MedicalRestFormSidebar
        isOpen={isSidebarOpen}
        clinicalHistoryId={clinicalHistoryId}
        accidentId={accidentId}
        attentionId={attentionId}
        onClose={() => setIsSidebarOpen(false)}
        onSuccess={() => {
          setIsSidebarOpen(false)
          void refetch()
          void refetchSummary()
        }}
      />
    </div>
  )
}
