import { DataTable } from '@/shared/components/ui/table/DataTable'
import type { MedicationLotResponseDto } from '../types/medication-lot-response.dto'

type Props = {
  items: MedicationLotResponseDto[]
  isLoading?: boolean
  onAdjust?: (lot: MedicationLotResponseDto) => void
}

const MedicationLotsTable = ({ items, isLoading = false, onAdjust }: Props) => {
  return (
    <DataTable
      data={items}
      isLoading={isLoading}
      emptyMessage="No se encontraron lotes para este medicamento."
      columns={[
        'Lote',
        'Vencimiento',
        'Cantidad inicial',
        'Stock actual',
        'Recepción',
        ...(onAdjust ? ['Acciones'] : []),
      ]}
      renderRow={(item) => (
        <>
          <td className="px-6 py-5 font-medium text-slate-900">
            {item.lotCode}
          </td>

          <td className="px-6 py-5 text-slate-500">
            {new Date(item.expirationDate).toLocaleDateString('es-PE')}
          </td>

          <td className="px-6 py-5 text-slate-500">
            {item.initialQuantity}
          </td>

          <td className="px-6 py-5">
            <span className="font-semibold text-emerald-600">
              {item.currentQuantity}
            </span>
          </td>

          <td className="px-6 py-5 text-slate-500">
            {new Date(item.receivedAt).toLocaleDateString('es-PE')}
          </td>

          {onAdjust && (
            <td className="px-6 py-5">
              <button
                type="button"
                onClick={() => onAdjust(item)}
                className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
              >
                Ajustar
              </button>
            </td>
          )}
        </>
      )}
    />
  )
}

export default MedicationLotsTable