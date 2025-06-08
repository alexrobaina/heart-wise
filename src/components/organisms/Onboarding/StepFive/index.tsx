import React from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { FormGroup } from '@/components/molecules/FormGroup'
import { Radio } from '@/components/atoms/Radio'
import { ReactSelect } from '@/components/atoms/ReactSelect'

const toneOptions = ['Informal', 'Profesional']

const supportPreferenceOptions = [
  {
    value: 'Que me escuchen primero',
    label: 'Que me escuchen primero',
  },
  {
    value: 'que me den ideas prácticas',
    label: 'Que me den ideas prácticas',
  },
  {
    value: 'Que me ayuden a reflexionar',
    label: 'Que me ayuden a reflexionar',
  },
]

const exercisesOptions = ['Sí', 'No', 'Tal vez más adelante']

export const StepFive = () => {
  const {
    watch,
    control,
    setValue,
    formState: { errors },
  } = useFormContext()

  const {
    field: { onChange: supportPreferenceChange, value: supportPreferenceValue },
    fieldState: { error: supportPreferenceError },
  } = useController({
    name: 'supportPreference',
    control,
    defaultValue: [],
  })

  const supportPreferenceSelectedOption = supportPreferenceValue
    ? supportPreferenceOptions.find((o) => o.value === supportPreferenceValue)
    : null

  const tone = watch('communicationTone')
  const exercises = watch('receiveExercises')

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">
        Información sobre la separación o crisis actual
      </h2>
      <p className="text-gray-600">
        En esta sección, queremos entender mejor la situación actual de tu
        relación y cómo ambos se sienten al respecto. Esto nos ayudará a
        ofrecerte un enfoque más personalizado y efectivo en el proceso de
        terapia.
      </p>
      <FormGroup
        label="¿Te gustaría que la IA se comunique contigo con un tono más informal o más profesional?"
        htmlFor="communicationTone"
        error={errors.communicationTone?.message}
      >
        <div className="flex flex-col space-y-2">
          {toneOptions.map((option) => (
            <Radio
              key={option}
              label={option}
              name="communicationTone"
              value={option}
              checked={tone === option}
              onChange={() =>
                setValue('communicationTone', option, { shouldValidate: true })
              }
            />
          ))}
        </div>
      </FormGroup>

      <FormGroup
        label="¿Cómo te sientes más cómodo al recibir apoyo?"
        htmlFor="supportPreference"
        error={
          supportPreferenceError?.message || errors.supportPreference?.message
        }
      >
        <ReactSelect
          options={supportPreferenceOptions}
          placeholder="Selecciona una opción"
          isClearable
          value={supportPreferenceSelectedOption}
          onChange={(selected) =>
            supportPreferenceChange(selected ? selected.value : null)
          }
          className="w-full"
          error={
            supportPreferenceError?.message || errors.supportPreference?.message
          }
        />
      </FormGroup>

      <FormGroup
        label="¿Te gustaría recibir ejercicios o sugerencias concretas para aplicar en la vida real?"
        htmlFor="receiveExercises"
        error={errors.receiveExercises?.message}
      >
        <div className="flex flex-col space-y-2">
          {exercisesOptions.map((option) => (
            <Radio
              key={option}
              label={option}
              name="receiveExercises"
              value={option}
              checked={exercises === option}
              onChange={() =>
                setValue('receiveExercises', option, { shouldValidate: true })
              }
            />
          ))}
        </div>
      </FormGroup>
    </div>
  )
}
