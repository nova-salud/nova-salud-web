import { Eye } from 'lucide-react'
import { cn } from '@/shared/utils'
import {
  USER_ROLE_CLASS_MAP,
  USER_ROLE_LABEL_MAP,
} from '../types/user-role.config'
import type { UserResponseDto } from '../types/user-response.dto'
import { DataTable, Dropdown, DropdownItem, type Pagination } from '@/shared/components'

type Props = {
  users: UserResponseDto[]
  isLoading?: boolean
  onViewDetail: (user: UserResponseDto) => void
  pagination?: Pagination
}

export const UsersTable = ({
  users,
  isLoading = false,
  onViewDetail,
  pagination 
}: Props) => {
  return (
    <DataTable
      data={users}
      isLoading={isLoading}
      emptyMessage="No se encontraron usuarios."
      columns={['#', 'Usuario', 'Rol', 'Estado']}
      pagination={pagination}
      onRowDoubleClick={(user) => onViewDetail(user)}
      renderRow={(user) => (
        <>
          <td className="px-6 py-5 font-medium text-slate-900">
            #{user.id}
          </td>

          <td className="px-6 py-5 text-slate-700">
            {user.username}
          </td>

          <td className="px-6 py-5">
            <span
              className={cn(
                'inline-flex rounded-xl border px-3 py-1 text-xs font-medium',
                USER_ROLE_CLASS_MAP[user.role],
              )}
            >
              {USER_ROLE_LABEL_MAP[user.role]}
            </span>
          </td>

          <td className="px-6 py-5">
            <span
              className={cn(
                'inline-flex rounded-xl border px-3 py-1 text-xs font-medium',
                user.isActive
                  ? 'border-emerald-100 bg-emerald-50 text-emerald-700'
                  : 'border-red-200 bg-red-500 text-white',
              )}
            >
              {user.isActive ? 'Activo' : 'Inactivo'}
            </span>
          </td>
        </>
      )}
      renderActions={(user) => (
        <Dropdown>
          <DropdownItem
            onClick={() => onViewDetail(user)}
          >
            <Eye size={14} />
            Ver perfil
          </DropdownItem>
        </Dropdown>
      )}
    />
  )
}