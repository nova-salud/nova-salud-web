import { useState } from 'react'
import { useNavigate } from 'react-router'
import PageContainer from '@/shared/components/ui/PageContainer'
import { EmployeeSearchSelector } from '@/shared/components/employee/EmployeeSearchSelector'
import type { EmployeeResponseDto } from '@/features/employees/types/employee-response.dto'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import { clinicalAttentionService } from '../services/clinical-attention.service'

const ClinicalAttentionEntryPage = () => {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  const handleSelectEmployee = async (employee: EmployeeResponseDto) => {
    try {
      setError(null)
      const history = await clinicalAttentionService.findClinicalHistoryByEmployeeId(employee.id)

      if (history) {
        navigate(`/clinical-histories/${employee.id}`)
      } else {
        navigate(`/clinical-histories/new?employeeId=${employee.id}`)
      }
    } catch (err) {
      setError(parseBackendError(err))
    }
  }

  return (
    <PageContainer
      title="Atención clínica"
      description="Busca al trabajador para abrir o crear su historia clínica."
    >
      <div className="space-y-5">
        {error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <EmployeeSearchSelector onSelect={(emp) => void handleSelectEmployee(emp)} />
      </div>
    </PageContainer>
  )
}

export default ClinicalAttentionEntryPage
