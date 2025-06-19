// src/components/organisms/Onboarding/stepsConfig.ts
import { genderOptions, relationshipOptions } from './StepOne/constants'
import { yesNoOptions } from './constants'
import { challengesOptions, separationOptions } from './StepTwo/constants'
import {
  violenceOptions,
  expectationsOptions,
  therapyGoalsOptions,
  triedTherapyOptions,
  financialStatusOptions,
  typeOfViolenceOptions,
} from './StepThree/constants'
import {
  exercisesOptions,
  supportPreferenceOptions,
  toneOptions,
} from './StepFour/constants'
import { GoogleAutocomplete } from '@/components/atoms/GoogleAutocomplete'

export const stepOneFields = [
  {
    name: 'relationshipStatus',
    type: 'select',
    label: '¿Cuál es tu relación actual con tu pareja?',
    options: relationshipOptions,
    placeholder: 'Selecciona una opción',
  },
  {
    name: 'userGender',
    type: 'select',
    label: '¿Con qué género te identificas?',
    options: genderOptions,
    placeholder: 'Selecciona una opción',
  },
  {
    name: 'partnerGender',
    type: 'select',
    label: '¿Con qué género se identifica tu pareja?',
    options: genderOptions,
    placeholder: 'Selecciona una opción',
  },
  {
    name: 'relationshipDuration',
    type: 'number',
    label: '¿Desde hace cuánto tiempo están juntos?',
    placeholder: 'Ejemplo: 1-5 años',
  },
  {
    name: 'livingTogether',
    type: 'radio',
    label: '¿Viven juntos actualmente?',
    options: yesNoOptions,
  },
  {
    name: 'haveChildren',
    type: 'radio',
    label: '¿Tienen hijos?',
    options: yesNoOptions,
  },
  {
    name: 'childrenDetails',
    type: 'text',
    label: '¿Cuántos y de qué edades aproximadamente?',
    placeholder: 'Ejemplo: 2 hijos, 3 y 5 años',
    showIf: (watch: (arg0: string) => string) => watch('haveChildren') === 'Sí',
  },
]

export const stepTwoFields = [
  {
    name: 'partnerLocation',
    type: 'custom',
    label: '¿De dónde es tu pareja?',
    render: (
      field: { value: string; onChange: (value: string) => void },
      fieldState: { error: { message: string | undefined } },
    ) => (
      <GoogleAutocomplete
        value={field.value ?? ''}
        onChange={field.onChange}
        error={fieldState.error?.message}
        placeholder="Busca la dirección"
      />
    ),
  },
  {
    name: 'partnerAge',
    type: 'number',
    label: '¿Cuántos años tiene tu pareja?',
    placeholder: 'Ejemplo: 30 años',
  },
  {
    name: 'userLocation',
    type: 'custom',
    label: '¿De dónde eres tú?',
    render: (
      field: { value: string; onChange: (value: string) => void },
      fieldState: { error: { message: string | undefined } },
    ) => (
      <GoogleAutocomplete
        value={field.value ?? ''}
        onChange={field.onChange}
        error={fieldState.error?.message}
        placeholder="Busca la dirección"
      />
    ),
  },
  {
    name: 'userAge',
    type: 'number',
    label: '¿Cuántos años tienes?',
    placeholder: 'Ejemplo: 30 años',
  },
  {
    name: 'improveRelationship',
    type: 'radio',
    label: '¿Ambos tienen interés de mejorar la relación?',
    options: yesNoOptions,
  },
  {
    name: 'challenges',
    type: 'select',
    label: '¿Con qué tipo de desafíos están lidiando como pareja?',
    options: challengesOptions,
    isMulti: true,
    isClearable: true,
    placeholder: 'Selecciona una o más opciones',
  },
  {
    name: 'consideringSeparation',
    type: 'radio',
    label: '¿Estás atravesando o considerando una separación?',
    options: separationOptions,
  },
  {
    name: 'legalSupport',
    type: 'radio',
    label:
      '¿Querés que la IA tenga en cuenta aspectos legales de tu país para apoyarte mejor en esta etapa?',
    options: yesNoOptions,
    showIf: (watch: (arg0: string) => string) =>
      watch('consideringSeparation') === 'Sí, estamos en proceso',
  },
  {
    name: 'legalLocation',
    type: 'text',
    label: 'País, provincia/estado y situación legal general (opcional)',
    placeholder:
      'Ejemplo: Argentina, Buenos Aires, proceso de divorcio iniciado',
    showIf: (watch: (arg0: string) => string) => watch('legalSupport') === 'Sí',
  },
]

export const stepThreeFields = [
  {
    name: 'violence',
    type: 'radio',
    label: '¿La violencia doméstica es actualmente un problema en tu relación?',
    options: violenceOptions,
  },
  {
    name: 'typeOfViolence',
    type: 'select',
    label: '¿Qué tipo de violencia piensas que recibes?',
    options: typeOfViolenceOptions,
    isMulti: true,
    isClearable: true,
    placeholder: 'Selecciona una o más opciones',
  },
  {
    name: 'triedTherapy',
    type: 'radio',
    label:
      '¿Han intentado antes terapia de pareja o hablar con un profesional?',
    options: triedTherapyOptions,
  },
  {
    name: 'therapyGoals',
    type: 'select',
    label: '¿Qué te llevó a considerar la terapia hoy?',
    options: therapyGoalsOptions,
    isMulti: true,
    isClearable: true,
    placeholder: 'Selecciona una o más opciones',
  },
  {
    name: 'financialStatus',
    type: 'select',
    label: '¿Cómo calificarías tu situación financiera actual?',
    options: financialStatusOptions,
    placeholder: 'Selecciona una opción',
  },
  {
    name: 'expectations',
    type: 'select',
    label: '¿Qué esperas obtener de esta experiencia con la IA?',
    options: expectationsOptions,
    isMulti: true,
    isClearable: true,
    placeholder: 'Selecciona una o más opciones',
  },
]

export const stepFourFields = [
  {
    name: 'communicationTone',
    type: 'radio',
    label:
      '¿Te gustaría que la IA se comunique contigo con un tono más informal o más profesional?',
    options: toneOptions,
  },
  {
    name: 'supportPreference',
    type: 'select',
    label: '¿Cómo te sientes más cómodo al recibir apoyo?',
    options: supportPreferenceOptions,
    isMulti: true,
    isClearable: true,
    placeholder: 'Selecciona una opción',
  },
  {
    name: 'receiveExercises',
    type: 'radio',
    label:
      '¿Te gustaría recibir ejercicios o sugerencias concretas para aplicar en la vida real?',
    options: exercisesOptions,
  },
]
