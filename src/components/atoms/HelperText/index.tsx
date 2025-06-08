// components/atoms/HelperText.tsx
import React from 'react';

interface HelperTextProps {
  children: React.ReactNode;
  className?: string;
}

export const HelperText: React.FC<HelperTextProps> = ({ children, className = '' }) => {
  return (
    <p className={`mt-1 text-sm text-gray-500 ${className}`}>
      {children}
    </p>
  );
};
