import { useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { Button, Input, PageContainer, Select, Textarea } from '@/shared/components'
import { EmployeeInfoCard } from '@/features/employees/components'
import { useEmployee } from '@/features/employees/hooks'
import { useCreateClinicalHistory } from '../hooks'

const CreateClinicalHistoryPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const employeeIdParam = searchParams.get('employeeId')
  const employeeId = employeeIdParam ? Number(employeeIdParam) : 0

  const formRef = useRef<HTMLFormElement>(null)

  const { data: employee, isLoading: isLoadingEmployee, error: employeeError } = useEmployee(employeeId)

  const {
    createClinicalHistory,
    isLoading: isCreating,
    error: createError,
  } = useCreateClinicalHistory()

  const handleSubmit = async () => {
    if (!employee) return
    const data = formRef.current ? new FormData(formRef.current) : new FormData()

    const result = await createClinicalHistory({
      employeeId: employee.id,
      bloodType: (data.get('bloodType') as string).trim() || undefined,
      emergencyContactName: (data.get('emergencyContactName') as string).trim() || undefined,
      emergencyContactPhone: (data.get('emergencyContactPhone') as string).trim() || undefined,
      knownConditions: (data.get('knownConditions') as string).trim() || undefined,
      surgicalHistory: (data.get('surgicalHistory') as string).trim() || undefined,
      familyHistory: (data.get('familyHistory') as string).trim() || undefined,
      observations: (data.get('observations') as string).trim() || undefined,
    })

    if (!result) return

    navigate(`/clinical-histories/${employee.id}`)
  }

  return (
    <PageContainer
      title="Nueva historia clínica"
      description="Registra la historia clínica inicial del trabajador."
      action={
        <Button
          type="button"
          variant="outline"
          className="w-auto"
          onClick={() => navigate('/clinical-attention')}
        >
          Volver
        </Button>
      }
    >
      <form ref={formRef} className="space-y-5">
        {createError ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {createError}
          </div>
        ) : null}

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">
            Trabajador seleccionado
          </h2>
          <EmployeeInfoCard
            employee={employee}
            isLoading={isLoadingEmployee}
            error={employeeError?.message ?? null}
            className="mt-4"
          />
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">
            Datos clínicos iniciales
          </h2>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Select
              label="Grupo sanguíneo"
              name="bloodType"
              placeholder="Selecciona el grupo"
              showDefaultOption
              options={[
                { label: 'A+', value: 'A+' },
                { label: 'A-', value: 'A-' },
                { label: 'B+', value: 'B+' },
                { label: 'B-', value: 'B-' },
                { label: 'AB+', value: 'AB+' },
                { label: 'AB-', value: 'AB-' },
                { label: 'O+', value: 'O+' },
                { label: 'O-', value: 'O-' },
              ]}
            />

            <Input
              label="Nombre de contacto de emergencia"
              name="emergencyContactName"
              type="text"
              placeholder="Ingresa el nombre del contacto"
            />

            <Input
              label="Teléfono de contacto de emergencia"
              name="emergencyContactPhone"
              type="text"
              placeholder="Ingresa el teléfono"
              validations={[
                {
                  regex: /^[0-9+]+$/,
                  message: 'Solo se permite números y (+)'
                }
              ]}
            />

            <div className="md:col-span-2">
              <Textarea
                label="Condiciones conocidas"
                name="knownConditions"
                placeholder="Describe condiciones conocidas del trabajador"
                rows={4}
              />
            </div>

            <div className="md:col-span-2">
              <Textarea
                label="Antecedentes quirúrgicos"
                name="surgicalHistory"
                placeholder="Describe antecedentes quirúrgicos"
                rows={4}
              />
            </div>

            <div className="md:col-span-2">
              <Textarea
                label="Antecedentes familiares"
                name="familyHistory"
                placeholder="Describe antecedentes familiares relevantes"
                rows={4}
              />
            </div>

            <div className="md:col-span-2">
              <Textarea
                label="Observaciones"
                name="observations"
                placeholder="Ingresa observaciones adicionales"
                rows={4}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            className="w-auto"
            onClick={() => navigate('/clinical-attention')}
          >
            Cancelar
          </Button>

          <Button
            type="button"
            className="w-auto"
            onClick={() => void handleSubmit()}
            isLoading={isCreating}
            loadingText="Guardando..."
            disabled={!employee}
          >
            Guardar historia clínica
          </Button>
        </div>
      </form>
    </PageContainer>
  )
}

export default CreateClinicalHistoryPage
