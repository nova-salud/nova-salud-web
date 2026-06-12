import { useNavigate } from 'react-router'
import { format } from 'date-fns'
import { Eye, User } from 'lucide-react'
import { cn } from '@/shared/utils'
import { DataTable, Dropdown, DropdownItem, type Pagination } from '@/shared/components'
import {
  EMO_STATUS_CLASSNAME,
  EMO_STATUS_LABEL,
  type ClinicalHistoryEmoCycleResponseDto,
} from '../types'

export type EmoCycleListItem = ClinicalHistoryEmoCycleResponseDto & {
  clinicalHistory?: {
    employeeId: number
    employee?: {
      fullName: string
    }
  }
}

type Props = {
  items: EmoCycleListItem[]
  isLoading?: boolean
  pagination: Pagination
}

export const EmoCycleTable = ({ items, isLoading = false, pagination }: Props) => {
  const navigate = useNavigate()

  const goToDetail = (item: EmoCycleListItem) => {
    const employeeId = item.clinicalHistory?.employeeId
    if (employeeId) navigate(`/clinical-histories/${employeeId}/cycle/${item.id}`)
  }

  const goToClinicalHistory = (item: EmoCycleListItem) => {
    const employeeId = item.clinicalHistory?.employeeId
    if (employeeId) navigate(`/clinical-histories/${employeeId}`)
  }

  return (
    <DataTable
      data={items}
      isLoading={isLoading}
      emptyMessage="No se encontraron ciclos EMO."
      pagination={pagination}
      onRowDoubleClick={goToDetail}
      columns={['Empleado', 'Tipo EMO', 'Estado', 'Inicio', 'Vencimiento', 'Protocolo']}
      renderRow={(item) => (
        <>
          <td className="px-6 py-5">
            <p className="font-medium text-slate-900">
              {item.clinicalHistory?.employee?.fullName ?? '—'}
            </p>
            <p className="text-xs text-slate-500">HC #{item.clinicalHistoryId}</p>
          </td>

          <td className="px-6 py-5 text-sm text-slate-600">
            {item.emoType ?? '—'}
          </td>

          <td className="px-6 py-5">
            <span className={cn('inline-flex rounded-xl border px-3 py-1 text-xs font-medium', EMO_STATUS_CLASSNAME[item.status])}>
              {EMO_STATUS_LABEL[item.status]}
            </span>
          </td>

          <td className="px-6 py-5 text-sm text-slate-600">
            {item.startedAt ? format(new Date(item.startedAt), 'dd/MM/yyyy') : '—'}
          </td>

          <td className="px-6 py-5 text-sm">
            {item.expirationDate ? (
              <span className={cn(
                new Date(item.expirationDate) < new Date() ? 'font-medium text-red-600' : 'text-slate-600'
              )}>
                {format(new Date(item.expirationDate), 'dd/MM/yyyy')}
              </span>
            ) : '—'}
          </td>

          <td className="px-6 py-5 text-sm text-slate-600">
            {item.emoProtocolName ?? '—'}
          </td>
        </>
      )}
      renderActions={(item) => (
        <Dropdown>
          <DropdownItem onClick={() => goToDetail(item)}>
            <Eye size={14} />
            Ver detalle EMO
          </DropdownItem>
          <DropdownItem onClick={() => goToClinicalHistory(item)}>
            <User size={14} />
            Ver historia clínica
          </DropdownItem>
        </Dropdown>
      )}
    />
  )
}
