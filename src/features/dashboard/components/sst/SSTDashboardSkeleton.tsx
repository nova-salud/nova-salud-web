import { cn } from '@/shared/utils'

const Skeleton = ({ className }: { className?: string }) => (
  <div
    className={cn(
      'animate-pulse rounded-xl bg-slate-200',
      className,
    )}
  />
)

export const SSTDashboardSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* CARDS */}
      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <Skeleton className="h-3 w-20 mb-3" />
            <Skeleton className="h-6 w-12" />
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <Skeleton className="h-4 w-48 mb-4" />
        <Skeleton className="h-70 w-full" />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <Skeleton className="h-3 w-24 mb-2" />
            <Skeleton className="h-5 w-10" />
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <Skeleton className="h-4 w-56 mb-4" />

        <div className="grid gap-6 md:grid-cols-2">

          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex justify-between">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-3 w-8" />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-100 p-3"
              >
                <Skeleton className="h-3 w-20 mb-2" />
                <Skeleton className="h-5 w-10" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="px-6 py-5 border-b border-slate-100">
          <Skeleton className="h-4 w-40 mb-2" />
          <Skeleton className="h-3 w-64" />
        </div>

        <div className="p-4 space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-4 gap-4"
            >
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}