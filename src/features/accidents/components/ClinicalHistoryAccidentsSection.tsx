import { Button } from '@/shared/components/ui/form'
import { ACCIDENT_STATUS_CLASSNAME, ACCIDENT_STATUS_LABEL, ACCIDENT_TYPE_CLASSNAME, ACCIDENT_TYPE_LABEL, type AccidentResponseDto } from '../types'
import { format } from 'date-fns'
import { cn } from '@/shared/utils'

type Props = {
  items: AccidentResponseDto[]
  onCreate?: () => void
  onViewDetail?: (id: number) => void
}

export const ClinicalHistoryAccidentsSection = ({
  items,
  onCreate,
  onViewDetail,
}: Props) => {
  return (
    <div className="px-5">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Accidentes
          </h2>
          <p className="text-sm text-slate-500">
            Eventos e incidentes registrados del trabajador.
          </p>
        </div>

        {onCreate && (
          <Button
            type="button"
            className="w-auto"
            onClick={onCreate}
          >
            Registrar accidente
          </Button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-sm text-slate-500">
          No hay accidentes registrados.
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    Accidente #{index + 1}
                  </p>
                  <p className="text-xs text-slate-500">
                    {item.occurredAt
                      ? format(new Date(item.occurredAt), 'dd/MM/yyyy HH:mm')
                      : '-'}
                  </p>
                </div>

                <div className="flex gap-2 text-xs">
                  <span
                    className={cn(
                      'rounded-xl px-3 py-1',
                      ACCIDENT_TYPE_CLASSNAME[item.type],
                    )}
                  >
                    {ACCIDENT_TYPE_LABEL[item.type]}
                  </span>

                  <span
                    className={cn(
                      'rounded-xl px-3 py-1',
                      ACCIDENT_STATUS_CLASSNAME[item.status],
                    )}
                  >
                    {ACCIDENT_STATUS_LABEL[item.status]}
                  </span>
                </div>
              </div>

              <p className="mt-3 text-sm text-slate-700">
                {item.description || 'Sin descripción'}
              </p>

              {onViewDetail && (
                <div className="mt-3 flex justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-auto text-xs"
                    onClick={() => onViewDetail(item.id)}
                  >
                    Ver detalle
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}