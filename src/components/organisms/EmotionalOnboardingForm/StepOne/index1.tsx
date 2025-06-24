// src/components/organisms/Onboarding/StepOne/index.tsx
import React from 'react'
import { useFormContext, useController } from 'react-hook-form'
import { FormGroup } from '@/components/molecules/FormGroup'
import { ReactSelect } from '@/components/atoms/ReactSelect'
import { InputText } from '@/components/atoms/InputText'
import { Radio } from '@/components/atoms/Radio'
import { genderOptions, relationshipOptions } from './constants'
import { yesNoOptions } from '../constants'

export const StepOne = () => {
  const {
    watch,
    control,
    setValue,
    register,
    formState: { errors },
  } = useFormContext()

  const {
    field: { onChange: onRelChange, value: relValue },
    fieldState: { error: relError },
  } = useController({
    name: 'relationshipStatus',
    control,
    defaultValue: [],
  })

  // partnerGender
  const {
    field: { onChange: onPartnerGenderChange, value: partnerGenderValue },
    fieldState: { error: partnerGenderError },
  } = useController({
    name: 'partnerGender',
    control,
    defaultValue: null,
  })

  // userGender
  const {
    field: { onChange: onUserGenderChange, value: userGenderValue },
    fieldState: { error: userGenderError },
  } = useController({
    name: 'userGender',
    control,
    defaultValue: null,
  })

  const relationshipStatusOption = relValue
    ? relationshipOptions.find((o) => o.value === relValue)
    : null

  const partnetGenderSelectedOption = partnerGenderValue
    ? genderOptions.find((o) => o.value === partnerGenderValue)
    : null

  const userGenderSelectedOption = userGenderValue
    ? genderOptions.find((o) => o.value === userGenderValue)
    : null

  const livingTogetherSelected = watch('livingTogether')
  const haveChildrenSelected = watch('haveChildren')

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">
        Quiénes son y desde dónde construyen su relación
      </h2>
      <p className="text-gray-600">
        La edad, identidad y lugar de origen de ambos pueden influir en la forma
        en que viven la relación. Estos datos nos ayudan a adaptar el
        acompañamiento a tu realidad y cultura.
      </p>
      <FormGroup
        label="¿Cuál es tu relación actual con tu pareja?"
        htmlFor="relationshipStatus"
        error={relError?.message || errors.relationshipStatus?.message}
      >
        <ReactSelect
          isClearable
          options={relationshipOptions}
          placeholder="Selecciona una opción"
          value={relationshipStatusOption}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          onChange={(selected) => onRelChange(selected ? selected.value : null)}
          className="w-full"
          error={relError?.message || errors.relationshipStatus?.message}
        />
      </FormGroup>

      <FormGroup
        label="¿Con que genero te identificas?"
        htmlFor="userGender"
        error={userGenderError?.message || errors.userGender?.message}
      >
        <ReactSelect
          options={genderOptions}
          placeholder="Selecciona una opción"
          isClearable
          value={userGenderSelectedOption}
          onChange={(selected) =>
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            onUserGenderChange(selected ? selected.value : null)
          }
          className="w-full"
          error={userGenderError?.message || errors.userGender?.message}
        />
      </FormGroup>

      <FormGroup
        label="¿Con qué género se identifica tu pareja?"
        htmlFor="partnerGender"
        error={partnerGenderError?.message || errors.partnerGender?.message}
      >
        <ReactSelect
          isClearable
          options={genderOptions}
          placeholder="Selecciona una opción"
          value={partnetGenderSelectedOption}
          onChange={(selected) =>
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            onPartnerGenderChange(selected ? selected.value : null)
          }
          className="w-full"
          error={partnerGenderError?.message || errors.partnerGender?.message}
        />
      </FormGroup>

      <FormGroup
        label="¿Desde hace cuánto tiempo están juntos?"
        htmlFor="relationshipDuration"
        error={errors.relationshipDuration?.message}
      >
        <InputText
          type="number"
          id="relationshipDuration"
          {...register('relationshipDuration')}
          placeholder="Ejemplo: 1-5 años"
        />
      </FormGroup>

      <FormGroup
        label="¿Viven juntos actualmente?"
        htmlFor="livingTogether"
        error={errors.receiveExercises?.message}
      >
        <div className="flex flex-col space-y-2">
          {yesNoOptions.map((option) => (
            <Radio
              key={option}
              label={option}
              name="livingTogether"
              value={option}
              checked={livingTogetherSelected === option}
              onChange={() =>
                setValue('livingTogether', option, { shouldValidate: true })
              }
            />
          ))}
        </div>
      </FormGroup>

      <FormGroup
        label="¿Tienen hijos?"
        htmlFor="haveChildren"
        error={errors.receiveExercises?.message}
      >
        <div className="flex flex-col space-y-2">
          {yesNoOptions.map((option) => (
            <Radio
              key={option}
              label={option}
              name="haveChildren"
              value={option}
              checked={haveChildrenSelected === option}
              onChange={() =>
                setValue('haveChildren', option, { shouldValidate: true })
              }
            />
          ))}
        </div>
      </FormGroup>

      <FormGroup
        htmlFor="childrenDetails"
        error={errors.childrenDetails?.message}
        shouldShow={haveChildrenSelected === 'Sí'}
        label="¿Cuántos y de qué edades aproximadamente?"
      >
        <InputText
          type="number"
          id="childrenDetails"
          {...register('childrenDetails')}
          placeholder="Ejemplo: 2 hijos, 3 y 5 años"
        />
      </FormGroup>
    </div>
  )
}
