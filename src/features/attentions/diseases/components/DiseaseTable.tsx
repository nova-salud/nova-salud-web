import { cn } from '@/shared/utils'
import { Button, DataTable, type Pagination } from '@/shared/components'
import type { DiseaseResponseDto } from '../types'
import { DISEASE_TYPE_LABEL } from '../types/disease-type.enum'

type Props = {
  items: DiseaseResponseDto[]
  isLoading?: boolean
  pagination: Pagination
  onViewDetail: (disease: DiseaseResponseDto) => void
}

export const DiseaseTable = ({ items, isLoading = false, pagination, onViewDetail }: Props) => (
  <DataTable
    data={items}
    isLoading={isLoading}
    emptyMessage="No se encontraron enfermedades."
    columns={['ID', 'Código', 'Nombre', 'Categoría', 'Tipo', 'Estado']}
    pagination={pagination}
    renderRow={(item) => (
      <>
        <td className="px-6 py-5 font-medium text-slate-900">#{item.id}</td>
        <td className="px-6 py-5">
          <span className="font-medium text-slate-900">{item.code}</span>
        </td>
        <td className="px-6 py-5 text-slate-700">{item.name}</td>
        <td className="px-6 py-5 text-slate-500">{item.category ?? '—'}</td>
        <td className="px-6 py-5 text-slate-500">
          {item.diseaseType ? DISEASE_TYPE_LABEL[item.diseaseType] : '—'}
        </td>
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
        onClick={() => onViewDetail(item)}
      >
        Ver detalle
      </Button>
    )}
  />
)
