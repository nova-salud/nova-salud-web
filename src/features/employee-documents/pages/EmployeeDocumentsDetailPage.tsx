import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { ArrowLeft, Download, FileText } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Button, EntityState, PageContainer } from '@/shared/components'
import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { useClinicalHistory } from '@/features/clinical-histories/clinical-histories/hooks/useClinicalHistory'
import { documentTemplateService } from '@/features/document-templates/services/document-template.service'
import { DocumentTemplateType } from '@/features/document-templates/types/document-template.types'
import { DOCUMENT_TEMPLATE_META } from '@/features/document-templates/constants/document-template.constants'
import {
  EMO_CONCLUSION_CLASSNAME,
  EMO_CONCLUSION_LABEL,
} from '@/features/clinical-histories/emo-cycles/types'
import { cn } from '@/shared/utils'
import { useEmployeeDocumentsDetail } from '../hooks/useEmployeeDocumentsDetail'

const EMO_TEMPLATE_TYPES = [
  DocumentTemplateType.EMO_DELIVERY,
  DocumentTemplateType.EMO_CERTIFICATE,
  DocumentTemplateType.EMO_CONFORMITY_DOCTOR,
  DocumentTemplateType.EMO_CONFORMITY_RESTRICTIONS,
] as const

type GeneratingKey = string

const EmployeeDocumentsDetailPage = () => {
  const { employeeId } = useParams()
  const navigate = useNavigate()
  const numericEmployeeId = Number(employeeId)

  const { data: clinicalHistory, isLoading: isLoadingHistory } = useClinicalHistory(numericEmployeeId)
  const { completedCycles, attentions, isLoading } = useEmployeeDocumentsDetail(
    numericEmployeeId,
    clinicalHistory?.id,
  )

  const [generatingKey, setGeneratingKey] = useState<GeneratingKey | null>(null)

  const { execute: handleGenerateEmo } = useAsyncAction(
    async (type: DocumentTemplateType, cycleId: number) => {
      const key = `${type}-${cycleId}`
      setGeneratingKey(key)
      try {
        await documentTemplateService.generate(type, { emoCycleId: cycleId })
      } finally {
        setGeneratingKey(null)
      }
    },
    { showSuccessToast: false },
  )

  const { execute: handleGenerateAttention } = useAsyncAction(
    async (type: DocumentTemplateType, attentionId: number) => {
      const key = `${type}-${attentionId}`
      setGeneratingKey(key)
      try {
        await documentTemplateService.generate(type, { attentionId })
      } finally {
        setGeneratingKey(null)
      }
    },
    { showSuccessToast: false },
  )

  const hasContent = completedCycles.length > 0 || attentions.length > 0

  if (isLoadingHistory || isLoading) {
    return (
      <PageContainer title="Documentos del empleado">
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-20 rounded-xl bg-slate-100" />)}
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer
      title="Documentos del empleado"
      description={clinicalHistory?.employee.fullName}
      action={
        <Button
          variant="outline"
          onClick={() => navigate('/documents/employees')}
          className="gap-1.5 text-sm py-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>
      }
    >
      <div className="space-y-6">
        {!hasContent && (
          <EntityState
            title="Sin documentos disponibles"
            description="Este empleado no tiene ciclos EMO completados ni atenciones registradas."
          />
        )}

        {/* Sección EMO */}
        {completedCycles.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              Documentos EMO
            </h3>

            {completedCycles.map((cycle) => (
              <div key={cycle.id} className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-slate-800">
                      Ciclo EMO #{cycle.id}
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
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {EMO_TEMPLATE_TYPES.map((type) => {
                      const key = `${type}-${cycle.id}`
                      return (
                        <Button
                          key={type}
                          variant="outline"
                          className="gap-1.5 py-1.5 text-xs"
                          isLoading={generatingKey === key}
                          loadingText="..."
                          onClick={() => void handleGenerateEmo(type, cycle.id)}
                        >
                          <Download className="h-3.5 w-3.5" />
                          {DOCUMENT_TEMPLATE_META[type].label}
                        </Button>
                      )
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Sección Atenciones */}
        {attentions.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              Documentos de Atención
            </h3>

            {attentions.map((attention) => (
              <div key={attention.id} className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap items-center gap-2">
                    <FileText className="h-4 w-4 text-slate-400" />
                    <span className="text-sm font-semibold text-slate-800">
                      Atención #{attention.id}
                    </span>
                    <span className="text-xs text-slate-400">
                      {format(new Date(attention.createdAt), 'd MMM yyyy', { locale: es })}
                    </span>
                    {attention.diseaseName && (
                      <span className="text-xs text-slate-500">
                        {attention.diseaseName}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      className="gap-1.5 py-1.5 text-xs"
                      isLoading={generatingKey === `${DocumentTemplateType.ATTENTION_RECEIPT}-${attention.id}`}
                      loadingText="..."
                      onClick={() => void handleGenerateAttention(DocumentTemplateType.ATTENTION_RECEIPT, attention.id)}
                    >
                      <Download className="h-3.5 w-3.5" />
                      {DOCUMENT_TEMPLATE_META[DocumentTemplateType.ATTENTION_RECEIPT].label}
                    </Button>

                    {attention.hasEta && (
                      <Button
                        variant="outline"
                        className="gap-1.5 py-1.5 text-xs"
                        isLoading={generatingKey === `${DocumentTemplateType.ETA_RESULTS}-${attention.id}`}
                        loadingText="..."
                        onClick={() => void handleGenerateAttention(DocumentTemplateType.ETA_RESULTS, attention.id)}
                      >
                        <Download className="h-3.5 w-3.5" />
                        {DOCUMENT_TEMPLATE_META[DocumentTemplateType.ETA_RESULTS].label}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  )
}

export default EmployeeDocumentsDetailPage
