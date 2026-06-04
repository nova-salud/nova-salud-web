import { Input } from '@/shared/components/ui/form'
import { useState } from 'react'

type Props = {
  followUpScheduledAt?: string
  followUpReason?: string
  onChange: (data: {
    followUpScheduledAt?: string
    followUpReason?: string
  }) => void
  enabled?: boolean
  onEnabledChange?: (value: boolean) => void
}

export const FollowUpSection = ({
  followUpScheduledAt,
  followUpReason,
  onChange,
  enabled: enabledProp,
  onEnabledChange,
}: Props) => {
  const [enabledInternal, setEnabledInternal] = useState<boolean>(!!followUpScheduledAt)
  const enabled = enabledProp !== undefined ? enabledProp : enabledInternal

  const handleToggle = (value: boolean) => {
    if (onEnabledChange) {
      onEnabledChange(value)
    } else {
      setEnabledInternal(value)
    }

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
            name="followUpScheduledAt"
            type="datetime-local"
            value={followUpScheduledAt ?? ''}
            onChange={(e) =>
              onChange({
                followUpScheduledAt: e.target.value || undefined,
                followUpReason,
              })
            }
          />

          <Input
            label="Motivo"
            name="followUpReason"
            type="text"
            placeholder="Ej: Control de evolución"
            value={followUpReason ?? ''}
            onChange={(e) =>
              onChange({
                followUpScheduledAt,
                followUpReason: e.target.value || undefined,
              })
            }
          />
        </div>
      )}
    </div>
  )
}