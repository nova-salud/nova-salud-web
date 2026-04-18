import { format } from 'date-fns'
import { Button } from '@/shared/components/ui/form'
import type { ClinicalHistoryAttentionResponseDto } from '../types/clinical-history-full-response.dto'

type Props = {
  attentions: ClinicalHistoryAttentionResponseDto[]
  onViewDetail?: (id: number) => void
  onDispense?: (id: number) => void
}

const ClinicalHistoryAttentionsTable = ({
  attentions,
  onViewDetail,
  onDispense,
}: Props) => {
  return (
    <div className="rounded-2xl  bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Atenciones</h2>
        <p className="text-sm text-muted-foreground">
          Registro de atenciones médicas realizadas
        </p>
      </div>

      {attentions.length === 0 ? (
        <div className="text-sm text-muted-foreground">
          No hay atenciones registradas
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="-b text-left">
                <th className="py-2">Fecha</th>
                <th>Diagnóstico</th>
                <th>EVA</th>
                <th>Tratamiento</th>
                <th className="text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {attentions.map((att) => (
                <tr key={att.id} className="-b">
                  <td className="py-2">
                    {att.createdAt
                      ? format(new Date(att.createdAt), 'dd/MM/yyyy HH:mm')
                      : '-'}
                  </td>

                  <td>{att.diagnosisCode || '-'}</td>

                  <td>{att.eva ?? '-'}</td>

                  <td className="max-w-62.5 truncate">
                    {att.treatment || '-'}
                  </td>

                  <td className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => onViewDetail?.(att.id)}
                      >
                        Ver
                      </Button>

                      <Button
                        onClick={() => onDispense?.(att.id)}
                      >
                        Dispensar
                      </Button>
                    </div>
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