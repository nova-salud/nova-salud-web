import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router'
import PageContainer from '@/shared/components/ui/PageContainer'
import { Button, Input, Select, Textarea } from '@/shared/components/ui/form'
import { Modal } from '@/shared/components/ui/modal/Modal'
import { SortOrder } from '@/core/types/query-params.type'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import { toastService } from '@/core/services/toast.service'
import { employeeService } from '@/features/employees/services/employee.service'
import { useDiseases } from '@/features/attentions/diseases/hooks'
import type { EmployeeResponseDto } from '@/features/employees/types/employee-response.dto'
import type { EmployeeAllergyResponseDto } from '@/features/employees/types/employee-allergy-response.dto'
import type { FindDiseasesDto } from '@/features/attentions/diseases/types'
import { SearchSelect } from '@/shared/components/ui/form/SearchSelect'
import { useCreateAttentionWithDispensation } from '../hooks/useCreateAttentionWithDispensation'
import { usePendingFollowUps } from '../../../follow-ups/hooks/usePendingFollowUps'
import { FollowUpSelectionSection } from '../../../follow-ups/components/FollowUpSelectionSection'
import { TRIAGE_LEVEL_OPTIONS, TriageLevelEnum } from '../types/triage.enum'
import { DISEASE_TYPE_OPTIONS, DiseaseType } from '@/features/attentions/diseases/types/disease-type.enum'
import EmployeeInfoCard from '@/features/employees/components/EmployeeInfoCard'
import AttentionDispensationSection, { type DispensationFormState } from '../components/AttentionDispensationSection'
import AttentionFollowUpSection, { type FollowUpFormState } from '../components/AttentionFollowUpSection'

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

  const [diagnosisCode, setDiagnosisCode] = useState('')
  const [diseaseTypeFilter, setDiseaseTypeFilter] = useState<DiseaseType | 'NO_TYPE' | ''>('')
  const [triageLevel, setTriageLevel] = useState<TriageLevelEnum>(TriageLevelEnum.LOW)
  const [dispensation, setDispensation] = useState<DispensationFormState | null>(null)
  const [followUp, setFollowUp] = useState<FollowUpFormState | null>(null)
  const [originFollowUpId, setOriginFollowUpId] = useState<number | undefined>()
  const [showConfirmModal, setShowConfirmModal] = useState(false)

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

  const validate = (symptoms: string, eva: string, treatment: string): boolean => {
    if (diseaseTypeFilter && !diagnosisCode) {
      toastService.error('Debes seleccionar una enfermedad para el tipo elegido')
      return false
    }
    if (!eva.trim()) {
      toastService.error('Debes ingresar el valor de EVA (dolor)')
      return false
    }
    const evaNum = Number(eva)
    if (Number.isNaN(evaNum) || evaNum < 0 || evaNum > 10) {
      toastService.error('El valor de EVA debe estar entre 0 y 10')
      return false
    }
    if (!symptoms.trim()) {
      toastService.error('Debes ingresar los síntomas del trabajador')
      return false
    }
    if (!treatment.trim()) {
      toastService.error('Debes ingresar el tratamiento indicado')
      return false
    }
    return true
  }

  const handleRequestSubmit = () => {
    if (!employee) return

    const formData = formRef.current ? new FormData(formRef.current) : new FormData()
    const symptoms = (formData.get('symptoms') as string) ?? ''
    const eva = (formData.get('eva') as string) ?? ''
    const treatment = (formData.get('treatment') as string) ?? ''

    if (!validate(symptoms, eva, treatment)) return

    setShowConfirmModal(true)
  }

  const handleSubmit = async () => {
    if (!employee) return

    setShowConfirmModal(false)

    const formData = formRef.current ? new FormData(formRef.current) : new FormData()
    const symptoms = (formData.get('symptoms') as string) ?? ''
    const eva = (formData.get('eva') as string) ?? ''
    const treatment = (formData.get('treatment') as string) ?? ''
    const notes = (formData.get('notes') as string) ?? ''

    const result = await createAttentionWithDispensation({
      employeeId: employee.id,
      symptoms: symptoms.trim(),
      diagnosisCode: diagnosisCode || undefined,
      eva: eva.trim() ? Number(eva) : undefined,
      treatment: treatment.trim(),
      notes: notes.trim() || undefined,
      requiresDispensation: !!dispensation,
      dispensationReason: dispensation?.reason || undefined,
      dispensationNotes: dispensation?.notes || undefined,
      dispensationItems: dispensation?.items,
      followUpScheduledAt: followUp?.scheduledAt,
      followUpReason: followUp?.reason,
      originFollowUpId,
      triageLevel,
      accidentId: accidentIdParam ? Number(accidentIdParam) : undefined,
    })

    if (!result) return

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
            <EmployeeInfoCard employee={employee} className="mt-4" />
          ) : null}
        </div>

        {!isLoadingEmployee && employee ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">Seguros activos</h2>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Seguro médico</p>
                <p className="mt-1 text-sm text-slate-700">
                  {employee.medicalInsurance ?? <span className="text-slate-400">No disponible</span>}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">EPS</p>
                <p className="mt-1 text-sm text-slate-700">
                  {employee.eps
                    ? <>{employee.eps}{employee.epsPlan && <span className="ml-1 text-slate-400">— {employee.epsPlan}</span>}</>
                    : <span className="text-slate-400">No disponible</span>}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">SCTR Salud</p>
                <p className="mt-1 text-sm text-slate-700">
                  {employee.sctrHealth ?? <span className="text-slate-400">No disponible</span>}
                </p>
              </div>
            </div>
          </div>
        ) : null}

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

          <div className="mt-4 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Select
                name="diseaseType"
                label="Tipo de enfermedad"
                value={diseaseTypeFilter}
                options={[
                  ...DISEASE_TYPE_OPTIONS,
                  { value: 'NO_TYPE', label: 'Sin tipo asignado' },
                ]}
                showDefaultOption
                placeholder="Sin diagnóstico"
                onChange={(value) => {
                  setDiseaseTypeFilter(value as DiseaseType | 'NO_TYPE' | '')
                  setDiagnosisCode('')
                }}
              />

              <SearchSelect
                label="Enfermedad"
                value={diagnosisCode}
                onChange={setDiagnosisCode}
                placeholder={diseaseTypeFilter ? 'Seleccione una enfermedad' : 'Sin diagnóstico'}
                options={diseases
                  .filter((d) =>
                    diseaseTypeFilter === 'NO_TYPE'
                      ? d.diseaseType === null
                      : d.diseaseType === diseaseTypeFilter,
                  )
                  .map((d) => ({
                    label: `${d.code} - ${d.name}`,
                    value: d.code,
                  }))}
                disabled={!diseaseTypeFilter || isLoadingDiseases}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Input
                label="EVA (dolor)"
                name="eva"
                type="number"
                placeholder="0 - 10"
                min={0}
                max={10}
                step={1}
                required
                validations={[
                  {
                    regex: /^(10|[0-9])$/,
                    message: 'El valor debe estar entre 0 y 10',
                  },
                ]}
              />

              <Select
                name="triageLevel"
                label="Clasificación triaje"
                value={triageLevel}
                options={TRIAGE_LEVEL_OPTIONS}
                onChange={(value) => setTriageLevel(value as TriageLevelEnum)}
                required
              />
            </div>

            <Textarea
              label="Síntomas"
              name="symptoms"
              placeholder="Describe los síntomas que presenta el trabajador"
              rows={4}
              required
            />

            <Textarea
              label="Tratamiento"
              name="treatment"
              placeholder="Indica el tratamiento recomendado"
              rows={4}
              required
            />

            <Textarea
              label="Observaciones"
              name="notes"
              placeholder="Agrega observaciones adicionales"
              rows={3}
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <AttentionDispensationSection
            dispensation={dispensation}
            onChange={setDispensation}
            allergies={allergies}
          />

          <AttentionFollowUpSection
            followUp={followUp}
            onChange={setFollowUp}
          />
        </div>

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
            onClick={handleRequestSubmit}
            isLoading={isCreating}
            loadingText="Guardando..."
            disabled={!employee}
          >
            Guardar atención
          </Button>
        </div>
      </form>

      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Confirmar atención"
        description="¿Estás seguro de que deseas guardar esta atención? Esta acción no se puede deshacer."
        size="sm"
      >
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            className="w-auto"
            onClick={() => setShowConfirmModal(false)}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            className="w-auto"
            onClick={() => void handleSubmit()}
            isLoading={isCreating}
            loadingText="Guardando..."
          >
            Confirmar
          </Button>
        </div>
      </Modal>
    </PageContainer>
  )
}

export default CreateAttentionPage
