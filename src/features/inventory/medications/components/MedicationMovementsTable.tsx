import { DataTable, type Pagination } from '@/shared/components/ui/table/DataTable'
import { getMovementTypeMeta } from '../../movements/types/movement-type.constants'
import type { InventoryMovementResponseDto } from '../../movements/types/inventory-movement-response.dto'

type Props = {
  items: InventoryMovementResponseDto[]
  isLoading?: boolean
  pagination: Pagination
}

export const MedicationMovementsTable = ({ items, isLoading = false, pagination }: Props) => {
  return (
    <DataTable
      data={items}
      isLoading={isLoading}
      emptyMessage="No se encontraron movimientos para este medicamento."
      pagination={pagination}
      columns={['Tipo', 'Lote', 'Cantidad', 'Motivo', 'Usuario', 'Fecha']}
      renderRow={(item) => (
        <>
          <td className="px-6 py-5">
            <span
              className={[
                'inline-flex rounded-xl px-3 py-1 text-xs font-medium',
                getMovementTypeMeta(item.movementType).classes,
              ].join(' ')}
            >
              {getMovementTypeMeta(item.movementType).label}
            </span>
          </td>

          <td className="px-6 py-5 text-slate-500">
            {item.lotCode ?? '-'}
          </td>

          <td className="px-6 py-5">
            <span
              className={[
                'font-semibold',
                item.movementType.includes('OUT') ? 'text-red-500' : 'text-emerald-600',
              ].join(' ')}
            >
              {item.quantity}
            </span>
          </td>

          <td className="px-6 py-5 text-slate-500">
            {item.reason}
          </td>

          <td className="px-6 py-5 text-slate-500">
            {item.performedByUserName ?? `Usuario ${item.performedByUserId}`}
          </td>

          <td className="px-6 py-5 text-slate-500">
            {new Date(item.createdAt).toLocaleDateString('es-PE')}
          </td>
        </>
      )}
    />
  )
}
