import type { RouteObject } from 'react-router'
import PrivateLayout from '@/app/layouts/PrivateLayout'
import AuthGuard from '@/app/router/guards/auth.guard'
import RoleGuard from '@/app/router/guards/role.guard'
import NotFoundPage from '@/shared/pages/NotFoundPage'
import ErrorPage from '@/shared/pages/ErrorPage'
import { RoleEnum } from '@/core/enums/role.enum'
import { ALERT_ROLES_WITH_ACCESS } from '@/features/communications/alerts/config/alert-role-config'
import {
  DashboardPage,
  EventReportPage,
  MedicalRestsPage,
  MedicalRestDetailPage,
  MyClinicialHistoryPage,
  MedicationsPage,
  MedicationDetailPage,
  CreateMedicationPage,
  EditMedicationPage,
  MovementsPage,
  RequirementsPage,
  CreateRequirementPage,
  RequirementDetailPage,
  DispensationsPage,
  CreateDispensationPage,
  DispensationDetailPage,
  EmployeesPage,
  EmployeeDetailPage,
  EmployeeAreasPage,
  EmployeePositionsPage,
  EmployeeSyncSettingsPage,
  ExternalEmployeesPage,
  UsersPage,
  DiseasesPage,
  CreateAttentionPage,
  AttentionDetailPage,
  ClinicalAttentionEntryPage,
  ClinicalHistoryDetailPage,
  CreateClinicalHistoryPage,
  EditClinicalHistoryPage,
  ExamsPage,
  EmoProtocolsPage,
  EmoProtocolDetailPage,
  EmoCycleDetailPage,
  EmoCycleHistoryPage,
  EmoLegacyRecordsPage,
  EmoCyclesPage,
  AttentionsPage,
  ClinicalHistoriesPage,
  HealthcareCentersPage,
  HealthcareCenterDetailPage,
  AllergyTypesPage,
  TherapeuticCategoriesPage,
  SpecialtiesPage,
  AccidentDetailPage,
  AccidentsPage,
  CreateAccidentFromClinicaHistoryPage,
  CreateAccidentPage,
  AlertsPage,
  DocumentTemplatesPage,
  UserDetailPage,
} from './lazy-pages'


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
                RoleEnum.EMPLOYEE,
                RoleEnum.EMPLOYEE_EXT,
              ]}
            />
          ),
          children: [
            {
              path: '/allergy-types',
              element: <AllergyTypesPage />,
            },
            {
              path: '/therapeutic-categories',
              element: <TherapeuticCategoriesPage />,
            },
            {
              path: '/clinical-histories',
              element: <ClinicalHistoriesPage />,
            },
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
              path: '/clinical-histories/:employeeId/edit',
              element: <EditClinicalHistoryPage />,
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
              path: '/clinical-histories/:employeeId/emo-cycles',
              element: <EmoCycleHistoryPage />,
            },
            {
              path: '/clinical-histories/:employeeId/emo-legacy',
              element: <EmoLegacyRecordsPage />,
            },
            {
              path: '/emo-cycles',
              element: <EmoCyclesPage />,
            },
            {
              path: '/attentions',
              element: <AttentionsPage />,
            },
            {
              path: '/specialties',
              element: <SpecialtiesPage />,
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
              path: '/requirements/create',
              element: <CreateRequirementPage />,
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
                RoleEnum.EMPLOYEE,
                RoleEnum.EMPLOYEE_EXT,
                RoleEnum.HR,
                RoleEnum.MANAGEMENT,
              ]}
            />
          ),
          children: [
            {
              path: '/medical-rests',
              element: <MedicalRestsPage />,
            },
            {
              path: '/medical-rests/:id',
              element: <MedicalRestDetailPage />,
            },
            {
              path: '/requirements',
              element: <RequirementsPage />,
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
                RoleEnum.SST
              ]}
            />
          ),
          children: [
            {
              path: '/healthcare-centers',
              element: <HealthcareCentersPage />,
            },
            {
              path: '/healthcare-centers/:id',
              element: <HealthcareCenterDetailPage />,
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
            {
              path: '/positions',
              element: <EmployeePositionsPage />,
            },
            {
              path: '/externos',
              element: <ExternalEmployeesPage />,
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
            {
              path: '/users/:id',
              element: <UserDetailPage />,
            },
            {
              path: '/document-templates',
              element: <DocumentTemplatesPage />,
            },
          ],
        },
        {
          element: <RoleGuard roles={[RoleEnum.SST, RoleEnum.ADMIN]} />,
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
          element: <RoleGuard roles={[...ALERT_ROLES_WITH_ACCESS]} />,
          children: [
            {
              path: '/alerts',
              element: <AlertsPage />,
            },
          ],
        },
        {
          element: <RoleGuard roles={[RoleEnum.EMPLOYEE, RoleEnum.EMPLOYEE_EXT]} />,
          children: [
            { path: '/my-clinical-history', element: <MyClinicialHistoryPage /> },
          ],
        },
        {
          element: (
            <RoleGuard
              roles={[
                RoleEnum.ADMIN,
                RoleEnum.OCCUPATIONAL_DOCTOR,
                RoleEnum.NURSE,
                RoleEnum.SST,
                RoleEnum.HR,
                RoleEnum.MANAGEMENT,
              ]}
            />
          ),
          children: [
            {
              path: '/events/report',
              element: <EventReportPage />,
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
