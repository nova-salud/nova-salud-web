import type { AlertResponseDto } from '../alerts/types/alert-response.dto'
import { AlertType } from '../alerts/types/alert-type.enum'
import type { NotificationResponseDto } from '../notifications/types/notification-response.dto'

type NavigableAlert = NotificationResponseDto | AlertResponseDto

export const resolveAlertNavigation = (item: NavigableAlert): string => {
  const type = 'alertType' in item ? item.alertType : item.type
  const metadata = item.metadata

  switch (type) {
    case AlertType.HIGH_FREQUENCY:
    case AlertType.RESPIRATORY: {
      if (!metadata || !('clinicalHistoryId' in metadata)) return '/alerts'

      return `/clinical-histories/${metadata.clinicalHistoryId}`
    }

    case AlertType.ACCIDENT_REPORTED: {
      if (!metadata || !('accidentId' in metadata)) return '/alerts'

      return `/accidents/${metadata.accidentId}`
    }

    case AlertType.LONG_OPEN_CASE:
    case AlertType.ACTIVE_RESTRICTIONS:
    case AlertType.PENDING_DISCHARGE: {
      if (!metadata || !('accidentCaseId' in metadata)) return '/alerts'

      return `/accidents/${metadata.accidentCaseId}`
    }

    case AlertType.EMO_30_DAYS:
    case AlertType.EMO_60_DAYS:
    case AlertType.EMO_OVERDUE: {
      if (!metadata || !('historyId' in metadata)) return '/alerts'

      return `/clinical-histories/${metadata.historyId}`
    }

    case AlertType.REQUIREMENT_PENDING:
    case AlertType.REQUIREMENT_PENDING_CONFIRMATION: {
      if (!metadata || !('requirementId' in metadata)) return '/requirements'

      return `/requirements/${metadata.requirementId}`
    }

    case AlertType.LOW_STOCK: {
      if (!metadata || !('medicationId' in metadata)) return '/medications'

      return `/medications/${metadata.medicationId}`
    }

    default:
      return '/alerts'
  }
}