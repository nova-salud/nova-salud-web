import { RoleEnum } from '@/core/enums/role.enum'
import { ArrowLeftRight, ClipboardList, LayoutDashboard, Pill, Truck, type LucideIcon } from 'lucide-react'

export type NavigationItem = {
  label: string
  path: string
  badge?: number
  icon?: LucideIcon
  roles?: RoleEnum[]
}

export type NavigationSection = {
  label: string
  items: NavigationItem[]
}

export const navigationConfig: NavigationSection[] = [
  {
    label: 'PRINCIPAL',
    items: [
      { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    ],
  },
  {
    label: 'FARMACIA',
    items: [
      { label: 'Medicamentos', path: '/medications', icon: Pill },
      { label: 'Entregas', path: '/deliveries', icon: Truck },
      { label: 'Dispensaciones', path: '/dispensations', icon: ClipboardList },
      { label: 'Movimientos', path: '/movements', icon: ArrowLeftRight },
    ],
  }
]