import { format } from 'date-fns'
import type { AttentionFollowUpResponseDto } from '../types/attention-follow-up-response.dto'

type Props = {
  followUps: AttentionFollowUpResponseDto[]
  selectedId?: number
  onChange: (id?: number) => void
  isLoading?: boolean
  error?: string | null
}

export const FollowUpSelectionSection = ({
  followUps,
  selectedId,
  onChange,
  isLoading,
  error,
}: Props) => {
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm text-sm text-slate-500">
        Cargando seguimientos...
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
        {error}
      </div>
    )
  }

  if (!followUps.length) return null

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Seguimientos pendientes
        </h2>
        <p className="text-sm text-slate-500">
          Puedes vincular esta atención a un seguimiento existente.
        </p>
      </div>

      <div className="space-y-3">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={!selectedId}
            onChange={() => onChange(undefined)}
          />
          <span className="text-sm text-slate-700">
            No es seguimiento
          </span>
        </label>

        {followUps.map((fup, index) => (
          <label key={fup.id} className="flex items-center gap-3">
            <input
              type="radio"
              checked={selectedId === fup.id}
              onChange={() => onChange(fup.id)}
            />

            <div className="text-sm text-slate-700">
              <span className="font-medium">
                Seguimiento {index + 1}
              </span>

              <span className="ml-2 text-xs text-slate-500">
                ({format(new Date(fup.scheduledAt), 'dd/MM/yyyy')})
              </span>

              {fup.reason && (
                <span className="ml-2 text-xs text-slate-400">
                  - {fup.reason}
                </span>
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  )
}