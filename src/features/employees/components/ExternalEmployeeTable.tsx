import { Button } from '@/shared/components/ui/form'
import { DataTable } from '@/shared/components/ui/table/DataTable'
import { cn } from '@/shared/utils'
import {
  USER_ROLE_CLASS_MAP,
  USER_ROLE_LABEL_MAP,
} from '@/features/users/types/user-role.config'
import type { UserResponseDto } from '@/features/users/types/user-response.dto'

type Props = {
  items: UserResponseDto[]
  isLoading?: boolean
  onViewDetail: (user: UserResponseDto) => void
}

const ExternalEmployeeTable = ({ items, isLoading = false, onViewDetail }: Props) => {
  return (
    <DataTable
      data={items}
      isLoading={isLoading}
      emptyMessage="No se encontraron empleados externos."
      columns={[
        '#',
        'Nombre completo',
        'DNI',
        'Área',
        'Empresa',
        'Estado laboral',
        'Rol',
        'Acciones',
      ]}
      renderRow={(item) => (
        <>
          <td className="px-6 py-5 font-medium text-slate-900">
            #{item.id}
          </td>

          <td className="px-6 py-5 font-medium text-slate-900">
            {item.employee?.fullName ?? '—'}
          </td>

          <td className="px-6 py-5 text-slate-700">
            {item.employee?.dni ?? '—'}
          </td>

          <td className="px-6 py-5 text-slate-700">
            {item.employee?.area?.name ?? '—'}
          </td>

          <td className="px-6 py-5 text-slate-700">
            {item.employee?.company ?? '—'}
          </td>

          <td className="px-6 py-5 text-slate-700">
            {item.employee?.employmentStatus ?? '—'}
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
            <Button
              type="button"
              variant="outline"
              onClick={() => onViewDetail(item)}
              className="w-auto rounded-xl px-3 py-2 text-xs"
            >
              Ver detalle
            </Button>
          </td>
        </>
      )}
    />
  )
}

export default ExternalEmployeeTable
