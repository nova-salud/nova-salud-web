import { RoleEnum } from '@/core/enums/role.enum'
import {
  Activity,
  ArrowLeftRight,
  BellDot,
  BookOpen,
  Building2,
  ClipboardPlus,
  FileBadge,
  FileText,
  FlaskConical,
  Layers,
  LayoutDashboard,
  Pill,
  RefreshCw,
  ShieldAlert,
  ShoppingCart,
  Stethoscope,
  UserCog,
  Users,
  Briefcase,
  type LucideIcon,
} from 'lucide-react'

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
      {
        label: 'Alertas',
        path: '/alerts',
        icon: BellDot,
        roles: [
          RoleEnum.ADMIN,
        ],
      },
    ],
  },
  {
    label: 'ATENCIONES',
    items: [
      {
        label: 'Historias Clínicas',
        path: '/clinical-histories',
        icon: BookOpen,
        roles: [
          RoleEnum.ADMIN,
          RoleEnum.OCCUPATIONAL_DOCTOR,
          RoleEnum.NURSE,
        ],
      },
      {
        label: 'Atención clínica',
        path: '/clinical-attention',
        icon: Stethoscope,
        roles: [
          RoleEnum.ADMIN,
          RoleEnum.OCCUPATIONAL_DOCTOR,
          RoleEnum.NURSE,
        ],
      },
      {
        label: 'Enfermedades',
        path: '/diseases',
        icon: Activity,
        roles: [
          RoleEnum.ADMIN,
          RoleEnum.OCCUPATIONAL_DOCTOR,
          RoleEnum.NURSE,
        ],
      },
      {
        label: 'Exámenes',
        path: '/exams',
        icon: FlaskConical,
        roles: [
          RoleEnum.ADMIN,
          RoleEnum.OCCUPATIONAL_DOCTOR,
          RoleEnum.NURSE,
        ],
      },
    ],
  },
  {
    label: 'SALUD OCUPACIONAL',
    items: [
      {
        label: 'Accidentes',
        path: '/accidents',
        icon: ShieldAlert,
        roles: [
          RoleEnum.SST,
          RoleEnum.ADMIN,
        ],
      },
      {
        label: 'Establecimientos de salud',
        path: '/healthcare-centers',
        icon: Building2,
        roles: [
          RoleEnum.ADMIN,
          RoleEnum.OCCUPATIONAL_DOCTOR,
          RoleEnum.NURSE,
          RoleEnum.SST,
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
        icon: ShoppingCart,
        roles: [
          RoleEnum.ADMIN,
          RoleEnum.OCCUPATIONAL_DOCTOR,
          RoleEnum.NURSE,
        ],
      },
      {
        label: 'Dispensaciones',
        path: '/dispensations',
        icon: ClipboardPlus,
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
        label: 'Externos',
        path: '/externos',
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
        icon: Layers,
        roles: [
          RoleEnum.ADMIN,
          RoleEnum.HR,
          RoleEnum.MANAGEMENT,
        ],
      },
      {
        label: 'Posiciones',
        path: '/positions',
        icon: Briefcase,
        roles: [
          RoleEnum.ADMIN,
          RoleEnum.HR,
          RoleEnum.MANAGEMENT,
        ],
      },
      {
        label: 'Protocolos EMO',
        path: '/emo-protocols',
        icon: FileBadge,
        roles: [
          RoleEnum.ADMIN,
          RoleEnum.OCCUPATIONAL_DOCTOR,
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
        icon: RefreshCw,
        roles: [
          RoleEnum.ADMIN,
        ],
      },
      {
        label: 'Plantillas',
        path: '/document-templates',
        icon: FileText,
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
        icon: UserCog,
        roles: [
          RoleEnum.ADMIN,
        ],
      },
    ],
  },
]
