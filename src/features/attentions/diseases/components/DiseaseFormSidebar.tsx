import { useMemo, useState } from 'react'
import { Button, Input, Select } from '@/shared/components/ui/form'
import Sidebar from '@/shared/components/ui/sidebar/Sidebar'
import type {
  CreateDiseaseDto,
  DiseaseResponseDto,
  UpdateDiseaseDto,
} from '../types'

type DiseaseFormMode = 'create' | 'edit'

type DiseaseFormValues = {
  code: string
  name: string
  category: string
  isActive: boolean
}

type Props = {
  isOpen: boolean
  mode: DiseaseFormMode
  disease?: DiseaseResponseDto | null
  isLoading?: boolean
  onClose: () => void
  onCreate?: (dto: CreateDiseaseDto) => Promise<void> | void
  onUpdate?: (id: number, dto: UpdateDiseaseDto) => Promise<void> | void
}

const INITIAL_VALUES: DiseaseFormValues = {
  code: '',
  name: '',
  category: '',
  isActive: true,
}

const DiseaseFormSidebarContent = ({
  mode,
  disease,
  isLoading = false,
  onClose,
  onCreate,
  onUpdate,
}: Omit<Props, 'isOpen'>) => {
  const initialValues = useMemo<DiseaseFormValues>(() => {
    if (mode === 'edit' && disease) {
      return {
        code: disease.code,
        name: disease.name,
        category: disease.category ?? '',
        isActive: disease.isActive,
      }
    }

    return INITIAL_VALUES
  }, [mode, disease])

  const [values, setValues] = useState<DiseaseFormValues>(initialValues)

  const handleChange =
    <K extends keyof DiseaseFormValues>(key: K) =>
    (value: DiseaseFormValues[K]) => {
      setValues((prev) => ({ ...prev, [key]: value }))
    }

  const isValid = useMemo<boolean>(() => {
    return Boolean(values.code.trim() && values.name.trim())
  }, [values.code, values.name])

  const buildCreateDto = (): CreateDiseaseDto | null => {
    if (!isValid) {
      return null
    }

    return {
      code: values.code.trim().toUpperCase(),
      name: values.name.trim(),
      category: values.category.trim() || undefined,
      isActive: values.isActive,
    }
  }

  const buildUpdateDto = (): UpdateDiseaseDto | null => {
    if (!isValid) {
      return null
    }

    return {
      code: values.code.trim().toUpperCase(),
      name: values.name.trim(),
      category: values.category.trim() || undefined,
      isActive: values.isActive,
    }
  }

  const handleSubmit = async () => {
    if (mode === 'create') {
      const dto = buildCreateDto()

      if (!dto || !onCreate) {
        return
      }

      await onCreate(dto)
      return
    }

    if (!disease || !onUpdate) {
      return
    }

    const dto = buildUpdateDto()

    if (!dto) {
      return
    }

    await onUpdate(disease.id, dto)
  }

  const footer = (
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
        type="button"
        isLoading={isLoading}
        loadingText={mode === 'create' ? 'Guardando...' : 'Actualizando...'}
        disabled={!isValid}
        onClick={() => void handleSubmit()}
        className="w-auto"
      >
        {mode === 'create' ? 'Guardar enfermedad' : 'Actualizar enfermedad'}
      </Button>
    </div>
  )

  return (
    <div className="space-y-4">
      <Input
        label="Código"
        placeholder="Ej. J06.9"
        value={values.code}
        onChange={handleChange('code')}
      />

      <Input
        label="Nombre"
        placeholder="Ingresa el nombre de la enfermedad"
        value={values.name}
        onChange={handleChange('name')}
      />

      <Input
        label="Categoría"
        placeholder="Ingresa la categoría"
        value={values.category}
        onChange={handleChange('category')}
      />

      {mode === 'edit' ? (
        <Select
          label="Estado"
          value={values.isActive ? 'true' : 'false'}
          onChange={(value) => handleChange('isActive')(value === 'true')}
          options={[
            { label: 'Activo', value: 'true' },
            { label: 'Inactivo', value: 'false' },
          ]}
        />
      ) : null}

      {footer}
    </div>
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