import { useState } from 'react'
import { Button, Checkbox, Input, Select } from '@/shared/components/ui/form'
import Sidebar from '@/shared/components/ui/sidebar/Sidebar'
import { USER_ROLE_OPTIONS } from '../types/user-role.config'
import type { CreateUserDto } from '../types/create-user.dto'
import type { UpdateUserDto } from '../types/update-user.dto'
import type { UserResponseDto } from '../types/user-response.dto'
import type { RoleEnum } from '@/core/enums/role.enum'

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

const UserFormSidebarContent = ({
  mode,
  user,
  isLoading = false,
  onClose,
  onCreate,
  onUpdate,
}: Omit<Props, 'isOpen'>) => {
  const [isBlocked, setIsBlocked] = useState(user?.isBlocked ?? false)

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
      role: role as RoleEnum,
      isBlocked,
    })
  }

  const footer = (
    <div className="flex flex-wrap justify-end gap-3">
      <Button type="button" variant="outline" onClick={onClose} className="w-auto">
        Cancelar
      </Button>
      <Button
        type="submit"
        isLoading={isLoading}
        loadingText={mode === 'create' ? 'Guardando...' : 'Actualizando...'}
        className="w-auto"
      >
        {mode === 'create' ? 'Guardar usuario' : 'Actualizar usuario'}
      </Button>
    </div>
  )

  return (
    <form className="space-y-6" onSubmit={(e) => void handleSubmit(e)}>
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

        {mode === 'edit' && (
          <Checkbox
            label="Vetado"
            checked={isBlocked}
            onChange={setIsBlocked}
          />
        )}
      </div>

      {footer}
    </form>
  )
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
  const formKey = `${mode}-${user?.id ?? 'new'}-${isOpen ? 'open' : 'closed'}`

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
    >
      <UserFormSidebarContent
        key={formKey}
        mode={mode}
        user={user}
        isLoading={isLoading}
        onClose={onClose}
        onCreate={onCreate}
        onUpdate={onUpdate}
      />
    </Sidebar>
  )
}

export default UserFormSidebar
