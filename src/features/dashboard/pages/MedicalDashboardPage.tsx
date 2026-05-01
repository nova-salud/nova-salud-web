import PageContainer from '@/shared/components/ui/PageContainer'
import { Activity, AlertTriangle, CheckCircle2, Users } from 'lucide-react'
import { mockMedicalDashboard } from '../types/medical-dashboard-response'
import { MetricCard } from '@/shared/components/dashboard/MetricCard'
import { cn } from '@/shared/utils'

export const MedicalDashboardPage = () => {
  const data = mockMedicalDashboard

  const mainCards = [
    {
      label: 'Pacientes hoy',
      value: data.summary.patientsToday,
      icon: <Users className="h-5 w-5 text-slate-600" />,
      bg: 'bg-slate-100',
    },
    {
      label: 'Pendientes',
      value: data.summary.pendingConsultations,
      icon: <AlertTriangle className="h-5 w-5 text-amber-600" />,
      bg: 'bg-amber-50',
      valueClassName: 'text-amber-600',
    },
    {
      label: 'Casos activos',
      value: data.summary.activeCases,
      icon: <Activity className="h-5 w-5 text-red-600" />,
      bg: 'bg-red-50',
      valueClassName: 'text-red-600',
    },
    {
      label: 'Altas hoy',
      value: data.summary.dischargesToday,
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-600" />,
      bg: 'bg-emerald-50',
      valueClassName: 'text-emerald-600',
    },
  ]

  const alertCards = [
    {
      label: 'Follow-ups vencidos',
      value: data.alerts.overdueFollowUps,
      valueClassName: 'text-red-600',
    },
    {
      label: 'Con restricciones',
      value: data.alerts.patientsWithRestrictions,
      valueClassName: 'text-red-600',
    },
    {
      label: 'Sin seguimiento',
      value: data.alerts.casesWithoutRecentFollowUp,
      valueClassName: 'text-amber-600',
    },
    {
      label: 'Medicamentos críticos',
      value: data.alerts.criticalMedications,
      valueClassName: 'text-red-600',
    },
  ]

  const topAreas = data.medications.byTherapeuticCategory
  const maxArea = Math.max(...topAreas.map(a => a.count))

  return (
    <PageContainer
      title="Dashboard Médico"
      description="Resumen clínico y operativo"
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {mainCards.map((card, i) => (
            <MetricCard key={i} {...card} />
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {alertCards.map((a, i) => (
            <MetricCard
              key={i}
              label={a.label}
              value={a.value}
              valueClassName={a.valueClassName}
              icon={<AlertTriangle className="h-5 w-5 text-slate-500" />}
              bg="bg-slate-100"
            />
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-2">

          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              Medicamentos críticos
            </h2>

            <div className="mt-4 space-y-3">
              {data.medications.lowStock.map((m) => (
                <div
                  key={m.medicationId}
                  className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {m.name}
                    </p>
                    <p className="text-xs text-slate-400">
                      Stock: {m.stock} / Min: {m.minimumStock}
                    </p>
                  </div>

                  <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-600">
                    Bajo
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              Categorías terapéuticas
            </h2>

            <div className="mt-4 space-y-4">
              {topAreas.map((area) => {
                const percentage = (area.count / maxArea) * 100

                return (
                  <div key={area.category}>
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-slate-700">{area.category}</span>
                      <span className="text-slate-500">{area.count}</span>
                    </div>

                    <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>

        <div className="rounded-3xl bg-white shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100">
            <h2 className="text-base font-semibold text-slate-900">
              Últimas atenciones
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-400 border-b border-slate-100">
                  <th className="px-6 py-3">Paciente</th>
                  <th className="px-6 py-3">Fecha</th>
                  <th className="px-6 py-3">Tipo</th>
                  <th className="px-6 py-3">Estado</th>
                </tr>
              </thead>

              <tbody>
                {data.recentConsultations.map((item) => (
                  <tr key={item.id} className="border-t border-slate-100">
                    <td className="px-6 py-4">{item.employeeName}</td>
                    <td className="px-6 py-4">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">{item.type}</td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          'px-2 py-1 rounded text-xs font-medium',
                          item.status === 'OPEN'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-emerald-100 text-emerald-700'
                        )}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </PageContainer>
  )
}