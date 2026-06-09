import { useNavigate } from 'react-router'
import { PageContainer } from '@/shared/components'
import type { EmployeeResponseDto } from '../types'
import { EmployeeFilter } from '../components/EmployeeFilter'
import { useEmployees } from '../hooks'
import { EmployeeTable } from '../components'

const ExternalEmployeesPage = () => {
  const navigate = useNavigate()
  const { data, isLoading, error, pagination, onChangeFilters } = useEmployees()

  const employees = data.filter(e => e.user.role === 'EMPLOYEE_EXT')

  const handleViewDetail = (employee: EmployeeResponseDto) => {
    void navigate(`/employees/${employee.id}`)
  }

  return (
    <PageContainer
      title="Externos"
      description="Empleados externos sincronizados desde RRHH."
    >
      <div className="space-y-5">
        <EmployeeFilter onChangeFilters={onChangeFilters}></EmployeeFilter>

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
  )
}

export default ExternalEmployeesPage
