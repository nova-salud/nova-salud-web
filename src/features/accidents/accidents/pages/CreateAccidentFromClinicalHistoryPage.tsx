import { useNavigate, useParams } from 'react-router'
import { EmployeeInfoCard } from '@/features/employees/components'
import { useEmployee } from '@/features/employees/hooks/useEmployee'
import { PageContainer, Button } from '@/shared/components'
import { AccidentForm, type CreateAccidentFormData } from '../components/AccidentForm'
import { useCreateAccident } from '../hooks'

const CreateAccidentFromClinicalHistoryPage = () => {
  const navigate = useNavigate()
  const { employeeId } = useParams()

  const numericEmployeeId = Number(employeeId)

  const { data: employee, isLoading: isLoadingEmployee, error: employeeError } = useEmployee(numericEmployeeId)

  const {
    createAccident,
    isLoading: isCreating,
    error: createError,
  } = useCreateAccident()

  const handleSubmit = async (data: CreateAccidentFormData) => {
    if (!employee) return

    const result = await createAccident({
      ...data,
      employeeId: employee.id,
    })

    if (!result) return

    navigate(`/clinical-histories/${employee.id}/accidents/${result.id}`, { replace: true })
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
            {employeeError.message}
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
            <EmployeeInfoCard employee={employee} className="mt-4" />
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
