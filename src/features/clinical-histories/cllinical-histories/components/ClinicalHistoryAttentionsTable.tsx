import { format } from 'date-fns'
import { Button } from '@/shared/components/ui/form'
import type { ClinicalHistoryAttentionResponseDto } from '../types/clinical-history-full-response.dto'

type Props = {
  attentions: ClinicalHistoryAttentionResponseDto[]
  onViewDetail?: (id: number) => void
}

const ClinicalHistoryAttentionsTable = ({
  attentions,
  onViewDetail,
}: Props) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">Atenciones</h2>
        <p className="text-sm text-slate-500">
          Registro de atenciones médicas realizadas
        </p>
      </div>

      {attentions.length === 0 ? (
        <div className="text-sm text-slate-500">
          No hay atenciones registradas
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-slate-500">
                <th className="py-3 pr-4 font-medium">Fecha</th>
                <th className="pr-4 font-medium">Diagnóstico</th>
                <th className="pr-4 font-medium">EVA</th>
                <th className="pr-4 font-medium">Tratamiento</th>
                <th className="text-right font-medium">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {attentions.map((att) => (
                <tr
                  key={att.id}
                  className="border-b border-slate-100 last:border-b-0"
                >
                  <td className="py-3 pr-4 text-slate-700">
                    {att.createdAt
                      ? format(new Date(att.createdAt), 'dd/MM/yyyy HH:mm')
                      : '-'}
                  </td>

                  <td className="pr-4 text-slate-700">
                    {att.diagnosisCode || '-'}
                  </td>

                  <td className="pr-4 text-slate-700">
                    {att.eva ?? '-'}
                  </td>

                  <td className="max-w-65 truncate pr-4 text-slate-700">
                    {att.treatment || '-'}
                  </td>

                  <td className="py-3 text-right">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-auto"
                      onClick={() => onViewDetail?.(att.id)}
                    >
                      Ver detalle
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ClinicalHistoryAttentionsTable