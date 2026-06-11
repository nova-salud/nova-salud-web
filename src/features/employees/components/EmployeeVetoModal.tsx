import { Button, Modal } from '@/shared/components'
import type { EmployeeResponseDto } from '../types/employee-response.dto'

type Props = {
  isOpen: boolean
  employee: EmployeeResponseDto | null
  isLoading: boolean
  onConfirm: () => void
  onClose: () => void
}

export const EmployeeVetoModal = ({ isOpen, employee, isLoading, onConfirm, onClose }: Props) => {
  const isVetoed = employee?.isVetoed ?? false

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => { if (!isLoading) onClose() }}
      title={isVetoed ? 'Quitar veto al empleado' : 'Vetar empleado'}
      description={
        isVetoed
          ? 'El empleado recuperará el acceso al sistema.'
          : 'El empleado perderá el acceso al sistema.'
      }
      size="sm"
    >
      <div className="space-y-6">
        {employee && (
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">{employee.fullName}</p>
            <p className="mt-1 text-sm text-slate-600">{employee.dni} · {employee.company}</p>
          </div>
        )}

        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose} disabled={isLoading} className="w-auto">
            Cancelar
          </Button>
          <Button
            variant={isVetoed ? 'secondary' : 'error'}
            onClick={onConfirm}
            isLoading={isLoading}
            loadingText="Actualizando..."
            className="w-auto"
          >
            {isVetoed ? 'Quitar veto' : 'Vetar'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
