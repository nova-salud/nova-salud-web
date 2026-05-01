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
import CreateAttentionPage from '@/features/attentions/attentions/pages/CreateAttentionPage'
import AttentionDetailPage from '@/features/attentions/attentions/pages/AttentionDetailPage'
import ClinicalAttentionEntryPage from '@/features/clinical-histories/clinical-attention/pages/ClinicalAttentionEntryPage'
import ClinicalHistoryDetailPage from '@/features/clinical-histories/cllinical-histories/pages/ClinicalHistoryDetailPage'
import CreateClinicalHistoryPage from '@/features/clinical-histories/cllinical-histories/pages/CreateClinicalHistoryPage'
import ExamsPage from '@/features/exams/pages/ExamsPage'
import EmoProtocolsPage from '@/features/emo-protocols/pages/EmoProtocolsPage'
import EmoProtocolDetailPage from '@/features/emo-protocols/pages/EmoProtocolDetailPage'
import EmoCycleDetailPage from '@/features/clinical-histories/emo-cycles/pages/EmoCycleDetailPage'
import HealthcareCentersPage from '@/features/healthcare-centers/pages/HealthcareCentersPage'
import AccidentDetailPage from '@/features/accidents/accidents/pages/AccidentDetailPage'
import { AccidentsPage } from '@/features/accidents/accidents/pages/AccidentsPage'
import CreateAccidentFromClinicaHistoryPage from '@/features/accidents/accidents/pages/CreateAccidentFromClinicalHistoryPage'
import { CreateAccidentPage } from '@/features/accidents/accidents/pages/CreateAccidentPage'


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
              path: '/clinical-histories/:employeeId/accidents/:accidentId',
              element: <AccidentDetailPage />,
            },
            {
              path: '/clinical-histories/:employeeId/accidents/new',
              element: <CreateAccidentFromClinicaHistoryPage />,
            },
            {
              path: '/clinical-histories/:employeeId/cycle/:cycleId',
              element: <EmoCycleDetailPage />
            },
            {
              path: '/diseases',
              element: <DiseasesPage />,
            },
            {
              path: '/exams',
              element: <ExamsPage />,
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
              path: '/emo-protocols',
              element: <EmoProtocolsPage />,
            },
            {
              path: '/emo-protocols/:id',
              element: <EmoProtocolDetailPage />,
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
                RoleEnum.SST
              ]}
            />
          ),
          children: [
            {
              path: '/healthcare-centers',
              element: <HealthcareCentersPage />,
            },
          ]
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
          element: <RoleGuard roles={[
            RoleEnum.SST,
            RoleEnum.ADMIN
          ]} />,
          children: [
            {
              path: '/accidents',
              element: <AccidentsPage />,
            },
            {
              path: '/accidents/create',
              element: <CreateAccidentPage />,
            },
            {
              path: '/accidents/:accidentId',
              element: <AccidentDetailPage />,
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