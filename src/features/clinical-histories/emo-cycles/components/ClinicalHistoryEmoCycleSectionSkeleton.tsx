export const ClinicalHistoryEmoCycleSectionSkeleton = () => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-2">
        <div className="h-6 w-40 rounded shimmer" />
        <div className="h-4 w-72 rounded shimmer" />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="rounded-2xl bg-slate-50 px-4 py-3">
            <div className="h-3 w-24 rounded shimmer" />
            <div className="mt-3 h-4 w-28 rounded shimmer" />
          </div>
        ))}
      </div>
    </div>
  )
}