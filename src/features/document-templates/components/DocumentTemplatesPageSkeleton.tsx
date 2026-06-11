import { PageContainer } from '@/shared/components'

export const DocumentTemplatesPageSkeleton = () => (
  <PageContainer
    title="Plantillas de Documentos"
    description="Gestiona las plantillas Word utilizadas para generar documentos médico ocupacionales."
  >
    <div className="grid animate-pulse gap-4 sm:grid-cols-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 shrink-0 rounded-lg bg-slate-100" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-40 rounded bg-slate-100" />
              <div className="h-3 w-56 rounded bg-slate-100" />
            </div>
          </div>
          <div className="h-10 rounded-xl bg-slate-100" />
          <div className="h-10 rounded-xl bg-slate-100" />
        </div>
      ))}
    </div>
  </PageContainer>
)
