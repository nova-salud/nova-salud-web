import { cn } from '@/shared/utils'

const Skeleton = ({ className }: { className?: string }) => (
  <div className={cn('animate-pulse rounded-xl bg-slate-200', className)} />
)

export const AdminDashboardSkeleton = () => (
  <div className="space-y-6">
    {/* 4 main cards */}
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-3xl border-2 border-slate-300 bg-white p-5 shadow-lg">
          <Skeleton className="mb-3 h-3 w-24" />
          <Skeleton className="h-7 w-14" />
        </div>
      ))}
    </div>

    {/* 4 alert cards */}
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-3xl border-2 border-slate-300 bg-white p-5 shadow-lg">
          <Skeleton className="mb-3 h-3 w-28" />
          <Skeleton className="h-7 w-10" />
        </div>
      ))}
    </div>

    {/* Two columns: accidents by area + SST indicators */}
    <div className="grid gap-6 xl:grid-cols-2">
      {/* accidents by area */}
      <div className="rounded-3xl border-2 border-slate-300 bg-white p-5 shadow-lg">
        <Skeleton className="mb-4 h-4 w-40" />
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex justify-between">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-3 w-8" />
              </div>
              <Skeleton className="h-2 w-full rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* SST indicators */}
      <div className="rounded-3xl border-2 border-slate-300 bg-white p-5 shadow-lg">
        <Skeleton className="mb-4 h-4 w-32" />
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="rounded-xl bg-slate-50 p-4">
              <Skeleton className="mb-2 h-3 w-24" />
              <Skeleton className="h-6 w-14" />
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Two columns: system + medical */}
    <div className="grid gap-6 xl:grid-cols-2">
      {/* system */}
      <div className="rounded-3xl border-2 border-slate-300 bg-white p-5 shadow-lg">
        <Skeleton className="mb-4 h-4 w-24" />
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="rounded-3xl border-2 border-slate-300 p-5">
              <Skeleton className="mb-3 h-3 w-20" />
              <Skeleton className="h-7 w-12" />
            </div>
          ))}
          <div className="col-span-2 rounded-xl bg-slate-50 p-4">
            <Skeleton className="mb-2 h-3 w-32" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      </div>

      {/* medical */}
      <div className="rounded-3xl border-2 border-slate-300 bg-white p-5 shadow-lg">
        <Skeleton className="mb-4 h-4 w-40" />
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex justify-between">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-3 w-8" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)
