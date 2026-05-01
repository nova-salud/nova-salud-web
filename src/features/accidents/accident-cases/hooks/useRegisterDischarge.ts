import { useAsyncAction } from '@/core/hooks/use-async-action'
import type { RegisterMedicalDischargeDto } from '../types/register-medical-discharge.dto'
import type { AccidentCaseResponseDto } from '../types/accident-case-response.dto'
import { accidentCaseService } from '../services/accident-case.service'

export const useRegisterDischarge = () => {
  const { execute, isLoading, error } = useAsyncAction<
    [number, RegisterMedicalDischargeDto],
    AccidentCaseResponseDto
  >(
    accidentCaseService.registerDischarge.bind(accidentCaseService),
    {
      successMessage: 'Alta registrada correctamente.',
    }
  )

  return {
    registerDischarge: execute,
    isLoading,
    error,
  }
}