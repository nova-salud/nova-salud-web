import { PageContainer } from '@/shared/components'
import { FormPageSkeleton, MedicationForm } from '../components'
import { useCreateMedication, useSearchTherapeuticCategories } from '../hooks'

const CreateMedicationPage = () => {
  const { create, isLoading, error } = useCreateMedication()
  const { therapeuticCategories: categories, isLoading: isLoadingCategories } = useSearchTherapeuticCategories()

  if (isLoadingCategories) {
    return <FormPageSkeleton />
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
        onSubmit={create}
        isLoading={isLoading}
      />
    </PageContainer>
  )
}

export default CreateMedicationPage
