import { format } from 'date-fns'
import type { AttentionFollowUpResponseDto } from '../types/attention-follow-up-response.dto'
import { FOLLOW_UP_STATUS_CLASSNAME, FOLLOW_UP_STATUS_LABEL } from '../types/follow-up-status.enum'


type Props = {
  followUps?: AttentionFollowUpResponseDto[]
}


export const AttentionFollowUpsSection = ({ followUps }: Props) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Seguimientos
        </h2>
        <p className="text-sm text-slate-500">
          Programaciones de seguimiento generadas desde esta atención.
        </p>
      </div>

      {!followUps || followUps.length === 0 ? (
        <div className="text-sm text-slate-500">
          No hay seguimientos registrados para esta atención.
        </div>
      ) : (
        <div className="space-y-4">
          {[...followUps].toSorted(
            (a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
          ).map((fup, index) => (
            <div
              key={fup.id}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    Seguimiento {index + 1}
                  </p>
                  <p className="text-xs text-slate-500">
                    Programado:{' '}
                    {fup.scheduledAt
                      ? format(new Date(fup.scheduledAt), 'dd/MM/yyyy HH:mm')
                      : '-'}
                  </p>
                </div>

                <span
                  className={`rounded-xl px-3 py-1 text-xs ${FOLLOW_UP_STATUS_CLASSNAME[fup.status]}`}
                >
                  {FOLLOW_UP_STATUS_LABEL[fup.status]}
                </span>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                    Motivo
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    {fup.reason || 'No registrado'}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                    Cumplido el
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    {fup.fulfilledAt
                      ? format(new Date(fup.fulfilledAt), 'dd/MM/yyyy HH:mm')
                      : 'No cumplido'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}