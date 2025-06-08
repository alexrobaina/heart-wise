// src/schemas/onboardingSchema.ts
import * as Yup from 'yup'

export const onboardingSchemas = [
  // Paso 1: Sobre la relación
  Yup.object().shape({
    relationshipStatus: Yup.string().required('Este campo es obligatorio'),
    partnerGender: Yup.string().required('Este campo es obligatorio'),
    relationshipDuration: Yup.number().required('Este campo es obligatorio'),
    livingTogether: Yup.string().required('Este campo es obligatorio'),
    haveChildren: Yup.string().required('Este campo es obligatorio'),
    childrenDetails: Yup.string().when(
      'haveChildren',
      (haveChildren: any, schema) => {
        if (Array.isArray(haveChildren)) {
          return haveChildren.includes('Sí')
            ? schema.required('Por favor, proporciona detalles de los hijos')
            : schema.notRequired()
        }
        return haveChildren === 'Sí'
          ? schema.required('Por favor, proporciona detalles de los hijos')
          : schema.notRequired()
      },
    ),
  }),
  // Paso 2: Sobre el conflicto actual
  Yup.object().shape({
    challenges: Yup.array().min(1, 'Selecciona al menos un desafío'),
    expectations: Yup.array().min(1, 'Selecciona al menos una expectativa'),
  }),
  // Paso 3: Sobre la disposición emocional
  Yup.object().shape({
    bothInterested: Yup.string().required('Este campo es obligatorio'),
    triedTherapy: Yup.string().required('Este campo es obligatorio'),
  }),
  // Paso 4: Pregunta sutil sobre separación/divorcio
  Yup.object().shape({
    consideringSeparation: Yup.string().required('Este campo es obligatorio'),
    legalSupport: Yup.string().when(
      'consideringSeparation',
      (consideringSeparation, schema) => {
        if (Array.isArray(consideringSeparation)) {
          return consideringSeparation.includes('Sí')
            ? schema.required('Por favor, proporciona detalles de los hijos')
            : schema.notRequired()
        }
        return consideringSeparation === 'Sí'
          ? schema.required('Por favor, proporciona detalles de los hijos')
          : schema.notRequired()
      },
    ),
  }),
  // Paso 5: Ideas adicionales
  Yup.object().shape({
    communicationTone: Yup.string().required('Este campo es obligatorio'),
    supportPreference: Yup.string().required('Este campo es obligatorio'),
    receiveExercises: Yup.string().required('Este campo es obligatorio'),
  }),
]
