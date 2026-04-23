import { Button } from '@/shared/components/ui/form'
import DataTable from '@/shared/components/ui/table/DataTable'
import { cn } from '@/shared/utils'
import type { EmoProtocolResponseDto } from '../types'

type Props = {
  items: EmoProtocolResponseDto[]
  isLoading?: boolean
  onEdit: (item: EmoProtocolResponseDto) => void
  onViewDetail: (item: EmoProtocolResponseDto) => void
}

const EmoProtocolTable = ({
  items,
  isLoading = false,
  onEdit,
  onViewDetail,
}: Props) => {
  return (
    <DataTable
      data={items}
      isLoading={isLoading}
      emptyMessage="No se encontraron protocolos EMO."
      columns={[
        'ID',
        'Nombre',
        'Recurrencia - Apto',
        'Recurrencia - Apto Restric.',
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
            {item.nextEmoDaysFit} { ' '} días
          </td>

          <td className="px-6 py-5 text-slate-700">
            {item.nextEmoDaysFitWithRestrictions} { ' '} días
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
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onEdit(item)}
                className="w-auto rounded-xl px-3 py-2 text-xs"
              >
                Editar
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => onViewDetail(item)}
                className="w-auto rounded-xl px-3 py-2 text-xs"
              >
                Ver detalle
              </Button>
            </div>
          </td>
        </tr>
      )}
    />
  )
}

export default EmoProtocolTable