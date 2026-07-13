import { PageContainer } from '@/shared/components'

export const EmployeeDetailSkeleton = () => (
  <PageContainer title="Detalle de empleado" description="">
    <div className="animate-pulse space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-lg">
          <div className="mb-4 h-4 w-32 rounded bg-slate-100" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, j) => (
              <div key={j} className="h-10 rounded-xl bg-slate-100" />
            ))}
          </div>
        </div>
      ))}
    </div>
  </PageContainer>
)
