import { Eye } from 'lucide-react'
import { cn } from '@/shared/utils'
import { DataTable, Dropdown, DropdownItem, type Pagination } from '@/shared/components'
import type { EmoProtocolResponseDto } from '../types'

type Props = {
  items: EmoProtocolResponseDto[]
  isLoading?: boolean
  onViewDetail: (item: EmoProtocolResponseDto) => void
  pagination: Pagination
}

export const EmoProtocolTable = ({
  items,
  isLoading = false,
  onViewDetail,
  pagination
}: Props) => {
  return (
    <DataTable
      data={items}
      isLoading={isLoading}
      emptyMessage="No se encontraron protocolos EMO."
      columns={[
        'ID',
        'Nombre',
        'Plazo de completación',
        'Recurrencia - Apto',
        'Recurrencia - Apto Restric.',
        'Estado',
      ]}
      pagination={pagination}
      renderRow={(item) => (
        <>
          <td className="px-6 py-5 font-medium text-slate-900">
            #{item.id}
          </td>

          <td className="px-6 py-5 text-slate-700">
            {item.name}
          </td>

          <td className="px-6 py-5 text-slate-700">
            {item.daysToExpire} días
          </td>

          <td className="px-6 py-5 text-slate-700">
            {item.nextEmoDaysFit} días
          </td>

          <td className="px-6 py-5 text-slate-700">
            {item.nextEmoDaysFitWithRestrictions} días
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
        </>
      )}
      renderActions={(emo) => (
        <Dropdown>
          <DropdownItem
            onClick={() => onViewDetail(emo)}
          >
            <Eye size={14} />
            Ver detalle
          </DropdownItem>
        </Dropdown>
      )}
    />
  )
}