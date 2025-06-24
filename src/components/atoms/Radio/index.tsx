// components/atoms/Radio.tsx
import React from 'react'

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  className?: string
}

export const Radio: React.FC<RadioProps> = ({
  key,
  label,
  className = '',
  ...props
}) => {
  return (
    <label
      key={key}
      className={`inline-flex items-center space-x-2 cursor-pointer ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      <input
        type="radio"
        className="form-radio text-blue-600 focus:ring-blue-500"
        {...props}
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  )
}
