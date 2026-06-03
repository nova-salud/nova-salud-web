import type { EmployeeResponseDto } from '@/features/employees/types/employee-response.dto'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { useCreateClinicalHistory } from '../hooks'
import { employeeService } from '@/features/employees/services/employee.service'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import PageContainer from '@/shared/components/ui/PageContainer'
import { Button, Input, Textarea } from '@/shared/components/ui/form'

const CreateClinicalHistoryPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const employeeIdParam = searchParams.get('employeeId')
  const employeeId = employeeIdParam ? Number(employeeIdParam) : null

  const [employee, setEmployee] = useState<EmployeeResponseDto | null>(null)
  const [employeeError, setEmployeeError] = useState<string | null>(null)
  const [isLoadingEmployee, setIsLoadingEmployee] = useState(false)

  const formRef = useRef<HTMLFormElement>(null)

  const {
    createClinicalHistory,
    isLoading: isCreating,
    error: createError,
  } = useCreateClinicalHistory()

  useEffect(() => {
    const loadEmployee = async () => {
      if (!employeeId || Number.isNaN(employeeId)) {
        setEmployeeError('No se recibió un trabajador válido para crear la historia clínica.')
        return
      }

      try {
        setIsLoadingEmployee(true)
        setEmployeeError(null)

        const result = await employeeService.findById(employeeId)
        setEmployee(result)
      } catch (error) {
        setEmployee(null)
        setEmployeeError(parseBackendError(error))
      } finally {
        setIsLoadingEmployee(false)
      }
    }

    void loadEmployee()
  }, [employeeId])

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
        {employeeError ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {employeeError}
          </div>
        ) : null}

        {createError ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {createError}
          </div>
        ) : null}

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">
            Trabajador seleccionado
          </h2>

          {isLoadingEmployee ? (
            <p className="mt-3 text-sm text-slate-500">Cargando trabajador...</p>
          ) : null}

          {!isLoadingEmployee && employee ? (
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                  Nombre completo
                </p>
                <p className="mt-1 text-sm font-medium text-slate-900">
                  {employee.fullName}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                  DNI
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  {employee.dni}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                  Empresa
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  {employee.company}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                  Área
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  {employee.area?.name ?? '—'}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                  Puesto
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  {employee.position?.name ?? '—'}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                  Estado
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  {employee.isActive ? 'Activo' : 'Inactivo'}
                </p>
              </div>
            </div>
          ) : null}
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">
            Datos clínicos iniciales
          </h2>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Input
              label="Grupo sanguíneo"
              name="bloodType"
              type="text"
              placeholder="Ej. O+, A-, AB+"
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