import { useState } from 'react'
import { cn } from '@/shared/utils'
import type { CreateMedicationDto } from '../types/create-medication.dto'
import { Checkbox, Input, Select, Textarea } from '@/shared/components/ui/form'

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
  const [isOtc, setIsOtc] = useState(initialValues.isOtc ?? false)
  const [requiresPrescription, setRequiresPrescription] = useState(initialValues.requiresPrescription ?? false)

  const handleSubmit = (e: { preventDefault(): void; currentTarget: HTMLFormElement }) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    onSubmit({
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
    })
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
            defaultValue={initialValues.commercialName ?? ''}
          />

          <Input
            label="Nombre genérico"
            name="genericName"
            type="text"
            defaultValue={initialValues.genericName ?? ''}
          />

          <Input
            label="Composición"
            name="chemicalComposition"
            type="text"
            defaultValue={initialValues.chemicalComposition ?? ''}
            className="md:col-span-2"
          />

          <Select
            name="medication"
            label="Categoría"
            defaultValue={initialValues.therapeuticCategoryId}
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
            defaultValue={initialValues.presentation ?? ''}
          />

          <Input
            label="Unidad de medida"
            name="unitOfMeasure"
            type="text"
            defaultValue={initialValues.unitOfMeasure ?? ''}
          />

          <Input
            label="Stock mínimo"
            name="minimumStock"
            type="number"
            defaultValue={initialValues.minimumStock ?? 0}
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
          defaultValue={initialValues.notes ?? ''}
          placeholder="Observaciones del medicamento"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            'rounded-2xl px-6 py-2 text-sm font-medium text-white transition',
            'bg-[#0B1739] hover:opacity-90',
            isLoading && 'opacity-50 cursor-not-allowed',
          )}
        >
          {isLoading ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </form>
  )
}

export default MedicationForm
