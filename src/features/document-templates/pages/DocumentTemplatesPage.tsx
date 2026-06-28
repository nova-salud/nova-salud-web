import { PageContainer } from '@/shared/components'
import { DocumentTemplateCard } from '../components/DocumentTemplateCard'
import { DocumentTemplatesPageSkeleton } from '../components/DocumentTemplatesPageSkeleton'
import { ALL_DOCUMENT_TEMPLATE_TYPES } from '../constants/document-template.constants'
import { useDocumentTemplates } from '../hooks/useDocumentTemplates'

const DocumentTemplatesPage = () => {
  const { templates, isLoading, refetch } = useDocumentTemplates()

  if (isLoading) return <DocumentTemplatesPageSkeleton />

  return (
    <PageContainer
      title="Plantillas de Documentos"
      description="Gestiona las plantillas Word utilizadas para generar documentos médico ocupacionales."
    >
      <div className="grid items-start gap-4 sm:grid-cols-2">
        {ALL_DOCUMENT_TEMPLATE_TYPES.map((type) => (
          <DocumentTemplateCard
            key={type}
            type={type}
            template={templates.find(t => t.type === type)}
            onUploaded={refetch}
          />
        ))}
      </div>
    </PageContainer>
  )
}

export default DocumentTemplatesPage
