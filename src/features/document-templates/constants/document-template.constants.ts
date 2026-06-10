import { DocumentTemplateType } from '../types/document-template.types'

export const DOCUMENT_TEMPLATE_META: Record<DocumentTemplateType, { label: string; description: string }> = {
  [DocumentTemplateType.EMO_DELIVERY]: {
    label: 'Entrega de Resultados',
    description: 'Formato de entrega de resultados médico ocupacionales al trabajador.',
  },
  [DocumentTemplateType.EMO_CERTIFICATE]: {
    label: 'Certificado de Aptitud',
    description: 'Formato de aptitud médico ocupacional con resultado y recomendaciones.',
  },
  [DocumentTemplateType.EMO_CONFORMITY_RESTRICTIONS]: {
    label: 'Conformidad con Restricciones',
    description: 'Formato de conformidad para el trabajador que realizará sus labores con restricciones médicas.',
  },
  [DocumentTemplateType.EMO_CONFORMITY_DOCTOR]: {
    label: 'Conformidad Médico Ocupacional',
    description: 'Formato de conformidad del médico ocupacional sobre el resultado del EMO.',
  },
  [DocumentTemplateType.ATTENTION_RECEIPT]: {
    label: 'Recibo de Atención',
    description: 'Formato de recibo de atención médica para el trabajador.',
  },
}

export const ALL_DOCUMENT_TEMPLATE_TYPES: DocumentTemplateType[] = [
  DocumentTemplateType.EMO_DELIVERY,
  DocumentTemplateType.EMO_CERTIFICATE,
  DocumentTemplateType.EMO_CONFORMITY_RESTRICTIONS,
  DocumentTemplateType.EMO_CONFORMITY_DOCTOR,
  DocumentTemplateType.ATTENTION_RECEIPT,
]
