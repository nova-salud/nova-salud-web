import { useState } from 'react'
import type { EmployeeResponseDto } from '@/features/employees/types/employee-response.dto'
import { EmployeeSearchSelector } from '@/shared/components/employee/EmployeeSearchSelector'
import SelectedEmployeeCard from '@/shared/components/employee/SelectedEmployeeCard'
import PageContainer from '@/shared/components/ui/PageContainer'
import { useNavigate } from 'react-router'
import { AccidentForm, type CreateAccidentFormData } from '../components/AccidentForm'
import { useCreateAccident } from '../hooks/useCreateAccident'

export const CreateAccidentPage = () => {
  const navigate = useNavigate()
  const [employee, setEmployee] = useState<EmployeeResponseDto | null>(null)

  const { createAccident, isLoading: isCreating } = useCreateAccident()

  const handleSubmit = async (data: CreateAccidentFormData) => {
    if (!employee) return

    const result = await createAccident({
      ...data,
      employeeId: employee.id,
    })

    if (!result) return

    navigate(`/accidents/${result.id}`, { replace: true })
  }

  if (!employee) {
    return (
      <PageContainer
        title="Registrar accidente"
        description="Registra un accidente de forma rápida."
      >
        <EmployeeSearchSelector onSelect={setEmployee} />
      </PageContainer>
    )
  }

  return (
    <PageContainer
      title="Registrar accidente"
      description="Registra un accidente de forma rápida."
    >
      <div className="space-y-6">
        <SelectedEmployeeCard employee={employee} onClear={() => setEmployee(null)} />
        <AccidentForm onSubmit={handleSubmit} isLoading={isCreating} />
      </div>
    </PageContainer>
  )
}
