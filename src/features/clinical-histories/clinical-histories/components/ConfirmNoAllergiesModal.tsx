import { Button, Modal } from '@/shared/components'

type Props = {
  isOpen: boolean
  isLoading?: boolean
  onClose: () => void
  onConfirm: () => void | Promise<void>
}

export const ConfirmNoAllergiesModal = ({
  isOpen,
  isLoading = false,
  onClose,
  onConfirm,
}: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirmar sin alergias"
      size="sm"
    >
      <div className="space-y-5">
        <p className="text-sm text-slate-600">
          El paciente declara expresamente no tener alergias a medicamentos. Esta acción quedará
          registrada con la fecha actual y podrá revertirse automáticamente si más adelante se
          registra una alergia.
        </p>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            className="w-auto"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancelar
          </Button>

          <Button
            type="button"
            className="w-auto"
            onClick={() => void onConfirm()}
            isLoading={isLoading}
            loadingText="Confirmando..."
          >
            Confirmar
          </Button>
        </div>
      </div>
    </Modal>
  )
}
