import { useState } from 'react'
import { useNavigate } from 'react-router'
import type { EmployeeResponseDto } from '@/features/employees/types/employee-response.dto'
import { EmployeeSearchSelector } from '@/shared/components/employee/EmployeeSearchSelector'
import SelectedEmployeeCard from '@/shared/components/employee/SelectedEmployeeCard'
import { PageContainer } from '@/shared/components'
import { clinicalAttentionService } from '@/features/clinical-histories/clinical-attention/services/clinical-attention.service'
import { MedicalRestForm } from '../components/MedicalRestForm'

const DISCLAIMER = 'Solo se pueden registrar descansos médicos al personal que ya cuenta con una historia clínica registrada.'

export const CreateMedicalRestPage = () => {
  const navigate = useNavigate()
  const [employee, setEmployee] = useState<EmployeeResponseDto | null>(null)
  const [clinicalHistoryId, setClinicalHistoryId] = useState<number | null>(null)
  const [isCheckingClinicalHistory, setIsCheckingClinicalHistory] = useState(false)

  const handleSelectEmployee = async (selected: EmployeeResponseDto) => {
    setEmployee(selected)
    setIsCheckingClinicalHistory(true)

    try {
      const clinicalHistory = await clinicalAttentionService.findClinicalHistoryByEmployeeId(selected.id)
      setClinicalHistoryId(clinicalHistory?.id ?? null)
    } finally {
      setIsCheckingClinicalHistory(false)
    }
  }

  const handleClearEmployee = () => {
    setEmployee(null)
    setClinicalHistoryId(null)
  }

  if (!employee) {
    return (
      <PageContainer
        title="Registrar descanso médico"
        description="Registra un descanso médico de forma rápida."
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
      title="Registrar descanso médico"
      description="Registra un descanso médico de forma rápida."
    >
      <div className="space-y-6">
        <SelectedEmployeeCard employee={employee} onClear={handleClearEmployee} />

        {isCheckingClinicalHistory ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Verificando historia clínica...
          </div>
        ) : clinicalHistoryId === null ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            Este trabajador no tiene una historia clínica registrada. {DISCLAIMER}
          </div>
        ) : (
          <div className="rounded-2xl border-2 border-slate-300 bg-white p-6 shadow-lg">
            <MedicalRestForm
              clinicalHistoryId={clinicalHistoryId}
              onCancel={handleClearEmployee}
              onSuccess={() => navigate('/medical-rests', { replace: true })}
            />
          </div>
        )}
      </div>
    </PageContainer>
  )
}
