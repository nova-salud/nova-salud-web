import { parseBackendError } from '@/core/utils/parse-backend-error'
import { employeeService } from '@/features/employees/services/employee.service'
import type { EmployeeResponseDto } from '@/features/employees/types/employee-response.dto'
import { Button } from '@/shared/components/ui/form'
import PageContainer from '@/shared/components/ui/PageContainer'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useCreateAccident } from '../hooks/useCreateAccident'
import { AccidentForm, type CreateAccidentFormData } from '../components/AccidentForm'

const CreateAccidentFromClinicalHistoryPage = () => {
  const navigate = useNavigate()
  const { employeeId } = useParams()

  const numericEmployeeId = Number(employeeId)

  const [employee, setEmployee] = useState<EmployeeResponseDto | null>(null)
  const [employeeError, setEmployeeError] = useState<string | null>(null)
  const [isLoadingEmployee, setIsLoadingEmployee] = useState(false)

  const {
    createAccident,
    isLoading: isCreating,
    error: createError,
  } = useCreateAccident()

  useEffect(() => {
    const loadEmployee = async () => {
      if (!numericEmployeeId || Number.isNaN(numericEmployeeId)) {
        setEmployeeError('No se recibió un trabajador válido.')
        return
      }

      try {
        setIsLoadingEmployee(true)
        setEmployeeError(null)

        const result = await employeeService.findById(numericEmployeeId)
        setEmployee(result)
      } catch (error) {
        setEmployee(null)
        setEmployeeError(parseBackendError(error))
      } finally {
        setIsLoadingEmployee(false)
      }
    }

    void loadEmployee()
  }, [numericEmployeeId])

  const handleSubmit = async (data: CreateAccidentFormData) => {
    if (!employee) return

    const result = await createAccident({
      ...data,
      employeeId: employee.id,
    })

    if (!result) return

    navigate(`/clinical-histories/${employee.id}/accidents/${result.id}`, { replace: true})
  }

  return (
    <PageContainer
      title="Registrar accidente"
      description="Registra un accidente o incidente del trabajador."
      action={
        <Button
          type="button"
          variant="outline"
          className="w-auto"
          onClick={() => navigate(`/clinical-histories/${numericEmployeeId}`)}
        >
          Volver
        </Button>
      }
    >
      <div className="space-y-6">

        {employeeError && (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {employeeError}
          </div>
        )}

        {createError && (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {createError}
          </div>
        )}

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">
            Trabajador
          </h2>

          {isLoadingEmployee && (
            <p className="mt-3 text-sm text-slate-500">
              Cargando trabajador...
            </p>
          )}

          {!isLoadingEmployee && employee && (
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div>
                <p className="text-xs text-slate-400">Nombre</p>
                <p className="text-sm font-medium text-slate-900">
                  {employee.fullName}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">DNI</p>
                <p className="text-sm text-slate-700">
                  {employee.dni}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">Empresa</p>
                <p className="text-sm text-slate-700">
                  {employee.company}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">Área</p>
                <p className="text-sm text-slate-700">
                  {employee.area?.name ?? '—'}
                </p>
              </div>
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

export default CreateAccidentFromClinicalHistoryPage