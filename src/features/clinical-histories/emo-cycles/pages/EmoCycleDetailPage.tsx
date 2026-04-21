import PageContainer from '@/shared/components/ui/PageContainer'
import { useParams } from 'react-router'
import EmoCycleExamsSection from '../components/EmoCycleExamsSection'
import { useEmoCycle } from '../hooks/useEmoCycle'
import { EMO_STATUS_CLASSNAME, EMO_STATUS_LABEL } from '../types'
import EmoCycleConclusionSection from '../components/EmoCycleConclusionSection'
import EmoCycleConformitySection from '../components/EmoCycleConformitySection'
import { getEmoCycleViewState } from '../helpers/getEmoCycleViewState'
import { cn } from '@/shared/utils'

const EmoCycleDetailPage = () => {
  const { cycleId } = useParams()
  const numericCycleId = Number(cycleId)

  const { data: emoCycle, isLoading, error, refetch } = useEmoCycle(numericCycleId)

  if (isLoading) return <div>Cargando ciclo...</div>
  if (error) return <div>{error}</div>
  if (!emoCycle) return <div>No encontrado</div>

  const viewState = getEmoCycleViewState(emoCycle)

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
        />

        {viewState.showConformitySection ? (
          <EmoCycleConformitySection
            cycle={emoCycle}
            showEmployeeConformity={viewState.showEmployeeConformity}
            canEmployeeSign={viewState.canEmployeeSign}
          />
        ) : null}
      </div>
    </PageContainer>
  )
}

export default EmoCycleDetailPage