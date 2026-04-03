import PageContainer from '@/shared/components/ui/PageContainer'
import { useCreateDispensation } from '../hooks/useCreateDispensation'
import { DISPENSE_TYPE_OPTIONS, useCreateDispensationForm } from '../hooks/useCreateDispensationForm'
import { Input, Select, Textarea } from '@/shared/components/ui/form'


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
          <h3 className="text-sm font-semibold text-slate-900">Información general</h3>

          <div className="grid gap-4 md:grid-cols-2">
            <Select
              label="Tipo de dispensación"
              value={values.dispenseType}
              onChange={(value) => handleChange('dispenseType')(value as typeof values.dispenseType)}
              options={DISPENSE_TYPE_OPTIONS.map((item) => ({ ...item }))}
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
          <h3 className="text-sm font-semibold text-slate-900">Medicamentos</h3>

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
            <button
              type="button"
              onClick={handleAddItem}
              className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Agregar medicamento
            </button>
          </div>

          <div className="space-y-2">
            {values.items.length === 0 ? (
              <p className="text-sm text-slate-500">No has agregado medicamentos.</p>
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

                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item.medicationId)}
                    className="text-sm text-red-500"
                  >
                    Quitar
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            disabled={isLoading || !canSubmit}
            onClick={() => void handleSubmit()}
            className="rounded-2xl bg-[#0B1739] px-6 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? 'Guardando...' : 'Guardar dispensación'}
          </button>
        </div>
      </div>
    </PageContainer>
  )
}

export default CreateDispensationPage