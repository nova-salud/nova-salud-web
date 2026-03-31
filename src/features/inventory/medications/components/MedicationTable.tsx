import DataTable from '@/shared/components/ui/table/DataTable'
import type { InventoryStockResponseDto } from '@/features/inventory/stocks/types/inventory-stock-response.dto'
import { cn } from '@/shared/utils'

type Props = {
  items: InventoryStockResponseDto[]
  isLoading?: boolean
}

const MedicationTable = ({ items, isLoading = false }: Props) => {
  return (
    <DataTable
      data={items}
      isLoading={isLoading}
      emptyMessage="No se encontraron medicamentos."
      columns={[
        'Medicamento',
        'Composición',
        'Categoría',
        'Stock',
        'OTC',
        'Estado',
      ]}
      renderRow={(item) => (
        <tr
          key={item.medicationId}
          className="border-t border-slate-100 text-sm text-slate-700"
        >
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
              className={cn([
                'inline-flex rounded-xl px-3 py-1 text-xs font-medium',
                item.isOtc
                  ? 'border border-emerald-100 bg-emerald-50 text-emerald-700'
                  : 'border border-slate-200 bg-slate-50 text-slate-500',
              ])}
            >
              {item.isOtc ? 'Sí' : 'No'}
            </span>
          </td>

          <td className="px-6 py-5">
            <span
              className={cn([
                'inline-flex rounded-xl px-3 py-1 text-xs font-medium',
                item.isActive
                  ? 'border border-emerald-100 bg-emerald-50 text-emerald-700'
                  : 'border border-slate-200 bg-slate-50 text-slate-500',
              ])}
            >
              {item.isActive ? 'Activo' : 'Inactivo'}
            </span>
          </td>
        </tr>
      )}
    />
  )
}

export default MedicationTable