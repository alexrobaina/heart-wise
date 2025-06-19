import React from 'react'
import { stepThreeFields } from '../stepsConfig'
import { FormFieldRenderer } from '@/components/molecules/FormFieldRendered'

export function StepThree() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Tu relación hoy</h2>
      <p className="text-gray-600">
        Queremos conocer cómo es tu vínculo actual con tu pareja. Esto nos
        permitirá comprender mejor tu contexto emocional y acompañarte de forma
        más personalizada desde el inicio.
      </p>
      {stepThreeFields.map((field) => (
        <FormFieldRenderer key={field.name} field={field} />
      ))}
    </div>
  )
}
