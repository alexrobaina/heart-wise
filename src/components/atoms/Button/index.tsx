// components/atoms/Button/index.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  IconLeft?: React.ReactNode;
  children: React.ReactNode;
}

const baseStyles = 'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition';

const variants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-400',
};

const disabledStyles = 'opacity-50 cursor-not-allowed';

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  loading = false,
  disabled,
  className = '',
  IconLeft,
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${isDisabled ? disabledStyles : ''} ${className}`}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      {...props}
    >
      {IconLeft && (
        <span className="mr-2">
          {IconLeft}
        </span>
      )}
      
      {/* Show loading spinner if loading is true */}
      {loading ? (
        <>
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"     
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2.93 6.364A8.001 8.001 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3.93-1.574zM12 20a8 8 0 008-8h-4a4 4 0 01-4 4v4zm6.364-2.93A8.001 8.001 0 0120 12h4c0 3.042-1.135 5.824-3 7.938l-3.636-1.868z"
            />
          </svg>
          <span className="ml-2">

          Cargando...
          </span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

