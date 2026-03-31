import { useNavigate } from 'react-router'
import DataTable from '@/shared/components/ui/table/DataTable'
import type { InventoryDeliveryResponseDto } from '../types/inventory-delivery-response.dto'

type Props = {
  items: InventoryDeliveryResponseDto[]
  isLoading?: boolean
}

const getStatusClasses = (status: string): string => {
  switch (status) {
    case 'PENDING':
      return 'border border-amber-100 bg-amber-50 text-amber-700'
    case 'IN_PROGRESS':
      return 'border border-sky-100 bg-sky-50 text-sky-700'
    case 'COMPLETED':
      return 'border border-emerald-100 bg-emerald-50 text-emerald-700'
    case 'CANCELLED':
      return 'border border-red-100 bg-red-50 text-red-600'
    default:
      return 'border border-slate-200 bg-slate-50 text-slate-500'
  }
}

const DeliveryTable = ({ items, isLoading = false }: Props) => {
  const navigate = useNavigate()

  return (
    <DataTable
      data={items}
      isLoading={isLoading}
      emptyMessage="No se encontraron entregas."
      columns={[
        'ID',
        'Entregado por',
        'Recibido por',
        'Fecha',
        'Estado',
        'Acciones',
      ]}
      renderRow={(item) => (
        <tr
          key={item.id}
          className="border-t border-slate-100 text-sm text-slate-700"
        >
          <td className="px-6 py-5 font-medium text-slate-900">
            #{item.id}
          </td>

          <td className="px-6 py-5">
            {item.deliveredByUser?.username ?? `Usuario ${item.deliveredByUserId}`}
          </td>

          <td className="px-6 py-5 text-slate-500">
            {item.receivedByUser?.username ??
              (item.receivedByUserId ? `Usuario ${item.receivedByUserId}` : '-')}
          </td>

          <td className="px-6 py-5 text-slate-500">
            {new Date(item.deliveryDate).toLocaleDateString('es-PE')}
          </td>

          <td className="px-6 py-5">
            <span
              className={[
                'inline-flex rounded-xl px-3 py-1 text-xs font-medium',
                getStatusClasses(item.status),
              ].join(' ')}
            >
              {item.status}
            </span>
          </td>

          <td className="px-6 py-5">
            <button
              type="button"
              onClick={() => navigate(`/deliveries/${item.id}`)}
              className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Ver detalle
            </button>
          </td>
        </tr>
      )}
    />
  )
}

export default DeliveryTable