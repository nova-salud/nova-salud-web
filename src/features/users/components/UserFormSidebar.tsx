import { useMemo, useState } from 'react'
import { Button, Checkbox, Input, Select } from '@/shared/components/ui/form'
import Sidebar from '@/shared/components/ui/sidebar/Sidebar'
import { USER_ROLE_OPTIONS } from '../types/user-role.config'
import type { CreateUserDto } from '../types/create-user.dto'
import type { UpdateUserDto } from '../types/update-user.dto'
import type { UserResponseDto } from '../types/user-response.dto'
import type { RoleEnum } from '@/core/enums/role.enum'

type UserFormMode = 'create' | 'edit'

type AuthValues = {
  username: string
  password: string
  role: string
  isBlocked: boolean
}

type Props = {
  isOpen: boolean
  mode: UserFormMode
  user?: UserResponseDto | null
  isLoading?: boolean
  onClose: () => void
  onCreate?: (dto: CreateUserDto) => Promise<void> | void
  onUpdate?: (id: number, dto: UpdateUserDto) => Promise<void> | void
}

const INITIAL_AUTH: AuthValues = {
  username: '',
  password: '',
  role: '',
  isBlocked: false,
}

const UserFormSidebarContent = ({
  mode,
  user,
  isLoading = false,
  onClose,
  onCreate,
  onUpdate,
}: Omit<Props, 'isOpen'>) => {
  const initialAuth = useMemo<AuthValues>(() => {
    if (mode === 'edit' && user) {
      return {
        username: user.username ?? '',
        password: '',
        role: user.role ?? '',
        isBlocked: user.isBlocked,
      }
    }
    return INITIAL_AUTH
  }, [mode, user])

  const [auth, setAuth] = useState<AuthValues>(initialAuth)

  const setAuthField = <K extends keyof AuthValues>(key: K) => (value: AuthValues[K]) =>
    setAuth((prev) => ({ ...prev, [key]: value }))

  const isValid = useMemo(() => {
    if (!auth.username.trim() || !auth.role) return false
    if (mode === 'create' && !auth.password.trim()) return false
    return true
  }, [auth, mode])

  const handleSubmit = async () => {
    if (!isValid) return

    if (mode === 'create') {
      await onCreate?.({
        username: auth.username.trim(),
        password: auth.password,
        role: auth.role as RoleEnum,
        isBlocked: auth.isBlocked,
      })
      return
    }

    await onUpdate?.(user!.id, {
      username: auth.username.trim(),
      role: auth.role as RoleEnum,
      isBlocked: auth.isBlocked,
    })
  }

  const footer = (
    <div className="flex flex-wrap justify-end gap-3">
      <Button type="button" variant="outline" onClick={onClose} className="w-auto">
        Cancelar
      </Button>
      <Button
        type="button"
        isLoading={isLoading}
        loadingText={mode === 'create' ? 'Guardando...' : 'Actualizando...'}
        disabled={!isValid}
        onClick={() => void handleSubmit()}
        className="w-auto"
      >
        {mode === 'create' ? 'Guardar usuario' : 'Actualizar usuario'}
      </Button>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Acceso a la plataforma
        </p>

        <Input
          label="Usuario"
          placeholder="jhondoe"
          value={auth.username}
          onChange={setAuthField('username')}
        />

        <Select
          name="role"
          label="Rol"
          value={auth.role}
          onChange={setAuthField('role')}
          options={USER_ROLE_OPTIONS}
        />

        {mode === 'create' && (
          <Input
            type="password"
            label="Contraseña"
            placeholder="Ingresa la contraseña"
            value={auth.password}
            onChange={setAuthField('password')}
          />
        )}

        {mode === 'edit' && (
          <Checkbox
            label="Vetado"
            checked={auth.isBlocked}
            onChange={setAuthField('isBlocked')}
          />
        )}
      </div>

      {footer}
    </div>
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
