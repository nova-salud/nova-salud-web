import { useNavigate } from 'react-router'
import { PageContainer } from '@/shared/components'
import { EmployeeFilter, EmployeeTable } from '../components'
import type { EmployeeResponseDto } from '../types'
import { useEmployees } from '../hooks'

const EmployeesPage = () => {
  const navigate = useNavigate()
  const { data: employees, isLoading, error, pagination, onChangeFilters, filters } = useEmployees({ isExternal: false })

  const handleViewDetail = (employee: EmployeeResponseDto) => {
    void navigate(`/employees/${employee.id}`)
  }

  return (
    <>
      <PageContainer
        title="Empleados"
        description="Listado de empleados sicronizados desde RRHH"
      >
        <div className="space-y-5">
          <EmployeeFilter filters={filters} onChangeFilters={onChangeFilters} />

          {error ? (
            <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          ) : null}

          <EmployeeTable
            items={employees}
            isLoading={isLoading}
            onViewDetail={handleViewDetail}
            pagination={pagination}
          />
        </div>
      </PageContainer>
    </>
  )
}

export default EmployeesPage
