import { PageContainer } from '@/shared/components'
import { DocumentTemplateCard } from '../components/DocumentTemplateCard'
import { ALL_DOCUMENT_TEMPLATE_TYPES } from '../constants/document-template.constants'
import { useDocumentTemplates } from '../hooks/useDocumentTemplates'

const DocumentTemplatesPage = () => {
  const { templates, isLoading, refetch } = useDocumentTemplates()

  return (
    <PageContainer
      title="Plantillas de Documentos"
      description="Gestiona las plantillas Word utilizadas para generar documentos médico ocupacionales."
    >
      {isLoading ? (
        <div className="flex items-center justify-center py-16 text-sm text-slate-500">
          Cargando plantillas...
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {ALL_DOCUMENT_TEMPLATE_TYPES.map((type) => (
            <DocumentTemplateCard
              key={type}
              type={type}
              template={templates.find(t => t.type === type)}
              onUploaded={refetch}
            />
          ))}
        </div>
      )}
    </PageContainer>
  )
}

export default DocumentTemplatesPage
