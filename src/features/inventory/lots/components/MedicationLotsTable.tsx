import DataTable from '@/shared/components/ui/table/DataTable'
import type { MedicationLotResponseDto } from '../types/medication-lot-response.dto'

type Props = {
  items: MedicationLotResponseDto[]
  isLoading?: boolean
}

const MedicationLotsTable = ({ items, isLoading = false }: Props) => {
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
      ]}
      renderRow={(item) => (
        <tr
          key={item.id}
          className="border-t border-slate-100 text-sm text-slate-700"
        >
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
        </tr>
      )}
    />
  )
}

export default MedicationLotsTable