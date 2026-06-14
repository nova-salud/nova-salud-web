import { useNavigate } from 'react-router'
import { format, differenceInDays } from 'date-fns'
import { Download, User } from 'lucide-react'
import { DataTable, Dropdown, DropdownItem, type Pagination } from '@/shared/components'
import type { MedicalRestResponseDto } from '../types'

type Props = {
  items: MedicalRestResponseDto[]
  isLoading?: boolean
  pagination: Pagination
}

export const MedicalRestTable = ({ items, isLoading = false, pagination }: Props) => {
  const navigate = useNavigate()

  const goToClinicalHistory = (item: MedicalRestResponseDto) => {
    if (item.employeeId) navigate(`/clinical-histories/${item.employeeId}`)
  }

  const downloadFile = (item: MedicalRestResponseDto) => {
    if (!item.fileUrl) return
    const a = document.createElement('a')
    a.href = item.fileUrl
    a.download = item.fileName ?? 'descanso-medico'
    a.target = '_blank'
    a.click()
  }

  return (
    <DataTable
      data={items}
      isLoading={isLoading}
      emptyMessage="No se encontraron descansos médicos."
      pagination={pagination}
      columns={['Empleado', 'Inicio', 'Fin', 'Días', 'Notas', 'Documento']}
      renderRow={(item) => {
        const start = new Date(item.startDate)
        const end = new Date(item.endDate)
        const days = differenceInDays(end, start) + 1

        return (
          <>
            <td className="px-6 py-5">
              <p className="font-medium text-slate-900">
                {item.employeeFullName ?? '—'}
              </p>
              <p className="text-xs text-slate-500">HC #{item.clinicalHistoryId}</p>
            </td>

            <td className="px-6 py-5 text-sm text-slate-600">
              {format(start, 'dd/MM/yyyy')}
            </td>

            <td className="px-6 py-5 text-sm text-slate-600">
              {format(end, 'dd/MM/yyyy')}
            </td>

            <td className="px-6 py-5 text-sm text-slate-600">
              {days} día{days !== 1 ? 's' : ''}
            </td>

            <td className="px-6 py-5 text-sm text-slate-500">
              {item.notes
                ? item.notes.length > 40
                  ? `${item.notes.slice(0, 40)}…`
                  : item.notes
                : '—'}
            </td>

            <td className="px-6 py-5">
              {item.fileUrl ? (
                <span className="inline-flex rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                  Con doc.
                </span>
              ) : (
                <span className="inline-flex rounded-xl border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">
                  Sin doc.
                </span>
              )}
            </td>
          </>
        )
      }}
      renderActions={(item) => (
        <Dropdown>
          <DropdownItem onClick={() => goToClinicalHistory(item)}>
            <User size={14} />
            Ver historia clínica
          </DropdownItem>
          {item.fileUrl && (
            <DropdownItem onClick={() => downloadFile(item)}>
              <Download size={14} />
              Descargar documento
            </DropdownItem>
          )}
        </Dropdown>
      )}
    />
  )
}
