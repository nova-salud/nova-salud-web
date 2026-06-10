import { PageContainer } from '@/shared/components'

export const RequirementDetailSkeleton = () => {
  return (
    <PageContainer title="Requerimiento" description="Detalle del requerimiento">
      <div className="space-y-5 animate-pulse">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <div className="h-6 w-24 rounded-xl bg-slate-200" />
          <div className="h-4 w-32 rounded bg-slate-200" />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="h-4 rounded bg-slate-200" />
            <div className="h-4 rounded bg-slate-200" />
            <div className="md:col-span-2 h-4 rounded bg-slate-200" />
            <div className="md:col-span-2 h-4 rounded bg-slate-200" />
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
          <div className="h-4 w-48 rounded bg-slate-200" />
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-14 rounded-2xl bg-slate-200" />
          ))}
        </div>
      </div>
    </PageContainer>
  )
}