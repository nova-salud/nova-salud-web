import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { ArrowLeft, Download, Eye, FileText } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import PageContainer from '@/shared/components/ui/PageContainer'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import { toastService } from '@/core/services/toast.service'
import { useClinicalHistory } from '@/features/clinical-histories/cllinical-histories/hooks/useClinicalHistory'
import { documentTemplateService } from '@/features/document-templates/services/document-template.service'
import { DocumentTemplateType } from '@/features/document-templates/types/document-template.types'
import { useEmoCycleHistory } from '../hooks/useEmoCycleHistory'
import {
  EMO_CONCLUSION_CLASSNAME,
  EMO_CONCLUSION_LABEL,
  EMO_STATUS_CLASSNAME,
  EMO_STATUS_LABEL,
  type ClinicalHistoryEmoCycleResponseDto,
} from '../types'
import { cn } from '@/shared/utils'

type GeneratingKey = `${DocumentTemplateType}-${number}`

const EmoCycleHistoryPage = () => {
  const { employeeId } = useParams()
  const navigate = useNavigate()
  const numericEmployeeId = Number(employeeId)

  const { data: clinicalHistory, isLoading: isLoadingHistory } = useClinicalHistory(numericEmployeeId)
  const { cycles, isLoading: isLoadingCycles } = useEmoCycleHistory(clinicalHistory?.id ?? 0)

  const [generatingKey, setGeneratingKey] = useState<GeneratingKey | null>(null)

  const isLoading = isLoadingHistory || isLoadingCycles

  const canGenerate = (cycle: ClinicalHistoryEmoCycleResponseDto) => cycle.conclusion !== null

  const handleGenerate = async (type: DocumentTemplateType, cycleId: number) => {
    const key: GeneratingKey = `${type}-${cycleId}`
    setGeneratingKey(key)
    try {
      await documentTemplateService.generate(type, cycleId)
    } catch (err) {
      toastService.error(parseBackendError(err))
    } finally {
      setGeneratingKey(null)
    }
  }

  return (
    <PageContainer
      title="Historial de ciclos EMO"
      description={clinicalHistory ? `${clinicalHistory.employee.fullName}` : undefined}
      action={
        <button
          type="button"
          onClick={() => navigate(`/clinical-histories/${numericEmployeeId}`)}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </button>
      }
    >
      {isLoading ? (
        <div className="flex items-center justify-center py-16 text-sm text-slate-500">
          Cargando ciclos EMO...
        </div>
      ) : cycles.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white py-16 text-sm text-slate-500">
          <FileText className="mb-3 h-8 w-8 text-slate-300" />
          No hay ciclos EMO registrados.
        </div>
      ) : (
        <div className="space-y-3">
          {cycles.map(cycle => (
            <div
              key={cycle.id}
              className="rounded-xl border border-slate-200 bg-white p-4"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {/* Info */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-slate-800">
                    Ciclo #{cycle.id}
                  </span>

                  <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-medium', EMO_STATUS_CLASSNAME[cycle.status])}>
                    {EMO_STATUS_LABEL[cycle.status]}
                  </span>

                  {cycle.conclusion && (
                    <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-medium', EMO_CONCLUSION_CLASSNAME[cycle.conclusion])}>
                      {EMO_CONCLUSION_LABEL[cycle.conclusion]}
                    </span>
                  )}

                  <span className="text-xs text-slate-400">
                    {format(new Date(cycle.startedAt), "d MMM yyyy", { locale: es })}
                    {cycle.completedAt && (
                      <> — {format(new Date(cycle.completedAt), "d MMM yyyy", { locale: es })}</>
                    )}
                  </span>

                  <span className="text-xs text-slate-400">
                    {cycle.exams.filter(e => e.isCompleted).length}/{cycle.exams.length} exámenes
                  </span>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => navigate(`/clinical-histories/${numericEmployeeId}/cycle/${cycle.id}`)}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    Ver detalle
                  </button>

                  {canGenerate(cycle) && (
                    <>
                      <button
                        type="button"
                        disabled={generatingKey === `${DocumentTemplateType.EMO_DELIVERY}-${cycle.id}`}
                        onClick={() => handleGenerate(DocumentTemplateType.EMO_DELIVERY, cycle.id)}
                        className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100 disabled:opacity-60"
                      >
                        <Download className="h-3.5 w-3.5" />
                        {generatingKey === `${DocumentTemplateType.EMO_DELIVERY}-${cycle.id}`
                          ? 'Generando...'
                          : 'Entrega'}
                      </button>

                      <button
                        type="button"
                        disabled={generatingKey === `${DocumentTemplateType.EMO_CERTIFICATE}-${cycle.id}`}
                        onClick={() => handleGenerate(DocumentTemplateType.EMO_CERTIFICATE, cycle.id)}
                        className="flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-100 disabled:opacity-60"
                      >
                        <Download className="h-3.5 w-3.5" />
                        {generatingKey === `${DocumentTemplateType.EMO_CERTIFICATE}-${cycle.id}`
                          ? 'Generando...'
                          : 'Certificado'}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageContainer>
  )
}

export default EmoCycleHistoryPage
