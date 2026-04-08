import { useAsyncAction } from '@/core/hooks/use-async-action'
import { employeeService } from '../services/employee.service'
import type { ImportEmployeesResultDto } from '../types/import-employees-result.dto'

export const useImportEmployees = () => {
  const { execute, isLoading, error, clearError } = useAsyncAction<
    [File],
    ImportEmployeesResultDto
  >(
    employeeService.importCsv.bind(employeeService),
    {
      successMessage: (result) =>
        `Importación completada. Procesados: ${result.processed}, nuevos: ${result.inserted}, actualizados: ${result.updated}, omitidos: ${result.skipped}.`,
    },
  )

  return {
    importEmployees: execute,
    isLoading,
    error,
    clearError,
  }
}