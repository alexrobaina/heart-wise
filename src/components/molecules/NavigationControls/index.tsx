import React from 'react'
import { Button } from '@/components/atoms/Button'

interface NavigationControlsProps {
  onPrev: () => void
  isFirstStep: boolean
  isLastStep: boolean
  isNextDisabled: boolean
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  onPrev,
  isFirstStep,
  isLastStep,
  isNextDisabled,
}) => {
  return (
    <div className="flex justify-between mt-6">
      <Button disabled={isFirstStep} variant="secondary" onClick={onPrev}>
        Anterior
      </Button>

      <Button type="submit" variant="primary" disabled={isNextDisabled}>
        {isLastStep ? 'Finalizar' : 'Siguiente'}
      </Button>
    </div>
  )
}
