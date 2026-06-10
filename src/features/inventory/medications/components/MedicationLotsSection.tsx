import type { MedicationLotResponseDto } from '@/features/inventory/lots/types'
import { useMedicationLots } from '../hooks'
import { MedicationLotsTable } from './MedicationLotsTable'

type Props = {
  medicationId: number
  onAdjust?: (lot: MedicationLotResponseDto) => void
}

export const MedicationLotsSection = ({ medicationId, onAdjust }: Props) => {
  const { data, isLoading, pagination } = useMedicationLots(medicationId)

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 px-1">
        <h2 className="text-base font-semibold text-slate-900">Lotes</h2>
        {!isLoading && (
          <span className="text-sm text-slate-400">{pagination.total} en total</span>
        )}
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <MedicationLotsTable
          items={data}
          isLoading={isLoading}
          pagination={pagination}
          onAdjust={onAdjust}
        />
      </div>
      
    </div>
  )
}
