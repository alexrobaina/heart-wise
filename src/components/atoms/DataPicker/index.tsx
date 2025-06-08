import { FC } from 'react'
import ReactDatePicker from 'react-datepicker'
import { IoClose } from 'react-icons/io5'
import 'react-datepicker/dist/react-datepicker.css'
import { CustomDateInput } from './CustomDateInput'

interface DatePickerProps {
  name?: string
  label?: string
  error?: string
  className?: string
  disabled?: boolean
  placeholder?: string
  value?: string | Date
  handleChange?: (date: Date | null) => void
}

export const DatePicker: FC<DatePickerProps> = ({
  name,
  label,
  value,
  error,
  placeholder,
  handleChange,
  ...props
}) => {
  return (
    <div className="flex flex-col relative w-full">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <ReactDatePicker
        {...props}
        onChange={handleChange}
        placeholderText={placeholder}
        selected={value ? new Date(value) : null}
        customInput={<CustomDateInput placeholder={placeholder} />}
      />
      {value && (
        <button
          type="button"
          onClick={() => handleChange?.(null)}
          className="absolute right-2 top-10 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <IoClose size={20} />
        </button>
      )}
      {error && (
        <p className="absolute -bottom-5 left-3 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}
