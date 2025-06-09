// components/atoms/ErrorText.tsx
import React from 'react'

interface ErrorTextProps {
  children?: React.ReactNode
  className?: string
  show?: boolean
}

export const ErrorText: React.FC<ErrorTextProps> = ({
  children,
  className = '',
  show = true,
}) => {
  if (!show || !children) return null

  return <p className={`mt-1 text-sm text-red-600 ${className}`}>{children}</p>
}
