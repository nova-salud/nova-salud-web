import { RoleEnum } from '@/core/enums/role.enum'
import { ArrowLeftRight, ClipboardList, LayoutDashboard, Pill, Truck, Users, type LucideIcon } from 'lucide-react'

export type NavigationItem = {
  label: string
  path: string
  badge?: number
  icon: LucideIcon
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
      { label: 'Requerimientos', path: '/requirements', icon: Truck },
      { label: 'Dispensaciones', path: '/dispensations', icon: ClipboardList },
      { label: 'Movimientos', path: '/movements', icon: ArrowLeftRight },
    ],
  },
  {
    label: 'ADMINISTRACIÓN',
    items: [
      { label: 'Empleados', path: '/employees', icon: Users },
      { label: 'Áreas', path: '/areas', icon: ClipboardList },
    ],
  }
]