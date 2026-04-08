import { useMemo, useRef, useState } from 'react'
import { Upload } from 'lucide-react'
import { SortOrder } from '@/core/types/query-params.type'
import { toastService } from '@/core/services/toast.service'
import { Button, Input, Select } from '@/shared/components/ui/form'
import PageContainer from '@/shared/components/ui/PageContainer'
import { useEmployees } from '../hooks/use-employees'
import EmployeeTable from '../components/EmployeeTable'
import type { FindEmployeesDto } from '../types/find-employees.dto'
import { useImportEmployees } from '../hooks/useImportEmployees'

const EMPLOYEE_STATUS_OPTIONS = [
  { label: 'Todos', value: '' },
  { label: 'Activos', value: 'true' },
  { label: 'Inactivos', value: 'false' },
] as const

const EmployeesPage = () => {
  const [company, setCompany] = useState('')
  const [isActive, setIsActive] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const query = useMemo<FindEmployeesDto>(() => ({
    page: 1,
    pageSize: 10,
    sortBy: 'fullName',
    sortOrder: SortOrder.ASC,
    company: company.trim() || undefined,
    isActive: isActive === '' ? undefined : isActive === 'true',
  }), [company, isActive])

  const { data, isLoading, error, refetch } = useEmployees(query)
  const { importEmployees, isLoading: isImporting } = useImportEmployees()

  const handleOpenFilePicker = () => {
    fileInputRef.current?.click()
  }

  const handleImportFile = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const isCsvFile =
      file.type === 'text/csv' || file.name.toLowerCase().endsWith('.csv')

    if (!isCsvFile) {
      toastService.error('Selecciona un archivo CSV válido.')
      event.target.value = ''
      return
    }

    const result = await importEmployees(file)

    if (result) {
      await refetch()
    }

    event.target.value = ''
  }

  return (
    <PageContainer
      title="Colaboradores"
      description="Listado de trabajadores sincronizados e importados."
      action={
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,text/csv"
            className="hidden"
            onChange={(event) => void handleImportFile(event)}
          />

          <div className="flex flex-wrap items-center gap-2">
            <a
              href="/templates/employees-import-template.csv"
              download
            >
              <Button
                type="button"
                variant="outline"
                className="w-auto rounded-xl px-3 py-2 text-xs"
              >
                Descargar plantilla
              </Button>
            </a>

            <Button
              type="button"
              variant="outline"
              isLoading={isImporting}
              loadingText="Importando..."
              onClick={handleOpenFilePicker}
              className="w-auto rounded-xl px-3 py-2 text-xs"
            >
              <span className="inline-flex items-center gap-2">
                <Upload size={10} />
                Importar CSV
              </span>
            </Button>
          </div>
        </>
      }
    >
      <div className="space-y-5">
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm font-medium text-slate-800">
                Registro de colaboradores
              </p>
              <p className="text-sm text-slate-500">
                Consulta información sincronizada e importada por empresa.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Input
                label="Empresa"
                placeholder="Filtrar por empresa"
                value={company}
                onChange={setCompany}
              />

              <Select
                label="Estado"
                value={isActive}
                onChange={setIsActive}
                options={EMPLOYEE_STATUS_OPTIONS.map((option) => ({ ...option }))}
              />
            </div>
          </div>
        </div>

        {error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <EmployeeTable items={data} isLoading={isLoading} />
      </div>
    </PageContainer>
  )
}

export default EmployeesPage