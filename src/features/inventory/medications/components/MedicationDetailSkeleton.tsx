export const MedicationDetailSkeleton = () => (
  <div className="animate-pulse space-y-5">
    <div className="rounded-3xl border-2 border-slate-300 bg-white p-5 shadow-lg space-y-3">
      <div className="h-6 w-56 rounded bg-slate-200" />
      <div className="h-4 w-36 rounded bg-slate-200" />
      <div className="mt-2 flex gap-2">
        <div className="h-6 w-20 rounded-xl bg-slate-200" />
        <div className="h-6 w-16 rounded-xl bg-slate-200" />
        <div className="h-6 w-20 rounded-xl bg-slate-200" />
      </div>
    </div>

    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="rounded-3xl border-2 border-slate-300 bg-white p-5 shadow-lg space-y-3">
          <div className="h-3 w-20 rounded bg-slate-200" />
          <div className="h-9 w-16 rounded bg-slate-200" />
        </div>
      ))}
    </div>

    <div className="rounded-3xl border-2 border-slate-300 bg-white p-5 shadow-lg space-y-4">
      <div className="h-5 w-40 rounded bg-slate-200" />
      <div className="grid gap-4 md:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-4 rounded bg-slate-200" />
        ))}
        <div className="md:col-span-2 h-4 rounded bg-slate-200" />
        <div className="md:col-span-2 h-4 rounded bg-slate-200" />
      </div>
    </div>
  </div>
)
