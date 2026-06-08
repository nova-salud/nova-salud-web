import { Button, Input, Select } from '@/shared/components/ui/form'
import Sidebar from '@/shared/components/ui/sidebar/Sidebar'
import type {
  CreateDiseaseDto,
  DiseaseResponseDto,
  UpdateDiseaseDto,
} from '../types'
import { DISEASE_TYPE_OPTIONS, DiseaseType } from '../types/disease-type.enum'

type DiseaseFormMode = 'create' | 'edit'

type Props = {
  isOpen: boolean
  mode: DiseaseFormMode
  disease?: DiseaseResponseDto | null
  isLoading?: boolean
  onClose: () => void
  onCreate?: (dto: CreateDiseaseDto) => Promise<void> | void
  onUpdate?: (id: number, dto: UpdateDiseaseDto) => Promise<void> | void
}

const DiseaseFormSidebarContent = ({
  mode,
  disease,
  isLoading = false,
  onClose,
  onCreate,
  onUpdate,
}: Omit<Props, 'isOpen'>) => {
  const handleSubmit = async (e: { preventDefault(): void; currentTarget: HTMLFormElement }) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const code = (data.get('code') as string).trim().toUpperCase()
    const name = (data.get('name') as string).trim()
    if (!code || !name) return

    const category = (data.get('category') as string).trim() || undefined
    const diseaseTypeValue = data.get('diseaseType') as string
    const diseaseType = diseaseTypeValue ? (diseaseTypeValue as DiseaseType) : undefined

    if (mode === 'create') {
      await onCreate?.({ code, name, category, diseaseType, isActive: true })
      return
    }

    if (!disease || !onUpdate) return

    const isActive = data.get('status') === 'true'
    await onUpdate(disease.id, { code, name, category, diseaseType, isActive })
  }

  return (
    <form className="space-y-4" onSubmit={(e) => void handleSubmit(e)}>
      <Input
        label="Código"
        name="code"
        type="text"
        placeholder="Ej. J06.9"
        value={disease?.code}
      />

      <Input
        label="Nombre"
        name="name"
        type="text"
        placeholder="Ingresa el nombre de la enfermedad"
        value={disease?.name}
      />

      <Input
        label="Categoría"
        name="category"
        type="text"
        placeholder="Ingresa la categoría"
        value={disease?.category ?? ''}
      />

      <Select
        name="diseaseType"
        label="Tipo de enfermedad"
        defaultValue={disease?.diseaseType ?? ''}
        options={[
          { label: 'Sin especificar', value: '' },
          ...DISEASE_TYPE_OPTIONS,
        ]}
      />

      {mode === 'edit' ? (
        <Select
          name="status"
          label="Estado"
          value={disease?.isActive ? 'true' : 'false'}
          options={[
            { label: 'Activo', value: 'true' },
            { label: 'Inactivo', value: 'false' },
          ]}
        />
      ) : null}

      <div className="flex flex-wrap justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="w-auto"
        >
          Cancelar
        </Button>

        <Button
          type="submit"
          isLoading={isLoading}
          loadingText={mode === 'create' ? 'Guardando...' : 'Actualizando...'}
          className="w-auto"
        >
          {mode === 'create' ? 'Guardar enfermedad' : 'Actualizar enfermedad'}
        </Button>
      </div>
    </form>
  )
}

export const DiseaseFormSidebar = ({
  isOpen,
  mode,
  disease = null,
  isLoading = false,
  onClose,
  onCreate,
  onUpdate,
}: Props) => {
  const formKey = `${mode}-${disease?.id ?? 'new'}-${isOpen ? 'open' : 'closed'}`

  return (
    <Sidebar
      isOpen={isOpen}
      title={mode === 'create' ? 'Nueva enfermedad' : 'Editar enfermedad'}
      description={
        mode === 'create'
          ? 'Completa la información para registrar una nueva enfermedad.'
          : 'Actualiza la información general de la enfermedad.'
      }
      onClose={onClose}
      size="md"
    >
      <DiseaseFormSidebarContent
        key={formKey}
        mode={mode}
        disease={disease}
        isLoading={isLoading}
        onClose={onClose}
        onCreate={onCreate}
        onUpdate={onUpdate}
      />
    </Sidebar>
  )
}

export default DiseaseFormSidebar
