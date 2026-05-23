import { useState } from 'react'
import { useParams } from 'react-router'
import { Download } from 'lucide-react'
import { cn } from '@/shared/utils'
import PageContainer from '@/shared/components/ui/PageContainer'
import EmoCycleExamsSection from '../components/EmoCycleExamsSection'
import { useEmoCycle } from '../hooks/useEmoCycle'
import { EMO_STATUS_CLASSNAME, EMO_STATUS_LABEL } from '../types'
import EmoCycleConclusionSection from '../components/EmoCycleConclusionSection'
import EmoCycleConformitySection from '../components/EmoCycleConformitySection'
import { getEmoCycleViewState } from '../helpers/getEmoCycleViewState'
import EmitClinicalHistoryConclusionSidebar from '../components/EmitClinicalHistoryConclusionSidebar'
import SignClinicalHistoryConformitySidebar from '../components/SignClinicalHistoryConformitySidebar'
import SignaturePreviewModal from '../components/SignaturePreviewModal'
import { documentTemplateService } from '@/features/document-templates/services/document-template.service'
import { DocumentTemplateType } from '@/features/document-templates/types/document-template.types'
import { parseBackendError } from '@/core/utils/parse-backend-error'
import { toastService } from '@/core/services/toast.service'

const EmoCycleDetailPage = () => {
  const { cycleId } = useParams()
  const numericCycleId = Number(cycleId)

  const { data: emoCycle, isLoading, error, refetch } = useEmoCycle(numericCycleId)
  const [isEmitConclusionSidebarOpen, setIsEmitConclusionSidebarOpen] = useState(false)
  const [isSignConformitySidebarOpen, setIsSignConformitySidebarOpen] = useState(false)
  const [previewSignatureData, setPreviewSignatureData] = useState<string | null>(null)
  const [previewSignatureTitle, setPreviewSignatureTitle] = useState('Vista previa de firma')
  const [generatingType, setGeneratingType] = useState<DocumentTemplateType | null>(null)

  const handleGenerate = async (type: DocumentTemplateType) => {
    if (!emoCycle) return
    setGeneratingType(type)
    try {
      await documentTemplateService.generate(type, emoCycle.id)
    } catch (err) {
      toastService.error(parseBackendError(err))
    } finally {
      setGeneratingType(null)
    }
  }

  if (isLoading) return <div>Cargando ciclo...</div>
  if (error) return <div>{error}</div>
  if (!emoCycle) return <div>No encontrado</div>

  const viewState = getEmoCycleViewState(emoCycle)

  const handlePreviewSignature = (signatureData: string, title: string) => {
    setPreviewSignatureData(signatureData)
    setPreviewSignatureTitle(title)
  }

  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">
                Ciclo EMO #{emoCycle.id}
              </h1>

              <div className="mt-3 flex flex-wrap gap-2">
                <span className={cn('rounded-xl px-3 py-1 text-xs font-medium', EMO_STATUS_CLASSNAME[emoCycle.status])}>
                  {EMO_STATUS_LABEL[emoCycle.status]}
                </span>

                <span className="rounded-xl bg-slate-100 px-3 py-1 text-xs text-slate-600">
                  {emoCycle.exams.length} exámenes
                </span>
              </div>
            </div>

            {emoCycle.conclusion && (
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={generatingType === DocumentTemplateType.EMO_DELIVERY}
                  onClick={() => handleGenerate(DocumentTemplateType.EMO_DELIVERY)}
                  className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100 disabled:opacity-60"
                >
                  <Download className="h-3.5 w-3.5" />
                  {generatingType === DocumentTemplateType.EMO_DELIVERY ? 'Generando...' : 'Entrega de resultados'}
                </button>

                <button
                  type="button"
                  disabled={generatingType === DocumentTemplateType.EMO_CERTIFICATE}
                  onClick={() => handleGenerate(DocumentTemplateType.EMO_CERTIFICATE)}
                  className="flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-100 disabled:opacity-60"
                >
                  <Download className="h-3.5 w-3.5" />
                  {generatingType === DocumentTemplateType.EMO_CERTIFICATE ? 'Generando...' : 'Certificado de aptitud'}
                </button>
              </div>
            )}
          </div>
        </div>

        <EmoCycleExamsSection
          exams={emoCycle.exams}
          cycle={emoCycle}
          onRefresh={refetch}
        />

        <EmoCycleConclusionSection
          cycle={emoCycle}
          canEmitConclusion={viewState.canEmitConclusion}
          areRequiredExamsCompleted={viewState.areRequiredExamsCompleted}
          onEmitConclusion={() => setIsEmitConclusionSidebarOpen(true)}
        />

        {viewState.showConformitySection ? (
          <EmoCycleConformitySection
            cycle={emoCycle}
            showEmployeeConformity={viewState.showEmployeeConformity}
            canEmployeeSign={viewState.canEmployeeSign}
            onSignEmployeeConformity={() => setIsSignConformitySidebarOpen(true)}
            onPreviewSignature={handlePreviewSignature}
          />
        ) : null}
      </div>

      <EmitClinicalHistoryConclusionSidebar
        isOpen={isEmitConclusionSidebarOpen}
        cycle={emoCycle}
        onClose={() => setIsEmitConclusionSidebarOpen(false)}
        onSuccess={refetch}
      />

      <SignClinicalHistoryConformitySidebar
        isOpen={isSignConformitySidebarOpen}
        cycle={emoCycle}
        onClose={() => setIsSignConformitySidebarOpen(false)}
        onSuccess={refetch}
      />

      <SignaturePreviewModal
        isOpen={Boolean(previewSignatureData)}
        title={previewSignatureTitle}
        signatureData={previewSignatureData}
        onClose={() => {
          setPreviewSignatureData(null)
          setPreviewSignatureTitle('Vista previa de firma')
        }}
      />
    </PageContainer>
  )
}

export default EmoCycleDetailPage