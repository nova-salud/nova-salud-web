import { format } from 'date-fns'
import { useNavigate, useParams } from 'react-router'
import PageContainer from '@/shared/components/ui/PageContainer'
import { Button } from '@/shared/components/ui/form'
import { useAttention } from '../hooks/useAttention'
import { useDispensationByAttention } from '@/features/inventory/dispensations/hooks/useDispensationByAttention'
import AttentionAttachmentsSection from '../../attachments/components/AttentionAttachmentsSection'
import AttentionSignaturesSection from '../../signatures/components/AttentionSignaturesSection'
import { AttentionFollowUpsSection } from '../../follow-ups/components/AttentionFollowUpsSection'
import { TRIAGE_LEVEL_CLASSNAME, TRIAGE_LEVEL_LABEL } from '../types/triage.enum'

const AttentionDetailPage = () => {
  const navigate = useNavigate()
  const { employeeId, attentionId } = useParams()

  const numericEmployeeId = Number(employeeId)
  const numericAttentionId = Number(attentionId)

  const { data: attention, isLoading, error } = useAttention(numericAttentionId)

  const {
    data: dispensation,
    isLoading: isLoadingDispensation,
  } = useDispensationByAttention(numericAttentionId)

  if (isLoading) return <div>Cargando...</div>
  if (!attention) return <div>No encontrado</div>

  return (
    <PageContainer
      title="Detalle de atención"
      description="Información clínica registrada."
      action={
        <Button
          type="button"
          variant="outline"
          className="w-auto"
          onClick={() => navigate(`/clinical-histories/${numericEmployeeId}`)}
        >
          Volver
        </Button>
      }
    >
      <div className="space-y-6">
        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
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
                Diagnóstico: {attention.diagnosisCode || 'No registrado'}
              </span>

              <span className="rounded-xl bg-blue-100 px-3 py-1 text-blue-700">
                EVA: {attention.eva ?? '-'}
              </span>

              {attention.triageLevel && (
                <span
                  className={`rounded-xl px-3 py-1 text-xs ${TRIAGE_LEVEL_CLASSNAME[attention.triageLevel]
                    }`}
                >
                  Triaje: {TRIAGE_LEVEL_LABEL[attention.triageLevel]}
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
                {format(
                  new Date(attention.originFollowUp.scheduledAt),
                  'dd/MM/yyyy HH:mm',
                )}
              </>
            )}
          </div>
        )}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Información clínica
          </h2>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                Síntomas
              </p>
              <div className="mt-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {attention.symptoms || 'No registrado'}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                Código diagnóstico
              </p>
              <div className="mt-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {attention.diagnosisCode || 'No registrado'}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                EVA
              </p>
              <div className="mt-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {attention.eva ?? 'No registrado'}
              </div>
            </div>

            <div className="md:col-span-2">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                Tratamiento
              </p>
              <div className="mt-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {attention.treatment || 'No registrado'}
              </div>
            </div>

            <div className="md:col-span-2">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                Observaciones
              </p>
              <div className="mt-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {attention.notes || 'No registrado'}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Dispensación
            </h2>
            <p className="text-sm text-slate-500">
              Medicamentos dispensados desde esta atención.
            </p>
          </div>

          {isLoadingDispensation ? (
            <div className="text-sm text-slate-500">Cargando dispensación...</div>
          ) : !dispensation ? (
            <div className="text-sm text-slate-500">
              No se registró dispensación para esta atención.
            </div>
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
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                    Motivo
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    {dispensation.reason || 'No registrado'}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                    Notas
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    {dispensation.notes || 'No registrado'}
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-left text-slate-500">
                      <th className="py-3 pr-4 font-medium">Medicamento</th>
                      <th className="pr-4 font-medium">Cantidad</th>
                      <th className="pr-4 font-medium">Dosis</th>
                      <th className="pr-4 font-medium">Observación</th>
                    </tr>
                  </thead>

                  <tbody>
                    {dispensation.items.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-slate-100 last:border-b-0"
                      >
                        <td className="py-3 pr-4 text-slate-700">
                          {item?.medicationName || '-'}
                        </td>
                        <td className="pr-4 text-slate-700">
                          {item.quantity}
                        </td>
                        <td className="pr-4 text-slate-700">
                          {item.doseInstruction || '-'}
                        </td>
                        <td className="pr-4 text-slate-700">
                          {item.observation || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <AttentionAttachmentsSection attentionId={numericAttentionId} />

        <AttentionFollowUpsSection followUps={attention.followUps} />

        <AttentionSignaturesSection attentionId={numericAttentionId} />

      </div>
    </PageContainer>
  )
}

export default AttentionDetailPage