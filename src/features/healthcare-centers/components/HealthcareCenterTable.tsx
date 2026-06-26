import { Eye } from 'lucide-react'
import { cn } from '@/shared/utils'
import { DataTable, type Pagination } from '@/shared/components/ui/table/DataTable'
import type { HealthcareCenterResponseDto } from '../types'
import { Dropdown, DropdownItem } from '@/shared/components'
import { HEALTHCARE_CENTER_TYPE_LABEL } from '../types/healthcare-center-type.constants'

type Props = {
  items: HealthcareCenterResponseDto[]
  isLoading?: boolean
  onView: (item: HealthcareCenterResponseDto) => void
  pagination: Pagination
}

const HealthcareCenterTable = ({
  items,
  isLoading = false,
  onView,
  pagination
}: Props) => {
  return (
    <DataTable
      data={items}
      isLoading={isLoading}
      emptyMessage="No se encontraron establecimientos."
      pagination={pagination}
      columns={[
        'ID',
        'Nombre',
        'Tipo',
        'RUC',
        'Teléfono',
        'Convenio',
        'Estado',
      ]}
      renderRow={(item) => (
        <>
          <td className="px-6 py-5 font-medium text-slate-900">
            #{item.id}
          </td>

          <td className="px-6 py-5 text-slate-700">
            {item.name}
          </td>

          <td className="px-6 py-5 text-slate-700">
            {HEALTHCARE_CENTER_TYPE_LABEL[item.type] ?? '—'}
          </td>

          <td className="px-6 py-5 text-slate-700">
            {item.ruc ?? 'N/A'}
          </td>

          <td className="px-6 py-5 text-slate-700">
            {item.phone ?? 'N/A'}
          </td>

          <td className="px-6 py-5 text-slate-700">
            {item.convenio ?? 'N/A'}
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
              {item.isActive ? 'Activo' : 'Inactivo'}
            </span>
          </td>
        </>
      )}
      renderActions={(item) => (
        <Dropdown>
          <DropdownItem
            onClick={() => onView(item)}
          >
            <Eye size={14} />
            Ver detalle
          </DropdownItem>
        </Dropdown>
      )}
    />
  )
}

export default HealthcareCenterTable
