export type MetricPanelInfo = {
  title: string
  actionLabel?: string
  path?: string
}

export const PERSONAL_PANEL: MetricPanelInfo = {
  title: 'Personal',
  actionLabel: 'Ver empleados',
  path: '/employees'
}

export const ACCIDENTAL_PANEL: MetricPanelInfo = {
  title: 'Accidentalidad',
  actionLabel: 'Ver accidentes',
  path: '/accidents'
}

export const ALERTAS_PANEL: MetricPanelInfo = {
  title: 'Alertas',
  actionLabel: 'Ver alertas',
  path: '/alerts'
}

export const SISTEMA_PANEL: MetricPanelInfo = {
  title: 'Sistema',
  actionLabel: 'Ir a sync',
  path: '/system-settings/employee-sync'
}
