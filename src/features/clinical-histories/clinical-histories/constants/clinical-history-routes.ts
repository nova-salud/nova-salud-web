export const CLINICAL_HISTORY_ROUTES = {
  attentionDetail: (employeeId: number, attentionId: number) =>
    `/clinical-histories/${employeeId}/attentions/${attentionId}`,
  attentionNew: (employeeId: number) =>
    `/clinical-histories/${employeeId}/attentions/new`,
  emoCycleDetail: (employeeId: number, cycleId: number) =>
    `/clinical-histories/${employeeId}/cycle/${cycleId}`,
  emoCycleHistory: (employeeId: number) =>
    `/clinical-histories/${employeeId}/emo-cycles`,
  accidentDetail: (employeeId: number, accidentId: number) =>
    `/clinical-histories/${employeeId}/accidents/${accidentId}`,
  accidentNew: (employeeId: number) =>
    `/clinical-histories/${employeeId}/accidents/new`,
}
