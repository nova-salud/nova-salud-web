import { useNavigate } from 'react-router'
import { format } from 'date-fns'
import { Eye } from 'lucide-react'
import { DataTable, Dropdown, DropdownItem, type Pagination } from '@/shared/components'
import {
  EVENT_TYPE_LABEL,
  EVENT_STATUS_LABEL,
  SEVERITY_LABEL,
  type EventReportItemDto,
  type EventReportType,
} from '../types/event-report.types'

const TYPE_BADGE: Record<EventReportType, string> = {
  ATTENTION: 'bg-blue-100 text-blue-700',
  ACCIDENT: 'bg-orange-100 text-orange-700',
  INCIDENT: 'bg-amber-100 text-amber-700',
}

const STATUS_BADGE: Record<string, string> = {
  OPEN: 'bg-red-100 text-red-700',
  IN_PROGRESS: 'bg-yellow-100 text-yellow-700',
  CLOSED: 'bg-green-100 text-green-700',
  COMPLETED: 'bg-slate-100 text-slate-600',
}

const SEVERITY_BADGE: Record<string, string> = {
  LOW: 'bg-green-100 text-green-700',
  MEDIUM: 'bg-yellow-100 text-yellow-700',
  HIGH: 'bg-red-100 text-red-700',
  INCIDENT: 'bg-slate-100 text-slate-600',
  MINOR_ACCIDENT: 'bg-orange-100 text-orange-700',
  DISABLING_ACCIDENT: 'bg-red-100 text-red-700',
  FATAL_ACCIDENT: 'bg-red-200 text-red-900',
}

type Props = {
  items: EventReportItemDto[]
  isLoading?: boolean
  pagination: Pagination
}

export const EventReportTable = ({ items, isLoading = false, pagination }: Props) => {
  const navigate = useNavigate()

  const handleDetail = (item: EventReportItemDto) => {
    if (item.type === 'ATTENTION') {
      navigate(`/clinical-histories/${item.employeeId}/attentions/${item.sourceId}`)
    } else {
      navigate(`/accidents/${item.sourceId}`)
    }
  }

  return (
    <DataTable
      data={items}
      isLoading={isLoading}
      emptyMessage="No se encontraron eventos en el rango seleccionado."
      pagination={pagination}
      columns={['Tipo', 'Fecha', 'Trabajador', 'Área', 'Gravedad', 'Estado', '¿Investigado?', 'Medidas correctivas', 'Responsable']}
      renderRow={(item) => (
        <>
          <td className="px-6 py-5">
            <span className={`inline-flex rounded-xl px-3 py-1 text-xs font-medium ${TYPE_BADGE[item.type]}`}>
              {EVENT_TYPE_LABEL[item.type]}
            </span>
          </td>

          <td className="px-6 py-5 text-sm text-slate-600">
            {format(new Date(item.date), 'dd/MM/yyyy')}
          </td>

          <td className="px-6 py-5">
            <p className="text-sm font-medium text-slate-900">{item.employeeFullName ?? '—'}</p>
          </td>

          <td className="px-6 py-5 text-sm text-slate-600">
            {item.employeeArea ?? '—'}
          </td>

          <td className="px-6 py-5">
            {item.severity ? (
              <span className={`inline-flex rounded-xl px-3 py-1 text-xs font-medium ${SEVERITY_BADGE[item.severity] ?? 'bg-slate-100 text-slate-600'}`}>
                {SEVERITY_LABEL[item.severity] ?? item.severity}
              </span>
            ) : (
              <span className="text-sm text-slate-400">—</span>
            )}
          </td>

          <td className="px-6 py-5">
            <span className={`inline-flex rounded-xl px-3 py-1 text-xs font-medium ${STATUS_BADGE[item.status] ?? 'bg-slate-100 text-slate-600'}`}>
              {EVENT_STATUS_LABEL[item.status] ?? item.status}
            </span>
          </td>

          <td className="px-6 py-5 text-sm text-slate-600">
            {item.hasInvestigation === null
              ? '—'
              : item.hasInvestigation
                ? <span className="text-green-700 font-medium">Sí</span>
                : <span className="text-slate-400">No</span>}
          </td>

          <td className="px-6 py-5 text-sm text-slate-600 max-w-[200px]">
            {item.correctiveMeasures
              ? <span title={item.correctiveMeasures}>{item.correctiveMeasures.length > 60 ? `${item.correctiveMeasures.slice(0, 60)}…` : item.correctiveMeasures}</span>
              : '—'}
          </td>

          <td className="px-6 py-5 text-sm text-slate-600">
            {item.responsible ?? '—'}
          </td>
        </>
      )}
      renderActions={(item) => (
        <Dropdown>
          <DropdownItem onClick={() => handleDetail(item)}>
            <Eye size={14} />
            Ver detalle
          </DropdownItem>
        </Dropdown>
      )}
    />
  )
}
