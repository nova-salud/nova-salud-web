import { useNavigate } from 'react-router'
import { DataTable } from '@/shared/components/ui/table/DataTable'
import { getMovementTypeMeta } from '../types/movement-type.constants'
import type { InventoryMovementResponseDto } from '../types/inventory-movement-response.dto'

type Props = {
  items: InventoryMovementResponseDto[]
  isLoading?: boolean
}

const MovementTable = ({ items, isLoading = false }: Props) => {
  const navigate = useNavigate()

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
        'Registrado por',
        'Fecha',
        'Acciones',
      ]}
      renderRow={(item) => (
        <>
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
                getMovementTypeMeta(item.movementType).classes,
              ].join(' ')}
            >
              {getMovementTypeMeta(item.movementType).label}
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

          <td className="px-6 py-5">
            <button
              type="button"
              onClick={() => navigate(`/medications/${item.medicationId}`)}
              className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
            >
              Ver medicamento
            </button>
          </td>
        </>
      )}
    />
  )
}

export default MovementTable