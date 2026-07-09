import { useNavigate } from 'react-router'
import { ShieldAlert, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { cn } from '@/shared/utils'
import { PageContainer, Button, DashboardCard } from '@/shared/components'
import { AccidentStatusEnum } from '../types'
import { AccidentFilter, AccidentTable } from '../components'
import { useAccidents } from '../hooks'

export const AccidentsPage = () => {
  const navigate = useNavigate()

  const { data, isLoading, error, pagination, filters, onChangeFilters } = useAccidents()

  const open = data.filter(a => a.status === AccidentStatusEnum.OPEN).length
  const closed = data.filter(a => a.status === AccidentStatusEnum.CLOSED).length

  const cards = [
    {
      label: 'Total',
      value: pagination.total,
      valueClassName: 'text-slate-900',
      icon: <ShieldAlert className="h-5 w-5 text-slate-600" />,
      iconWrapperClass: 'bg-slate-100',
    },
    {
      label: 'Abiertos',
      value: open,
      valueClassName: 'text-amber-600',
      icon: <AlertTriangle className="h-5 w-5 text-amber-600" />,
      iconWrapperClass: 'bg-amber-50',
    },
    {
      label: 'Cerrados',
      value: closed,
      valueClassName: 'text-emerald-600',
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-600" />,
      iconWrapperClass: 'bg-emerald-50',
    },
  ]

  return (
    <PageContainer
      title="Accidentes / Incidentes"
      description="Gestión de accidentes e incidentes registrados."
      action={
        <Button
          className="w-auto"
          onClick={() => navigate('/accidents/create')}
        >
          Registrar accidente
        </Button>
      }
    >
      <div className="space-y-6">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Solo se pueden registrar accidentes/incidentes al personal que ya cuenta con una historia clínica registrada.
        </div>

        <AccidentFilter filters={filters} onChangeFilters={onChangeFilters} />

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-3">
          {cards.map((card, index) => (
            <DashboardCard
              key={index}
              label={card.label}
              value={card.value}
              valueClassName={card.valueClassName}
              icon={
                <div className={cn('rounded-2xl p-3', card.iconWrapperClass)}>
                  {card.icon}
                </div>
              }
            />
          ))}
        </div>

        <AccidentTable
          items={data}
          isLoading={isLoading}
          pagination={pagination}
          onView={(id) => navigate(`/accidents/${id}`)}
        />
      </div>
    </PageContainer>
  )
}