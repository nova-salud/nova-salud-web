import { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { EmployeeSearchSelector, PageContainer } from '@/shared/components'
import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import type { EmployeeResponseDto } from '@/features/employees/types/employee-response.dto'
import { clinicalAttentionService } from '../services/clinical-attention.service'

const ClinicalAttentionEntryPage = () => {
  const navigate = useNavigate()

  const selectAction = useCallback(
    async (employee: EmployeeResponseDto) => {
      const history = await clinicalAttentionService.findClinicalHistoryByEmployeeId(employee.id)
      if (history) {
        navigate(`/clinical-histories/${employee.id}`)
      } else {
        navigate(`/clinical-histories/new?employeeId=${employee.id}`)
      }
    },
    [navigate],
  )
  const { execute: handleSelectEmployee, error } = useAsyncAction(selectAction, { showSuccessToast: false })

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
