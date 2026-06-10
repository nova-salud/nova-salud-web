import { useState } from 'react'
import { Modal, Button, Input } from '@/shared/components'
import { Select, Textarea } from '@/shared/components/ui/form'
import { useAuth } from '@/shared/hooks/useAuth'
import type { MedicationLotResponseDto } from '../types/medication-lot-response.dto'
import { useAdjustLot } from '../hooks/useAdjustLot'

type Props = {
  isOpen: boolean
  lot: MedicationLotResponseDto | null
  onClose: () => void
  onSuccess: () => void
}

const ADJUSTMENT_TYPE_OPTIONS = [
  { label: 'Salida manual', value: 'ADJUSTMENT_OUT' },
  { label: 'Entrada manual', value: 'ADJUSTMENT_IN' },
]

export const AdjustLotModal = ({ isOpen, lot, onClose, onSuccess }: Props) => {
  const { user } = useAuth()
  const [movementType, setMovementType] = useState<'ADJUSTMENT_IN' | 'ADJUSTMENT_OUT'>('ADJUSTMENT_OUT')

  const { adjust, isLoading, error } = useAdjustLot()


  const handleClose = () => {
    setMovementType('ADJUSTMENT_OUT')
    onClose()
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!lot) return

    const data = new FormData(e.currentTarget)

    const dto = {
      movementType,
      quantity: Number(data.get('quantity')),
      reason: data.get('reason') as string,
      performedByUserId: user!.id,
    }

    await adjust(lot.id, dto)

    onSuccess()
    setMovementType('ADJUSTMENT_OUT')
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Ajustar lote"
      description={lot ? `Lote ${lot.lotCode} · Stock actual: ${lot.currentQuantity}` : undefined}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <Select
          label="Tipo de ajuste"
          name="movementType"
          value={movementType}
          options={ADJUSTMENT_TYPE_OPTIONS}
          onChange={(value) => setMovementType(value as 'ADJUSTMENT_IN' | 'ADJUSTMENT_OUT')}
        />

        <Input
          label="Cantidad"
          name="quantity"
          type="number"
          placeholder="Ej. 5"
          min={1}
          required
        />

        <Textarea
          label="Motivo"
          name="reason"
          placeholder="Ej. Corrección de registro inicial del lote."
          rows={3}
          required
        />

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={handleClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" isLoading={isLoading} loadingText="Guardando...">
            Guardar ajuste
          </Button>
        </div>
      </form>
    </Modal>
  )
}
