import React from 'react'
import { stepTwoFields } from '../stepsConfig'
import { FormFieldRenderer } from '@/components/molecules/FormFieldRendered'

export function StepTwo() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Datos personales y ubicación</h2>
      <p className="text-gray-600">
        La edad, identidad y lugar de origen de ambos pueden influir en la forma
        en que viven la relación. Estos datos nos ayudan a adaptar el
        acompañamiento a tu realidad y cultura.
      </p>
      {stepTwoFields.map((field) => (
        <FormFieldRenderer key={field.name} field={field} />
      ))}
    </div>
  )
}
