import PageContainer from '@/shared/components/ui/PageContainer'
import MedicationForm from '../components/MedicationForm'
import { useCreateMedication } from '../hooks/useCreateMedication'
import { useTherapeuticCategories } from '@/features/inventory/therapeutic-categories/hooks/useTherapeuticCategories'

const CreateMedicationPage = () => {
  const { create, isLoading, error } = useCreateMedication()
  const { data: categories } = useTherapeuticCategories()

  return (
    <PageContainer
      title="Nuevo medicamento"
      description="Registro de medicamento"
    >
      <div className="space-y-5">
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <MedicationForm
          categories={categories}
          onSubmit={create}
          isLoading={isLoading}
        />
      </div>
    </PageContainer>
  )
}

export default CreateMedicationPage