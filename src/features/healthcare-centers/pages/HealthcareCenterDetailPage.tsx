import { useNavigate, useParams } from 'react-router'
import { Button, EntityState, PageContainer } from '@/shared/components'
import { cn } from '@/shared/utils'
import { useHealthcareCenter } from '../hooks/useHealthcareCenter'
import { useUpdateHealthcareCenter } from '../hooks'
import type { UpdateHealthcareCenterDto } from '../types'
import HealthcareCenterFormSidebar from '../components/HealthcareCenterFormSidebar'
import { useDisclosure } from '@/shared/hooks'

type OverlayKeys = 'edit'

const HealthcareCenterDetailPage = () => {
  const navigate = useNavigate()
  const params = useParams()
  const id = Number(params.id)

  const { data: center, isLoading, error, refetch } = useHealthcareCenter(id)
  const { isLoading: isUpdating, updateHealthcareCenter } = useUpdateHealthcareCenter()

  const overlays = useDisclosure<OverlayKeys>()

  const handleUpdate = async (centerId: number, dto: UpdateHealthcareCenterDto) => {
    const result = await updateHealthcareCenter(centerId, dto)
    if (!result) return
    await refetch()
    overlays.close()
  }

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-5 p-6">
        <div className="h-10 w-48 rounded-2xl bg-slate-100" />
        <div className="h-40 rounded-3xl bg-slate-100" />
        <div className="h-40 rounded-3xl bg-slate-100" />
      </div>
    )
  }

  if (error) {
    return (
      <EntityState
        title="Ocurrió un error"
        description={error.message}
        actionText="Reintentar"
        onAction={refetch}
      />
    )
  }

  if (!center) {
    return (
      <EntityState
        title="Centro de salud no encontrado"
        description="El centro de salud que intentas consultar no existe o fue eliminado."
        actionText="Regresar"
        onAction={() => navigate('/healthcare-centers')}
      />
    )
  }

  return (
    <>
      <PageContainer
        title="Detalle de establecimiento"
        description="Información completa del centro de salud"
      >
        <div className="space-y-5">
          <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">{center.name}</h1>
              {center.ruc && (
                <p className="text-sm text-slate-500">RUC {center.ruc}</p>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                {center.convenio && (
                  <span className="inline-flex rounded-xl border border-sky-100 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
                    {center.convenio}
                  </span>
                )}
                <span
                  className={cn(
                    'inline-flex rounded-xl px-3 py-1 text-xs font-medium',
                    center.isActive
                      ? 'border border-emerald-100 bg-emerald-50 text-emerald-700'
                      : 'border border-slate-200 bg-slate-50 text-slate-500',
                  )}
                >
                  {center.isActive ? 'Activo' : 'Inactivo'}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate('/healthcare-centers')}>
                Volver
              </Button>
              <Button variant="info" onClick={() => overlays.open('edit')}>
                Editar
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-slate-900">Información general</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Nombre</p>
                <p className="mt-1 text-sm font-medium text-slate-900">{center.name}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">RUC</p>
                <p className="mt-1 text-sm font-medium text-slate-900">{center.ruc ?? '—'}</p>
              </div>

              <div className="md:col-span-2">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Dirección</p>
                <p className="mt-1 text-sm font-medium text-slate-900">{center.address ?? '—'}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Teléfono</p>
                <p className="mt-1 text-sm font-medium text-slate-900">{center.phone ?? '—'}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Convenio</p>
                <p className="mt-1 text-sm font-medium text-slate-900">{center.convenio ?? '—'}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-slate-900">Datos de contacto</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Nombre</p>
                <p className="mt-1 text-sm font-medium text-slate-900">{center.contactName ?? '—'}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Celular</p>
                <p className="mt-1 text-sm font-medium text-slate-900">{center.contactPhone ?? '—'}</p>
              </div>

              <div className="md:col-span-2">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Correo</p>
                <p className="mt-1 text-sm font-medium text-slate-900">{center.contactEmail ?? '—'}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-base font-semibold text-slate-900">Trazabilidad</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Creado por</p>
                <p className="mt-1 text-sm font-medium text-slate-900">{center.createdBy ?? '—'}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Fecha de creación</p>
                <p className="mt-1 text-sm font-medium text-slate-900">
                  {center.createdAt ? new Date(center.createdAt).toLocaleDateString('es-PE') : '—'}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Actualizado por</p>
                <p className="mt-1 text-sm font-medium text-slate-900">{center.updatedBy ?? '—'}</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Última actualización</p>
                <p className="mt-1 text-sm font-medium text-slate-900">
                  {center.updatedAt ? new Date(center.updatedAt).toLocaleDateString('es-PE') : '—'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>

      <HealthcareCenterFormSidebar
        isOpen={overlays.isOpen('edit')}
        mode="edit"
        healthcareCenter={center}
        isLoading={isUpdating}
        onClose={overlays.close}
        onUpdate={handleUpdate}
      />
    </>
  )
}

export default HealthcareCenterDetailPage
