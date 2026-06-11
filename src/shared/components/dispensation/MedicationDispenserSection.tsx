import { useMemo, useState } from 'react'
import { toastService } from '@/core/services/toast.service'
import { SortOrder } from '@/core/types/query-params.type'
import type { PaginatedResponse } from '@/core/types/paginated-response.type'
import type { EmployeeAllergyResponseDto } from '@/features/employees/types/employee-allergy-response.dto'
import { STOCK_QUERY_KEYS } from '@/features/inventory/stocks/constants/stock-query-keys'
import { stockService } from '@/features/inventory/stocks/services/stock.service'
import type { InventoryStockResponseDto } from '@/features/inventory/stocks/types/inventory-stock-response.dto'
import type { CreateDispensationItemDto } from '@/features/inventory/dispensations/types/create-dispensation-item.dto'
import { useAppQuery } from '@/shared/hooks'
import { Button, Input, SearchSelect } from '@/shared/components/ui/form'

const STOCKS_QUERY = {
  page: 1,
  pageSize: 200,
  sortBy: 'commercialName',
  sortOrder: SortOrder.ASC,
  isActive: true,
}

type Props = {
  allergies?: EmployeeAllergyResponseDto[]
  items: CreateDispensationItemDto[]
  onAdd: (medicationId: number, quantity: number, commercialName: string) => void
  onRemove: (medicationId: number) => void
  noCard?: boolean
}

export const MedicationDispenserSection = ({ allergies = [], items, onAdd, onRemove, noCard = false }: Props) => {
  const { data: stocksResponse } = useAppQuery<PaginatedResponse<InventoryStockResponseDto>>({
    queryKey: STOCK_QUERY_KEYS.list(STOCKS_QUERY),
    queryFn: () => stockService.findAll(STOCKS_QUERY),
  })
  const stocks = stocksResponse?.data ?? []

  const [selectedMedicationId, setSelectedMedicationId] = useState('')
  const [quantity, setQuantity] = useState('1')

  const allergyIdSet = useMemo(
    () => new Set(allergies.map((a) => a.medicationId)),
    [allergies],
  )

  const addedIdSet = useMemo(
    () => new Set(items.map((i) => i.medicationId)),
    [items],
  )

  const medicationNameMap = useMemo(
    () => new Map(stocks.map((s) => [s.medicationId, s.commercialName])),
    [stocks],
  )

  const options = useMemo(
    () =>
      stocks
        .filter((s) => !addedIdSet.has(s.medicationId))
        .map((s) => ({
          label:
            s.currentStock > 0
              ? `${s.commercialName} (stock: ${s.currentStock})`
              : `${s.commercialName} (sin stock)`,
          value: s.medicationId,
        })),
    [stocks, addedIdSet],
  )

  const handleSelectMedication = (value: string) => {
    const medicationId = Number(value)
    const stock = stocks.find((s) => s.medicationId === medicationId)

    if (!stock) return

    if (stock.currentStock === 0) {
      toastService.error('Este medicamento no tiene stock disponible')
      return
    }

    if (allergyIdSet.has(medicationId)) {
      toastService.error('El trabajador tiene alergia a este medicamento')
      return
    }

    setSelectedMedicationId(value)
  }

  const handleAdd = () => {
    const medicationId = Number(selectedMedicationId)
    const qty = Number(quantity)

    if (!medicationId || qty <= 0) return

    const stock = stocks.find((s) => s.medicationId === medicationId)
    if (!stock) return

    onAdd(medicationId, qty, stock.commercialName)
    setSelectedMedicationId('')
    setQuantity('1')
  }

  return (
    <div className={noCard ? 'space-y-4' : 'space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm'}>
      <h3 className="text-sm font-semibold text-slate-900">Medicamentos</h3>

      <div className="grid gap-4 md:grid-cols-2">
        <SearchSelect
          label="Medicamento"
          value={selectedMedicationId}
          options={options}
          placeholder="Buscar medicamento..."
          onChange={handleSelectMedication}
        />

        <Input
          name="quantity"
          type="number"
          label="Cantidad"
          placeholder="Ej: 3"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          step={1}
        />
      </div>

      <div>
        <Button
          type="button"
          variant="secondary"
          onClick={handleAdd}
          disabled={!selectedMedicationId}
          className="w-auto px-4 py-2"
        >
          Agregar medicamento
        </Button>
      </div>

      <div className="space-y-2">
        {items.length === 0 ? (
          <p className="text-sm text-slate-500">No has agregado medicamentos.</p>
        ) : (
          items.map((item) => (
            <div
              key={item.medicationId}
              className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-slate-900">
                  {medicationNameMap.get(item.medicationId) ?? `Medicamento ${item.medicationId}`}
                </p>
                <p className="text-xs text-slate-500">Cantidad: {item.quantity}</p>
              </div>

              <Button
                type="button"
                variant="error"
                onClick={() => onRemove(item.medicationId)}
                className="w-auto px-3 py-2"
              >
                Quitar
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
