// components/atoms/InputText.tsx
import React from 'react'

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export const InputText: React.FC<InputTextProps> = ({
  className = '',
  ...props
}) => {
  return (
    <input
      type="text"
      className={`block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-blue-500 focus:border-blue-500 ${className}`}
      {...props}
    />
  )
}
