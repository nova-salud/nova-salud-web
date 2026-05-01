import { parseBackendError } from '@/core/utils/parse-backend-error'
import { employeeService } from '@/features/employees/services/employee.service'
import type { EmployeeResponseDto } from '@/features/employees/types/employee-response.dto'
import { Input, Button } from '@/shared/components/ui/form'
import PageContainer from '@/shared/components/ui/PageContainer'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { AccidentForm, type CreateAccidentFormData } from '../components/AccidentForm'
import { useCreateAccident } from '../hooks/useCreateAccident'
import { Search } from 'lucide-react'

export const CreateAccidentPage = () => {
  const navigate = useNavigate()

  const [dni, setDni] = useState('')
  const [employee, setEmployee] = useState<EmployeeResponseDto | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)

  const {
    createAccident,
    isLoading: isCreating,
  } = useCreateAccident()

  const handleSearch = async () => {
    try {
      setIsSearching(true)
      setError(null)

      const result = await employeeService.findByDni(dni)
      setEmployee(result)
    } catch (err) {
      setEmployee(null)
      setError(parseBackendError(err))
    } finally {
      setIsSearching(false)
    }
  }

  const handleSubmit = async (data: CreateAccidentFormData) => {
    if (!employee) return

    const result = await createAccident({
      ...data,
      employeeId: employee.id,
    })

    if (!result) return

    navigate(`/accidents/${result.id}`, { replace: true })
  }

  return (
    <PageContainer
      title="Registrar accidente"
      description="Registra un accidente de forma rápida."
    >
      <div className="space-y-6">

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">
            Buscar trabajador
          </h2>

          <form onSubmit={handleSearch}>
            <div className="flex flex-col gap-4 md:flex-row md:items-end">
              <div className="w-full md:max-w-sm">
                <Input
                  label="DNI"
                  placeholder="Ingresa el DNI del trabajador"
                  value={dni}
                  onChange={(value) => {
                    setDni(value)
                  }}
                  maxLength={8}
                />
              </div>

              <Button
                type="submit"
                className="w-auto flex items-center justify-center h-11 px-5 text-base"
                onClick={() => void handleSearch()}
                isLoading={isSearching}
                loadingText="Buscando..."
                disabled={dni.trim().length !== 8}
              >
                <span className="inline-flex items-center gap-2">
                  <Search size={16} />
                  Buscar trabajador
                </span>
              </Button>
            </div>
          </form>

          {error && (
            <p className="mt-3 text-sm text-red-600">{error}</p>
          )}

          {employee && (
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-900">
                {employee.fullName}
              </p>
              <p className="text-xs text-slate-500">
                DNI: {employee.dni}
              </p>
            </div>
          )}
        </div>

        {employee && (
          <AccidentForm
            onSubmit={handleSubmit}
            isLoading={isCreating}
          />
        )}
      </div>
    </PageContainer>
  )
}