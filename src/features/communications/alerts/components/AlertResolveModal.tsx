import { Button } from '@/shared/components'
import Modal from '@/shared/components/ui/modal/Modal'
import { ALERT_LABELS } from '../types/alert-type.enum'
import type { AlertResponseDto } from '../types/alert-response.dto'

type Props = {
  alert: AlertResponseDto | null
  isLoading: boolean
  onConfirm: () => void
  onClose: () => void
}

export const AlertResolveModal = ({ alert, isLoading, onConfirm, onClose }: Props) => (
  <Modal
    isOpen={!!alert}
    onClose={() => { if (!isLoading) onClose() }}
    title="Resolver alerta"
    description="La alerta dejará de mostrarse como activa."
    size="sm"
  >
    <div className="space-y-6">
      {alert && (
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-900">
            {ALERT_LABELS[alert.type]}
          </p>
          <p className="mt-1 text-sm text-slate-600">{alert.message}</p>
        </div>
      )}

      <div className="flex justify-end gap-3">
        <Button variant="ghost" onClick={onClose} disabled={isLoading}>
          Cancelar
        </Button>
        <Button variant="secondary" onClick={onConfirm} isLoading={isLoading}>
          Confirmar
        </Button>
      </div>
    </div>
  </Modal>
)
