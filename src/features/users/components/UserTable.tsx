import { Button } from '@/shared/components/ui/form'
import DataTable from '@/shared/components/ui/table/DataTable'
import { cn } from '@/shared/utils'
import {
  USER_ROLE_CLASS_MAP,
  USER_ROLE_LABEL_MAP,
} from '../types/user-role.config'
import type { UserResponseDto } from '../types/user-response.dto'

type Props = {
  items: UserResponseDto[]
  isLoading?: boolean
  onViewDetail: (user: UserResponseDto) => void
}

const UserTable = ({
  items,
  isLoading = false,
  onViewDetail,
}: Props) => {
  return (
    <DataTable
      data={items}
      isLoading={isLoading}
      emptyMessage="No se encontraron usuarios."
      columns={[
        'ID',
        'Usuario',
        'Nombre completo',
        'DNI',
        'Empresa',
        'Rol',
        'Estado',
        'Acciones',
      ]}
      renderRow={(item) => (
        <tr key={item.id} className="border-t border-slate-100 text-sm text-slate-700">
          <td className="px-6 py-5 font-medium text-slate-900">
            #{item.id}
          </td>

          <td className="px-6 py-5 text-slate-700">
            {item.username}
          </td>

          <td className="px-6 py-5 text-slate-700">
            {item.fullName}
          </td>

          <td className="px-6 py-5 text-slate-700">
            {item.dni}
          </td>

          <td className="px-6 py-5 text-slate-700">
            {item.company}
          </td>

          <td className="px-6 py-5">
            <span
              className={cn(
                'inline-flex rounded-xl border px-3 py-1 text-xs font-medium',
                USER_ROLE_CLASS_MAP[item.role],
              )}
            >
              {USER_ROLE_LABEL_MAP[item.role]}
            </span>
          </td>

          <td className="px-6 py-5">
            <span
              className={cn(
                'inline-flex rounded-xl border px-3 py-1 text-xs font-medium',
                item.isActive
                  ? 'border-emerald-100 bg-emerald-50 text-emerald-700'
                  : 'border-red-200 bg-red-500 text-white',
              )}
            >
              {item.isActive ? 'Activo' : 'Inactivo'}
            </span>
          </td>

          <td className="px-6 py-5">
            <Button
              type="button"
              variant="outline"
              onClick={() => onViewDetail(item)}
              className="w-auto rounded-xl px-3 py-2 text-xs"
            >
              Ver detalle
            </Button>
          </td>
        </tr>
      )}
    />
  )
}

export default UserTable