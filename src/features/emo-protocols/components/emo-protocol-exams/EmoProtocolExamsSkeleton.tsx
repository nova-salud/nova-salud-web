const EmoProtocolExamsSkeleton = () => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-5 w-48 rounded shimmer" />
          <div className="h-4 w-72 rounded shimmer" />
        </div>

        <div className="h-10 w-36 rounded-xl shimmer" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200 bg-white p-4"
          >
            <div className="flex items-start justify-between">
              <div className="h-4 w-32 rounded shimmer" />
              <div className="h-5 w-20 rounded-xl shimmer" />
            </div>

            <div className="mt-3 h-3 w-20 rounded shimmer" />

            <div className="mt-4 flex justify-end gap-2">
              <div className="h-8 w-16 rounded-xl shimmer" />
              <div className="h-8 w-20 rounded-xl shimmer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EmoProtocolExamsSkeleton