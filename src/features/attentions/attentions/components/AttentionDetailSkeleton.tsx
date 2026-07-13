import { PageContainer } from '@/shared/components'

export const AttentionDetailSkeleton = () => {
  return (
    <PageContainer title="" description="">
      <div className="space-y-6 animate-pulse">
        {/* Header card */}
        <div className="rounded-2xl border-2 border-slate-300 bg-white p-6 shadow-lg">
          <div className="flex justify-between">
            <div className="space-y-2">
              <div className="h-4 w-32 rounded bg-slate-200" />
              <div className="h-3 w-40 rounded bg-slate-200" />
            </div>

            <div className="flex gap-2">
              <div className="h-6 w-24 rounded-full bg-slate-200" />
              <div className="h-6 w-16 rounded-full bg-slate-200" />
              <div className="h-6 w-20 rounded-full bg-slate-200" />
            </div>
          </div>
        </div>

        {/* Información clínica */}
        <div className="rounded-2xl border-2 border-slate-300 bg-white p-6 shadow-lg space-y-4">
          <div className="h-5 w-48 rounded bg-slate-200" />

          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2 space-y-2">
              <div className="h-3 w-20 rounded bg-slate-200" />
              <div className="h-16 w-full rounded-xl bg-slate-200" />
            </div>

            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 w-24 rounded bg-slate-200" />
                <div className="h-10 w-full rounded-xl bg-slate-200" />
              </div>
            ))}

            <div className="md:col-span-2 space-y-2">
              <div className="h-3 w-24 rounded bg-slate-200" />
              <div className="h-16 w-full rounded-xl bg-slate-200" />
            </div>

            <div className="md:col-span-2 space-y-2">
              <div className="h-3 w-24 rounded bg-slate-200" />
              <div className="h-16 w-full rounded-xl bg-slate-200" />
            </div>
          </div>
        </div>

        {/* Dispensación */}
        <div className="rounded-2xl border-2 border-slate-300 bg-white p-6 shadow-lg space-y-4">
          <div className="space-y-1">
            <div className="h-5 w-36 rounded bg-slate-200" />
            <div className="h-3 w-64 rounded bg-slate-200" />
          </div>

          <div className="flex justify-between">
            <div className="h-3 w-32 rounded bg-slate-200" />
            <div className="flex gap-2">
              <div className="h-6 w-20 rounded-full bg-slate-200" />
              <div className="h-6 w-28 rounded-full bg-slate-200" />
            </div>
          </div>

          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-4 border-b border-slate-100 pb-3">
                <div className="h-4 w-48 rounded bg-slate-200" />
                <div className="h-4 w-12 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        </div>

        {/* Seguimientos */}
        <div className="rounded-2xl border-2 border-slate-300 bg-white p-6 shadow-lg space-y-4">
          <div className="space-y-1">
            <div className="h-5 w-40 rounded bg-slate-200" />
            <div className="h-3 w-56 rounded bg-slate-200" />
          </div>

          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <div className="space-y-2">
                <div className="h-4 w-36 rounded bg-slate-200" />
                <div className="h-3 w-28 rounded bg-slate-200" />
              </div>
              <div className="h-6 w-20 rounded-full bg-slate-200" />
            </div>
          ))}
        </div>

        {/* Firmas */}
        <div className="rounded-2xl border-2 border-slate-300 bg-white p-6 shadow-lg space-y-4">
          <div className="h-5 w-32 rounded bg-slate-200" />
          <div className="flex gap-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-16 w-32 rounded-xl bg-slate-200" />
                <div className="h-3 w-24 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
