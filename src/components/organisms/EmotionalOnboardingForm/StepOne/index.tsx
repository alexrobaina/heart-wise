// src/components/organisms/Onboarding/StepOne/index.tsx
import React from 'react'
import { stepOneFields } from '../stepsConfig'
import { FormFieldRenderer } from '@/components/molecules/FormFieldRendered'

export function StepOne() {
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
      {stepOneFields.map((field) => (
        <FormFieldRenderer
          field={field}
          key={field.name}
          options={field.options}
        />
      ))}
    </div>
  )
}
