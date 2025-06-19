// src/schemas/onboardingSchema.ts
import * as Yup from 'yup'

export const emotionalOnboardingFormSchema = [
  // Paso 1: Sobre la relación
  Yup.object().shape({
    relationshipStatus: Yup.string().required('Este campo es obligatorio'),
    partnerGender: Yup.string().required('Este campo es obligatorio'),
    userGender: Yup.string().required('Este campo es obligatorio'),
    relationshipDuration: Yup.number()
      .typeError('Debe ser un número')
      .required('Este campo es obligatorio'),
    livingTogether: Yup.string().required('Este campo es obligatorio'),
    haveChildren: Yup.string().required('Este campo es obligatorio'),
    childrenDetails: Yup.string().when('haveChildren', {
      is: (val: string) => val === 'Sí',
      then: (schema) =>
        schema.required('Por favor, proporciona detalles de los hijos'),
      otherwise: (schema) => schema.notRequired(),
    }),
  }),
  // Paso 2: Datos personales y ubicación
  Yup.object().shape({
    partnerLocation: Yup.string().required('Este campo es obligatorio'),
    partnerAge: Yup.number()
      .typeError('Debe ser un número')
      .required('Este campo es obligatorio'),
    userLocation: Yup.string().required('Este campo es obligatorio'),
    userAge: Yup.number()
      .typeError('Debe ser un número')
      .required('Este campo es obligatorio'),
    improveRelationship: Yup.string().required('Este campo es obligatorio'),
    challenges: Yup.array()
      .of(Yup.string())
      .min(1, 'Selecciona al menos un desafío')
      .required('Selecciona al menos un desafío'),
    consideringSeparation: Yup.string().required('Este campo es obligatorio'),
    legalSupport: Yup.string().when('consideringSeparation', {
      is: (val: string) => val === 'Sí, estamos en proceso',
      then: (schema) =>
        schema.required('Por favor, proporciona detalles legales'),
      otherwise: (schema) => schema.notRequired(),
    }),
    legalLocation: Yup.string().when('legalSupport', {
      is: (val: string) => val === 'Sí',
      then: (schema) =>
        schema.required('Por favor, proporciona ubicación legal'),
      otherwise: (schema) => schema.notRequired(),
    }),
  }),
  // Paso 3: Disposición emocional y situación actual
  Yup.object().shape({
    violence: Yup.string().required('Este campo es obligatorio'),
    typeOfViolence: Yup.array()
      .of(Yup.string())
      .min(1, 'Selecciona al menos un tipo de violencia')
      .required('Selecciona al menos un tipo de violencia'),
    triedTherapy: Yup.string().required('Este campo es obligatorio'),
    therapyGoals: Yup.array()
      .of(Yup.string())
      .min(1, 'Selecciona al menos un objetivo de terapia')
      .required('Selecciona al menos un objetivo de terapia'),
    financialStatus: Yup.string().required('Este campo es obligatorio'),
    expectations: Yup.array()
      .of(Yup.string())
      .min(1, 'Selecciona al menos una expectativa')
      .required('Selecciona al menos una expectativa'),
  }),
  // Paso 4: Preferencias de acompañamiento
  Yup.object().shape({
    communicationTone: Yup.string().required('Este campo es obligatorio'),
    supportPreference: Yup.array()
      .of(Yup.string())
      .min(1, 'Selecciona al menos una opción')
      .required('Selecciona al menos una opción'),
    receiveExercises: Yup.string().required('Este campo es obligatorio'),
  }),
]
