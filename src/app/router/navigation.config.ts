import { RoleEnum } from '@/core/enums/role.enum'
import { ArrowLeftRight, ClipboardList, LayoutDashboard, Pill, Settings, Truck, Users, type LucideIcon } from 'lucide-react'

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
      {
        label: 'Dashboard',
        path: '/',
        icon: LayoutDashboard,
        roles: [
          RoleEnum.ADMIN,
          RoleEnum.OCCUPATIONAL_DOCTOR,
          RoleEnum.NURSE,
          RoleEnum.SST,
          RoleEnum.HR,
          RoleEnum.SUPERVISOR,
          RoleEnum.MANAGEMENT,
        ],
      },
    ],
  },
  {
    label: 'ATENCIONES',
    items: [
      {
        label: 'Enfermedades',
        path: '/diseases',
        icon: ClipboardList,
        roles: [
          RoleEnum.ADMIN,
          RoleEnum.OCCUPATIONAL_DOCTOR,
          RoleEnum.NURSE,
        ],
      },
    ],
  },
  {
    label: 'FARMACIA',
    items: [
      {
        label: 'Medicamentos',
        path: '/medications',
        icon: Pill,
        roles: [
          RoleEnum.ADMIN,
          RoleEnum.OCCUPATIONAL_DOCTOR,
          RoleEnum.NURSE,
        ],
      },
      {
        label: 'Requerimientos',
        path: '/requirements',
        icon: Truck,
        roles: [
          RoleEnum.ADMIN,
          RoleEnum.OCCUPATIONAL_DOCTOR,
          RoleEnum.NURSE,
        ],
      },
      {
        label: 'Dispensaciones',
        path: '/dispensations',
        icon: ClipboardList,
        roles: [
          RoleEnum.ADMIN,
          RoleEnum.OCCUPATIONAL_DOCTOR,
          RoleEnum.NURSE,
          RoleEnum.SUPERVISOR,
        ],
      },
      {
        label: 'Movimientos',
        path: '/movements',
        icon: ArrowLeftRight,
        roles: [
          RoleEnum.ADMIN,
          RoleEnum.OCCUPATIONAL_DOCTOR,
          RoleEnum.NURSE,
        ],
      },
    ],
  },
  {
    label: 'RRHH',
    items: [
      {
        label: 'Empleados',
        path: '/employees',
        icon: Users,
        roles: [
          RoleEnum.ADMIN,
          RoleEnum.HR,
          RoleEnum.MANAGEMENT,
        ],
      },
      {
        label: 'Áreas',
        path: '/areas',
        icon: ClipboardList,
        roles: [
          RoleEnum.ADMIN,
          RoleEnum.HR,
          RoleEnum.MANAGEMENT,
        ],
      },
    ],
  },
  {
    label: 'SISTEMA',
    items: [
      {
        label: 'Sync RRHH',
        path: '/system-settings/employee-sync',
        icon: Settings,
        roles: [
          RoleEnum.ADMIN,
        ],
      },
    ],
  },
  {
    label: 'SEGURIDAD',
    items: [
      {
        label: 'Usuarios',
        path: '/users',
        icon: Users,
        roles: [
          RoleEnum.ADMIN,
        ],
      },
    ],
  },
]