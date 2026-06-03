import { useState } from 'react'
import { Modal, Button, Input } from '@/shared/components'
import { useAuth } from '@/shared/hooks/useAuth'
import { lotService } from '../services/lot.service'
import type { BackendError } from '@/core/types/backend-error.type'

type Props = {
  medicationId: number
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

const RegisterLotModal = ({ medicationId, isOpen, onClose, onSuccess }: Props) => {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)

    try {
      setIsLoading(true)
      setError(null)

      await lotService.create({
        medicationId,
        lotCode: data.get('lotCode') as string,
        expirationDate: data.get('expirationDate') as string,
        initialQuantity: Number(data.get('initialQuantity')),
        receivedByUserId: user!.id,
      })

      onSuccess()
      onClose()
    } catch (err) {
      const backendError = err as BackendError
      if (Array.isArray(backendError.message)) {
        setError(backendError.message[0])
      } else {
        setError(backendError.message ?? 'Error al registrar el lote.')
      }
    } finally {
      setIsLoading(false)
    }
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

export default RegisterLotModal
