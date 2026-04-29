import { Input } from '@/shared/components/ui/form'
import { useState } from 'react'

type Props = {
  followUpScheduledAt?: string
  followUpReason?: string
  onChange: (data: {
    followUpScheduledAt?: string
    followUpReason?: string
  }) => void
}

export const FollowUpSection = ({
  followUpScheduledAt,
  followUpReason,
  onChange,
}: Props) => {
  const [enabled, setEnabled] = useState<boolean>(!!followUpScheduledAt)

  const handleToggle = (value: boolean) => {
    setEnabled(value)

    if (!value) {
      onChange({
        followUpScheduledAt: undefined,
        followUpReason: undefined,
      })
    }
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => handleToggle(e.target.checked)}
        />
        <span className="font-medium">Programar seguimiento</span>
      </label>

      {enabled && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <Input
            label="Fecha de seguimiento"
            type="datetime-local"
            value={followUpScheduledAt ?? ''}
            onChange={(value) =>
              onChange({
                followUpScheduledAt: value || undefined,
                followUpReason,
              })
            }
          />

          <Input
            label="Motivo"
            placeholder="Ej: Control de evolución"
            value={followUpReason ?? ''}
            onChange={(value) =>
              onChange({
                followUpScheduledAt,
                followUpReason: value || undefined,
              })
            }
          />
        </div>
      )}
    </div>
  )
}