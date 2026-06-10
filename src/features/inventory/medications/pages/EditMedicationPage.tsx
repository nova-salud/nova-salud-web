import { useNavigate, useParams } from 'react-router'
import { PageContainer, EntityState} from '@/shared/components'
import { FormPageSkeleton, MedicationForm } from '../components'
import { useMedication, useSearchTherapeuticCategories, useUpdateMedication } from '../hooks'
import type { CreateMedicationDto } from '../types/create-medication.dto'

const EditMedicationPage = () => {
  const navigate = useNavigate()
  const params = useParams()
  const id = Number(params.id)

  const { data: medication, isLoading: isLoadingMedication } = useMedication(id)
  const { therapeuticCategories: categories, isLoading: isLoadingCategories } = useSearchTherapeuticCategories()
  const { update, isLoading: isSaving, error } = useUpdateMedication()

  if (isLoadingMedication || isLoadingCategories) {
    return <FormPageSkeleton />
  }

  if (!medication) {
    return <EntityState
      title="Medicamento no encontrado"
      description="El medicamento que intentas editar no existe o fue eliminado."
      actionText="Volver"
      onAction={() => navigate('/medications')}
    />
  }

  const handleUpdate = async (dto: CreateMedicationDto) => {
    const result = await update(id, dto)
    if (result) navigate(`/medications/${id}`)
  }

  return (
    <PageContainer title="Editar medicamento" description="Actualización de medicamento">
      <div className="space-y-5">
        {error && (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

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
            contraindications: medication.contraindications ?? '',
          }}
          onSubmit={handleUpdate}
          isLoading={isSaving}
        />
      </div>
    </PageContainer>
  )
}

export default EditMedicationPage
