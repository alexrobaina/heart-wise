import React from 'react'
import { stepFourFields } from '../stepsConfig'
import { FormFieldRenderer } from '@/components/molecules/FormFieldRendered'

export function StepFour() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">
        ¿Cómo querés que la IA te acompañe?
      </h2>
      <p className="text-gray-600">
        Podés elegir el estilo de comunicación que te haga sentir más cómodo/a,
        y contarnos cómo preferís recibir apoyo. Este paso es clave para que la
        IA conecte con vos de forma humana, respetuosa y útil.
      </p>
      {stepFourFields.map((field) => (
        <FormFieldRenderer key={field.name} field={field} />
      ))}
    </div>
  )
}
