import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router'
import PageContainer from '@/shared/components/ui/PageContainer'
import { Button, Input, Select, Textarea } from '@/shared/components/ui/form'
import { SortOrder } from '@/core/types/query-params.type'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import { toastService } from '@/core/services/toast.service'
import { employeeService } from '@/features/employees/services/employee.service'
import { useDiseases } from '@/features/attentions/diseases/hooks'
import type { EmployeeResponseDto } from '@/features/employees/types/employee-response.dto'
import type { EmployeeAllergyResponseDto } from '@/features/employees/types/employee-allergy-response.dto'
import type { FindDiseasesDto } from '@/features/attentions/diseases/types'
import { SearchSelect } from '@/shared/components/ui/form/SearchSelect'
import type { CreateDispensationItemDto } from '@/features/inventory/dispensations/types/create-dispensation-item.dto'
import DispensationSection from '../components/DispensationSection'
import { useCreateAttentionWithDispensation } from '../hooks/useCreateAttentionWithDispensation'
import { FollowUpSection } from '../components/FollowUpSection'
import { usePendingFollowUps } from '../../../follow-ups/hooks/usePendingFollowUps'
import { FollowUpSelectionSection } from '../../../follow-ups/components/FollowUpSelectionSection'
import { TRIAGE_LEVEL_OPTIONS, TriageLevelEnum } from '../types/triage.enum'

const CreateAttentionPage = () => {
  const navigate = useNavigate()
  const { employeeId } = useParams()
  const [searchParams] = useSearchParams()

  const numericEmployeeId = Number(employeeId)

  const followUpIdParam = searchParams.get('followUpId')
  const accidentIdParam = searchParams.get('accidentId')

  const [employee, setEmployee] = useState<EmployeeResponseDto | null>(null)
  const [employeeError, setEmployeeError] = useState<string | null>(null)
  const [isLoadingEmployee, setIsLoadingEmployee] = useState(false)
  const [allergies, setAllergies] = useState<EmployeeAllergyResponseDto[]>([])

  const formRef = useRef<HTMLFormElement>(null)

  const [hasDiagnosis, setHasDiagnosis] = useState(false)
  const [diagnosisCode, setDiagnosisCode] = useState('')
  const [triageLevel, setTriageLevel] = useState<TriageLevelEnum>(TriageLevelEnum.LOW)

  const [requiresDispensation, setRequiresDispensation] = useState(false)
  const [dispensationReason, setDispensationReason] = useState('')
  const [dispensationNotes, setDispensationNotes] = useState('')
  const [dispensationItems, setDispensationItems] = useState<CreateDispensationItemDto[]>([])
  const [originFollowUpId, setOriginFollowUpId] = useState<number | undefined>()
  const [followUpEnabled, setFollowUpEnabled] = useState(false)

  const [followUp, setFollowUp] = useState<{
    followUpScheduledAt?: string
    followUpReason?: string
  }>({})

  const { data: followUps, isLoading, error } =
    usePendingFollowUps(employeeId ? +employeeId : 0)

  const diseasesQuery = useMemo<FindDiseasesDto>(() => ({
    page: 1,
    pageSize: 100,
    sortBy: 'name',
    sortOrder: SortOrder.ASC,
    isActive: true,
  }), [])

  const { data: diseases, isLoading: isLoadingDiseases } = useDiseases(diseasesQuery)

  const {
    createAttentionWithDispensation,
    isLoading: isCreating,
    error: createError,
  } = useCreateAttentionWithDispensation()

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

        const allergyResult = await employeeService.findAllergies(numericEmployeeId)
        setAllergies(allergyResult)
      } catch (error) {
        setEmployee(null)
        setEmployeeError(parseBackendError(error))
      } finally {
        setIsLoadingEmployee(false)
      }
    }

    void loadEmployee()
  }, [numericEmployeeId])

  useEffect(() => {
    if (followUpIdParam) {
      setOriginFollowUpId(Number(followUpIdParam))
    }
  }, [followUpIdParam])

  const handleAddDispensationItem = (medicationId: number, quantity: number) => {
    setDispensationItems((prev) => {
      if (prev.some((i) => i.medicationId === medicationId)) return prev
      return [...prev, { medicationId, quantity }]
    })
  }

  const handleRemoveDispensationItem = (medicationId: number) => {
    setDispensationItems((prev) => prev.filter((i) => i.medicationId !== medicationId))
  }

  const validate = (symptoms: string, treatment: string): boolean => {
    if (!symptoms.trim()) {
      toastService.error('Debes ingresar los síntomas del trabajador')
      return false
    }
    if (!treatment.trim()) {
      toastService.error('Debes ingresar el tratamiento indicado')
      return false
    }
    if (hasDiagnosis && !diagnosisCode) {
      toastService.error('Debes seleccionar una enfermedad para el diagnóstico')
      return false
    }
    if (requiresDispensation && !dispensationReason.trim()) {
      toastService.error('Debes ingresar el motivo de la dispensación')
      return false
    }
    if (requiresDispensation && dispensationItems.length === 0) {
      toastService.error('Debes agregar al menos un medicamento a la dispensación')
      return false
    }
    if (followUpEnabled) {
      if (!followUp.followUpScheduledAt) {
        toastService.error('Debes ingresar la fecha del seguimiento')
        return false
      }
      const scheduledDate = new Date(followUp.followUpScheduledAt)
      const today = new Date()
      const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate())
      const scheduledMidnight = new Date(scheduledDate.getFullYear(), scheduledDate.getMonth(), scheduledDate.getDate())
      if (scheduledMidnight <= todayMidnight) {
        toastService.error('La fecha de seguimiento debe ser al menos el día siguiente al de hoy')
        return false
      }
    }
    return true
  }

  const handleSubmit = async () => {
    if (!employee) {
      return
    }

    const formData = formRef.current ? new FormData(formRef.current) : new FormData()
    const symptoms = (formData.get('symptoms') as string) ?? ''
    const eva = (formData.get('eva') as string) ?? ''
    const treatment = (formData.get('treatment') as string) ?? ''
    const notes = (formData.get('notes') as string) ?? ''

    if (!validate(symptoms, treatment)) return

    const validItems = dispensationItems.filter((item) => item.quantity > 0)

    const result = await createAttentionWithDispensation({
      employeeId: employee.id,
      symptoms: symptoms.trim(),
      diagnosisCode: hasDiagnosis ? diagnosisCode || undefined : undefined,
      eva: eva.trim() ? Number(eva) : undefined,
      treatment: treatment.trim(),
      notes: notes.trim() || undefined,
      requiresDispensation,
      dispensationReason: requiresDispensation ? dispensationReason.trim() || undefined : undefined,
      dispensationNotes: requiresDispensation ? dispensationNotes.trim() || undefined : undefined,
      dispensationItems: requiresDispensation ? validItems : undefined,
      ...followUp,
      originFollowUpId,
      triageLevel,
      accidentId: accidentIdParam ? Number(accidentIdParam) : undefined,
    })

    if (!result) {
      return
    }

    navigate(-1)
  }

  return (
    <PageContainer
      title="Nueva atención"
      description="Registra una nueva atención médica del trabajador."
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
      <form ref={formRef} className="space-y-6">
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
          <h2 className="text-base font-semibold text-slate-900">Trabajador</h2>

          {isLoadingEmployee ? (
            <p className="mt-3 text-sm text-slate-500">Cargando trabajador...</p>
          ) : null}

          {!isLoadingEmployee && employee ? (
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Nombre completo</p>
                <p className="mt-1 text-sm font-medium text-slate-900">{employee.fullName}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">DNI</p>
                <p className="mt-1 text-sm text-slate-700">{employee.dni}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Empresa</p>
                <p className="mt-1 text-sm text-slate-700">{employee.company}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Área</p>
                <p className="mt-1 text-sm text-slate-700">{employee.area?.name ?? '—'}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Puesto</p>
                <p className="mt-1 text-sm text-slate-700">{employee.position?.name ?? '—'}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Estado</p>
                <p className="mt-1 text-sm text-slate-700">{employee.isActive ? 'Activo' : 'Inactivo'}</p>
              </div>
            </div>
          ) : null}
        </div>

        <FollowUpSelectionSection
          followUps={followUps}
          selectedId={originFollowUpId}
          onChange={setOriginFollowUpId}
          isLoading={isLoading}
          error={error}
          isLocked={!!followUpIdParam}
        />

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">Información de la atención</h2>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <Textarea
                label="Síntomas"
                name="symptoms"
                placeholder="Describe los síntomas que presenta el trabajador"
                rows={4}
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3">
                <input
                  type="checkbox"
                  checked={hasDiagnosis}
                  onChange={(e) => {
                    setHasDiagnosis(e.target.checked)
                    if (!e.target.checked) {
                      setDiagnosisCode('')
                    }
                  }}
                />
                <span className="text-sm text-slate-700">Se identificó un diagnóstico</span>
              </label>
            </div>

            {hasDiagnosis ? (
              <div className="md:col-span-2">
                <SearchSelect
                  label="Enfermedad"
                  value={diagnosisCode}
                  onChange={setDiagnosisCode}
                  options={diseases.map((disease) => ({
                    label: `${disease.code} - ${disease.name}`,
                    value: disease.code,
                  }))}
                  disabled={isLoadingDiseases}
                />
              </div>
            ) : null}

            <Input
              label="EVA (dolor)"
              name="eva"
              type="number"
              placeholder="Escala de dolor del 0 al 10"
            />

            <div className="md:col-span-2">
              <Textarea
                label="Tratamiento"
                name="treatment"
                placeholder="Indica el tratamiento recomendado"
                rows={4}
              />
            </div>

            <div className="md:col-span-2">
              <Textarea
                label="Observaciones"
                name="notes"
                placeholder="Agrega observaciones adicionales"
                rows={4}
              />
            </div>

            <div className="md:col-span-2">
              <Select
                name='triageLevel'
                label='Clasificación triaje'
                value={triageLevel}
                options={TRIAGE_LEVEL_OPTIONS}
                onChange={(value) => setTriageLevel(value as TriageLevelEnum)}
              />
            </div>
          </div>
        </div>

        <DispensationSection
          requiresDispensation={requiresDispensation}
          onRequiresDispensationChange={setRequiresDispensation}
          reason={dispensationReason}
          onReasonChange={setDispensationReason}
          notes={dispensationNotes}
          onNotesChange={setDispensationNotes}
          items={dispensationItems}
          onAdd={handleAddDispensationItem}
          onRemove={handleRemoveDispensationItem}
          allergies={allergies}
        />

        <FollowUpSection
          followUpScheduledAt={followUp.followUpScheduledAt}
          followUpReason={followUp.followUpReason}
          onChange={setFollowUp}
          enabled={followUpEnabled}
          onEnabledChange={setFollowUpEnabled}
        />

        <div className="flex flex-wrap justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            className="w-auto"
            onClick={() => navigate(`/clinical-histories/${numericEmployeeId}`)}
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
            Guardar atención
          </Button>
        </div>
      </form>
    </PageContainer>
  )
}

export default CreateAttentionPage
