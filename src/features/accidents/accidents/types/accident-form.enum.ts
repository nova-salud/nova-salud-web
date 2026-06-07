export enum AccidentFormEnum {
  FALLS_TRIPS = 'FALLS_TRIPS',
  IMPACTS_BLOWS = 'IMPACTS_BLOWS',
  ENTRAPMENTS = 'ENTRAPMENTS',
  HAZARDOUS_SUBSTANCES_EXPOSURE = 'HAZARDOUS_SUBSTANCES_EXPOSURE',
}

export const ACCIDENT_FORM_LABEL: Record<AccidentFormEnum, string> = {
  [AccidentFormEnum.FALLS_TRIPS]: 'Caídas / Tropiezos',
  [AccidentFormEnum.IMPACTS_BLOWS]: 'Golpes / Impactos',
  [AccidentFormEnum.ENTRAPMENTS]: 'Atrapamientos',
  [AccidentFormEnum.HAZARDOUS_SUBSTANCES_EXPOSURE]: 'Exposición a sustancias nocivas',
}

export const ACCIDENT_FORM_OPTIONS = Object.values(AccidentFormEnum).map((value) => ({
  label: ACCIDENT_FORM_LABEL[value],
  value,
}))
