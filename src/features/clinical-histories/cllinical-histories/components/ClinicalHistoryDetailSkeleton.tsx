import PageContainer from '@/shared/components/ui/PageContainer'

const ClinicalHistoryDetailSkeleton = () => {
  return (
    <PageContainer>
      <div className="space-y-6 animate-pulse">

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="h-5 w-48 rounded bg-slate-200" />
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="h-3 w-24 rounded bg-slate-200" />
                <div className="mt-2 h-4 w-full rounded bg-slate-200" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="h-5 w-40 rounded bg-slate-200" />
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {[...Array(6)].map((_, i) => (
              <div key={i}>
                <div className="h-3 w-24 rounded bg-slate-200" />
                <div className="mt-2 h-4 w-full rounded bg-slate-200" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="h-5 w-32 rounded bg-slate-200" />
          <div className="mt-4 space-y-3">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="h-16 rounded-xl bg-slate-200"
              />
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="h-5 w-40 rounded bg-slate-200" />
          <div className="mt-4 grid gap-4 md:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 rounded-xl bg-slate-200" />
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex gap-2 border-b border-slate-200 pb-2">
            <div className="h-4 w-28 rounded bg-slate-200" />
            <div className="h-4 w-28 rounded bg-slate-200" />
          </div>

          <div className="mt-4 space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 rounded-xl bg-slate-200" />
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

export default ClinicalHistoryDetailSkeleton