import { SlidersHorizontal } from 'lucide-react'
import { DataTable, type Pagination } from '@/shared/components/ui/table/DataTable'
import { Dropdown, DropdownItem } from '@/shared/components'
import type { MedicationLotResponseDto } from '@/features/inventory/lots/types'

type Props = {
  items: MedicationLotResponseDto[]
  isLoading?: boolean
  pagination: Pagination
  onAdjust?: (lot: MedicationLotResponseDto) => void
}

export const MedicationLotsTable = ({ items, isLoading = false, pagination, onAdjust }: Props) => {
  return (
    <DataTable
      data={items}
      isLoading={isLoading}
      emptyMessage="No se encontraron lotes para este medicamento."
      pagination={pagination}
      columns={['Lote', 'Vencimiento', 'Cantidad inicial', 'Stock actual', 'Recepción']}
      renderRow={(item) => (
        <>
          <td className="px-6 py-5 font-medium text-slate-900">
            {item.lotCode}
          </td>

          <td className="px-6 py-5 text-slate-500">
            {new Date(item.expirationDate).toLocaleDateString('es-PE')}
          </td>

          <td className="px-6 py-5 text-slate-500">
            {item.initialQuantity}
          </td>

          <td className="px-6 py-5">
            <span className="font-semibold text-emerald-600">
              {item.currentQuantity}
            </span>
          </td>

          <td className="px-6 py-5 text-slate-500">
            {new Date(item.receivedAt).toLocaleDateString('es-PE')}
          </td>
        </>
      )}
      renderActions={onAdjust ? (item) => (
        <Dropdown>
          <DropdownItem className="w-40" onClick={() => onAdjust(item)}>
            <SlidersHorizontal size={14} />
            Ajustar
          </DropdownItem>
        </Dropdown>
      ) : undefined}
    />
  )
}
