import { cn } from '@/shared/utils'
import { Button } from '@/shared/components/ui/form'
import DataTable from '@/shared/components/ui/table/DataTable'
import type { HealthcareCenterResponseDto } from '../types'

type Props = {
  items: HealthcareCenterResponseDto[]
  isLoading?: boolean
  onEdit: (item: HealthcareCenterResponseDto) => void
}

const HealthcareCenterTable = ({
  items,
  isLoading = false,
  onEdit,
}: Props) => {
  return (
    <DataTable
      data={items}
      isLoading={isLoading}
      emptyMessage="No se encontraron establecimientos."
      columns={[
        'ID',
        'Nombre',
        'RUC',
        'Teléfono',
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

          <td className="px-6 py-5 text-slate-700">
            {item.name}
          </td>

          <td className="px-6 py-5 text-slate-700">
            {item.ruc ?? 'N/A'}
          </td>

          <td className="px-6 py-5 text-slate-700">
            {item.phone ?? 'N/A'}
          </td>

          <td className="px-6 py-5">
            <span
              className={cn(
                'inline-flex rounded-xl border px-3 py-1 text-xs font-medium',
                item.isActive
                  ? 'border-emerald-100 bg-emerald-50 text-emerald-700'
                  : 'border-slate-200 bg-slate-50 text-slate-500',
              )}
            >
              {item.isActive ? 'Activo' : 'Inactivo'}
            </span>
          </td>

          <td className="px-6 py-5">
            <Button
              type="button"
              variant="outline"
              onClick={() => onEdit(item)}
              className="w-auto rounded-xl px-3 py-2 text-xs"
            >
              Editar
            </Button>
          </td>
        </tr>
      )}
    />
  )
}

export default HealthcareCenterTable