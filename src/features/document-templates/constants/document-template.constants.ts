import { DocumentTemplateType } from '../types/document-template.types'

type TemplateMeta = {
  label: string
  description: string
  placeholders: { text: string[]; image: string[] }
}

export const DOCUMENT_TEMPLATE_META: Record<DocumentTemplateType, TemplateMeta> = {
  [DocumentTemplateType.EMO_DELIVERY]: {
    label: 'Entrega de Resultados',
    description: 'Formato de entrega de resultados médico ocupacionales al trabajador.',
    placeholders: {
      text: ['employee.fullName', 'employee.documentNumber', 'employee.position', 'employee.company', 'emo.evaluationDate'],
      image: ['employee.signature'],
    },
  },
  [DocumentTemplateType.EMO_CERTIFICATE]: {
    label: 'Certificado de Aptitud',
    description: 'Formato de aptitud médico ocupacional con resultado y recomendaciones.',
    placeholders: {
      text: ['employee.fullName', 'employee.documentNumber', 'employee.position', 'employee.company', 'emo.result', 'emo.recommendations', 'doctor.fullName', 'today'],
      image: ['doctor.signature'],
    },
  },
  [DocumentTemplateType.EMO_CONFORMITY_RESTRICTIONS]: {
    label: 'Conformidad con Restricciones',
    description: 'Formato de conformidad para el trabajador que realizará sus labores con restricciones médicas.',
    placeholders: {
      text: ['employee.fullName', 'employee.documentNumber', 'employee.position', 'employee.company', 'emo.result', 'emo.recommendations', 'today'],
      image: ['employee.signature'],
    },
  },
  [DocumentTemplateType.EMO_CONFORMITY_DOCTOR]: {
    label: 'Conformidad Médico Ocupacional',
    description: 'Formato de conformidad del médico ocupacional sobre el resultado del EMO.',
    placeholders: {
      text: ['employee.fullName', 'employee.documentNumber', 'employee.position', 'employee.company', 'emo.result', 'emo.recommendations', 'doctor.fullName', 'today'],
      image: ['doctor.signature'],
    },
  },
  [DocumentTemplateType.ATTENTION_RECEIPT]: {
    label: 'Recibo de Atención',
    description: 'Formato de recibo de atención médica para el trabajador.',
    placeholders: {
      text: ['employee.fullName', 'employee.documentNumber', 'employee.position', 'employee.company', 'attention.id', 'attention.date', 'attention.diagnosis', 'attention.treatment', 'attention.notes', 'today'],
      image: ['employee.signature'],
    },
  },
  [DocumentTemplateType.ETA_RESULTS]: {
    label: 'Entrega de Resultados ETAS',
    description: 'Formato de entrega de resultados para enfermedades transmitidas por alimentos (ETA).',
    placeholders: {
      text: ['employee.fullName', 'employee.documentNumber', 'employee.position', 'employee.company', 'today'],
      image: [],
    },
  },
}

export const ALL_DOCUMENT_TEMPLATE_TYPES: DocumentTemplateType[] = [
  DocumentTemplateType.EMO_DELIVERY,
  DocumentTemplateType.EMO_CERTIFICATE,
  DocumentTemplateType.EMO_CONFORMITY_RESTRICTIONS,
  DocumentTemplateType.EMO_CONFORMITY_DOCTOR,
  DocumentTemplateType.ATTENTION_RECEIPT,
  DocumentTemplateType.ETA_RESULTS,
]
