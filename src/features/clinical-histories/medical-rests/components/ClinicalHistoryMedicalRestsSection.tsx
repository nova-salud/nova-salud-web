import { useState } from 'react'
import { format } from 'date-fns'
import { Button } from '@/shared/components/ui/form'
import { DataTable } from '@/shared/components/ui/table/DataTable'
import { getFileUrl } from '@/shared/utils'
import { useMedicalRests } from '../hooks/useMedicalRests'
import MedicalRestFormSidebar from './MedicalRestFormSidebar'

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

  return (
    <div className="px-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-slate-900">Descansos médicos</h2>
          {!isLoading && (
            <span className="rounded-xl bg-slate-100 px-3 py-1 text-xs text-slate-600">{pagination.total}</span>
          )}
        </div>

        {!isReadOnly && (
          <Button type="button" className="w-auto" onClick={() => setIsSidebarOpen(true)}>
            Registrar DM
          </Button>
        )}
      </div>

      <p className="mb-4 text-sm text-slate-500">Descansos médicos emitidos al trabajador.</p>

      <DataTable
        data={data}
        isLoading={isLoading}
        emptyMessage="No hay descansos médicos registrados."
        columns={['Inicio', 'Fin', 'Notas', 'Archivo']}
        renderRow={(item) => (
          <>
            <td className="px-6 py-5 text-slate-700">
              {format(new Date(item.startDate), 'dd/MM/yyyy')}
            </td>
            <td className="px-6 py-5 text-slate-700">
              {format(new Date(item.endDate), 'dd/MM/yyyy')}
            </td>
            <td className="max-w-64 truncate px-6 py-5 text-slate-500">
              {item.notes || '—'}
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
        }}
      />
    </div>
  )
}
