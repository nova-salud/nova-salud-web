export const FormPageSkeleton = () => {
  return (
    <div className="animate-pulse space-y-5">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="h-4 w-40 rounded bg-slate-200" />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="h-10 rounded-2xl bg-slate-200" />
          <div className="h-10 rounded-2xl bg-slate-200" />
          <div className="h-10 rounded-2xl bg-slate-200" />
          <div className="h-10 rounded-2xl bg-slate-200" />
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="h-4 w-32 rounded bg-slate-200" />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="h-10 rounded-2xl bg-slate-200" />
          <div className="h-10 rounded-2xl bg-slate-200" />
          <div className="h-10 rounded-2xl bg-slate-200" />
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="h-4 w-24 rounded bg-slate-200" />
        <div className="h-24 rounded-2xl bg-slate-200" />
        <div className="h-24 rounded-2xl bg-slate-200" />
      </div>

      <div className="flex justify-end gap-3">
        <div className="h-10 w-24 rounded-2xl bg-slate-200" />
        <div className="h-10 w-28 rounded-2xl bg-slate-200" />
      </div>
    </div>
  )
}
