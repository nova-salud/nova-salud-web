import { useState } from 'react'
import { Button, Select, Textarea } from '@/shared/components/ui/form'
import Modal from '@/shared/components/ui/modal/Modal'
import { EMO_CANCELLATION_REASON_OPTIONS } from '../types/emo-cycle-cancellation-reason.constants'
import type { CancelEmoCycleDto } from '../types'

type Props = {
  isOpen: boolean
  isLoading?: boolean
  onClose: () => void
  onConfirm: (dto: CancelEmoCycleDto) => void
}

const REASON_OPTIONS = [
  { label: 'Seleccionar motivo...', value: '' },
  ...EMO_CANCELLATION_REASON_OPTIONS,
]

export const CancelEmoCycleModal = ({ isOpen, isLoading, onClose, onConfirm }: Props) => {
  const [reason, setReason] = useState('')
  const [notes, setNotes] = useState('')

  const handleClose = () => {
    setReason('')
    setNotes('')
    onClose()
  }

  const handleConfirm = () => {
    if (!reason) return
    onConfirm({ reason, notes: notes.trim() || undefined })
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Cancelar ciclo EMO">
      <div className="space-y-4">
        <p className="text-sm text-slate-600">
          Selecciona el motivo de cancelación. Esta acción no se puede deshacer.
        </p>

        <Select
          label="Motivo de cancelación"
          name="reason"
          value={reason}
          onChange={setReason}
          options={REASON_OPTIONS}
        />

        <Textarea
          label="Notas adicionales (opcional)"
          placeholder="Describe el motivo con más detalle si es necesario..."
          value={notes}
          onChange={setNotes}
          rows={3}
        />

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            Volver
          </Button>
          <Button
            variant="error"
            onClick={handleConfirm}
            isLoading={isLoading}
            loadingText="Cancelando..."
            disabled={!reason}
          >
            Cancelar ciclo
          </Button>
        </div>
      </div>
    </Modal>
  )
}
