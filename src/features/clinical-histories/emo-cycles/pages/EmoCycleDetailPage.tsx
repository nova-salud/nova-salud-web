import { useState } from 'react'
import { useParams } from 'react-router'
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

const EmoCycleDetailPage = () => {
  const { cycleId } = useParams()
  const numericCycleId = Number(cycleId)

  const { data: emoCycle, isLoading, error, refetch } = useEmoCycle(numericCycleId)
  const [isEmitConclusionSidebarOpen, setIsEmitConclusionSidebarOpen] = useState(false)
  const [isSignConformitySidebarOpen, setIsSignConformitySidebarOpen] = useState(false)
  const [previewSignatureData, setPreviewSignatureData] = useState<string | null>(null)
  const [previewSignatureTitle, setPreviewSignatureTitle] = useState('Vista previa de firma')

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