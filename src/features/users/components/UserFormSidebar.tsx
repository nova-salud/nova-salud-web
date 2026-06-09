import { Button, Input, Select } from '@/shared/components/ui/form'
import Sidebar from '@/shared/components/ui/sidebar/Sidebar'
import { USER_ROLE_OPTIONS } from '../types/user-role.config'
import type { CreateUserDto } from '../types/create-user.dto'
import type { UpdateUserDto } from '../types/update-user.dto'
import type { UserResponseDto } from '../types/user-response.dto'
import type { RoleEnum } from '@/core/enums/role.enum'
import { useId } from 'react'

type UserFormMode = 'create' | 'edit'

type Props = {
  isOpen: boolean
  mode: UserFormMode
  user?: UserResponseDto | null
  isLoading?: boolean
  onClose: () => void
  onCreate?: (dto: CreateUserDto) => Promise<void> | void
  onUpdate?: (id: number, dto: UpdateUserDto) => Promise<void> | void
}

export const UserFormSidebar = ({
  isOpen,
  mode,
  user = null,
  isLoading = false,
  onClose,
  onCreate,
  onUpdate,
}: Props) => {
  const formId = useId()

  const handleSubmit = async (e: { preventDefault(): void; currentTarget: HTMLFormElement }) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const username = (data.get('username') as string).trim()
    const role = data.get('role') as string
    if (!username || !role) return

    if (mode === 'create') {
      const password = (data.get('password') as string).trim()
      if (!password) return
      await onCreate?.({ username, password, role: role as RoleEnum, isBlocked: false })
      return
    }

    await onUpdate?.(user!.id, {
      username,
      role: role as RoleEnum
    })
  }

  return (
    <Sidebar
      isOpen={isOpen}
      title={mode === 'create' ? 'Nuevo usuario' : 'Editar usuario'}
      description={
        mode === 'create'
          ? 'Completa la información de acceso del usuario.'
          : 'Actualiza los datos de acceso del usuario.'
      }
      onClose={onClose}
      size="md"

      footer={
        <div className="flex flex-wrap justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose} className="w-auto">
            Cancelar
          </Button>
          <Button
            form={formId}
            type="submit"
            isLoading={isLoading}
            loadingText={mode === 'create' ? 'Guardando...' : 'Actualizando...'}
            className="w-auto"
          >
            {mode === 'create' ? 'Guardar usuario' : 'Actualizar usuario'}
          </Button>
        </div>
      }
    >
      <form id={formId} className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Acceso a la plataforma
          </p>

          <Input
            label="Usuario"
            name="username"
            type="text"
            placeholder="jhondoe"
            defaultValue={user?.username ?? ''}
          />

          <Select
            name="role"
            label="Rol"
            defaultValue={user?.role ?? ''}
            options={USER_ROLE_OPTIONS}
          />

          {mode === 'create' && (
            <Input
              name="password"
              type="password"
              label="Contraseña"
              placeholder="Ingresa la contraseña"
            />
          )}
        </div>
      </form>
    </Sidebar>
  )
}

export default UserFormSidebar
