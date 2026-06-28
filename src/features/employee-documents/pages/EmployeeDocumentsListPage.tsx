import { useNavigate } from 'react-router'
import { Eye, FileText } from 'lucide-react'
import { PageContainer, DataTable, Dropdown, DropdownItem } from '@/shared/components'
import { useEmployees } from '@/features/employees/hooks'
import { EmployeeFilter } from '@/features/employees/components'
import type { EmployeeResponseDto } from '@/features/employees/types'
import { useEmployeeDocumentCounts } from '../hooks/useEmployeeDocumentCounts'

const EmployeeDocumentsListPage = () => {
  const navigate = useNavigate()
  const { data: employees, isLoading, pagination, onChangeFilters, filters } = useEmployees({ isExternal: false })

  const employeeIds = employees.map((e) => e.id)
  const { countsMap } = useEmployeeDocumentCounts(employeeIds)

  const handleSelect = (employee: EmployeeResponseDto) => {
    void navigate(`/documents/employees/${employee.id}`)
  }

  return (
    <PageContainer
      title="Documentos por Empleado"
      description="Selecciona un empleado para ver y descargar sus documentos disponibles."
    >
      <div className="space-y-5">
        <EmployeeFilter filters={filters} onChangeFilters={onChangeFilters} />

        <DataTable
          data={employees}
          isLoading={isLoading}
          emptyMessage="No se encontraron empleados"
          pagination={pagination}
          columns={['Nombre completo', 'DNI', 'Área', 'Empresa', 'Documentos']}
          renderRow={(employee) => {
            const counts = countsMap.get(employee.id)
            return (
              <>
                <td className="px-6 py-5 font-medium text-slate-900">{employee.fullName}</td>
                <td className="px-6 py-5 text-slate-700">{employee.dni}</td>
                <td className="px-6 py-5 text-slate-700">{employee.area?.name ?? '—'}</td>
                <td className="px-6 py-5 text-slate-700">{employee.company ?? '—'}</td>
                <td className="px-6 py-5">
                  {counts ? (
                    <div className="flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5 text-slate-400" />
                      <span className="text-sm font-medium text-slate-700">{counts.totalDocuments}</span>
                      <span className="text-xs text-slate-400">
                        ({counts.completedCyclesCount} EMO · {counts.attentionsCount} atenciones)
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400">—</span>
                  )}
                </td>
              </>
            )
          }}
          renderActions={(employee) => (
            <Dropdown>
              <DropdownItem onClick={() => handleSelect(employee)}>
                <Eye size={14} />
                Ver documentos
              </DropdownItem>
            </Dropdown>
          )}
        />
      </div>
    </PageContainer>
  )
}

export default EmployeeDocumentsListPage
