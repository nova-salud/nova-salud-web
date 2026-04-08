import { useMemo, useState } from 'react'
import { Button, Input, Select } from '@/shared/components/ui/form'
import Sidebar from '@/shared/components/ui/sidebar/Sidebar'
import { USER_ROLE_OPTIONS } from '../types/user-role.config'
import type { CreateUserDto } from '../types/create-user.dto'
import type { UpdateUserDto } from '../types/update-user.dto'
import type { UserResponseDto } from '../types/user-response.dto'
import type { UserRoleEnum } from '../types/user-role.enum'

type UserFormMode = 'create' | 'edit'

type UserFormValues = {
  username: string
  fullName: string
  password: string
  role: string
  isActive: boolean
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

const INITIAL_VALUES: UserFormValues = {
  username: '',
  fullName: '',
  password: '',
  role: '',
  isActive: true,
}

const UserFormSidebarContent = ({
  mode,
  user,
  isLoading = false,
  onClose,
  onCreate,
  onUpdate,
}: Omit<Props, 'isOpen'>) => {
  const initialValues = useMemo<UserFormValues>(() => {
    if (mode === 'edit' && user) {
      return {
        username: user.username ?? '',
        fullName: user.fullName ?? '',
        password: '',
        role: user.role ?? '',
        isActive: user.isActive,
      }
    }

    return INITIAL_VALUES
  }, [mode, user])

  const [values, setValues] = useState<UserFormValues>(initialValues)

  const handleChange =
    <K extends keyof UserFormValues>(key: K) =>
    (value: UserFormValues[K]) => {
      setValues((prev) => ({ ...prev, [key]: value }))
    }

  const isValid = useMemo<boolean>(() => {
    if (!values.username.trim() || !values.fullName.trim() || !values.role) {
      return false
    }

    if (mode === 'create' && !values.password.trim()) {
      return false
    }

    return true
  }, [mode, values.fullName, values.password, values.role, values.username])

  const buildCreateDto = (): CreateUserDto | null => {
    if (!isValid) {
      return null
    }

    return {
      username: values.username.trim(),
      fullName: values.fullName.trim(),
      password: values.password,
      role: values.role as UserRoleEnum,
    }
  }

  const buildUpdateDto = (): UpdateUserDto | null => {
    if (!isValid) {
      return null
    }

    return {
      username: values.username.trim(),
      fullName: values.fullName.trim(),
      role: values.role as UserRoleEnum,
      isActive: values.isActive,
    }
  }

  const handleSubmit = async () => {
    if (mode === 'create') {
      const dto = buildCreateDto()

      if (!dto || !onCreate) {
        return
      }

      await onCreate(dto)
      return
    }

    if (!user || !onUpdate) {
      return
    }

    const dto = buildUpdateDto()

    if (!dto) {
      return
    }

    await onUpdate(user.id, dto)
  }

  const footer = (
    <div className="flex flex-wrap justify-end gap-3">
      <Button
        type="button"
        variant="outline"
        onClick={onClose}
        className="w-auto"
      >
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
    <div className="space-y-4">
      <Input
        label="Usuario"
        placeholder="Ingresa el nombre de usuario"
        value={values.username}
        onChange={handleChange('username')}
      />

      <Input
        label="Nombre completo"
        placeholder="Ingresa el nombre completo"
        value={values.fullName}
        onChange={handleChange('fullName')}
      />

      <Select
        label="Rol"
        value={values.role}
        onChange={handleChange('role')}
        options={USER_ROLE_OPTIONS}
      />

      {mode === 'create' ? (
        <Input
          type="password"
          label="Contraseña"
          placeholder="Ingresa la contraseña"
          value={values.password}
          onChange={handleChange('password')}
        />
      ) : null}

      {mode === 'edit' ? (
        <Select
          label="Estado"
          value={values.isActive ? 'true' : 'false'}
          onChange={(value) => handleChange('isActive')(value === 'true')}
          options={[
            { label: 'Activo', value: 'true' },
            { label: 'Inactivo', value: 'false' },
          ]}
        />
      ) : null}

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
          ? 'Completa la información para registrar un nuevo usuario.'
          : 'Actualiza la información general del usuario.'
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