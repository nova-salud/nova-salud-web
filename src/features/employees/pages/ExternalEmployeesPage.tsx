import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Download } from 'lucide-react'
import { Button, PageContainer } from '@/shared/components'
import type { EmployeeResponseDto } from '../types'
import { EmployeeFilter, EmployeeImportModal } from '../components'
import { useEmployees } from '../hooks'
import { EmployeeTable } from '../components'

const ExternalEmployeesPage = () => {
  const navigate = useNavigate()
  const { data: employees, isLoading, error, pagination, onChangeFilters, filters, refetch } = useEmployees({ isExternal: true })
  const [isImportOpen, setIsImportOpen] = useState(false)

  const handleViewDetail = (employee: EmployeeResponseDto) => {
    void navigate(`/employees/${employee.id}`)
  }

  return (
    <>
      <PageContainer
        title="Externos"
        description="Empleados externos sincronizados desde RRHH."
        action={
          <div className="flex items-center gap-2">
            <a href="/templates/employees-import-template.csv" download>
              <Button variant="outline" className="w-auto flex gap-x-2">
                <Download className="h-3.5 w-3.5" />
                Plantilla
              </Button>
            </a>
            <Button onClick={() => setIsImportOpen(true)} className="w-auto">
              Importar CSV
            </Button>
          </div>
        }
      >
        <div className="space-y-5">
          <EmployeeFilter onChangeFilters={onChangeFilters} filters={filters}></EmployeeFilter>

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

      <EmployeeImportModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onSuccess={() => { void refetch() }}
      />
    </>
  )
}

export default ExternalEmployeesPage
