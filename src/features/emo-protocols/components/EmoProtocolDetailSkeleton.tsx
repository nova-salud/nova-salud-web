import { PageContainer } from '@/shared/components'

export const EmoProtocolDetailSkeleton = () => (
  <PageContainer title="Protocolo EMO" description="">
    <div className="animate-pulse space-y-5">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-4">
          <div className="h-4 w-48 rounded bg-slate-100" />
          <div className="h-4 w-24 rounded bg-slate-100" />
        </div>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 h-4 w-32 rounded bg-slate-100" />
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-10 rounded-2xl bg-slate-100" />
          ))}
        </div>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 h-4 w-32 rounded bg-slate-100" />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-10 rounded-2xl bg-slate-100" />
          ))}
        </div>
      </div>
    </div>
  </PageContainer>
)
