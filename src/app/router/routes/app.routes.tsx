import type { RouteObject } from 'react-router'
import AuthGuard from '@/app/router/guards/auth.guard'
import PrivateLayout from '@/app/layouts/PrivateLayout'
import DashboardPage from '@/features/dashboard/pages/DashboardPage'
import MedicationsPage from '@/features/inventory/medications/pages/MedicationsPage'
import MovementsPage from '@/features/inventory/movements/pages/MovementsPage'
import MedicationDetailPage from '@/features/inventory/medications/pages/MedicationDetailPage'
import CreateMedicationPage from '@/features/inventory/medications/pages/CreateMedicationPage'
import EditMedicationPage from '@/features/inventory/medications/pages/EditMedicationPage'
import CreateRequirementPage from '@/features/inventory/requirements/pages/CreateRequirementPage'
import RequirementDetailPage from '@/features/inventory/requirements/pages/RequirementDetailPage'
import RequirementsPage from '@/features/inventory/requirements/pages/RequirementsPage'
import DispensationsPage from '@/features/inventory/dispensations/pages/DispensationsPage'
import CreateDispensationPage from '@/features/inventory/dispensations/pages/CreateDispensationPage'
import DispensationDetailPage from '@/features/inventory/dispensations/pages/DispensationDetailPage'
import EmployeeDetailPage from '@/features/employees/pages/EmployeeDetailPage'
import EmployeesPage from '@/features/employees/pages/EmployeesPage'
import EmployeeAreasPage from '@/features/employees/pages/EmployeeAreasPage'
import EmployeeSyncSettingsPage from '@/features/system-settings/pages/EmployeeSyncSettingsPage'
import UsersPage from '@/features/users/pages/UsersPage'

export const appRoutes: RouteObject = {
  element: <AuthGuard />,
  children: [
    {
      element: <PrivateLayout />,
      children: [
        {
          path: '/',
          element: <DashboardPage />,
        },
        {
          path: '/medications',
          element: <MedicationsPage />,
        },
        {
          path: '/medications/:id',
          element: <MedicationDetailPage />,
        },
        {
          path: '/medications/new',
          element: <CreateMedicationPage />,
        },
        {
          path: '/medications/:id/edit',
          element: <EditMedicationPage />,
        },
        {
          path: '/movements',
          element: <MovementsPage />,
        },
        {
          path: '/requirements',
          element: <RequirementsPage />,
        },
        {
          path: '/requirements/create',
          element: <CreateRequirementPage />,
        },
        {
          path: '/requirements/:id',
          element: <RequirementDetailPage />,
        },
        {
          path: '/dispensations',
          element: <DispensationsPage />,
        },
        {
          path: '/dispensations/create',
          element: <CreateDispensationPage />,
        },
        {
          path: '/dispensations/:id',
          element: <DispensationDetailPage />,
        },
        {
          path: '/employees',
          element: <EmployeesPage />,
        },
        {
          path: '/employees/:id',
          element: <EmployeeDetailPage />,
        },
        {
          path: '/areas',
          element: <EmployeeAreasPage />,
        },
        {
          path: '/system-settings/employee-sync',
          element: <EmployeeSyncSettingsPage />,
        },
        {
          path: '/users',
          element: <UsersPage />,
        }
      ],
    },
  ],
}