import { useNavigate, useParams } from 'react-router'
import PageContainer from '@/shared/components/ui/PageContainer'
import MedicationForm from '../components/MedicationForm'
import { useMedication } from '../hooks/useMedication'
import { useTherapeuticCategories } from '@/features/inventory/therapeutic-categories/hooks/useTherapeuticCategories'
import { medicationService } from '../services/medication.service'
import { useState } from 'react'
import type { BackendError } from '@/core/types/backend-error.type'
import type { CreateMedicationDto } from '../types/create-medication.dto'

const EditMedicationPage = () => {
  const navigate = useNavigate()
  const params = useParams()

  const id = Number(params.id)

  const { data: medication, isLoading } = useMedication(id)
  const { data: categories } = useTherapeuticCategories()

  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const handleUpdate = async (dto: CreateMedicationDto) => {
    try {
      setSaving(true)
      setError(null)

      await medicationService.update(id, dto)

      navigate(`/medications/${id}`)
    } catch (err) {
      const backendError = err as BackendError

      if (Array.isArray(backendError.message)) {
        setError(backendError.message[0])
      } else {
        setError(backendError.message ?? 'Error al actualizar')
      }
    } finally {
      setSaving(false)
    }
  }

  if (isNaN(id)) {
    return <div>ID inválido</div>
  }

  return (
    <PageContainer
      title="Editar medicamento"
      description="Actualización de medicamento"
    >
      <div className="space-y-5">
        {error && <div className="text-red-500 text-sm">{error}</div>}

        {isLoading || !medication ? (
          <div>Cargando...</div>
        ) : (
          <MedicationForm
            categories={categories}
            initialValues={{
              commercialName: medication.commercialName,
              genericName: medication.genericName ?? '',
              chemicalComposition: medication.chemicalComposition,
              therapeuticCategoryId: medication.therapeuticCategory.id,
              presentation: medication.presentation ?? '',
              unitOfMeasure: medication.unitOfMeasure,
              minimumStock: medication.minimumStock,
              isOtc: medication.isOtc,
              requiresPrescription: medication.requiresPrescription,
              notes: medication.notes ?? '',
            }}
            onSubmit={handleUpdate}
            isLoading={saving}
          />
        )}
      </div>
    </PageContainer>
  )
}

export default EditMedicationPage