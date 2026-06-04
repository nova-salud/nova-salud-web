import { format } from 'date-fns'
import { Button } from '@/shared/components/ui/form'
import { DataTable } from '@/shared/components/ui/table/DataTable'
import { useAttentionsByClinicalHistory } from '@/features/attentions/attentions/hooks/useAttentionsByClinicalHistory'

type Props = {
  clinicalHistoryId: number
  onViewDetail?: (id: number) => void
  onCreateAttention?: () => void
}

const ClinicalHistoryAttentionsTable = ({ clinicalHistoryId, onViewDetail, onCreateAttention }: Props) => {
  const { data, isLoading, total, page, pageSize, totalPages, goToPage } =
    useAttentionsByClinicalHistory(clinicalHistoryId)

  return (
    <div className="px-5">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-slate-900">Atenciones Médicas</h2>
            {!isLoading && (
              <span className="rounded-xl bg-slate-100 px-3 py-1 text-xs text-slate-600">{total}</span>
            )}
          </div>
          <p className="text-sm text-slate-500">Registro de atenciones médicas realizadas</p>
        </div>

        {onCreateAttention && (
          <Button type="button" className="w-auto" onClick={onCreateAttention}>
            Registrar atención
          </Button>
        )}
      </div>

      <DataTable
        flat
        data={data}
        isLoading={isLoading}
        emptyMessage="No hay atenciones registradas."
        columns={['Fecha', 'Diagnóstico', 'EVA', 'Tratamiento', 'Acciones']}
        renderRow={(att) => (
          <>
            <td className="px-6 py-5 text-slate-700">
              {att.createdAt ? format(new Date(att.createdAt), 'dd/MM/yyyy HH:mm') : '-'}
            </td>
            <td className="px-6 py-5 text-slate-700">{att.diagnosisCode || '-'}</td>
            <td className="px-6 py-5 text-slate-700">{att.eva ?? '-'}</td>
            <td className="max-w-64 truncate px-6 py-5 text-slate-700">{att.treatment || '-'}</td>
            <td className="px-6 py-5">
              <Button
                type="button"
                variant="outline"
                className="w-auto rounded-xl px-3 py-2 text-xs"
                onClick={() => onViewDetail?.(att.id)}
              >
                Ver detalle
              </Button>
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

export default ClinicalHistoryAttentionsTable
