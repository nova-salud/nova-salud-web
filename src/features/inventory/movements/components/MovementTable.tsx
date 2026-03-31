import DataTable from '@/shared/components/ui/table/DataTable'
import type { InventoryMovementResponseDto } from '../types/inventory-movement-response.dto'

type Props = {
  items: InventoryMovementResponseDto[]
  isLoading?: boolean
}

const getMovementTypeClasses = (movementType: string): string => {
  switch (movementType) {
    case 'IN':
      return 'border border-emerald-100 bg-emerald-50 text-emerald-700'
    case 'OUT':
      return 'border border-red-100 bg-red-50 text-red-600'
    case 'ADJUSTMENT':
      return 'border border-amber-100 bg-amber-50 text-amber-700'
    case 'ADJUSTMENT_IN':
      return 'border border-sky-100 bg-sky-50 text-sky-700'
    case 'ADJUSTMENT_OUT':
      return 'border border-orange-100 bg-orange-50 text-orange-700'
    default:
      return 'border border-slate-200 bg-slate-50 text-slate-500'
  }
}

const MovementTable = ({ items, isLoading = false }: Props) => {
  return (
    <DataTable
      data={items}
      isLoading={isLoading}
      emptyMessage="No se encontraron movimientos."
      columns={[
        'Medicamento',
        'Lote',
        'Tipo',
        'Cantidad',
        'Motivo',
        'Usuario',
        'Fecha',
      ]}
      renderRow={(item) => (
        <tr
          key={item.id}
          className="border-t border-slate-100 text-sm text-slate-700"
        >
          <td className="px-6 py-5 font-medium text-slate-900">
            {item.medicationName}
          </td>

          <td className="px-6 py-5 text-slate-500">
            {item.lotCode ?? '-'}
          </td>

          <td className="px-6 py-5">
            <span
              className={[
                'inline-flex rounded-xl px-3 py-1 text-xs font-medium',
                getMovementTypeClasses(item.movementType),
              ].join(' ')}
            >
              {item.movementType}
            </span>
          </td>

          <td className="px-6 py-5">
            <span
              className={[
                'font-semibold',
                item.movementType.includes('OUT') || item.movementType === 'OUT'
                  ? 'text-red-500'
                  : 'text-emerald-600',
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
        </tr>
      )}
    />
  )
}

export default MovementTable