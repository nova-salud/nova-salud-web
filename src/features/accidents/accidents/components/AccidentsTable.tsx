import { Eye } from 'lucide-react'
import { cn } from '@/shared/utils'
import { format } from 'date-fns'
import { ACCIDENT_STATUS_CLASSNAME, ACCIDENT_STATUS_LABEL, ACCIDENT_TYPE_LABEL, type AccidentResponseDto } from '../types'
import { FollowUpStatusEnum } from '@/features/follow-ups/types/follow-up-status.enum'
import { Dropdown, DropdownItem, type Pagination, DataTable } from '@/shared/components'

type Props = {
  items: AccidentResponseDto[]
  isLoading?: boolean
  pagination: Pagination
  onView?: (id: number) => void
}

export const AccidentTable = ({
  items,
  isLoading = false,
  pagination,
  onView,
}: Props) => {
  return (
    <DataTable
      data={items}
      isLoading={isLoading}
      emptyMessage="No se encontraron accidentes."
      pagination={pagination}
      onRowDoubleClick={(item) => onView?.(item.id)}
      columns={[
        'Trabajador',
        'Fecha',
        'Tipo',
        'Estado',
        'Seguimientos',
        'Derivación'
      ]}
      renderRow={(item) => {
        const followUps = item.followUps ?? []
        const completed = followUps.filter(
          f => f.status === FollowUpStatusEnum.COMPLETED
        ).length

        return (
          <>
            <td className="px-6 py-5">
              <p className="font-medium text-slate-900">
                {item.employeeFullName ?? '—'}
              </p>
              <p className="text-xs text-slate-500">
                #{item.id}
              </p>
            </td>

            <td className="px-6 py-5">
              {format(new Date(item.occurredAt), 'dd/MM/yyyy HH:mm')}
            </td>
            <td className="px-6 py-5">
              <span className="rounded-xl bg-slate-100 px-3 py-1 text-xs">
                {ACCIDENT_TYPE_LABEL[item.type]}
              </span>
            </td>

            <td className="px-6 py-5">
              <span
                className={cn(
                  'inline-flex rounded-xl border px-3 py-1 text-xs font-medium',
                  ACCIDENT_STATUS_CLASSNAME[item.status],
                )}
              >
                {ACCIDENT_STATUS_LABEL[item.status]}
              </span>
            </td>

            <td className="px-6 py-5">
              {followUps.length === 0 ? (
                <span className="text-xs text-slate-400">
                  Sin seguimiento
                </span>
              ) : (
                <span className="text-xs text-slate-600">
                  {completed}/{followUps.length}
                </span>
              )}
            </td>

            <td className="px-6 py-5">
              {item.requiresExternalReferral ? (
                <span className="text-xs text-amber-600 font-medium">
                  Externa
                </span>
              ) : (
                <span className="text-xs text-slate-500">
                  Interna
                </span>
              )}
            </td>
          </>
        )
      }}
      renderActions={(item) => (
        <Dropdown>
          <DropdownItem
            onClick={() => onView?.(item.id)}
          >
            <Eye size={14}/>
            Ver detalle
          </DropdownItem>
        </Dropdown>
      )}
    />
  )
}