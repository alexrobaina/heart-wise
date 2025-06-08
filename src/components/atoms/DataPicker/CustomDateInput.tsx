import { forwardRef } from 'react'

const baseInputClasses = `
  block 
  w-full 
  h-10 
  rounded-[4px] 
  border-0 
  py-1.5 
  text-gray-900 
  ring-1 
  ring-inset 
  ring-gray-400 
  outline-none
  placeholder:text-neutral-500 
  placeholder:text-sm 
  focus:ring-primary-300 
  sm:text-sm 
  sm:leading-6 
  pl-3
`

interface CustomInputProps {
  value?: string
  onClick?: () => void
  placeholder?: string
}

export const CustomDateInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ value, onClick, placeholder }, ref) => (
    <input
      type="text"
      className={baseInputClasses}
      onClick={onClick}
      value={value}
      ref={ref}
      placeholder={placeholder || 'Select date'}
      readOnly // prevent manual editing; datepicker will manage the value
    />
  ),
)

CustomDateInput.displayName = 'CustomDateInput'
