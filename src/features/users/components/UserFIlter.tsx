import { Input, Select } from '@/shared/components'
import type { RoleEnum } from '@/core/enums/role.enum'
import type { FindUsersDto } from '../types/find-users.dto'
import { USER_ROLE_OPTIONS } from '../types'

interface UserFilterProps {
  onChangeFilters: (filters: Partial<FindUsersDto>) => void
}

type UserActive = -1 | 1 | 0

export const UserFilter = ({ onChangeFilters }: UserFilterProps) => {

  const onUsernameChange = (value: string) => onChangeFilters({ username: value })

  const onRoleChange = (value: string) => onChangeFilters({ role: value === '' ? undefined : value as RoleEnum })

  const onStatusChange = (value: UserActive) => onChangeFilters({
    isActive: value === -1 ? undefined : value
  })

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Usuario"
          name="username"
          type="text"
          placeholder="Buscar por usuario"
          onChange={(e) => onUsernameChange(e.target.value)}
        />

        <Select
          name="rol"
          label="Rol"
          options={[
            { label: 'Todos', value: '' },
            ...USER_ROLE_OPTIONS,
          ]}
          onChange={(role) => onRoleChange(role)}
        />

        <Select
          name="status"
          label="Estado"
          options={[
            { label: 'Todos', value: -1 },
            { label: 'Activo', value: 1 },
            { label: 'Inactivo', value: 0 }
          ]}
          onChange={(status) => onStatusChange(Number(status) as UserActive)}
        />

      </div>
    </div>
  )
}