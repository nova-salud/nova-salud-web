import PageContainer from '@/shared/components/ui/PageContainer'
import { Button, Input, Select, Textarea } from '@/shared/components/ui/form'
import { useCreateDispensation } from '../hooks/useCreateDispensation'
import {
  useCreateDispensationForm,
} from '../hooks/useCreateDispensationForm'
import { DISPENSE_TYPE_OPTIONS } from '../types/dispense-type.enum'

const CreateDispensationPage = () => {
  const { create, isLoading, error } = useCreateDispensation()
  const {
    values,
    medicationOptions,
    canSubmit,
    handleChange,
    handleAddItem,
    handleRemoveItem,
    buildDto,
    getMedicationName,
  } = useCreateDispensationForm()

  const handleSubmit = async () => {
    const dto = buildDto()

    if (!dto) {
      return
    }

    await create(dto)
  }

  return (
    <PageContainer
      title="Nueva dispensación"
      description="Registro de salida de medicamentos"
    >
      <div className="space-y-5">
        {error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900">
            Información general
          </h3>

          <div className="grid gap-4 md:grid-cols-2">
            <Select
              label="Tipo de dispensación"
              value={values.dispenseType}
              onChange={(value) =>
                handleChange('dispenseType')(value as typeof values.dispenseType)
              }
              options={DISPENSE_TYPE_OPTIONS}
            />

            <Input
              label="Motivo"
              placeholder="Ej: Dolor de cabeza, atención ambulatoria, entrega a tercero."
              value={values.reason}
              onChange={handleChange('reason')}
            />

            <Input
              label="DNI tercero"
              placeholder="Ej: 87654321"
              value={values.thirdPartyDni}
              onChange={handleChange('thirdPartyDni')}
            />
          </div>

          <Textarea
            label="Observaciones"
            placeholder="Observaciones generales de la dispensación"
            value={values.notes}
            onChange={handleChange('notes')}
          />
        </div>

        <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900">
            Medicamentos
          </h3>

          <div className="grid gap-4 md:grid-cols-2">
            <Select
              label="Medicamento"
              value={values.selectedMedicationId}
              onChange={handleChange('selectedMedicationId')}
              options={medicationOptions}
            />

            <Input
              type="number"
              label="Cantidad"
              placeholder="Ej: 3"
              value={values.quantity}
              onChange={handleChange('quantity')}
            />

            <Input
              label="Dosis / indicación"
              placeholder="Ej: 1 tableta cada 8 horas"
              value={values.doseInstruction}
              onChange={handleChange('doseInstruction')}
            />

            <Input
              label="Observación del ítem"
              placeholder="Ej: Entrega para 3 días"
              value={values.observation}
              onChange={handleChange('observation')}
            />
          </div>

          <div>
            <Button
              type="button"
              variant="secondary"
              onClick={handleAddItem}
              className="w-auto px-4 py-2"
            >
              Agregar medicamento
            </Button>
          </div>

          <div className="space-y-2">
            {values.items.length === 0 ? (
              <p className="text-sm text-slate-500">
                No has agregado medicamentos.
              </p>
            ) : (
              values.items.map((item) => (
                <div
                  key={item.medicationId}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {getMedicationName(item.medicationId)}
                    </p>
                    <p className="text-xs text-slate-500">
                      Cantidad: {item.quantity}
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant="error"
                    onClick={() => handleRemoveItem(item.medicationId)}
                    className="w-auto px-3 py-2"
                  >
                    Quitar
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="button"
            isLoading={isLoading}
            loadingText="Guardando..."
            disabled={!canSubmit}
            onClick={() => void handleSubmit()}
            className="w-auto px-6 py-2"
          >
            Guardar dispensación
          </Button>
        </div>
      </div>
    </PageContainer>
  )
}

export default CreateDispensationPage