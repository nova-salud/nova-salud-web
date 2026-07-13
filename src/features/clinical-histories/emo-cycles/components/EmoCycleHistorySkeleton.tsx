import { PageContainer } from '@/shared/components'

export const EmoCycleHistorySkeleton = () => {
  return (
    <PageContainer title="Historial de ciclos EMO">
      <div className="animate-pulse space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="rounded-xl border-2 border-slate-300 bg-white p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-4 w-16 rounded bg-slate-200" />
                <div className="h-5 w-20 rounded-full bg-slate-200" />
                <div className="h-5 w-24 rounded-full bg-slate-200" />
                <div className="h-3 w-28 rounded bg-slate-200" />
              </div>
              <div className="flex gap-2">
                <div className="h-8 w-24 rounded-lg bg-slate-200" />
                <div className="h-8 w-20 rounded-lg bg-slate-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  )
}
