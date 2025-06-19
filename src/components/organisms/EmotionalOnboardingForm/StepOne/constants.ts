import { OptionType } from '@/components/atoms/ReactSelect'

export const relationshipOptions: OptionType[] = [
  { value: 'casados', label: 'Casados' },
  { value: 'en pareja', label: 'En pareja' },
  { value: 'solteros', label: 'Solteros' },
  { value: 'divorciados', label: 'Divorciados' },
  { value: 'viudos', label: 'Viudos' },
]

export const genderOptions: OptionType[] = [
  { value: 'hombre', label: 'Hombre' },
  { value: 'mujer', label: 'mujer' },
  { value: 'no binario', label: 'No binario' },
  { value: 'transfemenino', label: 'Transfemenino' },
  { value: 'trans masculino', label: 'Trans masculino' },
  { value: 'no binario', label: 'No binario' },
  { value: 'transgénero', label: 'Transgénero' },
  { value: 'género fluido', label: 'Género fluido' },
  { value: 'no lo sé', label: 'No lo sé' },
  { value: 'prefiero no decir', label: 'Prefiero no decir' },
  { value: 'otro', label: 'Otro' },
]
