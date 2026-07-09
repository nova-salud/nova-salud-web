import { Button, Modal } from '@/shared/components'
import type { AllergyResponseDto } from '../types'

type Props = {
  isOpen: boolean
  item: AllergyResponseDto | null
  isLoading?: boolean
  onClose: () => void
  onConfirm: () => void | Promise<void>
}

export const RemoveAllergyModal = ({
  isOpen,
  item,
  isLoading = false,
  onClose,
  onConfirm,
}: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Eliminar alergia"
      size="sm"
    >
      <div className="space-y-5">
        <p className="text-sm text-slate-600">
          ¿Estás seguro de que deseas eliminar la alergia a{' '}
          <span className="font-semibold text-slate-900">
            {item?.medication?.name ?? 'este medicamento'}
          </span>? Esta acción no se puede deshacer.
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
            className="w-auto bg-red-600 hover:bg-red-700"
            onClick={() => void onConfirm()}
            isLoading={isLoading}
            loadingText="Eliminando..."
          >
            Eliminar
          </Button>
        </div>
      </div>
    </Modal>
  )
}
