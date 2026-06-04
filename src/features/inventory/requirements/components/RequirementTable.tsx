import { useNavigate } from 'react-router'
import { DataTable } from '@/shared/components/ui/table/DataTable'
import { cn } from '@/shared/utils'
import { STATUS_CLASSES, STATUS_LABELS, type InventoryRequirementResponseDto } from '../types/inventory-requirement-response.dto'

type Props = {
  items: InventoryRequirementResponseDto[]
  isLoading?: boolean
}

const RequirementTable = ({ items, isLoading = false }: Props) => {
  const navigate = useNavigate()

  return (
    <DataTable
      data={items}
      isLoading={isLoading}
      emptyMessage="No se encontraron requerimientos."
      columns={['ID', 'Código', 'Estado', 'Items', 'Costo Total', 'Solicitado', 'Entregado', 'Acciones']}
      renderRow={(item) => (
        <>
          <td className="px-6 py-5 font-medium text-slate-900">#{item.id}</td>
          <td className="px-6 py-5 font-medium text-slate-900">{item.code}</td>

          <td className="px-6 py-5">
            <span
              className={cn(
                'inline-flex rounded-xl border px-3 py-1 text-xs font-medium',
                STATUS_CLASSES[item.status],
              )}
            >
              {STATUS_LABELS[item.status]}
            </span>
          </td>

          <td className="px-6 py-5 text-slate-500">{item.items.length}</td>

          <td className="px-6 py-5 text-slate-500">S/. {item.totalCost}</td>

          <td className="px-6 py-5 text-slate-500">
            {new Date(item.createdAt).toLocaleDateString('es-PE')}
          </td>

          <td className="px-6 py-5 text-slate-500">
            {item.deliveredAt ? new Date(item.deliveredAt).toLocaleDateString('es-PE') : '-'}
          </td>

          <td className="px-6 py-5">
            <button
              type="button"
              onClick={() => navigate(`/requirements/${item.id}`)}
              className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Ver detalle
            </button>
          </td>
        </>
      )}
    />
  )
}

export default RequirementTable