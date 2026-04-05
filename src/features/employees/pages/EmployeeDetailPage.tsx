import { useNavigate, useParams } from 'react-router'
import { Button } from '@/shared/components/ui/form'
import { useEmployee } from '../hooks/use-employee'
import PageContainer from '@/shared/components/ui/PageContainer'

const EmployeeDetailPage = () => {
  const navigate = useNavigate()
  const params = useParams()
  const id = Number(params.id)

  const { data, isLoading, error } = useEmployee(id)

  if (Number.isNaN(id)) {
    return <div>ID inválido</div>
  }

  return (
    <PageContainer
      title={`Colaborador #${data?.id ?? id}`}
      description="Detalle del trabajador sincronizado desde RRHH"
      action={
        <Button
          type="button"
          variant="secondary"
          onClick={() => navigate('/employees')}
          className="w-auto px-4 py-2"
        >
          Volver
        </Button>
      }
    >
      <div className="space-y-5">
        {error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        {isLoading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Cargando colaborador...</p>
          </div>
        ) : null}

        {data ? (
          <>
            <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={
                    data.isActive
                      ? 'inline-flex rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700'
                      : 'inline-flex rounded-xl border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500'
                  }
                >
                  {data.isActive ? 'Activo' : 'Inactivo'}
                </span>

                <span className="inline-flex rounded-xl border border-sky-100 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
                  {data.employmentStatus}
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                    Nombre completo
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {data.fullName}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                    DNI
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {data.dni}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                    Nombres
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    {data.firstName}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                    Apellidos
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    {data.lastName}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                    Fecha de nacimiento
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    {data.birthDate
                      ? new Date(data.birthDate).toLocaleDateString('es-PE')
                      : '—'}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                    ID externo
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    {data.externalId}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">
                Información organizacional
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                    Área
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {data.area?.name ?? '—'}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                    Cargo
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    {data.position ?? '—'}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                    Jefe inmediato
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    {data.immediateBoss ?? '—'}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">
                Trazabilidad
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                    Última sincronización
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    {data.lastSyncedAt
                      ? new Date(data.lastSyncedAt).toLocaleString('es-PE')
                      : '—'}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                    Creado
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    {new Date(data.createdAt).toLocaleString('es-PE')}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                    Actualizado
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    {new Date(data.updatedAt).toLocaleString('es-PE')}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                    Usuario creador
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    {data.createdBy ?? '—'}
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </PageContainer>
  )
}

export default EmployeeDetailPage