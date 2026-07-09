import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useQueryClient } from '@tanstack/react-query'
import { RoleEnum } from '@/core/enums/role.enum'
import { useAuth, useDisclosure } from '@/shared/hooks'
import type { MedicationLotResponseDto } from '@/features/inventory/lots/types'
import { AdjustLotModal, RegisterLotModal } from '@/features/inventory/lots/components'
import { useMedication } from '../hooks'
import { MEDICATION_QUERY_KEYS } from '../constants/medications-query-keys'
import {
  MedicationDetailSkeleton,
  MedicationLotsSection,
  MedicationMovementsSection,
} from '../components'
import { Button, EntityState, PageContainer } from '@/shared/components'
import { cn } from '@/shared/utils'

const MedicationDetailPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { user } = useAuth()

  const medicationId = Number(id)
  const queryClient = useQueryClient()
  const { data: medication, isLoading, error } = useMedication(medicationId)
  const { isOpen, open, close } = useDisclosure<'register' | 'adjust'>()
  const [selectedLot, setSelectedLot] = useState<MedicationLotResponseDto | null>(null)

  const canRegisterLot =
    user?.role === RoleEnum.ADMIN ||
    user?.role === RoleEnum.HR ||
    user?.role === RoleEnum.MANAGEMENT

  if (isLoading) {
    return (
      <PageContainer title="Detalle de medicamento" description="Vista maestra y operativa del medicamento">
        <MedicationDetailSkeleton />
      </PageContainer>
    )
  }

  if (error) {
    return (
      <EntityState
        title="Error al cargar"
        description="No fue posible obtener la información del medicamento"
        actionText="Volver"
        onAction={() => navigate('/medications')}
      />
    )
  }

  if (!medication) {
    return (
      <EntityState
        title="Medicamento no encontrado"
        description="El medicamento que buscas no existe o fue eliminado."
        actionText="Volver"
        onAction={() => navigate('/medications')}
      />
    )
  }

  const invalidateLotsAndMovements = () => {
    queryClient.invalidateQueries({ queryKey: MEDICATION_QUERY_KEYS.lots(medicationId) })
    queryClient.invalidateQueries({ queryKey: MEDICATION_QUERY_KEYS.movements(medicationId) })
  }

  const handleAdjust = (lot: MedicationLotResponseDto) => {
    setSelectedLot(lot)
    open('adjust')
  }

  const handleCloseAdjust = () => {
    close()
    setSelectedLot(null)
  }

  const handleRegisterSuccess = () => {
    close()
    invalidateLotsAndMovements()
  }

  const handleAdjustSuccess = () => {
    handleCloseAdjust()
    invalidateLotsAndMovements()
  }

  return (
    <PageContainer
      title="Detalle de medicamento"
      description="Vista maestra y operativa del medicamento"
    >
      <div className="space-y-5">
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
            <Button variant="outline" onClick={() => navigate('/medications')}>
              Volver
            </Button>

            <Button variant="info" onClick={() => navigate(`/medications/${medication.id}/edit`)}>
              Editar
            </Button>

            {canRegisterLot && (
              <Button variant="primary" onClick={() => open('register')}>
                Registrar lote
              </Button>
            )}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-400">Stock mínimo</p>
            <p className="mt-3 text-4xl font-semibold text-slate-900">
              {medication.minimumStock}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-400">Unidad</p>
            <p className="mt-3 text-lg font-semibold text-slate-900">
              {medication.unitOfMeasure}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-400">OTC</p>
            <p className="mt-3 text-lg font-semibold text-slate-900">
              {medication.isOtc ? 'Sí' : 'No'}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-400">Requiere receta</p>
            <p className="mt-3 text-lg font-semibold text-slate-900">
              {medication.requiresPrescription ? 'Sí' : 'No'}
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-base font-semibold text-slate-900">Información general</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Composición</p>
              <p className="mt-1 text-sm font-medium text-slate-900">{medication.chemicalComposition}</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Presentación</p>
              <p className="mt-1 text-sm font-medium text-slate-900">{medication.presentation ?? '-'}</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Categoría</p>
              <p className="mt-1 text-sm font-medium text-slate-900">{medication.therapeuticCategory.name}</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Unidad de medida</p>
              <p className="mt-1 text-sm font-medium text-slate-900">{medication.unitOfMeasure}</p>
            </div>

            <div className="md:col-span-2">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Observaciones</p>
              <p className="mt-1 text-sm text-slate-600">{medication.notes ?? 'Sin observaciones.'}</p>
            </div>

            <div className="md:col-span-2">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Contraindicaciones</p>
              <p className="mt-1 text-sm text-slate-600">{medication.contraindications ?? 'Sin contraindicaciones.'}</p>
            </div>
          </div>
        </div>

        <MedicationLotsSection
          medicationId={medicationId}
          onAdjust={canRegisterLot ? handleAdjust : undefined}
        />

        <MedicationMovementsSection medicationId={medicationId} />

        <RegisterLotModal
          medicationId={medicationId}
          isOpen={isOpen('register')}
          onClose={close}
          onSuccess={handleRegisterSuccess}
        />

        <AdjustLotModal
          isOpen={isOpen('adjust')}
          lot={selectedLot}
          onClose={handleCloseAdjust}
          onSuccess={handleAdjustSuccess}
        />
      </div>
    </PageContainer>
  )
}

export default MedicationDetailPage
