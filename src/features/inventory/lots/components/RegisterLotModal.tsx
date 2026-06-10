import { Modal, Button, Input } from '@/shared/components'
import { useAuth } from '@/shared/hooks/useAuth'
import { useRegisterLot } from '../hooks/useRegisterLot'

type Props = {
  medicationId: number
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export const RegisterLotModal = ({ medicationId, isOpen, onClose, onSuccess }: Props) => {
  const { user } = useAuth()
  const { register, isLoading, error } = useRegisterLot()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)

    const dto = {
      medicationId,
      lotCode: data.get('lotCode') as string,
      expirationDate: data.get('expirationDate') as string,
      initialQuantity: Number(data.get('initialQuantity')),
      receivedByUserId: user!.id,
    }

    await register(dto)
    onSuccess()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Registrar lote"
      description="Ingresa los datos del nuevo lote de medicamento."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <Input
          label="Código de lote"
          name="lotCode"
          type="text"
          placeholder="Ej. LOT-202606-AMOX-0001"
          required
        />

        <Input
          label="Fecha de vencimiento"
          name="expirationDate"
          type="date"
          required
        />

        <Input
          label="Cantidad inicial"
          name="initialQuantity"
          type="number"
          placeholder="Ej. 100"
          required
        />

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? 'Registrando...' : 'Registrar'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}