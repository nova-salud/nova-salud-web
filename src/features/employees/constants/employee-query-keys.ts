import type { FindEmployeeAreasDto, FindEmployeesDto } from '../types'
import type { FindEmployeePositionsDto } from '../types/find-employee-positions.dto'

export const EMPLOYEE_QUERY_KEYS = {
  all: ['employees'] as const,
  list: (filters: FindEmployeesDto) => [...EMPLOYEE_QUERY_KEYS.all, filters],
  listPositions: (filters: FindEmployeePositionsDto) => [...EMPLOYEE_QUERY_KEYS.all, 'positions', filters] as const,
  listAreas: (filters: FindEmployeeAreasDto) => [...EMPLOYEE_QUERY_KEYS.all, 'areas', filters] as const,
  detail: (id: number) => [...EMPLOYEE_QUERY_KEYS.all, id]
}