import type { RouteObject } from 'react-router'
import PrivateLayout from '@/app/layouts/PrivateLayout'
import AuthGuard from '@/app/router/guards/auth.guard'
import RoleGuard from '@/app/router/guards/role.guard'
import NotFoundPage from '@/shared/pages/NotFoundPage'
import ErrorPage from '@/shared/pages/ErrorPage'
import { RoleEnum } from '@/core/enums/role.enum'

import DashboardPage from '@/features/dashboard/pages/DashboardPage'
import MedicationsPage from '@/features/inventory/medications/pages/MedicationsPage'
import MedicationDetailPage from '@/features/inventory/medications/pages/MedicationDetailPage'
import CreateMedicationPage from '@/features/inventory/medications/pages/CreateMedicationPage'
import EditMedicationPage from '@/features/inventory/medications/pages/EditMedicationPage'
import MovementsPage from '@/features/inventory/movements/pages/MovementsPage'
import RequirementsPage from '@/features/inventory/requirements/pages/RequirementsPage'
import CreateRequirementPage from '@/features/inventory/requirements/pages/CreateRequirementPage'
import RequirementDetailPage from '@/features/inventory/requirements/pages/RequirementDetailPage'
import DispensationsPage from '@/features/inventory/dispensations/pages/DispensationsPage'
import CreateDispensationPage from '@/features/inventory/dispensations/pages/CreateDispensationPage'
import DispensationDetailPage from '@/features/inventory/dispensations/pages/DispensationDetailPage'
import EmployeesPage from '@/features/employees/pages/EmployeesPage'
import EmployeeDetailPage from '@/features/employees/pages/EmployeeDetailPage'
import EmployeeAreasPage from '@/features/employees/pages/EmployeeAreasPage'
import EmployeeSyncSettingsPage from '@/features/system-settings/pages/EmployeeSyncSettingsPage'
import UsersPage from '@/features/users/pages/UsersPage'
import DiseasesPage from '@/features/attentions/diseases/pages/DiseasesPage'
import ClinicalHistoryDetailPage from '@/features/attentions/clinical-histories/pages/ClinicalHistoryDetailPage'
import ClinicalAttentionEntryPage from '@/features/attentions/clinical-attention/pages/ClinicalAttentionEntryPage'
import CreateClinicalHistoryPage from '@/features/attentions/clinical-histories/pages/CreateClinicalHistoryPage'
import CreateAttentionPage from '@/features/attentions/attentions/pages/CreateAttentionPage'
import AttentionDetailPage from '@/features/attentions/attentions/pages/AttentionDetailPage'


export const appRoutes: RouteObject = {
  element: <AuthGuard />,
  errorElement: <ErrorPage />,
  children: [
    {
      element: <PrivateLayout />,
      children: [
        {
          path: '/',
          element: <DashboardPage />,
        },

        {
          element: (
            <RoleGuard
              roles={[
                RoleEnum.ADMIN,
                RoleEnum.OCCUPATIONAL_DOCTOR,
                RoleEnum.NURSE,
              ]}
            />
          ),
          children: [
            {
              path: '/clinical-attention',
              element: <ClinicalAttentionEntryPage />,
            },
            {
              path: '/clinical-histories/new',
              element: <CreateClinicalHistoryPage />,
            },
            {
              path: '/clinical-histories/:employeeId',
              element: <ClinicalHistoryDetailPage />,
            },
            {
              path: '/clinical-histories/:employeeId/attentions/new',
              element: <CreateAttentionPage />,
            },
            {
              path: '/clinical-histories/:employeeId/attentions/:attentionId',
              element: <AttentionDetailPage />,
            },
            {
              path: '/diseases',
              element: <DiseasesPage />,
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
          ],
        },

        {
          element: (
            <RoleGuard
              roles={[
                RoleEnum.ADMIN,
                RoleEnum.OCCUPATIONAL_DOCTOR,
                RoleEnum.NURSE,
                RoleEnum.SUPERVISOR,
              ]}
            />
          ),
          children: [
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
          ],
        },

        {
          element: (
            <RoleGuard
              roles={[
                RoleEnum.ADMIN,
                RoleEnum.HR,
                RoleEnum.MANAGEMENT,
              ]}
            />
          ),
          children: [
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
          ],
        },

        {
          element: <RoleGuard roles={[RoleEnum.ADMIN]} />,
          children: [
            {
              path: '/system-settings/employee-sync',
              element: <EmployeeSyncSettingsPage />,
            },
            {
              path: '/users',
              element: <UsersPage />,
            },
          ],
        },
        {
          path: '*',
          element: <NotFoundPage />,
        }
      ],
    },
  ],
}