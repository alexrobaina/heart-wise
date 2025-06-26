import React from 'react'
import { HiMenu } from 'react-icons/hi'

interface MobileMenuToggleProps {
  isOpen: boolean
  onToggle: () => void
}

export const MobileMenuToggle: React.FC<MobileMenuToggleProps> = ({
  isOpen,
  onToggle,
}) => (
  <button
    onClick={onToggle}
    className="md:hidden fixed top-2 right-4 z-50 p-2 rounded bg-amber-100 hover:bg-amber-200 transition"
    aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
  >
    <HiMenu className="text-amber-600" size={24} />
  </button>
)
