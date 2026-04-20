import type { EmployeeResponseDto } from '@/features/employees/types/employee-response.dto'
import { useEffect, useState } from 'react'
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

  const [bloodType, setBloodType] = useState('')
  const [emergencyContactName, setEmergencyContactName] = useState('')
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('')
  const [knownConditions, setKnownConditions] = useState('')
  const [surgicalHistory, setSurgicalHistory] = useState('')
  const [familyHistory, setFamilyHistory] = useState('')
  const [observations, setObservations] = useState('')

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
    if (!employee) {
      return
    }

    const result = await createClinicalHistory({
      employeeId: employee.id,
      bloodType: bloodType.trim() || undefined,
      emergencyContactName: emergencyContactName.trim() || undefined,
      emergencyContactPhone: emergencyContactPhone.trim() || undefined,
      knownConditions: knownConditions.trim() || undefined,
      surgicalHistory: surgicalHistory.trim() || undefined,
      familyHistory: familyHistory.trim() || undefined,
      observations: observations.trim() || undefined,
    })

    if (!result) {
      return
    }

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
      <div className="space-y-5">
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
                  {employee.position ?? '—'}
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
              placeholder="Ej. O+, A-, AB+"
              value={bloodType}
              onChange={setBloodType}
            />

            <Input
              label="Nombre de contacto de emergencia"
              placeholder="Ingresa el nombre del contacto"
              value={emergencyContactName}
              onChange={setEmergencyContactName}
            />

            <Input
              label="Teléfono de contacto de emergencia"
              placeholder="Ingresa el teléfono"
              value={emergencyContactPhone}
              onChange={setEmergencyContactPhone}
            />

            <div className="md:col-span-2">
              <Textarea
                label="Condiciones conocidas"
                placeholder="Describe condiciones conocidas del trabajador"
                value={knownConditions}
                onChange={setKnownConditions}
                rows={4}
              />
            </div>

            <div className="md:col-span-2">
              <Textarea
                label="Antecedentes quirúrgicos"
                placeholder="Describe antecedentes quirúrgicos"
                value={surgicalHistory}
                onChange={setSurgicalHistory}
                rows={4}
              />
            </div>

            <div className="md:col-span-2">
              <Textarea
                label="Antecedentes familiares"
                placeholder="Describe antecedentes familiares relevantes"
                value={familyHistory}
                onChange={setFamilyHistory}
                rows={4}
              />
            </div>

            <div className="md:col-span-2">
              <Textarea
                label="Observaciones"
                placeholder="Ingresa observaciones adicionales"
                value={observations}
                onChange={setObservations}
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
      </div>
    </PageContainer>
  )
}

export default CreateClinicalHistoryPage