import { PageContainer } from '@/shared/components'
import { FormPageSkeleton, MedicationForm } from '../components'
import { useCreateMedication, useSearchTherapeuticCategories } from '../hooks'
import type { CreateMedicationDto } from '../types'
import { useNavigate } from 'react-router'

const CreateMedicationPage = () => {
  const navigate = useNavigate()
  const { create, isLoading, error } = useCreateMedication()
  const { therapeuticCategories: categories, isLoading: isLoadingCategories } = useSearchTherapeuticCategories()

  if (isLoadingCategories) {
    return <FormPageSkeleton />
  }

  const onSubmit = async (data: CreateMedicationDto) => {
    const medication = await create(data)

    if(medication?.id == null) return

    navigate(`/medications/${medication.id}`)
  }

  return (
    <PageContainer title="Nuevo medicamento" description="Registro de medicamento">

      {error && (
        <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <MedicationForm
        categories={categories}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    </PageContainer>
  )
}

export default CreateMedicationPage
