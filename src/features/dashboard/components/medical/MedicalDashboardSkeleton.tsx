import { cn } from '@/shared/utils'

const Skeleton = ({ className }: { className?: string }) => (
  <div className={cn('animate-pulse rounded-xl bg-slate-200', className)} />
)

export const MedicalDashboardSkeleton = () => (
  <div className="space-y-6">
    {/* 4 cards principales */}
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <Skeleton className="mb-3 h-3 w-24" />
          <Skeleton className="h-7 w-14" />
        </div>
      ))}
    </div>

    {/* 3 alert cards */}
    <div className="grid gap-4 sm:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <Skeleton className="mb-3 h-3 w-28" />
          <Skeleton className="h-7 w-10" />
        </div>
      ))}
    </div>

    {/* Gráfico */}
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-3 w-64" />
        </div>
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-64 w-full" />
    </div>

    {/* Medicamentos */}
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
        <Skeleton className="h-4 w-52" />
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="divide-y divide-slate-100">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-6 py-4">
            <Skeleton className="h-9 w-9 shrink-0 rounded-xl" />
            <div className="flex-1 space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-3 w-40" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-1.5 w-full rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Tabla */}
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-4 w-28" />
      </div>
      <div className="space-y-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="grid grid-cols-5 gap-4 border-t border-slate-100 px-6 py-4">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-24" />
          </div>
        ))}
      </div>
    </div>
  </div>
)
