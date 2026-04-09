import { useMemo, useState } from 'react'
import { Button, Checkbox, Input, Select } from '@/shared/components/ui/form'
import Sidebar from '@/shared/components/ui/sidebar/Sidebar'
import { USER_ROLE_OPTIONS } from '../types/user-role.config'
import type { CreateUserDto } from '../types/create-user.dto'
import type { UpdateUserDto } from '../types/update-user.dto'
import type { UserResponseDto } from '../types/user-response.dto'
import type { RoleEnum } from '@/core/enums/role.enum'

type UserFormMode = 'create' | 'edit'

type UserFormValues = {
  username: string
  fullName: string
  password: string
  role: string
  isActive: boolean
  dni: string
  isExternal: boolean
  area: string | null
  position: string | null
  company: string | null
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
  dni: '',
  isExternal: false,
  area: null,
  position: null,
  company: null,
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
        dni: user.dni ?? '',
        isExternal: user.isExternal,
        area: user.area,
        position: user.position,
        company: user.company,
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
      role: values.role as RoleEnum,
      dni: values.dni.trim(),
      isExternal: values.isExternal,
      area: values.area,
      position: values.position,
      company: values.company,
    }
  }

  const buildUpdateDto = (): UpdateUserDto | null => {
    if (!isValid) {
      return null
    }

    return {
      username: values.username.trim(),
      fullName: values.fullName.trim(),
      role: values.role as RoleEnum,
      isActive: values.isActive,
      dni: values.dni.trim(),
      isExternal: values.isExternal,
      area: values.area,
      position: values.position,
      company: values.company,
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
        placeholder="jhondoe"
        value={values.username}
        onChange={handleChange('username')}
      />

      <Input
        label="Nombre completo"
        placeholder="Jhon Doe"
        value={values.fullName}
        onChange={handleChange('fullName')}
      />

      <Input
        label="DNI"
        placeholder="12345678"
        value={values.dni}
        onChange={handleChange('dni')}
      />

      <Checkbox
        label="Usuario externo"
        checked={values.isExternal}
        onChange={handleChange('isExternal')}
      />

      <Select
        label="Rol"
        value={values.role}
        onChange={handleChange('role')}
        options={USER_ROLE_OPTIONS}
      />

      {
        !values.isExternal ? (
          <>
            <Input
              label="Área"
              placeholder="Recursos Humanos"
              value={values.area ?? ''}
              onChange={handleChange('area')}
            />

            <Input
              label="Cargo o posición"
              placeholder="Gerente de RRHH"
              value={values.position ?? ''}
              onChange={handleChange('position')}
            />
          </>
        ): (
          <Input
            label="Empresa"
            placeholder="Empresa XYZ"
            value={values.company ?? ''}
            onChange={handleChange('company')}
          />
        )
      }

      {mode === 'create' ? (
        <Input
          type="password"
          label="Contraseña"
          placeholder="Ingresa la contraseña"
          value={values.password}
          onChange={handleChange('password')}
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