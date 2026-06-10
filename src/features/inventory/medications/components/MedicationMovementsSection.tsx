import { useMedicationMovements } from '../hooks'
import { MedicationMovementsTable } from './MedicationMovementsTable'

type Props = {
  medicationId: number
}

export const MedicationMovementsSection = ({ medicationId }: Props) => {
  const { data, isLoading, pagination } = useMedicationMovements(medicationId)

  return (
    <div className="space-y-2">
      <h2 className="px-1 text-base font-semibold text-slate-900">Movimientos</h2>
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <MedicationMovementsTable
          items={data}
          isLoading={isLoading}
          pagination={pagination}
        />
      </div>
    </div>
  )
}
