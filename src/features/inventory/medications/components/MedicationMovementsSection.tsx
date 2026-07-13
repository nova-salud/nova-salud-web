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
      <div className="rounded-3xl border-2 border-slate-300 bg-white shadow-lg overflow-hidden">
        <MedicationMovementsTable
          items={data}
          isLoading={isLoading}
          pagination={pagination}
        />
      </div>
    </div>
  )
}
