// components/molecules/OptionList/index.tsx
import Radio from '@/components/atoms/Checkbox';
import { Checkbox } from '@/components/atoms/Radio';
import React from 'react';

interface Option {
  label: string;
  value: string;
  other?: boolean;
}

interface OptionListProps {
  type: 'radio' | 'checkbox';
  name: string;
  options: Option[];
  selected: string[]; // para radio también, pero con un solo valor
  onChange: (newSelected: string[], otherText?: string) => void;
  otherText?: string;
  onOtherTextChange?: (text: string) => void;
}

export const OptionList: React.FC<OptionListProps> = ({
  type,
  name,
  options,
  selected,
  onChange,
  otherText = '',
  onOtherTextChange,
}) => {
  const handleChange = (value: string, checked: boolean) => {
    if (type === 'checkbox') {
      const newSelected = checked
        ? [...selected, value]
        : selected.filter((v) => v !== value);
      onChange(newSelected, otherText);
    } else {
      onChange([value], otherText);
    }
  };

  return (
    <div className="space-y-2">
      {options.map(({ label, value, other }) => {
        const isChecked = selected.includes(value);
        if (type === 'checkbox') {
          return (
            <Checkbox
              key={value}
              label={label}
              checked={isChecked}
              onChange={(e) => handleChange(value, e.target.checked)}
              showInput={other && isChecked}
              inputValue={otherText}
              onInputChange={onOtherTextChange}
            />
          );
        } else {
          return (
            <Radio
              key={value}
              label={label}
              name={name}
              value={value}
              checked={isChecked}
              onChange={() => onChange([value], other ? otherText : '')}
            />
          );
        }
      })}
    </div>
  );
};

