import { useCallback } from 'react'
import { format } from 'date-fns'
import { useNavigate, useParams } from 'react-router'
import { Button, PageContainer, ResourceNotFound } from '@/shared/components'
import { useAsyncAction } from '@/core/hooks/useAsyncAction'
import { DISEASE_TYPE_LABEL } from '@/features/attentions/diseases/types/disease-type.enum'
import { FOLLOW_UP_STATUS_CLASSNAME, FOLLOW_UP_STATUS_LABEL, FollowUpStatusEnum } from '@/features/follow-ups/types/follow-up-status.enum'
import { useDispensationByAttention } from '@/features/inventory/dispensations/hooks/useDispensationByAttention'
import { documentTemplateService } from '@/features/document-templates/services/document-template.service'
import { DocumentTemplateType } from '@/features/document-templates/types/document-template.types'
import { ClinicalHistoryMedicalRestsSection } from '@/features/clinical-histories/medical-rests/components/ClinicalHistoryMedicalRestsSection'
import DispensationConformitySection from '@/features/attentions/conformities/components/DispensationConformitySection'
import { AttentionDetailSkeleton } from '../components/AttentionDetailSkeleton'
import { useAttention } from '../hooks'
import { useSendAttentionSummary } from '../hooks/useSendAttentionSummary'
import { TRIAGE_LEVEL_CLASSNAME, TRIAGE_LEVEL_LABEL } from '../types/triage.enum'

const AttentionDetailPage = () => {
  const navigate = useNavigate()
  const { employeeId, attentionId } = useParams()

  const numericEmployeeId = Number(employeeId)
  const numericAttentionId = Number(attentionId)

  const { data: attention, isLoading, error } = useAttention(numericAttentionId)
  const { data: dispensation, isLoading: isLoadingDispensation } = useDispensationByAttention(numericAttentionId)
  const { sendSummary, isLoading: isSending } = useSendAttentionSummary()

  const generateAction = useCallback(
    () => documentTemplateService.generate(DocumentTemplateType.ATTENTION_RECEIPT, { attentionId: numericAttentionId }),
    [numericAttentionId],
  )
  const { execute: handleGenerateFormat, isLoading: isGenerating } = useAsyncAction(generateAction, { showSuccessToast: false })

  const generateEtaAction = useCallback(
    () => documentTemplateService.generate(DocumentTemplateType.ETA_RESULTS, { attentionId: numericAttentionId }),
    [numericAttentionId],
  )
  const { execute: handleGenerateEta, isLoading: isGeneratingEta } = useAsyncAction(generateEtaAction, { showSuccessToast: false })

  if (isLoading) return <AttentionDetailSkeleton />
  if (!attention) return (
    <ResourceNotFound
      title="Atención no encontrada"
      onBack={() => navigate(`/clinical-histories/${numericEmployeeId}`)}
    />
  )

  const diagnosisLabel = attention.diagnosisCode
    ? attention.diseaseName
      ? `${attention.diagnosisCode} — ${attention.diseaseName}`
      : attention.diagnosisCode
    : 'No registrado'

  return (
    <PageContainer
      title="Detalle de atención"
      description="Información clínica registrada."
      action={
        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="outline"
            className="w-auto"
            isLoading={isGenerating}
            loadingText="Generando..."
            onClick={() => void handleGenerateFormat()}
          >
            Formato de atención
          </Button>

          {attention.hasEta && (
            <Button
              type="button"
              variant="outline"
              className="w-auto"
              isLoading={isGeneratingEta}
              loadingText="Generando..."
              onClick={() => void handleGenerateEta()}
            >
              Formato ETAS
            </Button>
          )}

          <Button
            type="button"
            variant="outline"
            className="w-auto"
            isLoading={isSending}
            loadingText="Enviando..."
            onClick={() => void sendSummary(attention.id)}
          >
            Enviar por correo
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-auto"
            onClick={() => navigate(`/clinical-histories/${numericEmployeeId}`)}
          >
            Volver
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error?.message}
          </div>
        ) : null}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-slate-900">
                Atención #{attention.id}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {attention.createdAt
                  ? format(new Date(attention.createdAt), 'dd/MM/yyyy HH:mm')
                  : '-'}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-xl bg-slate-100 px-3 py-1 text-slate-600">
                {diagnosisLabel}
              </span>

              <span className="rounded-xl bg-blue-100 px-3 py-1 text-blue-700">
                EVA: {attention.eva ?? '-'}
              </span>

              {attention.triageLevel && (
                <span className={`rounded-xl px-3 py-1 text-xs ${TRIAGE_LEVEL_CLASSNAME[attention.triageLevel]}`}>
                  Triaje: {TRIAGE_LEVEL_LABEL[attention.triageLevel]}
                </span>
              )}

              {attention.hasEta && (
                <span className="rounded-xl bg-amber-100 px-3 py-1 text-amber-700">
                  ETA diagnosticada
                </span>
              )}
            </div>
          </div>
        </div>

        {attention.originFollowUp && (
          <div className="rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
            Esta atención corresponde a un seguimiento programado
            {attention.originFollowUp.scheduledAt && (
              <>
                {' '}para el{' '}
                {format(new Date(attention.originFollowUp.scheduledAt), 'dd/MM/yyyy HH:mm')}
              </>
            )}
          </div>
        )}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Información clínica</h2>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Síntomas</p>
              <div className="mt-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {attention.symptoms || 'No registrado'}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Diagnóstico</p>
              <div className="mt-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {diagnosisLabel}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Tipo de enfermedad</p>
              <div className="mt-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {attention.diseaseType ? DISEASE_TYPE_LABEL[attention.diseaseType] : 'No registrado'}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">EVA</p>
              <div className="mt-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {attention.eva ?? 'No registrado'}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Clasificación triaje</p>
              <div className="mt-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {attention.triageLevel ? TRIAGE_LEVEL_LABEL[attention.triageLevel] : 'No registrado'}
              </div>
            </div>

            <div className="md:col-span-2">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Tratamiento</p>
              <div className="mt-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {attention.treatment || 'No registrado'}
              </div>
            </div>

            <div className="md:col-span-2">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Observaciones</p>
              <div className="mt-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {attention.notes || 'No registrado'}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Seguros activos al momento de la atención</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Seguro médico</p>
              <div className="mt-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {attention.snapshotMedicalInsurance ?? <span className="text-slate-400">No disponible</span>}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">EPS</p>
              <div className="mt-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {attention.snapshotEps
                  ? <>{attention.snapshotEps}{attention.snapshotEpsPlan && <span className="ml-1 text-slate-400">— {attention.snapshotEpsPlan}</span>}</>
                  : <span className="text-slate-400">No disponible</span>}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">SCTR Salud</p>
              <div className="mt-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {attention.snapshotSctrHealth ?? <span className="text-slate-400">No disponible</span>}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Dispensación</h2>
            <p className="text-sm text-slate-500">Medicamentos dispensados desde esta atención.</p>
          </div>

          {isLoadingDispensation ? (
            <div className="animate-pulse space-y-3">
              <div className="flex justify-between">
                <div className="h-3 w-32 rounded bg-slate-200" />
                <div className="flex gap-2">
                  <div className="h-6 w-20 rounded-full bg-slate-200" />
                  <div className="h-6 w-28 rounded-full bg-slate-200" />
                </div>
              </div>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-4 border-b border-slate-100 pb-3">
                  <div className="h-4 w-48 rounded bg-slate-200" />
                  <div className="h-4 w-12 rounded bg-slate-200" />
                </div>
              ))}
            </div>
          ) : !dispensation ? (
            <div className="text-sm text-slate-400">No se registró dispensación para esta atención.</div>
          ) : (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-slate-500">
                  {dispensation.createdAt
                    ? format(new Date(dispensation.createdAt), 'dd/MM/yyyy HH:mm')
                    : '-'}
                </span>

                <div className="flex gap-2">
                  <span className="rounded-xl bg-slate-100 px-3 py-1 text-slate-600">
                    {dispensation.dispenseType}
                  </span>

                  <span className="rounded-xl bg-blue-100 px-3 py-1 text-blue-700">
                    {dispensation.items.length} medicamentos
                  </span>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Motivo</p>
                  <p className="mt-1 text-sm text-slate-700">{dispensation.reason || 'No registrado'}</p>
                </div>

                <div className="md:col-span-2">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Notas</p>
                  <p className="mt-1 text-sm text-slate-700">{dispensation.notes || 'No registrado'}</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-left text-slate-500">
                      <th className="py-3 pr-4 font-medium">Medicamento</th>
                      <th className="pr-4 font-medium">Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dispensation.items.map((item) => (
                      <tr key={item.id} className="border-b border-slate-100 last:border-b-0">
                        <td className="py-3 pr-4 text-slate-700">{item?.medicationName || '-'}</td>
                        <td className="pr-4 text-slate-700">{item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <DispensationConformitySection attentionId={numericAttentionId} />
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Seguimientos</h2>
          <p className="mt-1 text-sm text-slate-500">Seguimientos programados a partir de esta atención.</p>

          {attention.followUps.length === 0 ? (
            <p className="mt-4 text-sm text-slate-400">No se generaron seguimientos desde esta atención.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {attention.followUps.map((fu) => (
                <div
                  key={fu.id}
                  className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {format(new Date(fu.scheduledAt), 'dd/MM/yyyy HH:mm')}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {fu.reason || 'Sin motivo registrado'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`w-fit rounded-xl px-3 py-1 text-xs font-medium ${FOLLOW_UP_STATUS_CLASSNAME[fu.status]}`}>
                      {FOLLOW_UP_STATUS_LABEL[fu.status]}
                    </span>

                    {fu.status === FollowUpStatusEnum.PENDING && (
                      <Button
                        type="button"
                        className="w-auto text-xs"
                        onClick={() =>
                          navigate(
                            `/clinical-histories/${numericEmployeeId}/attentions/new?followUpId=${fu.id}`
                          )
                        }
                      >
                        Registrar atención
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm py-5">
          <ClinicalHistoryMedicalRestsSection
            clinicalHistoryId={attention.clinicalHistoryId}
            attentionId={numericAttentionId}
          />
        </div>
      </div>
    </PageContainer>
  )
}

export default AttentionDetailPage
