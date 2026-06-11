import { PageContainer } from '@/shared/components'

export const EmoCycleDetailSkeleton = () => {
  return (
    <PageContainer>
      <div className="animate-pulse space-y-6">
        {/* Header */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <div className="h-6 w-36 rounded-lg bg-slate-200" />
              <div className="flex gap-2">
                <div className="h-5 w-20 rounded-xl bg-slate-200" />
                <div className="h-5 w-24 rounded-xl bg-slate-200" />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="h-7 w-36 rounded-lg bg-slate-200" />
              <div className="h-7 w-32 rounded-lg bg-slate-200" />
            </div>
          </div>
        </div>

        {/* Exams section */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="h-5 w-40 rounded-lg bg-slate-200" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                <div className="space-y-1.5">
                  <div className="h-4 w-48 rounded bg-slate-200" />
                  <div className="h-3 w-32 rounded bg-slate-200" />
                </div>
                <div className="h-6 w-20 rounded-xl bg-slate-200" />
              </div>
            ))}
          </div>
        </div>

        {/* Conclusion section */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="h-5 w-32 rounded-lg bg-slate-200" />
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-slate-50 px-4 py-3 space-y-2">
                <div className="h-3 w-24 rounded bg-slate-200" />
                <div className="h-4 w-32 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        </div>

        {/* Conformity section */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="h-5 w-36 rounded-lg bg-slate-200" />
          <div className="flex gap-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-20 w-36 rounded-xl bg-slate-200" />
                <div className="h-3 w-28 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
