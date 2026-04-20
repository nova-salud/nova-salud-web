import type { EmployeeResponseDto } from '@/features/employees/types/employee-response.dto'
import { ApiService } from '@/core/api/api.service'
import type { ClinicalHistoryResponseDto } from '../../cllinical-histories/types'

export type ClinicalAttentionLookupResult = {
  employee: EmployeeResponseDto | null
  clinicalHistory: ClinicalHistoryResponseDto | null
}

class ClinicalAttentionService extends ApiService {
  async findEmployeeAndClinicalHistoryByDni(
    dni: string,
  ): Promise<ClinicalAttentionLookupResult> {
    const employeeResponse = await this.getPaginated<EmployeeResponseDto>(
      '/employees',
      {
        params: {
          page: 1,
          pageSize: 1,
          dni: dni.trim(),
        },
      },
    )

    const employee = employeeResponse.data[0] ?? null

    if (!employee) {
      return {
        employee: null,
        clinicalHistory: null,
      }
    }

    try {
      const clinicalHistory = await this.get<ClinicalHistoryResponseDto>(
        `/attentions/clinical-histories/employee/${employee.id}`,
      )

      return {
        employee,
        clinicalHistory,
      }
    } catch (error) {
      const status = (error as { statusCode: number })?.statusCode

      if (status === 404) {
        return {
          employee,
          clinicalHistory: null,
        }
      }

      console.error('Error fetching clinical history:', error)

      throw error
    }
  }
}

export const clinicalAttentionService = new ClinicalAttentionService()