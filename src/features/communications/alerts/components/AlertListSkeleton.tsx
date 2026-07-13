export const AlertListSkeleton = ({ count = 5 }: { count?: number }) => {
  return (
    <div className="animate-pulse space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border-2 border-slate-300 bg-white p-4 shadow-lg border-l-4 border-l-slate-200"
        >
          <div className="flex items-start justify-between gap-4">
            {/* Left */}
            <div className="min-w-0 flex-1 space-y-2">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="h-5 w-16 rounded-full bg-slate-200" />
                <div className="h-5 w-24 rounded-full bg-slate-200" />
              </div>

              {/* Title + message */}
              <div className="space-y-1">
                <div className="h-4 w-48 rounded bg-slate-200" />
                <div className="h-3 w-64 rounded bg-slate-200" />
              </div>

              {/* Employee */}
              <div className="flex items-center gap-1.5">
                <div className="h-3.5 w-3.5 rounded bg-slate-200" />
                <div className="h-3.5 w-36 rounded bg-slate-200" />
              </div>

              {/* Date */}
              <div className="h-3 w-28 rounded bg-slate-200" />
            </div>

            {/* Right */}
            <div className="flex shrink-0 flex-col items-end gap-3">
              <div className="h-6 w-24 rounded-full bg-slate-200" />
              <div className="flex items-center gap-2">
                <div className="h-8 w-12 rounded-lg bg-slate-200" />
                <div className="h-8 w-20 rounded-lg bg-slate-200" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
