import { DataTable, type Pagination } from '@/shared/components'
import { cn } from '@/shared/utils'
import { CATEGORY_CLASS, CATEGORY_LABEL, type EmployeePositionResponseDto } from '../types/employee-position-response.dto'

type Props = {
  items: EmployeePositionResponseDto[]
  isLoading?: boolean
  pagination: Pagination
}

export const EmployeePositionTable = ({ items, isLoading = false, pagination }: Props) => {
  return (
    <DataTable
      data={items}
      isLoading={isLoading}
      emptyMessage="No se encontraron posiciones."
      pagination={pagination}
      columns={['ID', 'Nombre', 'Categoría', 'Confianza', 'Estado']}
      renderRow={(item) => (
        <>
          <td className="px-6 py-5 font-medium text-slate-900">
            #{item.id}
          </td>

          <td className="px-6 py-5 text-slate-700">
            {item.name}
          </td>

          <td className="px-6 py-5">
            {item.category ? (
              <span
                className={cn(
                  'inline-flex rounded-xl border px-3 py-1 text-xs font-medium',
                  CATEGORY_CLASS[item.category],
                )}
              >
                {CATEGORY_LABEL[item.category]}
              </span>
            ) : (
              <span className="text-slate-400">—</span>
            )}
          </td>

          <td className="px-6 py-5">
            <span
              className={cn(
                'inline-flex rounded-xl border px-3 py-1 text-xs font-medium',
                item.isConfidence
                  ? 'border-emerald-100 bg-emerald-50 text-emerald-700'
                  : 'border-slate-200 bg-slate-50 text-slate-500',
              )}
            >
              {item.isConfidence ? 'Sí' : 'No'}
            </span>
          </td>

          <td className="px-6 py-5">
            <span
              className={cn(
                'inline-flex rounded-xl border px-3 py-1 text-xs font-medium',
                item.isActive
                  ? 'border-emerald-100 bg-emerald-50 text-emerald-700'
                  : 'border-slate-200 bg-slate-50 text-slate-500',
              )}
            >
              {item.isActive ? 'Activa' : 'Inactiva'}
            </span>
          </td>
        </>
      )}
    />
  )
}