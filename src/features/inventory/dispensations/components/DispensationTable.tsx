import { useNavigate } from 'react-router'
import { cn } from '@/shared/utils'
import {
  DISPENSE_TYPE_CLASS_MAP,
  DISPENSE_TYPE_LABEL_MAP,
  type DispensationResponseDto,
} from '../types/dispensation-response.dto'
import { DataTable, Dropdown, DropdownItem, type Pagination } from '@/shared/components'
import { Eye } from 'lucide-react'

type Props = {
  items: DispensationResponseDto[]
  isLoading?: boolean
  pagination: Pagination
}

const DispensationTable = ({ items, isLoading = false, pagination }: Props) => {
  const navigate = useNavigate()

  return (
    <DataTable
      data={items}
      isLoading={isLoading}
      emptyMessage="No se encontraron dispensaciones."
      pagination={pagination}
      columns={['ID', 'Tipo', 'Trabajador', 'Motivo', 'Items', 'Fecha']}
      renderRow={(item) => (
        <>
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

          <td className="px-6 py-5">
            {item.employeeFullName ? (
              <div>
                <p className="text-sm text-slate-700">{item.employeeFullName}</p>
                {item.employeeIsThirdParty && (
                  <span className="inline-flex rounded-lg border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                    Externo
                  </span>
                )}
              </div>
            ) : (
              <span className="text-slate-400">-</span>
            )}
          </td>

          <td className="px-6 py-5 text-slate-500">{item.reason}</td>
          <td className="px-6 py-5 text-slate-500">{item.items.length}</td>
          <td className="px-6 py-5 text-slate-500">
            {new Date(item.dispensedAt).toLocaleDateString('es-PE')}
          </td>
        </>
      )}

      renderActions={(item) => (
        <Dropdown >
          <DropdownItem
            onClick={() => navigate(`/dispensations/${item.id}`)}
          >
            <Eye size={14}/>
            Ver detalle
          </DropdownItem>
        </Dropdown>
      )}
    />
  )
}

export default DispensationTable