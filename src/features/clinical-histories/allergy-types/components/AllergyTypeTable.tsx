import { cn } from '@/shared/utils'
import { Button, DataTable, type Pagination } from '@/shared/components'
import type { AllergyTypeResponseDto } from '../types'

type Props = {
  items: AllergyTypeResponseDto[]
  isLoading?: boolean
  pagination: Pagination
  onEdit: (item: AllergyTypeResponseDto) => void
}

export const AllergyTypeTable = ({ items, isLoading = false, pagination, onEdit }: Props) => (
  <DataTable
    data={items}
    isLoading={isLoading}
    emptyMessage="No se encontraron tipos de alergia."
    columns={['Nombre', 'Estado']}
    pagination={pagination}
    renderRow={(item) => (
      <>
        <td className="px-6 py-5 font-medium text-slate-900">{item.name}</td>
        <td className="px-6 py-5">
          <span className={cn(
            'inline-flex rounded-xl border px-3 py-1 text-xs font-medium',
            item.isActive
              ? 'border-emerald-100 bg-emerald-50 text-emerald-700'
              : 'border-slate-200 bg-slate-50 text-slate-500',
          )}>
            {item.isActive ? 'Activo' : 'Inactivo'}
          </span>
        </td>
      </>
    )}
    renderActions={(item) => (
      <Button
        type="button"
        variant="outline"
        className="w-auto rounded-xl px-3 py-2 text-xs"
        onClick={() => onEdit(item)}
      >
        Editar
      </Button>
    )}
  />
)
