import DataTable from '@/shared/components/ui/table/DataTable'
import { cn } from '@/shared/utils'
import type { EmployeeAreaResponseDto } from '../types/employee-area-response.dto'

type Props = {
  items: EmployeeAreaResponseDto[]
  isLoading?: boolean
}

const EmployeeAreaTable = ({ items, isLoading = false }: Props) => {
  return (
    <DataTable
      data={items}
      isLoading={isLoading}
      emptyMessage="No se encontraron áreas."
      columns={['ID', 'Nombre', 'Estado']}
      renderRow={(item) => (
        <tr key={item.id} className="border-t border-slate-100 text-sm text-slate-700">
          <td className="px-6 py-5 font-medium text-slate-900">
            #{item.id}
          </td>

          <td className="px-6 py-5 text-slate-700">
            {item.name}
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
        </tr>
      )}
    />
  )
}

export default EmployeeAreaTable