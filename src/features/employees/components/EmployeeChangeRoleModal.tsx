import { useState } from 'react'
import { Button, Modal, Select } from '@/shared/components'
import { USER_ROLE_OPTIONS } from '@/features/users/types'
import type { UpdateUserDto } from '@/features/users/types/update-user.dto'
import type { EmployeeResponseDto } from '../types/employee-response.dto'

type Props = {
  isOpen: boolean
  employee: EmployeeResponseDto | null
  isLoading?: boolean
  onClose: () => void
  onSubmit?: (userId: number, dto: UpdateUserDto) => Promise<void> | void
}

const EmployeeChangeRoleForm = ({
  employee,
  isLoading = false,
  onClose,
  onSubmit,
}: Omit<Props, 'isOpen'>) => {
  const [selectedRole, setSelectedRole] = useState<string>(employee?.user.role ?? '')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!employee?.user || !onSubmit || !selectedRole) return
    await onSubmit(employee.user.id, { role: selectedRole as UpdateUserDto['role'] })
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

      <Select
        name="role"
        label="Nuevo rol"
        options={USER_ROLE_OPTIONS}
        value={selectedRole}
        onChange={setSelectedRole}
      />

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
          Cambiar rol
        </Button>
      </div>
    </form>
  )
}

export const EmployeeChangeRoleModal = ({
  isOpen,
  employee,
  isLoading = false,
  onClose,
  onSubmit,
}: Props) => {
  const formKey = `role-${employee?.id ?? 'unknown'}-${isOpen ? 'open' : 'closed'}`

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => { if (!isLoading) onClose() }}
      title="Cambiar rol"
      description="Asigna un nuevo rol al usuario del empleado."
      size="sm"
    >
      <EmployeeChangeRoleForm
        key={formKey}
        employee={employee}
        isLoading={isLoading}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </Modal>
  )
}
