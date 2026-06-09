import { DataTable, type Pagination } from '@/shared/components/ui/table/DataTable'
import { cn } from '@/shared/utils'
import {
  USER_ROLE_CLASS_MAP,
  USER_ROLE_LABEL_MAP,
} from '@/features/users/types/user-role.config'
import type { EmployeeResponseDto } from '../types'
import { Dropdown, DropdownItem } from '@/shared/components'
import { Eye } from 'lucide-react'

type Props = {
  items: EmployeeResponseDto[]
  isLoading?: boolean
  onViewDetail: (employee: EmployeeResponseDto) => void
  pagination: Pagination
}

export const EmployeeTable = ({ items, isLoading = false, onViewDetail, pagination }: Props) => {
  return (
    <DataTable
      data={items}
      isLoading={isLoading}
      emptyMessage="No se encontraron empleados"
      pagination={pagination}
      columns={[
        '#',
        'Nombre completo',
        'DNI',
        'Área',
        'Empresa',
        'Estado laboral',
        'Rol',
      ]}
      renderRow={(item) => (
        <>
          <td className="px-6 py-5 font-medium text-slate-900">
            #{item.id}
          </td>

          <td className="px-6 py-5 font-medium text-slate-900">
            {item?.fullName ?? '—'}
          </td>

          <td className="px-6 py-5 text-slate-700">
            {item?.dni ?? '—'}
          </td>

          <td className="px-6 py-5 text-slate-700">
            {item?.area?.name ?? '—'}
          </td>

          <td className="px-6 py-5 text-slate-700">
            {item?.company ?? '—'}
          </td>

          <td className="px-6 py-5 text-slate-700">
            {item?.employmentStatus ?? '—'}
          </td>

          <td className="px-6 py-5">
            <span
              className={cn(
                'inline-flex rounded-xl border px-3 py-1 text-xs font-medium',
                USER_ROLE_CLASS_MAP[item.user.role],
              )}
            >
              {USER_ROLE_LABEL_MAP[item.user.role]}
            </span>
          </td>
        </>
      )}
      renderActions={(employee) => (
        <Dropdown>
          <DropdownItem
            onClick={() => onViewDetail(employee)}
          >
            <Eye size={14}/>
            Ver detalle
          </DropdownItem>
        </Dropdown>
      )}
    />
  )
}