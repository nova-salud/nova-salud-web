import { Button } from '@/shared/components/ui/form'
import PageContainer from '@/shared/components/ui/PageContainer'
import { cn } from '@/shared/utils'
import { useNavigate } from 'react-router'
import { AccidentTable } from '../components/AccidentsTable'
import { DashboardCard } from '@/shared/components/dashboard/DashboardCard'
import { ShieldAlert, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { useAccidents } from '../hooks/useAccidents'
import { AccidentStatusEnum } from '../types'

export const AccidentsPage = () => {
  const navigate = useNavigate()

  const { data: accidents = [], isLoading, error } = useAccidents()

  const total = accidents.length
  const open = accidents.filter(a => a.status === AccidentStatusEnum.OPEN).length
  const closed = accidents.filter(a => a.status === AccidentStatusEnum.CLOSED).length

  const cards = [
    {
      label: 'Total',
      value: total,
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
      title="Accidentes"
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
          items={accidents}
          isLoading={isLoading}
          onView={(id) => navigate(`/accidents/${id}`)}
        />
      </div>
    </PageContainer>
  )
}