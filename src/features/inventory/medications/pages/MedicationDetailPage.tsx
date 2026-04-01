import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router'
import PageContainer from '@/shared/components/ui/PageContainer'
import { useMedication } from '../hooks/useMedication'
import { useMedicationLots } from '@/features/inventory/lots/hooks/useMedicationLots'
import { useMedicationMovements } from '@/features/inventory/movements/hooks/useMedicationMovements'
import MedicationLotsTable from '@/features/inventory/lots/components/MedicationLotsTable'
import MedicationMovementsTable from '@/features/inventory/movements/components/MedicationMovementsTable'
import { cn } from '@/shared/utils'

const MedicationDetailPage = () => {
  const navigate = useNavigate()
  const params = useParams()

  const medicationId = Number(params.id)

  const { data: medication, isLoading, error } = useMedication(medicationId)
  const {
    data: lots,
    isLoading: isLotsLoading,
    error: lotsError,
  } = useMedicationLots(medicationId)
  const {
    data: movements,
    isLoading: isMovementsLoading,
    error: movementsError,
  } = useMedicationMovements(medicationId)

  const currentStock = useMemo(() => {
    return lots.reduce((acc, item) => acc + item.currentQuantity, 0)
  }, [lots])

  if (Number.isNaN(medicationId)) {
    return (
      <PageContainer title="Detalle de medicamento" description="Identificador inválido.">
        <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          El identificador del medicamento no es válido.
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer
      title="Detalle de medicamento"
      description="Vista maestra y operativa del medicamento"
    >
      <div className="space-y-5">
        {error && (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {isLoading && (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Cargando detalle del medicamento...</p>
          </div>
        )}

        {medication && (
          <>
            <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-xl font-semibold text-slate-900">
                  {medication.commercialName}
                </h1>

                <p className="text-sm text-slate-500">
                  {medication.genericName ?? 'Sin nombre genérico'}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="inline-flex rounded-xl border border-sky-100 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
                    {medication.therapeuticCategory.name}
                  </span>

                  <span
                    className={cn(
                      'inline-flex rounded-xl px-3 py-1 text-xs font-medium',
                      medication.isOtc
                        ? 'border border-emerald-100 bg-emerald-50 text-emerald-700'
                        : 'border border-slate-200 bg-slate-50 text-slate-500',
                    )}
                  >
                    {medication.isOtc ? 'OTC' : 'No OTC'}
                  </span>

                  <span
                    className={cn(
                      'inline-flex rounded-xl px-3 py-1 text-xs font-medium',
                      medication.requiresPrescription
                        ? 'border border-red-100 bg-red-50 text-red-600'
                        : 'border border-emerald-100 bg-emerald-50 text-emerald-700',
                    )}
                  >
                    {medication.requiresPrescription ? 'Con receta' : 'Sin receta'}
                  </span>

                  <span
                    className={cn(
                      'inline-flex rounded-xl px-3 py-1 text-xs font-medium',
                      medication.isActive
                        ? 'border border-emerald-100 bg-emerald-50 text-emerald-700'
                        : 'border border-slate-200 bg-slate-50 text-slate-500',
                    )}
                  >
                    {medication.isActive ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => navigate('/medications')}
                  className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Volver
                </button>

                <button
                  type="button"
                  onClick={() => navigate(`/medications/${medication.id}/edit`)}
                  className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Editar
                </button>

                <button
                  type="button"
                  className="rounded-2xl bg-[#0B1739] px-4 py-2 text-sm font-medium text-white"
                >
                  Registrar lote
                </button>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-400">Stock actual</p>
                <p
                  className={cn(
                    'mt-3 text-4xl font-semibold',
                    currentStock < medication.minimumStock
                      ? 'text-red-500'
                      : 'text-slate-900',
                  )}
                >
                  {currentStock}
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-400">Stock mínimo</p>
                <p className="mt-3 text-4xl font-semibold text-slate-900">
                  {medication.minimumStock}
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-400">Lotes activos</p>
                <p className="mt-3 text-4xl font-semibold text-slate-900">
                  {lots.length}
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-400">Unidad</p>
                <p className="mt-3 text-lg font-semibold text-slate-900">
                  {medication.unitOfMeasure}
                </p>
              </div>
            </div>

            {/* INFO */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-base font-semibold text-slate-900">
                Información general
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                    Composición
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {medication.chemicalComposition}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                    Presentación
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {medication.presentation ?? '-'}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                    Categoría
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {medication.therapeuticCategory.name}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                    Unidad de medida
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {medication.unitOfMeasure}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                    Observaciones
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {medication.notes ?? 'Sin observaciones.'}
                  </p>
                </div>
              </div>
            </div>

            {/* LOTES */}
            {lotsError && (
              <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {lotsError}
              </div>
            )}

            <MedicationLotsTable items={lots} isLoading={isLotsLoading} />

            {/* MOVIMIENTOS */}
            {movementsError && (
              <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {movementsError}
              </div>
            )}

            <MedicationMovementsTable
              items={movements}
              isLoading={isMovementsLoading}
            />
          </>
        )}
      </div>
    </PageContainer>
  )
}

export default MedicationDetailPage