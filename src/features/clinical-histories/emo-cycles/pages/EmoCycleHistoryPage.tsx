import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { ArrowLeft, Download, Eye } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Button, EntityState, PageContainer } from '@/shared/components'
import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { useClinicalHistory } from '@/features/clinical-histories/clinical-histories/hooks/useClinicalHistory'
import { documentTemplateService } from '@/features/document-templates/services/document-template.service'
import { DocumentTemplateType } from '@/features/document-templates/types/document-template.types'
import { useEmoCycleHistory } from '../hooks/useEmoCycleHistory'
import { EmoCycleHistorySkeleton } from '../components/EmoCycleHistorySkeleton'
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
  const { cycles, isLoading: isLoadingCycles } = useEmoCycleHistory(numericEmployeeId)

  const [generatingKey, setGeneratingKey] = useState<GeneratingKey | null>(null)

  const { execute: handleGenerate } = useAsyncAction(
    async (type: DocumentTemplateType, cycleId: number) => {
      const key: GeneratingKey = `${type}-${cycleId}`
      setGeneratingKey(key)
      try {
        await documentTemplateService.generate(type, { emoCycleId: cycleId })
      } finally {
        setGeneratingKey(null)
      }
    },
    { showSuccessToast: false },
  )

  const canGenerate = (cycle: ClinicalHistoryEmoCycleResponseDto) => cycle.conclusion !== null

  const sortedCycles = [...cycles].sort(
    (a, b) => new Date(a.startedAt).getTime() - new Date(b.startedAt).getTime(),
  )
  const getRelativeNumber = (cycle: ClinicalHistoryEmoCycleResponseDto) =>
    sortedCycles.findIndex((c) => c.id === cycle.id) + 1

  if (isLoadingHistory || isLoadingCycles) return <EmoCycleHistorySkeleton />

  return (
    <PageContainer
      title="Historial de ciclos EMO"
      description={clinicalHistory?.employee.fullName}
      action={
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/clinical-histories/${numericEmployeeId}/emo-legacy`)}
            className="gap-1.5 text-sm py-2"
          >
            Ver histórico anterior
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(`/clinical-histories/${numericEmployeeId}`)}
            className="gap-1.5 text-sm py-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
        </div>
      }
    >
      <div className="space-y-3">

        {cycles.length === 0 && (
          <EntityState
            title="Sin ciclos EMO"
            description="Este trabajador no tiene ciclos EMO registrados."
          />
        )}

        {cycles.map(cycle => (
          <div
            key={cycle.id}
            className="rounded-xl border-2 border-slate-300 bg-white p-4 shadow-lg"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-slate-800">
                  Ciclo #{getRelativeNumber(cycle)}
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
                  {format(new Date(cycle.startedAt), 'd MMM yyyy', { locale: es })}
                  {cycle.completedAt && (
                    <> — {format(new Date(cycle.completedAt), 'd MMM yyyy', { locale: es })}</>
                  )}
                </span>

                <span className="text-xs text-slate-400">
                  {cycle.exams.filter(e => e.isCompleted).length}/{cycle.exams.length} exámenes
                </span>
              </div>

              <div className="flex shrink-0 flex-wrap gap-2">
                <Button
                  variant="outline"
                  onClick={() => navigate(`/clinical-histories/${numericEmployeeId}/cycle/${cycle.id}`)}
                  className="gap-1.5 py-1.5"
                >
                  <Eye className="h-3.5 w-3.5" />
                  Ver detalle
                </Button>

                {canGenerate(cycle) && (
                  <>
                    <Button
                      variant="info"
                      isLoading={generatingKey === `${DocumentTemplateType.EMO_DELIVERY}-${cycle.id}`}
                      loadingText="Generando..."
                      onClick={() => handleGenerate(DocumentTemplateType.EMO_DELIVERY, cycle.id)}
                      className="gap-1.5 py-1.5"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Entrega
                    </Button>

                    <Button
                      variant="success"
                      isLoading={generatingKey === `${DocumentTemplateType.EMO_CERTIFICATE}-${cycle.id}`}
                      loadingText="Generando..."
                      onClick={() => handleGenerate(DocumentTemplateType.EMO_CERTIFICATE, cycle.id)}
                      className="gap-1.5 py-1.5"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Certificado
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  )
}

export default EmoCycleHistoryPage
