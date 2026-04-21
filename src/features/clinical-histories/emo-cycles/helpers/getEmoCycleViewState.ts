import { EMO_CYCLE_ALLOW_DOCTOR_CONCLUSION, EMO_CYCLE_SHOW_CONFORMITY_SECTION, type ClinicalHistoryEmoCycleResponseDto } from '../types'

export const getEmoCycleViewState = (cycle: ClinicalHistoryEmoCycleResponseDto) => {
  const doctorConformity = cycle.conformities.find((item) => item.conformityType === 'DOCTOR') ?? null
  const employeeConformity = cycle.conformities.find((item) => item.conformityType === 'EMPLOYEE') ?? null

  const requiredExams = cycle.exams.filter((exam) => exam.isRequired)
  const completedRequiredExams = requiredExams.filter((exam) => exam.isCompleted)

  const areRequiredExamsCompleted =
    requiredExams.length > 0 &&
    completedRequiredExams.length === requiredExams.length

  const canEmitConclusion =
    EMO_CYCLE_ALLOW_DOCTOR_CONCLUSION[cycle.status] &&
    areRequiredExamsCompleted &&
    !doctorConformity

  const showConformitySection =
    EMO_CYCLE_SHOW_CONFORMITY_SECTION[cycle.status] || Boolean(doctorConformity)

  const showEmployeeConformity =
    cycle.conclusion !== 'NO_APTO' && Boolean(doctorConformity)

  const canEmployeeSign =
    cycle.status === 'PENDING_EMPLOYEE_CONFORMITY' &&
    cycle.conclusion !== 'NO_APTO' &&
    !!doctorConformity &&
    !employeeConformity

  return {
    doctorConformity,
    employeeConformity,
    requiredExams,
    completedRequiredExams,
    areRequiredExamsCompleted,
    canEmitConclusion,
    showConformitySection,
    showEmployeeConformity,
    canEmployeeSign,
  }
}