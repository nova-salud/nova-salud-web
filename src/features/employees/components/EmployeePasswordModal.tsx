import { useState } from 'react'
import { Button, Input, Modal } from '@/shared/components'
import type { EmployeeResponseDto } from '../types/employee-response.dto'
import type { UpdateUserPasswordDto } from '@/features/users/types/update-user-password.dto'

type Props = {
  isOpen: boolean
  employee: EmployeeResponseDto | null
  isLoading?: boolean
  onClose: () => void
  onSubmit?: (userId: number, dto: UpdateUserPasswordDto) => Promise<void> | void
}

const EmployeePasswordForm = ({
  employee,
  isLoading = false,
  onClose,
  onSubmit,
}: Omit<Props, 'isOpen'>) => {
  const [formError, setFormError] = useState<string | null>(null)

  const handleSubmit = async (e: { preventDefault(): void; currentTarget: HTMLFormElement }) => {
    e.preventDefault()
    if (!employee?.user || !onSubmit) return

    const data = new FormData(e.currentTarget)
    const newPassword = data.get('newPassword') as string
    const confirmPassword = data.get('confirmPassword') as string

    if (newPassword.trim().length < 8 || confirmPassword.trim().length < 8) {
      setFormError('La contraseña debe tener al menos 8 caracteres.')
      return
    }

    if (newPassword !== confirmPassword) {
      setFormError('Las contraseñas no coinciden.')
      return
    }

    setFormError(null)
    await onSubmit(employee.user.id, { newPassword })
  }

  return (
    <form className="space-y-4" onSubmit={(e) => void handleSubmit(e)}>
      {employee && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Usuario</p>
          <p className="mt-1 text-sm font-medium text-slate-900">{employee.user.username}</p>
          <p className="mt-1 text-sm text-slate-600">{employee.fullName}</p>
        </div>
      )}

      <Input
        name="newPassword"
        type="password"
        label="Nueva contraseña"
        placeholder="Ingresa la nueva contraseña"
      />

      <Input
        name="confirmPassword"
        type="password"
        label="Confirmar contraseña"
        placeholder="Confirma la nueva contraseña"
      />

      {formError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {formError}
        </div>
      )}

      <div className="flex flex-wrap justify-end gap-3">
        <Button type="button" variant="ghost" onClick={onClose} className="w-auto">
          Cancelar
        </Button>
        <Button
          type="submit"
          isLoading={isLoading}
          loadingText="Actualizando..."
          className="w-auto"
        >
          Actualizar contraseña
        </Button>
      </div>
    </form>
  )
}

export const EmployeePasswordModal = ({
  isOpen,
  employee,
  isLoading = false,
  onClose,
  onSubmit,
}: Props) => {
  const formKey = `password-${employee?.id ?? 'unknown'}-${isOpen ? 'open' : 'closed'}`

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => { if (!isLoading) onClose() }}
      title="Cambiar contraseña"
      description="Actualiza la contraseña del usuario seleccionado."
      size="sm"
    >
      <EmployeePasswordForm
        key={formKey}
        employee={employee}
        isLoading={isLoading}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </Modal>
  )
}
