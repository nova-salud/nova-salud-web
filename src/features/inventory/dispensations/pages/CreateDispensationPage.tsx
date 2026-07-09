import { useState } from 'react'
import { employeeService } from '@/features/employees/services/employee.service'
import type { EmployeeAllergyResponseDto } from '@/features/employees/types/employee-allergy-response.dto'
import type { EmployeeResponseDto } from '@/features/employees/types/employee-response.dto'
import { clinicalAttentionService } from '@/features/clinical-histories/clinical-attention/services/clinical-attention.service'
import { MedicationDispenserSection } from '@/shared/components/dispensation/MedicationDispenserSection'
import { EmployeeSearchSelector } from '@/shared/components/employee/EmployeeSearchSelector'
import SelectedEmployeeCard from '@/shared/components/employee/SelectedEmployeeCard'
import { PageContainer } from '@/shared/components'
import { Button, Input, Select, Textarea } from '@/shared/components/ui/form'
import { useCreateDispensation } from '../hooks/useCreateDispensation'
import { useCreateDispensationForm } from '../hooks/useCreateDispensationForm'
import { DISPENSE_TYPE_OPTIONS } from '../types/dispense-type.enum'

const DISCLAIMER = 'Solo se pueden registrar dispensaciones al personal que ya cuenta con una historia clínica registrada.'

const CreateDispensationPage = () => {
  const { create, isLoading, error } = useCreateDispensation()
  const {
    values,
    canSubmit,
    handleChange,
    handleAddItem,
    handleRemoveItem,
    buildDto,
  } = useCreateDispensationForm()

  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeResponseDto | null>(null)
  const [allergies, setAllergies] = useState<EmployeeAllergyResponseDto[]>([])
  const [hasClinicalHistory, setHasClinicalHistory] = useState<boolean | null>(null)
  const [isCheckingClinicalHistory, setIsCheckingClinicalHistory] = useState(false)

  const handleSelectEmployee = async (employee: EmployeeResponseDto) => {
    setSelectedEmployee(employee)
    setIsCheckingClinicalHistory(true)

    try {
      const [allergiesResult, clinicalHistory] = await Promise.all([
        employeeService.findAllergies(employee.id).catch(() => []),
        clinicalAttentionService.findClinicalHistoryByEmployeeId(employee.id),
      ])

      setAllergies(allergiesResult)
      setHasClinicalHistory(clinicalHistory !== null)
    } finally {
      setIsCheckingClinicalHistory(false)
    }
  }

  const handleClearEmployee = () => {
    setSelectedEmployee(null)
    setAllergies([])
    setHasClinicalHistory(null)
  }

  const handleSubmit = async () => {
    if (!selectedEmployee) return

    const dto = buildDto(selectedEmployee.id)

    if (!dto) {
      return
    }

    await create(dto)
  }

  if (!selectedEmployee) {
    return (
      <PageContainer
        title="Nueva dispensación"
        description="Selecciona el trabajador para continuar"
      >
        <div className="space-y-6">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            {DISCLAIMER}
          </div>

          <EmployeeSearchSelector onSelect={(emp) => void handleSelectEmployee(emp)} />
        </div>
      </PageContainer>
    )
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

        <SelectedEmployeeCard employee={selectedEmployee} onClear={handleClearEmployee} />

        {isCheckingClinicalHistory ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Verificando historia clínica...
          </div>
        ) : hasClinicalHistory === false ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            Este trabajador no tiene una historia clínica registrada. {DISCLAIMER}
          </div>
        ) : (
          <>
            {allergies.length > 0 && (
              <div className="space-y-2">
                {allergies.map((allergy) => (
                  <div
                    key={allergy.medicationId}
                    className="rounded-3xl border border-amber-200 bg-amber-50 px-4 py-3"
                  >
                    <p className="text-sm font-semibold text-amber-800">
                      Alergia: {allergy.medicationName}
                    </p>
                    {allergy.reaction && (
                      <p className="text-xs text-amber-700">{allergy.reaction}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900">
                Información general
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
                <Select
                  name='dispenseType'
                  label="Tipo de dispensación"
                  value={values.dispenseType}
                  onChange={(value) =>
                    handleChange('dispenseType')(value as typeof values.dispenseType)
                  }
                  options={DISPENSE_TYPE_OPTIONS}
                />

                <Input
                  label="Motivo"
                  name="reason"
                  type="text"
                  placeholder="Ej: Dolor de cabeza, atención ambulatoria, entrega a tercero."
                  value={values.reason}
                  onChange={(e) => handleChange('reason')(e.target.value)}
                />
              </div>

              <Textarea
                label="Dosis / Indicaciones / Observaciones"
                placeholder="Ej: Paracetamol 1 tab c/8h. Ibuprofeno 400mg c/12h con comida."
                value={values.notes}
                onChange={handleChange('notes')}
              />
            </div>

            <MedicationDispenserSection
              allergies={allergies}
              items={values.items}
              onAdd={handleAddItem}
              onRemove={handleRemoveItem}
            />

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
          </>
        )}
      </div>
    </PageContainer>
  )
}

export default CreateDispensationPage
