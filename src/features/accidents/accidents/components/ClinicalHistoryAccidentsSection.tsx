import { Button } from '@/shared/components/ui/form'
import { cn } from '@/shared/utils'
import { DataTable } from '@/shared/components/ui/table/DataTable'
import { ACCIDENT_STATUS_CLASSNAME, ACCIDENT_STATUS_LABEL, ACCIDENT_TYPE_CLASSNAME, ACCIDENT_TYPE_LABEL } from '../types'
import { format } from 'date-fns'
import { useAccidentsByClinicalHistory } from '../hooks/useAccidentsByClinicalHistory'

type Props = {
  clinicalHistoryId: number
  onCreate?: () => void
  onViewDetail?: (id: number) => void
}

export const ClinicalHistoryAccidentsSection = ({ clinicalHistoryId, onCreate, onViewDetail }: Props) => {
  const { data, isLoading, total, page, pageSize, totalPages, goToPage } =
    useAccidentsByClinicalHistory(clinicalHistoryId)

  return (
    <div className="px-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-slate-900">Accidentes</h2>
          {!isLoading && (
            <span className="rounded-xl bg-slate-100 px-3 py-1 text-xs text-slate-600">{total}</span>
          )}
        </div>

        {onCreate && (
          <Button type="button" className="w-auto" onClick={onCreate}>
            Registrar accidente
          </Button>
        )}
      </div>

      <p className="mb-4 text-sm text-slate-500">Eventos e incidentes registrados del trabajador.</p>

      <DataTable
        data={data}
        isLoading={isLoading}
        emptyMessage="No hay accidentes registrados."
        columns={['ID', 'Fecha', 'Tipo', 'Estado', 'Descripción', 'Acciones']}
        renderRow={(item) => (
          <>
            <td className="px-6 py-5 font-medium text-slate-900">#{item.id}</td>
            <td className="px-6 py-5 text-slate-700">
              {item.occurredAt ? format(new Date(item.occurredAt), 'dd/MM/yyyy HH:mm') : '-'}
            </td>
            <td className="px-6 py-5">
              <span className={cn('rounded-xl px-2 py-1 text-xs', ACCIDENT_TYPE_CLASSNAME[item.type])}>
                {ACCIDENT_TYPE_LABEL[item.type]}
              </span>
            </td>
            <td className="px-6 py-5">
              <span className={cn('rounded-xl px-2 py-1 text-xs', ACCIDENT_STATUS_CLASSNAME[item.status])}>
                {ACCIDENT_STATUS_LABEL[item.status]}
              </span>
            </td>
            <td className="max-w-64 truncate px-6 py-5 text-slate-700">
              {item.description || 'Sin descripción'}
            </td>
            <td className="px-6 py-5">
              {onViewDetail && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-auto rounded-xl px-3 py-2 text-xs"
                  onClick={() => onViewDetail(item.id)}
                >
                  Ver detalle
                </Button>
              )}
            </td>
          </>
        )}
        pagination={{
          page,
          pageSize,
          total,
          totalPages,
          onPaginationChange: (p) => goToPage(p),
        }}
      />
    </div>
  )
}
