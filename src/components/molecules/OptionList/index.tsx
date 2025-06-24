// components/molecules/OptionList/index.tsx
import { Checkbox } from '@/components/atoms/Checkbox'
import { Radio } from '@/components/atoms/Radio'
import React, { ChangeEvent } from 'react'

interface Option {
  label: string
  value: string
  other?: boolean
}

interface OptionListProps {
  type: 'radio' | 'checkbox'
  name: string
  options: Option[]
  selected: string[] // para radio también, pero con un solo valor
  onChange: (newSelected: string[], otherText?: string) => void
  otherText?: string
  onOtherTextChange?: (text: string) => void
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
        : selected.filter((v) => v !== value)
      onChange(newSelected, otherText)
    } else {
      onChange([value], otherText)
    }
  }

  return (
    <div className="space-y-2">
      {options.map(({ label, value, other }) => {
        const isChecked = selected.includes(value)
        if (type === 'checkbox') {
          return (
            <Checkbox
              key={value}
              label={label}
              checked={isChecked}
              inputValue={otherText}
              showInput={other && isChecked}
              onInputChange={onOtherTextChange}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(value, e.target.checked)
              }
            />
          )
        } else {
          return (
            <Radio
              key={name}
              name={name}
              value={value}
              label={label}
              checked={isChecked}
              onChange={() => onChange([value], other ? otherText : '')}
            />
          )
        }
      })}
    </div>
  )
}
