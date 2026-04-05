import { useNavigate } from 'react-router'
import DataTable from '@/shared/components/ui/table/DataTable'
import { cn } from '@/shared/utils'
import type { EmployeeResponseDto } from '../types/employee-response.dto'
import { Button } from '@/shared/components/ui/form'

type Props = {
  items: EmployeeResponseDto[]
  isLoading?: boolean
}

const EmployeeTable = ({ items, isLoading = false }: Props) => {
  const navigate = useNavigate()

  return (
    <DataTable
      data={items}
      isLoading={isLoading}
      emptyMessage="No se encontraron colaboradores."
      columns={[
        'ID',
        'Nombre',
        'DNI',
        'Área',
        'Cargo',
        'Estado',
        'Acciones',
      ]}
      renderRow={(item) => (
        <tr key={item.id} className="border-t border-slate-100 text-sm text-slate-700">
          <td className="px-6 py-5 font-medium text-slate-900">
            #{item.id}
          </td>

          <td className="px-6 py-5">
            <div className="flex flex-col">
              <span className="font-medium text-slate-900">
                {item.fullName}
              </span>
              <span className="text-xs text-slate-500">
                {item.position ?? '—'}
              </span>
            </div>
          </td>

          <td className="px-6 py-5 text-slate-500">{item.dni}</td>

          <td className="px-6 py-5 text-slate-500">
            {item.area?.name ?? '—'}
          </td>

          <td className="px-6 py-5 text-slate-500">
            {item.position ?? '—'}
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
              variant='outline'
              onClick={() => navigate(`/employees/${item.id}`)}
            >
              Ver detalle
            </Button>
          </td>
        </tr>
      )}
    />
  )
}

export default EmployeeTable