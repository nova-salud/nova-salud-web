import { cn } from '@/shared/utils'
import { Button, DataTable, type Pagination } from '@/shared/components'
import type { TherapeuticCategoryResponseDto } from '../types/therapeutic-category-response.dto'

type Props = {
  items: TherapeuticCategoryResponseDto[]
  isLoading?: boolean
  pagination: Pagination
  onEdit: (item: TherapeuticCategoryResponseDto) => void
}

export const TherapeuticCategoryTable = ({ items, isLoading = false, pagination, onEdit }: Props) => (
  <DataTable
    data={items}
    isLoading={isLoading}
    emptyMessage="No se encontraron categorías de medicamentos."
    columns={['Nombre', 'Descripción', 'Estado']}
    pagination={pagination}
    renderRow={(item) => (
      <>
        <td className="px-6 py-5 font-medium text-slate-900">{item.name}</td>
        <td className="px-6 py-5 text-slate-600">{item.description ?? '—'}</td>
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
