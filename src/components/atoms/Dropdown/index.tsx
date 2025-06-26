'use client'
import { FC, useState } from 'react'

interface DropDownProps {
  name?: string
  selected: string
  className?: string
  onSelect: (option: string) => void
  options: { label: string; value: string }[]
}

export const DropDown: FC<DropDownProps> = ({
  options,
  selected,
  onSelect,
  className = '',
  name = 'dropdown',
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
          className={`${className} inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-amber-900 shadow-xs ring-1 ring-amber-300 ring-inset hover:bg-amber-50`}
        >
          {selected || name}
          <svg
            className="-mr-1 size-5 text-amber-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
          >
            <path
              fill-rule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div
        className={`${isOpen ? 'absolute' : 'hidden'} right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <div className="py-1" role="none">
          {options.map((option) => (
            <button
              key={option.label}
              onClick={() => {
                onSelect(option.value)
                setIsOpen(false)
              }}
              className={`block w-full px-4 py-2 text-left text-sm ${
                selected === option.value ? 'bg-amber-100' : 'text-amber-700'
              } hover:bg-amber-100`}
              role="menuitem"
            >
              {option.value}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
