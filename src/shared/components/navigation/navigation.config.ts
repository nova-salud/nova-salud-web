import { RoleEnum } from '@/core/enums/role.enum'

export type NavigationItem = {
  label: string
  path: string
  badge?: number
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
      { label: 'Dashboard', path: '/' },
      { label: 'Atención Médica', path: '/medical-attention' },
      { label: 'Historia Clínica', path: '/medical-history' },
    ],
  },
  {
    label: 'SEGURIDAD',
    items: [
      { label: 'Accidentes', path: '/accidents' },
      { label: 'Altas Médicas', path: '/medical-discharges', badge: 3 },
      { label: 'Alertas', path: '/alerts', badge: 7 },
    ],
  },
  {
    label: 'FARMACIA',
    items: [
      { label: 'Cardex Digital', path: '/inventory' },
    ],
  },
  {
    label: 'GESTIÓN',
    items: [
      { label: 'Programación EMO', path: '/emo-schedule', badge: 1 },
      { label: 'Terceros / Veto', path: '/third-parties' },
      { label: 'Reportería', path: '/reports' },
      { label: 'Formatos Digitales', path: '/digital-formats' },
    ],
  },
]