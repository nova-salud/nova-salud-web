import { Button } from '@/shared/components/ui/form'
import Modal from '@/shared/components/ui/modal/Modal'


type Props = {
  isOpen: boolean
  isLoading?: boolean
  onClose: () => void
  onConfirm: () => void
}

export const CreateEmoCycleModal = ({
  isOpen,
  isLoading,
  onClose,
  onConfirm,
}: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="EMO extraordinario">
      <div className="space-y-4">
        <p className="text-sm text-slate-600">
          ¿Estás seguro de que deseas generar un nuevo ciclo EMO extraordinario para este trabajador?
        </p>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>

          <Button onClick={onConfirm} isLoading={isLoading}>
            Confirmar
          </Button>
        </div>
      </div>
    </Modal>
  )
}