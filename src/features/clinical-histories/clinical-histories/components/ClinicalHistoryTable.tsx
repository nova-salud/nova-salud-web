import { cn } from '@/shared/utils'
import { Dropdown, DropdownItem, DataTable, type Pagination } from '@/shared/components'
import { Eye } from 'lucide-react'
import type { ClinicalHistoryListItemDto } from '../types'

type Props = {
  items: ClinicalHistoryListItemDto[]
  isLoading?: boolean
  pagination: Pagination
  onViewDetail: (item: ClinicalHistoryListItemDto) => void
}

export const ClinicalHistoryTable = ({ items, isLoading = false, pagination, onViewDetail }: Props) => {
  return (
    <DataTable
      data={items}
      isLoading={isLoading}
      emptyMessage="No se encontraron historias clínicas."
      pagination={pagination}
      columns={['Trabajador', 'DNI', 'Empresa', 'Área', 'Estado']}
      renderRow={(item) => (
        <>
          <td className="px-6 py-5 font-medium text-slate-900">
            {item.employeeFullName ?? '—'}
          </td>

          <td className="px-6 py-5 text-slate-700">
            {item.employeeDni ?? '—'}
          </td>

          <td className="px-6 py-5 text-slate-700">
            {item.employeeCompany ?? '—'}
          </td>

          <td className="px-6 py-5 text-slate-700">
            {item.areaName ?? '—'}
          </td>

          <td className="px-6 py-5">
            <span className={cn(
              'inline-flex rounded-xl border px-3 py-1 text-xs font-medium',
              item.isActive
                ? 'border-emerald-100 bg-emerald-50 text-emerald-700'
                : 'border-slate-200 bg-slate-50 text-slate-500',
            )}>
              {item.isActive ? 'Activo' : 'Inactivo'}
            </span>
          </td>
        </>
      )}
      renderActions={(item) => (
        <Dropdown>
          <DropdownItem onClick={() => onViewDetail(item)}>
            <Eye size={14} />
            Ver detalle
          </DropdownItem>
        </Dropdown>
      )}
    />
  )
}
