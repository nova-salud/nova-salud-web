import { useAppQuery } from '@/shared/hooks'
import { employeeDocumentCountsService, type EmployeeDocumentCountDto } from '../services/employee-document-counts.service'

export const useEmployeeDocumentCounts = (employeeIds: number[]) => {
  const { data, isLoading } = useAppQuery<EmployeeDocumentCountDto[]>({
    queryKey: ['employee-document-counts', employeeIds],
    queryFn: () => employeeDocumentCountsService.getByEmployeeIds(employeeIds),
    enabled: employeeIds.length > 0,
  })

  const countsMap = new Map((data ?? []).map((c) => [c.employeeId, c]))

  return { countsMap, isLoading }
}
