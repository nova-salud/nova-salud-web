import { useRef } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useQueryClient } from '@tanstack/react-query'
import { Button, EntityState, Input, PageContainer, Select, Textarea } from '@/shared/components'
import { EmployeeInfoCard } from '@/features/employees/components'
import { useClinicalHistory } from '../hooks/useClinicalHistory'
import { useUpdateClinicalHistory } from '../hooks'
import ClinicalHistoryDetailSkeleton from '../components/ClinicalHistoryDetailSkeleton'
import { CLINICAL_HISTORY_QUERY_KEYS } from '../constants/clinical-history-query-keys'

const BLOOD_TYPE_OPTIONS = [
  { label: 'A+', value: 'A+' },
  { label: 'A-', value: 'A-' },
  { label: 'B+', value: 'B+' },
  { label: 'B-', value: 'B-' },
  { label: 'AB+', value: 'AB+' },
  { label: 'AB-', value: 'AB-' },
  { label: 'O+', value: 'O+' },
  { label: 'O-', value: 'O-' },
]

const EditClinicalHistoryPage = () => {
  const { employeeId } = useParams()
  const navigate = useNavigate()
  const formRef = useRef<HTMLFormElement>(null)

  const numericEmployeeId = Number(employeeId)
  const queryClient = useQueryClient()

  const { data, isLoading, error, refetch } = useClinicalHistory(numericEmployeeId)

  const {
    updateClinicalHistory,
    isLoading: isUpdating,
    error: updateError,
  } = useUpdateClinicalHistory()

  const handleSubmit = async () => {
    if (!data) return
    const formData = formRef.current ? new FormData(formRef.current) : new FormData()

    const result = await updateClinicalHistory(data.id, {
      bloodType: (formData.get('bloodType') as string).trim() || undefined,
      emergencyContactName: (formData.get('emergencyContactName') as string).trim() || undefined,
      emergencyContactPhone: (formData.get('emergencyContactPhone') as string).trim() || undefined,
      knownConditions: (formData.get('knownConditions') as string).trim() || undefined,
      surgicalHistory: (formData.get('surgicalHistory') as string).trim() || undefined,
      familyHistory: (formData.get('familyHistory') as string).trim() || undefined,
      observations: (formData.get('observations') as string).trim() || undefined,
    })

    if (!result) return

    await queryClient.invalidateQueries({ queryKey: CLINICAL_HISTORY_QUERY_KEYS.detail(numericEmployeeId) })
    navigate(`/clinical-histories/${numericEmployeeId}`)
  }

  if (isLoading) return <ClinicalHistoryDetailSkeleton />

  if (error) return (
    <EntityState
      title="Ocurrió un error"
      description="No fue posible obtener la historia clínica."
      actionText="Reintentar"
      onAction={refetch}
    />
  )

  if (!data) return (
    <EntityState
      title="Historia clínica no encontrada"
      description="El trabajador no cuenta con una historia clínica registrada."
      actionText="Regresar"
      onAction={() => navigate('/clinical-histories')}
    />
  )

  return (
    <PageContainer
      title="Editar historia clínica"
      description="Actualiza los datos clínicos del trabajador."
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
      <form ref={formRef} className="space-y-5">
        {updateError ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {updateError}
          </div>
        ) : null}

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">
            Trabajador
          </h2>
          <EmployeeInfoCard employee={data.employee} className="mt-4" />
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">
            Datos clínicos
          </h2>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Select
              label="Grupo sanguíneo"
              name="bloodType"
              placeholder="Selecciona el grupo"
              showDefaultOption
              defaultValue={data.bloodType ?? ''}
              options={BLOOD_TYPE_OPTIONS}
            />

            <Input
              label="Nombre de contacto de emergencia"
              name="emergencyContactName"
              type="text"
              placeholder="Ingresa el nombre del contacto"
              value={data.emergencyContactName ?? ''}
            />

            <Input
              label="Teléfono de contacto de emergencia"
              name="emergencyContactPhone"
              type="text"
              placeholder="Ingresa el teléfono"
              value={data.emergencyContactPhone ?? ''}
              validations={[
                {
                  regex: /^[0-9+]+$/,
                  message: 'Solo se permite números y (+)',
                },
              ]}
            />

            <div className="md:col-span-2">
              <Textarea
                label="Condiciones conocidas"
                name="knownConditions"
                placeholder="Describe condiciones conocidas del trabajador"
                rows={4}
                defaultValue={data.knownConditions ?? ''}
              />
            </div>

            <div className="md:col-span-2">
              <Textarea
                label="Antecedentes quirúrgicos"
                name="surgicalHistory"
                placeholder="Describe antecedentes quirúrgicos"
                rows={4}
                defaultValue={data.surgicalHistory ?? ''}
              />
            </div>

            <div className="md:col-span-2">
              <Textarea
                label="Antecedentes familiares"
                name="familyHistory"
                placeholder="Describe antecedentes familiares relevantes"
                rows={4}
                defaultValue={data.familyHistory ?? ''}
              />
            </div>

            <div className="md:col-span-2">
              <Textarea
                label="Observaciones"
                name="observations"
                placeholder="Ingresa observaciones adicionales"
                rows={4}
                defaultValue={data.observations ?? ''}
              />
            </div>
          </div>
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
            onClick={() => void handleSubmit()}
            isLoading={isUpdating}
            loadingText="Guardando..."
          >
            Guardar cambios
          </Button>
        </div>
      </form>
    </PageContainer>
  )
}

export default EditClinicalHistoryPage
