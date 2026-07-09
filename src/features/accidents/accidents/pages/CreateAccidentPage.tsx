import { useState } from 'react'
import type { EmployeeResponseDto } from '@/features/employees/types/employee-response.dto'
import { EmployeeSearchSelector } from '@/shared/components/employee/EmployeeSearchSelector'
import SelectedEmployeeCard from '@/shared/components/employee/SelectedEmployeeCard'
import { PageContainer } from '@/shared/components'
import { useNavigate } from 'react-router'
import { clinicalAttentionService } from '@/features/clinical-histories/clinical-attention/services/clinical-attention.service'
import { AccidentForm, type CreateAccidentFormData } from '../components/AccidentForm'
import { useCreateAccident } from '../hooks/useCreateAccident'

const DISCLAIMER = 'Solo se pueden registrar accidentes/incidentes al personal que ya cuenta con una historia clínica registrada.'

export const CreateAccidentPage = () => {
  const navigate = useNavigate()
  const [employee, setEmployee] = useState<EmployeeResponseDto | null>(null)
  const [hasClinicalHistory, setHasClinicalHistory] = useState<boolean | null>(null)
  const [isCheckingClinicalHistory, setIsCheckingClinicalHistory] = useState(false)

  const { createAccident, isLoading: isCreating } = useCreateAccident()

  const handleSelectEmployee = async (selected: EmployeeResponseDto) => {
    setEmployee(selected)
    setIsCheckingClinicalHistory(true)

    try {
      const clinicalHistory = await clinicalAttentionService.findClinicalHistoryByEmployeeId(selected.id)
      setHasClinicalHistory(clinicalHistory !== null)
    } finally {
      setIsCheckingClinicalHistory(false)
    }
  }

  const handleClearEmployee = () => {
    setEmployee(null)
    setHasClinicalHistory(null)
  }

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
        title="Registrar accidente / incidente"
        description="Registra un accidente o incidente de forma rápida."
      >
        <div className="space-y-6">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {DISCLAIMER}
          </div>

          <EmployeeSearchSelector onSelect={(selected) => void handleSelectEmployee(selected)} />
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer
      title="Registrar accidente / incidente"
      description="Registra un accidente o incidente de forma rápida."
    >
      <div className="space-y-6">
        <SelectedEmployeeCard employee={employee} onClear={handleClearEmployee} />

        {isCheckingClinicalHistory ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Verificando historia clínica...
          </div>
        ) : hasClinicalHistory === false ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            Este trabajador no tiene una historia clínica registrada. {DISCLAIMER}
          </div>
        ) : (
          <AccidentForm onSubmit={handleSubmit} isLoading={isCreating} />
        )}
      </div>
    </PageContainer>
  )
}
