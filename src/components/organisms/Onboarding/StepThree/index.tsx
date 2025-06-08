import React from 'react'
import { useFormContext } from 'react-hook-form'
import { FormGroup } from '@/components/molecules/FormGroup'
import { Radio } from '@/components/atoms/Radio'

const interestOptions = ['Sí', 'No', 'No estoy seguro/a']
const therapyOptions = ['Sí', 'No']

export const StepThree = () => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext()

  const selectedInterest = watch('bothInterested')
  const selectedTherapy = watch('triedTherapy')

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Información sobre la pareja</h2>
      <p className="text-gray-600">
        En esta sección, queremos entender mejor la situación actual de tu
        relación y cómo ambos se sienten al respecto. Esto nos ayudará a
        ofrecerte un enfoque más personalizado y efectivo en el proceso de
        terapia.
      </p>
      <FormGroup
        label="¿Ambos tienen interés en mejorar la relación?"
        htmlFor="bothInterested"
        error={errors.bothInterested?.message}
      >
        <div className="flex flex-col space-y-2">
          {interestOptions.map((option) => (
            <Radio
              key={option}
              label={option}
              value={option}
              name="bothInterested"
              checked={selectedInterest === option}
              onChange={() =>
                setValue('bothInterested', option, { shouldValidate: true })
              }
            />
          ))}
        </div>
      </FormGroup>

      <FormGroup
        label="¿Han intentado antes terapia de pareja o hablar con un profesional?"
        htmlFor="triedTherapy"
        error={errors.triedTherapy?.message}
      >
        <div className="flex flex-col space-y-2">
          {therapyOptions.map((option) => (
            <Radio
              key={option}
              label={option}
              value={option}
              name="triedTherapy"
              checked={selectedTherapy === option}
              onChange={() =>
                setValue('triedTherapy', option, { shouldValidate: true })
              }
            />
          ))}
        </div>
      </FormGroup>
    </div>
  )
}
