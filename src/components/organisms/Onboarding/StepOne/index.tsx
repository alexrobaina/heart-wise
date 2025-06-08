import React from 'react'
import { useFormContext, useController } from 'react-hook-form'
import { FormGroup } from '@/components/molecules/FormGroup'
import { OptionType, ReactSelect } from '@/components/atoms/ReactSelect'
import { InputText } from '@/components/atoms/InputText'
import { Radio } from '@/components/atoms/Radio'

const relationshipOptions: OptionType[] = [
  { value: 'casados', label: 'Casados' },
  { value: 'en pareja', label: 'En pareja' },
  { value: 'solteros', label: 'Solteros' },
  { value: 'divorciados', label: 'Divorciados' },
  { value: 'viudos', label: 'Viudos' },
]

const genderOptions: OptionType[] = [
  { value: 'masculino', label: 'Masculino' },
  { value: 'femenino', label: 'Femenino' },
  { value: 'no binario', label: 'No binario' },
  { value: 'transgénero', label: 'Transgénero' },
  { value: 'género fluido', label: 'Género fluido' },
  { value: 'prefiero no decir', label: 'Prefiero no decir' },
  { value: 'otro', label: 'Otro' },
]

const yesNoOptions = ['Sí', 'No']

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
    field: { onChange: onGenderChange, value: genderValue },
    fieldState: { error: genderError },
  } = useController({
    name: 'partnerGender',
    control,
    defaultValue: null,
  })

  const relationshipStatusOption = relValue
    ? relationshipOptions.find((o) => o.value === relValue)
    : null

  const genderSelectedOption = genderValue
    ? genderOptions.find((o) => o.value === genderValue)
    : null

  const livingTogetherSelected = watch('livingTogether')
  const haveChildrenSelected = watch('haveChildren')

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Información de la pareja</h2>
      <p className="text-gray-600">
        Completa los siguientes campos para conocer mejor a tu pareja.
      </p>
      <FormGroup
        label="¿Cuál es tu relación actual con tu pareja?"
        htmlFor="relationshipStatus"
        error={relError?.message || errors.relationshipStatus?.message}
      >
        <ReactSelect
          options={relationshipOptions}
          placeholder="Selecciona una opción"
          isClearable
          value={relationshipStatusOption}
          onChange={(selected) => onRelChange(selected ? selected.value : null)}
          className="w-full"
          error={relError?.message || errors.relationshipStatus?.message}
        />
      </FormGroup>

      <FormGroup
        label="¿Con qué género se identifica tu pareja?"
        htmlFor="partnerGender"
        error={genderError?.message || errors.partnerGender?.message}
      >
        <ReactSelect
          options={genderOptions}
          placeholder="Selecciona una opción"
          isClearable
          value={genderSelectedOption}
          onChange={(selected) =>
            onGenderChange(selected ? selected.value : null)
          }
          className="w-full"
          error={genderError?.message || errors.partnerGender?.message}
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
