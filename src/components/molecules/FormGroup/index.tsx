// components/molecules/FormGroup.tsx
import { FC, ReactNode } from 'react'
import { Label } from '@/components/atoms/Label'
import { HelperText } from '@/components/atoms/HelperText'
import { ErrorText } from '@/components/atoms/ErrorText'

interface FormGroupProps {
  label: string
  htmlFor: string
  helperText?: string
  children: ReactNode
  shouldShow?: boolean
  error?: string | undefined
}

export const FormGroup: FC<FormGroupProps> = ({
  label,
  error,
  htmlFor,
  children,
  helperText,
  shouldShow = true,
}) => {
  if (!shouldShow) return null

  return (
    <div className="space-y-1 mt-6">
      <Label htmlFor={htmlFor}>{label}</Label>
      {helperText && <HelperText>{helperText}</HelperText>}
      {children}
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  )
}
