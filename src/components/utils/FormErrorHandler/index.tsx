// components/utils/FormErrorHandler.tsx
import {FC} from 'react';

interface FormErrorHandlerProps {
  errors: string[] | string | null;
}

export const FormErrorHandler: FC<FormErrorHandlerProps> = ({ errors }) => {
  if (!errors || (Array.isArray(errors) && errors.length === 0)) return null;

  const errorList = Array.isArray(errors) ? errors : [errors];

  return (
    <div className="bg-red-100 border border-red-400 text-red-700 text-sm px-4 py-2 rounded-md space-y-1">
      {errorList.map((err, index) => (
        <div key={index}>• {err}</div>
      ))}
    </div>
  );
};

