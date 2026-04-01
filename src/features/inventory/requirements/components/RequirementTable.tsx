import { useNavigate } from 'react-router'
import DataTable from '@/shared/components/ui/table/DataTable'
import { cn } from '@/shared/utils'
import { getStatusClassName, getStatusLabel, type InventoryRequirementResponseDto } from '../types/inventory-requirement-response.dto'

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
      columns={['ID', 'Estado', 'Items', 'Solicitado', 'Entregado', 'Acciones']}
      renderRow={(item) => (
        <tr key={item.id} className="border-t border-slate-100 text-sm text-slate-700">
          <td className="px-6 py-5 font-medium text-slate-900">#{item.id}</td>

          <td className="px-6 py-5">
            <span
              className={cn(
                'inline-flex rounded-xl border px-3 py-1 text-xs font-medium',
                getStatusClassName(item.status),
              )}
            >
              {getStatusLabel(item.status)}
            </span>
          </td>

          <td className="px-6 py-5 text-slate-500">{item.items.length}</td>

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
        </tr>
      )}
    />
  )
}

export default RequirementTable