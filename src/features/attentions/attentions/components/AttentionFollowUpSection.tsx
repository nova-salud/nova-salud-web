import { useState } from 'react'
import { Button, Input } from '@/shared/components/ui/form'
import { DateTimePicker } from '@/shared/components/ui/form/DateTimePicker'
import { Modal } from '@/shared/components/ui/modal/Modal'
import { format } from 'date-fns'
import { toastService } from '@/core/services/toast.service'

export type FollowUpFormState = {
  scheduledAt: string
  reason?: string
}

type Props = {
  followUp: FollowUpFormState | null
  onChange: (value: FollowUpFormState | null) => void
}

const AttentionFollowUpSection = ({ followUp, onChange }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [draft, setDraft] = useState<FollowUpFormState>({ scheduledAt: '', reason: '' })

  const openModal = () => {
    setDraft(followUp ?? { scheduledAt: '', reason: '' })
    setIsOpen(true)
  }

  const handleConfirm = () => {
    if (!draft.scheduledAt) {
      toastService.error('Debes ingresar la fecha del seguimiento.')
      return
    }

    const scheduled = new Date(draft.scheduledAt)
    const today = new Date()
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const scheduledMidnight = new Date(scheduled.getFullYear(), scheduled.getMonth(), scheduled.getDate())

    if (scheduledMidnight <= todayMidnight) {
      toastService.error('La fecha debe ser al menos el día siguiente al de hoy.')
      return
    }

    onChange({ scheduledAt: draft.scheduledAt, reason: draft.reason?.trim() || undefined })
    setIsOpen(false)
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-slate-900">Seguimiento</h2>

        {followUp ? (
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={openModal} className="w-auto">
              Editar
            </Button>
            <Button type="button" variant="error" onClick={() => onChange(null)} className="w-auto">
              Eliminar
            </Button>
          </div>
        ) : (
          <Button type="button" variant="secondary" onClick={openModal} className="w-auto">
            Agregar seguimiento
          </Button>
        )}
      </div>

      {followUp ? (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <p className='text-sm text-slate-700'>
            Próximo seguimiento:
          </p>
          <p className="text-sm font-medium text-slate-900">
            {format(new Date(followUp.scheduledAt), 'dd/MM/yyyy hh:mm aa')}
          </p>
          {followUp.reason ? (
            <p className="mt-1 text-xs text-slate-500">{followUp.reason}</p>
          ) : (
            <p className="mt-1 text-xs text-slate-400">Sin motivo registrado</p>
          )}
        </div>
      ) : (
        <p className="mt-4 text-sm text-slate-400">Sin seguimiento programado para esta atención.</p>
      )}

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Programar seguimiento"
        description="Define la fecha y el motivo del seguimiento clínico."
        size="md"
      >
        <div className="space-y-4">
          <DateTimePicker
            label="Fecha del seguimiento"
            value={draft.scheduledAt}
            onChange={(v) => setDraft((prev) => ({ ...prev, scheduledAt: v }))}
            minDate={(() => {
              const d = new Date()
              d.setDate(d.getDate() + 1)
              return d.toISOString().split('T')[0]
            })()}
            amPm
          />

          <Input
            name=''
            label="Motivo (opcional)"
            type="text"
            placeholder="Ej: Control de evolución respiratoria"
            value={draft.reason ?? ''}
            onChange={(e) => setDraft((prev) => ({ ...prev, reason: e.target.value }))}
          />

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="w-auto">
              Cancelar
            </Button>
            <Button type="button" onClick={handleConfirm} className="w-auto">
              Confirmar seguimiento
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default AttentionFollowUpSection
