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
  const [form, setForm] = useState<CreateMedicationDto>({
    commercialName: '',
    genericName: '',
    chemicalComposition: '',
    therapeuticCategoryId: 0,
    presentation: '',
    unitOfMeasure: '',
    minimumStock: 0,
    isOtc: false,
    requiresPrescription: false,
    notes: '',
    ...initialValues,
  })

  const handleChange = (key: keyof CreateMedicationDto) => (value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form)
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
            value={form.commercialName}
            onChange={handleChange('commercialName')}
          />

          <Input
            label="Nombre genérico"
            value={form.genericName}
            onChange={handleChange('genericName')}
          />

          <Input
            label="Composición"
            value={form.chemicalComposition}
            onChange={handleChange('chemicalComposition')}
            className="md:col-span-2"
          />

          <Select
            label="Categoría"
            value={form.therapeuticCategoryId}
            onChange={(value) =>
              handleChange('therapeuticCategoryId')(Number(value))
            }
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
            value={form.presentation}
            onChange={handleChange('presentation')}
          />

          <Input
            label="Unidad de medida"
            value={form.unitOfMeasure}
            onChange={handleChange('unitOfMeasure')}
          />

          <Input
            type="number"
            label="Stock mínimo"
            value={form.minimumStock}
            onChange={(value) =>
              handleChange('minimumStock')(Number(value))
            }
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
            checked={form.isOtc}
            onChange={(value) => handleChange('isOtc')(value)}
          />

          <Checkbox
            label="Requiere receta"
            checked={form.requiresPrescription}
            onChange={(value) =>
              handleChange('requiresPrescription')(value)
            }
          />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-semibold text-slate-900">
          Observaciones
        </h3>

        <Textarea
          value={form.notes}
          onChange={handleChange('notes')}
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