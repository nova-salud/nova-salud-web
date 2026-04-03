import { useNavigate } from 'react-router'
import DataTable from '@/shared/components/ui/table/DataTable'
import { cn } from '@/shared/utils'
import {
  DISPENSE_TYPE_CLASS_MAP,
  DISPENSE_TYPE_LABEL_MAP,
  type DispensationResponseDto,
} from '../types/dispensation-response.dto'

type Props = {
  items: DispensationResponseDto[]
  isLoading?: boolean
}

const DispensationTable = ({ items, isLoading = false }: Props) => {
  const navigate = useNavigate()

  return (
    <DataTable
      data={items}
      isLoading={isLoading}
      emptyMessage="No se encontraron dispensaciones."
      columns={['ID', 'Tipo', 'Motivo', 'Items', 'Fecha', 'Acciones']}
      renderRow={(item) => (
        <tr key={item.id} className="border-t border-slate-100 text-sm text-slate-700">
          <td className="px-6 py-5 font-medium text-slate-900">#{item.id}</td>

          <td className="px-6 py-5">
            <span
              className={cn(
                'inline-flex rounded-xl border px-3 py-1 text-xs font-medium',
                DISPENSE_TYPE_CLASS_MAP[item.dispenseType] ?? 'border-slate-200 bg-slate-50 text-slate-500',
              )}
            >
              {DISPENSE_TYPE_LABEL_MAP[item.dispenseType] ?? item.dispenseType}
            </span>
          </td>

          <td className="px-6 py-5 text-slate-500">{item.reason}</td>
          <td className="px-6 py-5 text-slate-500">{item.items.length}</td>
          <td className="px-6 py-5 text-slate-500">
            {new Date(item.dispensedAt).toLocaleDateString('es-PE')}
          </td>

          <td className="px-6 py-5">
            <button
              type="button"
              onClick={() => navigate(`/dispensations/${item.id}`)}
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

export default DispensationTable