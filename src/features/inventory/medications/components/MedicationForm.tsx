import { useState } from 'react'
import { cn } from '@/shared/utils'
import type { CreateMedicationDto } from '../types/create-medication.dto'
import { Button, Checkbox, Input, Select, Textarea } from '@/shared/components/ui/form'
import { useNavigate } from 'react-router'

type Category = {
  id: number
  name: string
}

type Props = {
  initialValues?: Partial<CreateMedicationDto>
  categories: Category[]
  onSubmit: (data: CreateMedicationDto) => void
  isLoading?: boolean
}

const MedicationForm = ({
  initialValues = {},
  categories,
  onSubmit,
  isLoading = false,
}: Props) => {
  const navigate = useNavigate()
  const [isOtc, setIsOtc] = useState(initialValues.isOtc ?? false)
  const [requiresPrescription, setRequiresPrescription] = useState(initialValues.requiresPrescription ?? false)

  const handleSubmit = (e: { preventDefault(): void; currentTarget: HTMLFormElement }) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)

    const dto: CreateMedicationDto = {
      commercialName: data.get('commercialName') as string,
      genericName: data.get('genericName') as string,
      chemicalComposition: data.get('chemicalComposition') as string,
      therapeuticCategoryId: Number(data.get('medication')),
      presentation: data.get('presentation') as string,
      unitOfMeasure: data.get('unitOfMeasure') as string,
      minimumStock: Number(data.get('minimumStock')),
      isOtc,
      requiresPrescription,
      notes: data.get('notes') as string,
      contraindications: data.get('contraindications') as string,
    }

    onSubmit(dto)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-semibold text-slate-900">
          Información general
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Nombre comercial"
            name="commercialName"
            type="text"
            value={initialValues.commercialName ?? ''}
            placeholder="Ej. Paracetamol Genfar"
            required
          />

          <Input
            label="Nombre genérico"
            name="genericName"
            type="text"
            value={initialValues.genericName ?? ''}
            placeholder="Ej. Acetaminofén"
          />

          <Input
            label="Composición"
            name="chemicalComposition"
            type="text"
            value={initialValues.chemicalComposition ?? ''}
            className="md:col-span-2"
            placeholder="Ej. Acetaminofén 500mg, almidón de maíz, celulosa microcristalina"
            required
          />

          <Select
            name="medication"
            label="Categoría"
            value={initialValues.therapeuticCategoryId}
            options={categories.map((c) => ({
              label: c.name,
              value: c.id,
            }))}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-semibold text-slate-900">
          Configuración
        </h3>

        <div className="grid gap-4 md:grid-cols-3">
          <Input
            label="Presentación"
            name="presentation"
            type="text"
            value={initialValues.presentation ?? ''}
            placeholder="Ej. Tabletas, jarabe, cápsulas"
          />

          <Input
            label="Unidad de medida"
            name="unitOfMeasure"
            type="text"
            value={initialValues.unitOfMeasure ?? ''}
            placeholder="Ej. mg, ml, UI"
            required
          />

          <Input
            label="Stock mínimo"
            name="minimumStock"
            type="number"
            value={initialValues.minimumStock ?? 0}
            placeholder="Ej. 50"
            required
          />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-semibold text-slate-900">
          Reglas
        </h3>

        <div className="flex gap-6">
          <Checkbox
            label="OTC"
            checked={isOtc}
            onChange={setIsOtc}
          />

          <Checkbox
            label="Requiere receta"
            checked={requiresPrescription}
            onChange={setRequiresPrescription}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-semibold text-slate-900">
          Observaciones
        </h3>

        <Textarea
          name="notes"
          value={initialValues.notes ?? ''}
          placeholder="Ej. Conservar en lugar fresco y seco, evitar la exposición directa al sol"
        />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-semibold text-slate-900">
          Contraindicaciones
        </h3>

        <Textarea
          name="contraindications"
          value={initialValues.contraindications ?? ''}
          placeholder="Ej. Hipersensibilidad al principio activo, insuficiencia hepática grave"
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button
          variant='error'
          onClick={() => { navigate(-1)}}
          disabled={isLoading}
          className={cn(
            'rounded-lg px-6 py-2 text-sm font-medium text-white transition',
            isLoading && 'opacity-50 cursor-not-allowed',
          )}
        >
          Atrás
        </Button>

        <Button
          type="submit"
          disabled={isLoading}
          className={cn(
            'rounded-lg px-6 py-2 text-sm font-medium text-white transition',
            'bg-[#0B1739] hover:opacity-90',
            isLoading && 'opacity-50 cursor-not-allowed',
          )}
        >
          {isLoading ? 'Guardando...' : 'Guardar'}
        </Button>
      </div>
    </form>
  )
}

export default MedicationForm
