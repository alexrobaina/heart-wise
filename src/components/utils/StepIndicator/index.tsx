// components/utils/StepIndicator/index.tsx
import {FC} from 'react';

interface StepIndicatorProps {
  total: number;
  current: number;
}

export const StepIndicator: FC<StepIndicatorProps> = ({ total, current }) => {
  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full ${
            i === current ? 'bg-blue-600' : 'bg-gray-300'
          }`}
        />
      ))}
    </div>
  );
};
