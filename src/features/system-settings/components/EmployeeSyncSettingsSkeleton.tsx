import { PageContainer } from '@/shared/components'

export const EmployeeSyncSettingsSkeleton = () => (
  <PageContainer
    title="Configuración de sincronización RRHH"
    description="Administra la conexión externa y el comportamiento del job de sincronización."
  >
    <div className="animate-pulse space-y-5">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 space-y-2">
          <div className="h-4 w-56 rounded bg-slate-100" />
          <div className="h-3 w-80 rounded bg-slate-100" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-11 rounded-xl bg-slate-100" />
          ))}
        </div>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 space-y-2">
          <div className="h-4 w-40 rounded bg-slate-100" />
          <div className="h-3 w-64 rounded bg-slate-100" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="h-11 rounded-xl bg-slate-100" />
          <div className="h-11 rounded-xl bg-slate-100" />
        </div>
      </div>
    </div>
  </PageContainer>
)
