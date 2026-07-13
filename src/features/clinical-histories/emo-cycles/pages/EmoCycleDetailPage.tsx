import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Button } from '@/shared/components/ui/form'
import { useConfirmEmoCycleExamReview, useGenerateEmoCycleDocument } from '../hooks'
import { Download, Paperclip, FileText } from 'lucide-react'
import { cn } from '@/shared/utils'
import { getFileUrl } from '@/shared/utils'
import { EntityState, PageContainer } from '@/shared/components'
import { useDisclosure } from '@/shared/hooks'
import { useEmployee } from '@/features/employees/hooks'
import { EmployeeInfoCard } from '@/features/employees/components'
import EmoCycleExamsSection from '../components/EmoCycleExamsSection'
import { EmoCycleDetailSkeleton } from '../components/EmoCycleDetailSkeleton'
import { useEmoCycle } from '../hooks/useEmoCycle'
import { useEmoCycleHistory } from '../hooks/useEmoCycleHistory'
import { EMO_STATUS_CLASSNAME, EMO_STATUS_LABEL } from '../types'
import EmoCycleConclusionSection from '../components/EmoCycleConclusionSection'
import EmoCycleConformitySection from '../components/EmoCycleConformitySection'
import { getEmoCycleViewState } from '../helpers/getEmoCycleViewState'
import EmitClinicalHistoryConclusionSidebar from '../components/EmitClinicalHistoryConclusionSidebar'
import SignClinicalHistoryConformitySidebar from '../components/SignClinicalHistoryConformitySidebar'
import SignaturePreviewModal from '../components/SignaturePreviewModal'
import AttachEmoCycleFinalReportSidebar from '../components/AttachEmoCycleFinalReportSidebar'
import { DocumentTemplateType } from '@/features/document-templates/types/document-template.types'

type ModalKey = 'emit-conclusion' | 'sign-conformity' | 'attach-report' | 'signature-preview'

type SignaturePreview = {
  data: string
  title: string
}

const EmoCycleDetailPage = () => {
  const { employeeId, cycleId } = useParams()
  const numericCycleId = Number(cycleId)
  const numericEmployeeId = Number(employeeId)
  const navigate = useNavigate()

  const { isOpen, open, close } = useDisclosure<ModalKey>()

  const { data: emoCycle, isLoading, error, refetch } = useEmoCycle(numericCycleId)
  const { data: employee, isLoading: isEmployeeLoading } = useEmployee(numericEmployeeId)
  const { cycles } = useEmoCycleHistory(numericEmployeeId)
  const { confirmExamReview, isLoading: isConfirming } = useConfirmEmoCycleExamReview()
  const { generate: handleGenerate, generatingType } = useGenerateEmoCycleDocument(numericCycleId)
  const [signaturePreview, setSignaturePreview] = useState<SignaturePreview | null>(null)

  if (isLoading) return <EmoCycleDetailSkeleton />

  if (error) return (
    <EntityState
      title="Ocurrió un error"
      description="No fue posible obtener el ciclo EMO."
      actionText="Reintentar"
      onAction={refetch}
    />
  )

  if (!emoCycle) return (
    <EntityState
      title="Ciclo no encontrado"
      description="El ciclo EMO solicitado no existe o fue eliminado."
      actionText="Regresar"
      onAction={() => navigate(-1)}
    />
  )

  const viewState = getEmoCycleViewState(emoCycle)

  const sortedCycles = [...cycles].sort(
    (a, b) => new Date(a.startedAt).getTime() - new Date(b.startedAt).getTime(),
  )
  const relativeNumber = sortedCycles.findIndex((c) => c.id === emoCycle.id) + 1

  const handlePreviewSignature = (signatureData: string, title: string) => {
    setSignaturePreview({ data: signatureData, title })
    open('signature-preview')
  }

  return (
    <PageContainer>
      <div className="space-y-6">
        {emoCycle.status === 'PENDING_EXAM_REVIEW' && (
          <div className="flex items-center justify-between rounded-3xl border border-amber-200 bg-amber-50 px-5 py-4">
            <p className="text-sm text-amber-700">
              Revisa los exámenes asignados al ciclo y confirma para iniciar el proceso.
            </p>
            <Button
              type="button"
              className="w-auto"
              isLoading={isConfirming}
              loadingText="Confirmando..."
              onClick={async () => {
                await confirmExamReview(emoCycle.id)
                await refetch()
              }}
            >
              Confirmar exámenes
            </Button>
          </div>
        )}

        <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-lg">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">
                Ciclo EMO #{relativeNumber}
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
              <div className="flex flex-col items-end gap-2">
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

                  {emoCycle.conclusion === 'APTO_CON_RESTRICCIONES' && (
                    <>
                      <button
                        type="button"
                        disabled={generatingType === DocumentTemplateType.EMO_CONFORMITY_RESTRICTIONS}
                        onClick={() => handleGenerate(DocumentTemplateType.EMO_CONFORMITY_RESTRICTIONS)}
                        className="flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 hover:bg-amber-100 disabled:opacity-60"
                      >
                        <Download className="h-3.5 w-3.5" />
                        {generatingType === DocumentTemplateType.EMO_CONFORMITY_RESTRICTIONS ? 'Generando...' : 'Conformidad con restricciones'}
                      </button>

                      <button
                        type="button"
                        disabled={generatingType === DocumentTemplateType.EMO_CONFORMITY_DOCTOR}
                        onClick={() => handleGenerate(DocumentTemplateType.EMO_CONFORMITY_DOCTOR)}
                        className="flex items-center gap-1.5 rounded-lg bg-violet-50 px-3 py-1.5 text-xs font-medium text-violet-700 hover:bg-violet-100 disabled:opacity-60"
                      >
                        <Download className="h-3.5 w-3.5" />
                        {generatingType === DocumentTemplateType.EMO_CONFORMITY_DOCTOR ? 'Generando...' : 'Conformidad médico ocupacional'}
                      </button>
                    </>
                  )}

                  <button
                    type="button"
                    onClick={() => open('attach-report')}
                    className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200"
                  >
                    <Paperclip className="h-3.5 w-3.5" />
                    Adjuntar informe final
                  </button>
                </div>

                {emoCycle.finalReportFileUrl && (
                  <a
                    href={getFileUrl(emoCycle.finalReportFileUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    Ver informe médico adjunto
                  </a>
                )}
              </div>
            )}
          </div>

          <EmployeeInfoCard
            employee={employee}
            isLoading={isEmployeeLoading}
            className="mt-5 border-t border-slate-100 pt-5"
          />
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
          onEmitConclusion={() => open('emit-conclusion')}
        />

        {viewState.showConformitySection ? (
          <EmoCycleConformitySection
            cycle={emoCycle}
            showEmployeeConformity={viewState.showEmployeeConformity}
            canEmployeeSign={viewState.canEmployeeSign}
            onSignEmployeeConformity={() => open('sign-conformity')}
            onPreviewSignature={handlePreviewSignature}
          />
        ) : null}
      </div>

      <EmitClinicalHistoryConclusionSidebar
        isOpen={isOpen('emit-conclusion')}
        cycle={emoCycle}
        onClose={close}
        onSuccess={refetch}
      />

      <SignClinicalHistoryConformitySidebar
        isOpen={isOpen('sign-conformity')}
        cycle={emoCycle}
        onClose={close}
        onSuccess={refetch}
      />

      <SignaturePreviewModal
        isOpen={isOpen('signature-preview')}
        title={signaturePreview?.title ?? 'Vista previa de firma'}
        signatureData={signaturePreview?.data ?? null}
        onClose={() => {
          close()
          setSignaturePreview(null)
        }}
      />

      <AttachEmoCycleFinalReportSidebar
        isOpen={isOpen('attach-report')}
        cycleId={emoCycle.id}
        onClose={close}
        onSuccess={refetch}
      />
    </PageContainer>
  )
}

export default EmoCycleDetailPage