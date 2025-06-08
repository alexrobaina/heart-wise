import React from 'react'
import { useFormContext } from 'react-hook-form'
import { FormGroup } from '@/components/molecules/FormGroup'
import { InputText } from '@/components/atoms/InputText'
import { Radio } from '@/components/atoms/Radio'

const separationOptions = [
  'Sí, estamos en proceso',
  'Lo estamos considerando',
  'No, pero estamos en crisis',
  'Prefiero no responder',
]

const legalSupportOptions = ['Sí', 'No']

export const StepFour = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext()

  const consideringSeparation = watch('consideringSeparation')
  const legalSupport = watch('legalSupport')

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">
        Información como te gustaría que la IA te apoye
      </h2>
      <p className="text-gray-600">
        Queremos saber cual es la mejor manera de apoyarte en esta etapa. Por
        favor, selecciona la opción que mejor describa tu situación actual. Esto
        nos ayudará a ofrecerte un enfoque más personalizado y efectivo en el
        proceso de terapia.
      </p>
      <FormGroup
        htmlFor="consideringSeparation"
        error={errors.consideringSeparation?.message}
        label="¿Estás atravesando o considerando una separación?"
      >
        <div className="flex flex-col space-y-2">
          {separationOptions.map((option) => (
            <Radio
              key={option}
              label={option}
              name="consideringSeparation"
              value={option}
              checked={consideringSeparation === option}
              onChange={() =>
                setValue('consideringSeparation', option, {
                  shouldValidate: true,
                })
              }
            />
          ))}
        </div>
      </FormGroup>

      {consideringSeparation === 'Sí, estamos en proceso' && (
        <>
          <FormGroup
            label="¿Querés que la IA tenga en cuenta aspectos legales de tu país para apoyarte mejor en esta etapa?"
            htmlFor="legalSupport"
            error={errors.legalSupport?.message}
          >
            <div className="flex flex-col space-y-2">
              {legalSupportOptions.map((option) => (
                <Radio
                  key={option}
                  label={option}
                  name="legalSupport"
                  value={option}
                  checked={legalSupport === option}
                  onChange={() =>
                    setValue('legalSupport', option, { shouldValidate: true })
                  }
                />
              ))}
            </div>
          </FormGroup>

          {legalSupport === 'Sí' && (
            <FormGroup
              label="País, provincia/estado y situación legal general (opcional)"
              htmlFor="location"
              error={errors.location?.message}
            >
              <InputText
                id="location"
                {...register('location')}
                placeholder="Ejemplo: Argentina, Buenos Aires, proceso de divorcio iniciado"
              />
            </FormGroup>
          )}
        </>
      )}
    </div>
  )
}
