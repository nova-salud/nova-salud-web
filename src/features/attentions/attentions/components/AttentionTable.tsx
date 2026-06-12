import { useNavigate } from 'react-router'
import { format } from 'date-fns'
import { Eye, User } from 'lucide-react'
import { cn } from '@/shared/utils'
import { DataTable, Dropdown, DropdownItem, type Pagination } from '@/shared/components'
import { TRIAGE_LEVEL_CLASSNAME, TRIAGE_LEVEL_LABEL } from '../types/triage.enum'
import type { AttentionResponseDto } from '../types'

type Props = {
  items: AttentionResponseDto[]
  isLoading?: boolean
  pagination: Pagination
}

export const AttentionTable = ({ items, isLoading = false, pagination }: Props) => {
  const navigate = useNavigate()

  const goToDetail = (item: AttentionResponseDto) => {
    if (item.employeeId) navigate(`/clinical-histories/${item.employeeId}/attentions/${item.id}`)
  }

  const goToClinicalHistory = (item: AttentionResponseDto) => {
    if (item.employeeId) navigate(`/clinical-histories/${item.employeeId}`)
  }

  return (
    <DataTable
      data={items}
      isLoading={isLoading}
      emptyMessage="No se encontraron atenciones."
      pagination={pagination}
      onRowDoubleClick={goToDetail}
      columns={['Empleado', 'Fecha', 'Triage', 'Diagnóstico', 'Atendido por', 'Follow-up']}
      renderRow={(item) => (
        <>
          <td className="px-6 py-5">
            <p className="font-medium text-slate-900">{item.employeeFullName ?? '—'}</p>
            <p className="text-xs text-slate-500">HC #{item.clinicalHistoryId}</p>
          </td>

          <td className="px-6 py-5 text-sm text-slate-600">
            {item.createdAt ? format(new Date(item.createdAt), 'dd/MM/yyyy HH:mm') : '—'}
          </td>

          <td className="px-6 py-5">
            <span className={cn('inline-flex rounded-xl border px-3 py-1 text-xs font-medium', TRIAGE_LEVEL_CLASSNAME[item.triageLevel])}>
              {TRIAGE_LEVEL_LABEL[item.triageLevel]}
            </span>
          </td>

          <td className="px-6 py-5 text-sm text-slate-600">
            {item.diagnosisCode ?? '—'}
          </td>

          <td className="px-6 py-5 text-sm text-slate-600">
            {item.attendedByUserFullName ?? '—'}
          </td>

          <td className="px-6 py-5">
            {item.originFollowUpId != null ? (
              <span className="inline-flex rounded-xl border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                Sí
              </span>
            ) : (
              <span className="inline-flex rounded-xl border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">
                No
              </span>
            )}
          </td>
        </>
      )}
      renderActions={(item) => (
        <Dropdown>
          <DropdownItem onClick={() => goToDetail(item)}>
            <Eye size={14} />
            Ver detalle atención
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
