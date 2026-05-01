import { parseBackendError } from '@/core/utils/parse-backend-error'
import { employeeService } from '@/features/employees/services/employee.service'
import type { EmployeeResponseDto } from '@/features/employees/types/employee-response.dto'
import { useHealthcareCenters } from '@/features/healthcare-centers/hooks'
import { Button, Select, Input, Textarea } from '@/shared/components/ui/form'
import PageContainer from '@/shared/components/ui/PageContainer'
import { useState, useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useCreateAccident } from '../hooks/useCreateAccident'
import { AccidentTypeEnum, ACCIDENT_TYPE_OPTIONS } from '../types'

const CreateAccidentPage = () => {
  const navigate = useNavigate()
  const { employeeId } = useParams()

  const numericEmployeeId = Number(employeeId)

  const [employee, setEmployee] = useState<EmployeeResponseDto | null>(null)
  const [employeeError, setEmployeeError] = useState<string | null>(null)
  const [isLoadingEmployee, setIsLoadingEmployee] = useState(false)

  const [type, setType] = useState<AccidentTypeEnum>(AccidentTypeEnum.ACCIDENT)
  const [description, setDescription] = useState('')
  const [occurredAt, setOccurredAt] = useState('')

  const [requiresExternalCare, setRequiresExternalCare] = useState(false)
  const [healthcareCenterId, setHealthcareCenterId] = useState<string>('')

  const healthcareCentersQuery = useMemo(() => ({
    page: 1,
    pageSize: 100,
    isActive: true,
  }), [])

  const { data: healthcareCenters, isLoading: isLoadingCenters } =
    useHealthcareCenters(healthcareCentersQuery)

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

  const handleSubmit = async () => {
    if (!employee) return

    const result = await createAccident({
      employeeId: employee.id,
      type,
      description: description.trim(),
      occurredAt: occurredAt || new Date().toISOString(),
      requiresExternalReferral: requiresExternalCare,
      healthcareCenterId: requiresExternalCare
        ? Number(healthcareCenterId)
        : undefined,
    })

    if (!result) return

    navigate(`/clinical-histories/${employee.id}`)
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

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">
            Información del accidente
          </h2>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Select
              label="Tipo"
              value={type}
              options={ACCIDENT_TYPE_OPTIONS}
              onChange={(value) =>
                setType(value as AccidentTypeEnum)
              }
            />

            <Input
              label="Fecha y hora"
              type="datetime-local"
              value={occurredAt}
              onChange={setOccurredAt}
            />

            <div className="md:col-span-2">
              <Textarea
                label="Descripción"
                placeholder="Describe lo ocurrido"
                value={description}
                onChange={setDescription}
                rows={4}
              />
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">
            Derivación
          </h2>

          <div className="mt-4 space-y-4">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={requiresExternalCare}
                onChange={(e) =>
                  setRequiresExternalCare(e.target.checked)
                }
              />
              <span className="text-sm text-slate-700">
                Requiere derivación externa
              </span>
            </label>

            {requiresExternalCare && (
              <Select
                label="Centro de salud"
                value={healthcareCenterId}
                onChange={setHealthcareCenterId}
                options={healthcareCenters.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
                disabled={isLoadingCenters}
              />
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              navigate(`/clinical-histories/${numericEmployeeId}`)
            }
          >
            Cancelar
          </Button>

          <Button
            type="button"
            onClick={() => void handleSubmit()}
            isLoading={isCreating}
            loadingText="Guardando..."
            disabled={!employee}
          >
            Registrar accidente
          </Button>
        </div>
      </div>
    </PageContainer>
  )
}

export default CreateAccidentPage