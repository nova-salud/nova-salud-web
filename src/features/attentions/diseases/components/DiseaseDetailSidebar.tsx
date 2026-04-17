import { Button } from '@/shared/components/ui/form'
import Sidebar from '@/shared/components/ui/sidebar/Sidebar'
import { cn } from '@/shared/utils'
import type { DiseaseResponseDto } from '../types'

type Props = {
  disease: DiseaseResponseDto | null
  isOpen: boolean
  isLoading?: boolean
  onClose: () => void
  onEdit?: (disease: DiseaseResponseDto) => void
}

export const DiseaseDetailSidebar = ({
  disease,
  isOpen,
  isLoading = false,
  onClose,
  onEdit,
}: Props) => {
  const footer = disease ? (
    <div className="flex flex-wrap justify-end gap-3">
      {onEdit ? (
        <Button
          type="button"
          onClick={() => onEdit(disease)}
          className="w-auto"
        >
          Editar
        </Button>
      ) : null}
    </div>
  ) : null

  return (
    <Sidebar
      isOpen={isOpen}
      title={disease ? `Enfermedad #${disease.id}` : 'Detalle de enfermedad'}
      description="Información general de la enfermedad."
      onClose={onClose}
      size="md"
      footer={footer}
    >
      {isLoading ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Cargando enfermedad...</p>
        </div>
      ) : null}

      {!isLoading && !disease ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm text-slate-500">
            No se encontró información de la enfermedad.
          </p>
        </div>
      ) : null}

      {!isLoading && disease ? (
        <div className="space-y-5">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={cn(
                  'inline-flex rounded-xl border px-3 py-1 text-xs font-medium',
                  disease.isActive
                    ? 'border-emerald-100 bg-emerald-50 text-emerald-700'
                    : 'border-slate-200 bg-slate-50 text-slate-500',
                )}
              >
                {disease.isActive ? 'Activo' : 'Inactivo'}
              </span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                  Código
                </p>
                <p className="mt-1 text-sm font-medium text-slate-900">
                  {disease.code}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                  Categoría
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  {disease.category ?? '—'}
                </p>
              </div>

              <div className="md:col-span-2">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                  Nombre
                </p>
                <p className="mt-1 text-sm font-medium text-slate-900">
                  {disease.name}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">
              Trazabilidad
            </h3>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                  Creado
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  {new Date(disease.createdAt).toLocaleString('es-PE')}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                  Actualizado
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  {new Date(disease.updatedAt).toLocaleString('es-PE')}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                  Usuario creador
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  {disease.createdBy ?? '—'}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                  Usuario actualizador
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  {disease.updatedBy ?? '—'}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </Sidebar>
  )
}

export default DiseaseDetailSidebar