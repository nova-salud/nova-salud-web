import { useState } from 'react'
import { useRequirement } from './useRequirement'
import { useConfirmRequirement } from './useConfirmRequirement'
import type { ConfirmInventoryRequirementItemDto } from '../types/confirm-inventory-requirement.dto'

export const useRequirementDetail = (id: number) => {
  const { data, isLoading, error, refetch } = useRequirement(id)
  const { confirm, isLoading: isConfirming, error: confirmError } = useConfirmRequirement()

  const [isDeliverModalOpen, setIsDeliverModalOpen] = useState(false)
  const [isConfirmSidebarOpen, setIsConfirmSidebarOpen] = useState(false)

  const canDeliver = data?.status === 'PENDING'
  const canConfirm = data?.status === 'DELIVERED'

  const handleConfirm = async (items: ConfirmInventoryRequirementItemDto[]) => {
    if (!data) return

    const result = await confirm(data.id, { items })

    if (result) {
      await refetch()
    }
  }

  return {
    data,
    isLoading,
    error,
    refetch,
    canDeliver,
    canConfirm,
    isConfirming,
    confirmError,
    isDeliverModalOpen,
    openDeliverModal: () => setIsDeliverModalOpen(true),
    closeDeliverModal: () => setIsDeliverModalOpen(false),
    isConfirmSidebarOpen,
    openConfirmSidebar: () => setIsConfirmSidebarOpen(true),
    closeConfirmSidebar: () => setIsConfirmSidebarOpen(false),
    handleConfirm,
  }
}
