import { useNavigate } from 'react-router'
import { DataTable, type Pagination } from '@/shared/components/ui/table/DataTable'
import { Dropdown, DropdownItem } from '@/shared/components'
import { Pill } from 'lucide-react'
import type { InventoryStockResponseDto } from '@/features/inventory/stocks/types/inventory-stock-response.dto'

type Props = {
  items: InventoryStockResponseDto[]
  isLoading?: boolean
  pagination: Pagination
}

export const MedicationTable = ({ items, isLoading = false, pagination }: Props) => {
  const navigate = useNavigate()

  return (
    <DataTable
      data={items}
      isLoading={isLoading}
      emptyMessage="No se encontraron medicamentos."
      pagination={pagination}
      columns={[
        'Medicamento',
        'Composición',
        'Categoría',
        'Stock',
        'OTC',
        'Estado',
      ]}
      renderRow={(item) => (
        <>
          <td className="px-6 py-5 font-medium text-slate-900">
            {item.commercialName}
          </td>

          <td className="px-6 py-5 text-slate-500">
            {item.genericName ?? '-'}
          </td>

          <td className="px-6 py-5">
            <span className="inline-flex rounded-xl border border-sky-100 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
              {item.therapeuticCategoryName}
            </span>
          </td>

          <td className="px-6 py-5">
            <span
              className={[
                'font-semibold',
                item.isLowStock ? 'text-red-500' : 'text-emerald-600',
              ].join(' ')}
            >
              {item.currentStock}
            </span>
          </td>

          <td className="px-6 py-5">
            <span
              className={[
                'inline-flex rounded-xl px-3 py-1 text-xs font-medium',
                item.isOtc
                  ? 'border border-emerald-100 bg-emerald-50 text-emerald-700'
                  : 'border border-slate-200 bg-slate-50 text-slate-500',
              ].join(' ')}
            >
              {item.isOtc ? 'Sí' : 'No'}
            </span>
          </td>

          <td className="px-6 py-5">
            <span
              className={[
                'inline-flex rounded-xl px-3 py-1 text-xs font-medium',
                item.isActive
                  ? 'border border-emerald-100 bg-emerald-50 text-emerald-700'
                  : 'border border-slate-200 bg-slate-50 text-slate-500',
              ].join(' ')}
            >
              {item.isActive ? 'Activo' : 'Inactivo'}
            </span>
          </td>
        </>
      )}
      renderActions={(item) => (
        <Dropdown>
          <DropdownItem
            className="w-44"
            onClick={() => navigate(`/medications/${item.medicationId}`)}
          >
            <Pill size={14} />
            Ver detalle
          </DropdownItem>
        </Dropdown>
      )}
    />
  )
}