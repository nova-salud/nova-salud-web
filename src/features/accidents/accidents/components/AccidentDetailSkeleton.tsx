export const AccidentDetailSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="h-4 w-40 rounded bg-slate-200" />
        <div className="mt-2 h-3 w-64 rounded bg-slate-200" />
      </div>

      {/* Card resumen */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex justify-between">
          <div className="space-y-2">
            <div className="h-4 w-32 rounded bg-slate-200" />
            <div className="h-3 w-40 rounded bg-slate-200" />
          </div>

          <div className="flex gap-2">
            <div className="h-6 w-20 rounded-full bg-slate-200" />
            <div className="h-6 w-20 rounded-full bg-slate-200" />
          </div>
        </div>
      </div>

      {/* Información */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
        <div className="h-4 w-48 rounded bg-slate-200" />

        <div className="space-y-2">
          <div className="h-3 w-24 rounded bg-slate-200" />
          <div className="h-10 w-full rounded bg-slate-200" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 w-20 rounded bg-slate-200" />
              <div className="h-4 w-28 rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </div>

      {/* FollowUps carousel */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
        <div className="h-4 w-40 rounded bg-slate-200" />

        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="min-w-[23%] rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3"
            >
              <div className="h-5 w-20 rounded-full bg-slate-200" />
              <div className="h-4 w-32 rounded bg-slate-200" />
              <div className="h-3 w-24 rounded bg-slate-200" />
              <div className="h-10 w-full rounded bg-slate-200" />
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-2 w-2 rounded-full bg-slate-200" />
          ))}
        </div>
      </div>

      {/* Estado del caso */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div className="h-4 w-40 rounded bg-slate-200" />

          <div className="h-8 w-40 rounded bg-slate-200" />
        </div>

        <div className="flex gap-2">
          <div className="h-6 w-16 rounded-full bg-slate-200" />
          <div className="h-6 w-20 rounded-full bg-slate-200" />
          <div className="h-6 w-16 rounded-full bg-slate-200" />
        </div>

        <div className="h-4 w-48 rounded bg-slate-200" />
      </div>
    </div>
  )
}