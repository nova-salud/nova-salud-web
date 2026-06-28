import { Button, Badge, DataTable, type Pagination } from '@/shared/components'
import type { SpecialtyResponseDto } from '../types'

type Props = {
  items: SpecialtyResponseDto[]
  isLoading?: boolean
  pagination: Pagination
  onEdit: (item: SpecialtyResponseDto) => void
  onDelete: (item: SpecialtyResponseDto) => void
}

export const SpecialtyTable = ({ items, isLoading = false, pagination, onEdit, onDelete }: Props) => (
  <DataTable
    data={items}
    isLoading={isLoading}
    emptyMessage="No se encontraron especialidades."
    columns={['Nombre', 'Estado']}
    pagination={pagination}
    renderRow={(item) => (
      <>
        <td className="px-6 py-5 font-medium text-slate-900">{item.name}</td>
        <td className="px-6 py-5">
          <Badge variant={item.isActive ? 'green' : 'slate'}>
            {item.isActive ? 'Activo' : 'Inactivo'}
          </Badge>
        </td>
      </>
    )}
    renderActions={(item) => (
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          className="w-auto rounded-xl px-3 py-2 text-xs"
          onClick={() => onEdit(item)}
        >
          Editar
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-auto rounded-xl px-3 py-2 text-xs text-red-600 hover:border-red-300 hover:bg-red-50"
          onClick={() => onDelete(item)}
        >
          Eliminar
        </Button>
      </div>
    )}
  />
)
