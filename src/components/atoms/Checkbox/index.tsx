// components/atoms/Checkbox.tsx
import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  showInput?: boolean;
  inputValue?: string;
  onInputChange?: (value: string) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  showInput = false,
  inputValue = '',
  onInputChange,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-1">
      <label className={`inline-flex items-center space-x-2 cursor-pointer ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
        <input
          type="radio"
          className="form-checkbox text-blue-600 focus:ring-blue-500"
          {...props}
        />
        <span className="text-sm text-gray-700">{label}</span>
      </label>
      {showInput && (
        <input
          type="text"
          value={inputValue}
          onChange={(e) => onInputChange?.(e.target.value)}
          className="ml-6 mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
          placeholder="Especificar..."
        />
      )}
    </div>
  );
};

