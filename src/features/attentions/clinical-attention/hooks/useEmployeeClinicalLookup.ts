import type { EmployeeResponseDto } from '@/features/employees/types/employee-response.dto'
import { useCallback, useState } from 'react'
import type { ClinicalHistoryResponseDto } from '../../clinical-histories/types'
import { clinicalAttentionService } from '../services/clinical-attention.service'
import { parseBackendError } from '@/core/utils/parse-backend-error'

export const useEmployeeClinicalLookup = () => {
  const [employee, setEmployee] = useState<EmployeeResponseDto | null>(null)
  const [clinicalHistory, setClinicalHistory] = useState<ClinicalHistoryResponseDto | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const clearResult = useCallback(() => {
    setEmployee(null)
    setClinicalHistory(null)
    setError(null)
  }, [])

  const search = useCallback(async (dni: string) => {
    try {
      setIsLoading(true)
      setError(null)

      const result = await clinicalAttentionService.findEmployeeAndClinicalHistoryByDni(dni)

      if (!result.employee) {
        setEmployee(null)
        setClinicalHistory(null)
        setError('No se encontró un trabajador con ese DNI.')
        return
      }

      setEmployee(result.employee)
      setClinicalHistory(result.clinicalHistory)
    } catch (error) {
      setEmployee(null)
      setClinicalHistory(null)
      setError(parseBackendError(error))
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    employee,
    clinicalHistory,
    isLoading,
    error,
    search,
    clearResult,
  }
}