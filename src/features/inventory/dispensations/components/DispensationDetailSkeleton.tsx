import { PageContainer } from '@/shared/components'

export const DispensationDetailSkeleton = () => (
  <PageContainer title="Dispensación" description="Detalle de la dispensación">
    <div className="animate-pulse space-y-5">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 h-4 w-32 rounded bg-slate-100" />
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-10 rounded-xl bg-slate-100" />
          ))}
        </div>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 h-4 w-24 rounded bg-slate-100" />
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-10 rounded-xl bg-slate-100" />
          ))}
        </div>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 h-4 w-40 rounded bg-slate-100" />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-16 rounded-2xl bg-slate-100" />
          ))}
        </div>
      </div>
    </div>
  </PageContainer>
)
