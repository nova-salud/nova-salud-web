import { useNavigate, useParams } from 'react-router'
import { format } from 'date-fns'
import { Download, FileText, Stethoscope, AlertTriangle, ClipboardList } from 'lucide-react'
import { EntityState, PageContainer, Button } from '@/shared/components'
import { useMedicalRest } from '../hooks/useMedicalRest'
import type { MedicalRestContingency, MedicalRestType } from '../types'
import { getMedicalRestDays } from '../utils/medical-rest-days.util'

const TYPE_LABEL: Record<MedicalRestType, string> = {
  CITT: 'CITT',
  PARTICULAR: 'Particular',
}

const CONTINGENCY_LABEL: Record<MedicalRestContingency, string> = {
  COMMON_DISEASE: 'Enfermedad común',
  WORK_ACCIDENT: 'Acc. de trabajo',
  TRANSIT_ACCIDENT: 'Acc. de tránsito',
  EMERGENCY: 'Emergencia',
  COMMON_ACCIDENT: 'Acc. común',
}

const Field = ({ label, value }: { label: string; value?: string | null }) => (
  <div>
    <p className="text-xs font-medium text-slate-500">{label}</p>
    <p className="mt-0.5 text-sm text-slate-900">{value ?? '—'}</p>
  </div>
)

const MedicalRestDetailPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const numericId = Number(id)

  const { data: rest, isLoading, error, refetch } = useMedicalRest(numericId)

  if (isLoading) {
    return (
      <div className="space-y-4 p-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-32 animate-pulse rounded-2xl bg-slate-100" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <EntityState
        title="Ocurrió un error"
        description={error}
        actionText="Reintentar"
        onAction={refetch}
      />
    )
  }

  if (!rest) {
    return (
      <EntityState
        title="Descanso médico no encontrado"
        description="El descanso médico que intentas consultar no existe o fue eliminado."
        actionText="Volver"
        onAction={() => navigate(-1)}
      />
    )
  }

  const start = new Date(rest.startDate)
  const end = new Date(rest.endDate)
  const daysDm = getMedicalRestDays(rest.startDate, rest.endDate)

  const downloadFile = () => {
    if (!rest.fileUrl) return
    const a = document.createElement('a')
    a.href = rest.fileUrl
    a.download = rest.fileName ?? 'descanso-medico'
    a.target = '_blank'
    a.click()
  }

  return (
    <PageContainer
      title={`Descanso médico — ${rest.employeeFullName}`}
      description="Detalle del descanso médico registrado."
      action={
        <div className="flex flex-wrap items-center gap-2">
          {rest.fileUrl && (
            <Button type="button" variant="outline" className="w-auto" onClick={downloadFile}>
              <Download size={15} className="mr-1.5" />
              Descargar documento
            </Button>
          )}
          <Button type="button" variant="outline" className="w-auto" onClick={() => navigate(-1)}>
            Volver
          </Button>
        </div>
      }
    >
      <div className="space-y-5">
        {/* Información general */}
        <div className="rounded-2xl border-2 border-slate-300 bg-white p-6 shadow-lg">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <ClipboardList size={15} className="text-slate-400" />
            Información general
          </h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3">
            <Field label="Empleado" value={rest.employeeFullName} />
            <Field label="Especialidad" value={rest.specialtyName} />
            <Field label="Tipo" value={rest.type ? TYPE_LABEL[rest.type] : null} />
            <Field label="Contingencia" value={rest.contingency ? CONTINGENCY_LABEL[rest.contingency] : null} />
          </div>
        </div>

        {/* Fechas y días */}
        <div className="rounded-2xl border-2 border-slate-300 bg-white p-6 shadow-lg">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Stethoscope size={15} className="text-slate-400" />
            Fechas y duración
          </h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4">
            <Field label="Fecha de inicio" value={format(start, 'dd/MM/yyyy')} />
            <Field label="Fecha de fin" value={format(end, 'dd/MM/yyyy')} />
            <Field label="Días DM" value={String(daysDm)} />
            <Field label="Días subsidiados" value={rest.subsidizedDays != null ? String(rest.subsidizedDays) : null} />
          </div>
        </div>

        {/* Diagnóstico y observaciones */}
        <div className="rounded-2xl border-2 border-slate-300 bg-white p-6 shadow-lg">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <FileText size={15} className="text-slate-400" />
            Diagnóstico y observaciones
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-slate-500">Diagnóstico</p>
              <p className="mt-1 whitespace-pre-wrap text-sm text-slate-900">{rest.diagnosis ?? '—'}</p>
            </div>
            {rest.notes && (
              <div>
                <p className="text-xs font-medium text-slate-500">Observaciones</p>
                <p className="mt-1 whitespace-pre-wrap text-sm text-slate-900">{rest.notes}</p>
              </div>
            )}
          </div>
        </div>

        {/* Vínculos */}
        {(rest.employeeId || rest.attentionId || rest.accidentId) && (
          <div className="rounded-2xl border-2 border-slate-300 bg-white p-6 shadow-lg">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <AlertTriangle size={15} className="text-slate-400" />
              Vínculos
            </h3>
            <div className="flex flex-wrap gap-3">
              {rest.employeeId && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-auto"
                  onClick={() => navigate(`/clinical-histories/${rest.employeeId}`)}
                >
                  Ver historia clínica
                </Button>
              )}
              {rest.attentionId && rest.employeeId && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-auto"
                  onClick={() => navigate(`/clinical-histories/${rest.employeeId}/attentions/${rest.attentionId}`)}
                >
                  Ver atención médica
                </Button>
              )}
              {rest.accidentId && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-auto"
                  onClick={() => navigate(`/accidents/${rest.accidentId}`)}
                >
                  Ver accidente
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  )
}

export default MedicalRestDetailPage
