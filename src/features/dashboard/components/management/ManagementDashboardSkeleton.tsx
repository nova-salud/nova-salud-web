import { cn } from '@/shared/utils'

const Skeleton = ({ className }: { className?: string }) => (
  <div className={cn('animate-pulse rounded-xl bg-slate-200', className)} />
)

export const ManagementDashboardSkeleton = () => (
  <div className="space-y-6">
    {/* 4 cards principales */}
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-3xl border-2 border-slate-300 bg-white p-5 shadow-lg">
          <Skeleton className="mb-3 h-3 w-24" />
          <Skeleton className="h-7 w-14" />
        </div>
      ))}
    </div>

    {/* 3 alert cards */}
    <div className="grid gap-4 sm:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="rounded-3xl border-2 border-slate-300 bg-white p-5 shadow-lg">
          <Skeleton className="mb-3 h-3 w-28" />
          <Skeleton className="h-7 w-10" />
        </div>
      ))}
    </div>

    {/* Requerimientos */}
    <div className="rounded-3xl border-2 border-slate-300 bg-white p-5 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-4 w-20" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-slate-100 p-4">
            <Skeleton className="mb-3 h-3 w-20" />
            <Skeleton className="h-7 w-10" />
          </div>
        ))}
      </div>
    </div>

    {/* Dos columnas: empleados por área + accidentes por área */}
    <div className="grid gap-6 xl:grid-cols-2">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="rounded-3xl border-2 border-slate-300 bg-white p-5 shadow-lg">
          <Skeleton className="mb-4 h-4 w-44" />
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, j) => (
              <div key={j} className="space-y-1.5">
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-28" />
                  <Skeleton className="h-3 w-8" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>

    {/* Tabla */}
    <div className="overflow-hidden rounded-3xl border-2 border-slate-300 bg-white shadow-lg">
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
        <Skeleton className="h-4 w-44" />
        <Skeleton className="h-4 w-20" />
      </div>
      <div className="space-y-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="grid grid-cols-4 gap-4 border-t border-slate-100 px-6 py-4">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-24" />
          </div>
        ))}
      </div>
    </div>
  </div>
)
