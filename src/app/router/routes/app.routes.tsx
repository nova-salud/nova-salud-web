import type { RouteObject } from 'react-router'
import AuthGuard from '@/app/router/guards/auth.guard'
import PrivateLayout from '@/app/layouts/PrivateLayout'
import PageContainer from '@/shared/components/ui/PageContainer'

// eslint-disable-next-line react-refresh/only-export-components
const HomePage = () => {
  return (
    <PageContainer
      title="Dashboard SST"
      description="Resumen ejecutivo — Sistema Médico-Ocupacional — Nova Peru"
    >
      <div className="grid gap-5 lg:grid-cols-4">
        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-400">Trabajadores registrados</p>
          <p className="mt-3 text-4xl font-semibold text-slate-900">350</p>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-400">Atenciones este mes</p>
          <p className="mt-3 text-4xl font-semibold text-slate-900">47</p>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-400">Alertas activas</p>
          <p className="mt-3 text-4xl font-semibold text-slate-900">7</p>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-400">Altas pendientes</p>
          <p className="mt-3 text-4xl font-semibold text-slate-900">3</p>
        </div>
      </div>
    </PageContainer>
  )
}

export const appRoutes: RouteObject = {
  element: <AuthGuard />,
  children: [
    {
      element: <PrivateLayout />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
      ],
    },
  ],
}