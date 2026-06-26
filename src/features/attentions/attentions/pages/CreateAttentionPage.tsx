import { useRef, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router'
import { Button, Modal, PageContainer, SearchSelect, Select, Textarea } from '@/shared/components'
import { useDisclosure } from '@/shared/hooks'
import { useDiseases } from '@/features/attentions/diseases/hooks'
import { DISEASE_TYPE_OPTIONS, DiseaseType } from '@/features/attentions/diseases/types'
import { EmployeeInfoCard } from '@/features/employees/components'
import { useEmployee, useEmployeeAllergies } from '@/features/employees/hooks'
import { FollowUpSelectionSection } from '@/features/follow-ups/components'
import { usePendingFollowUps } from '@/features/follow-ups/hooks'
import { useCreateAttentionWithDispensation } from '../hooks'
import { AttentionDispensationSection, AttentionFollowUpSection } from '../components'
import type { DispensationFormState, FollowUpFormState } from '../components'
import { TRIAGE_LEVEL_OPTIONS, TriageLevelEnum } from '../types'

const CreateAttentionPage = () => {
  const navigate = useNavigate()
  const { employeeId } = useParams()
  const [searchParams] = useSearchParams()

  const numericEmployeeId = Number(employeeId)

  const followUpIdParam = searchParams.get('followUpId')
  const accidentIdParam = searchParams.get('accidentId')

  const formRef = useRef<HTMLFormElement>(null)
  const { isOpen, open, close } = useDisclosure<'confirm'>()

  const { data: employee, isLoading: isLoadingEmployee, error: employeeError } = useEmployee(numericEmployeeId)
  const { data: allergies } = useEmployeeAllergies(numericEmployeeId)

  const [diagnosisCode, setDiagnosisCode] = useState('')
  const [diseaseTypeFilter, setDiseaseTypeFilter] = useState<DiseaseType | 'NO_TYPE' | ''>('')
  const [dispensation, setDispensation] = useState<DispensationFormState | null>(null)
  const [followUp, setFollowUp] = useState<FollowUpFormState | null>(null)
  const [originFollowUpId, setOriginFollowUpId] = useState<number | undefined>(
    followUpIdParam ? Number(followUpIdParam) : undefined
  )

  const { data: followUps, isLoading: isLoadingFollowUps, error: followUpsError } = usePendingFollowUps(numericEmployeeId)
  const { data: diseases, isLoading: isLoadingDiseases } = useDiseases()

  const {
    createAttentionWithDispensation,
    isLoading: isCreating,
    error: createError,
  } = useCreateAttentionWithDispensation()

  const validate = (symptoms: string, eva: string, treatment: string): boolean => {
    if (diseaseTypeFilter && !diagnosisCode) {
      return false
    }
    if (!eva.trim() || Number.isNaN(Number(eva)) || Number(eva) < 0 || Number(eva) > 10) return false
    if (!symptoms.trim()) return false
    if (!treatment.trim()) return false
    return true
  }

  const handleRequestSubmit = () => {
    if (!employee) return

    const formData = formRef.current ? new FormData(formRef.current) : new FormData()
    const symptoms = (formData.get('symptoms') as string) ?? ''
    const eva = (formData.get('eva') as string) ?? ''
    const treatment = (formData.get('treatment') as string) ?? ''

    if (!validate(symptoms, eva, treatment)) return

    open('confirm')
  }

  const handleSubmit = async () => {
    if (!employee) return

    close()

    const formData = formRef.current ? new FormData(formRef.current) : new FormData()
    const symptoms = (formData.get('symptoms') as string) ?? ''
    const eva = (formData.get('eva') as string) ?? ''
    const treatment = (formData.get('treatment') as string) ?? ''
    const notes = (formData.get('notes') as string) ?? ''
    const triageLevel = (formData.get('triageLevel') as TriageLevelEnum) ?? TriageLevelEnum.LOW

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
        {createError ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {createError}
          </div>
        ) : null}

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">Trabajador</h2>
          <EmployeeInfoCard
            employee={employee}
            isLoading={isLoadingEmployee}
            error={employeeError?.message ?? null}
            className="mt-4"
          />
        </div>

        {employee && (
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
        )}

        <FollowUpSelectionSection
          followUps={followUps}
          selectedId={originFollowUpId}
          onChange={setOriginFollowUpId}
          isLoading={isLoadingFollowUps}
          error={followUpsError?.message ?? null}
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
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-500">
                  Nivel de dolor (EVA) <span className="text-red-600">*</span>
                </label>
                <input
                  name="eva"
                  type="number"
                  placeholder="0 - 10"
                  min={0}
                  max={10}
                  step={1}
                  required
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-[#0B1739] focus:ring-2 focus:ring-[#0B1739]/10"
                />
              </div>

              <Select
                name="triageLevel"
                label="Clasificación triaje"
                defaultValue={TriageLevelEnum.LOW}
                options={TRIAGE_LEVEL_OPTIONS}
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
        isOpen={isOpen('confirm')}
        onClose={close}
        title="Confirmar atención"
        description="¿Estás seguro de que deseas guardar esta atención? Esta acción no se puede deshacer."
        size="sm"
      >
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            className="w-auto"
            onClick={close}
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
