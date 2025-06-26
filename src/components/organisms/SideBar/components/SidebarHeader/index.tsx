import React from 'react'
import { GoPlusCircle } from 'react-icons/go'
import { redirect } from 'next/navigation'

export const SidebarHeader: React.FC = () => (
  <div className="mb-6">
    <div className="flex items-center mb-4">
      <span className="ml-2 text-lg font-semibold text-amber-900">
        Soul Connection
      </span>
    </div>
    <button
      onClick={() => redirect('/newChat')}
      className="flex w-full items-center gap-2 p-2.5 bg-amber-50 hover:bg-amber-100 rounded mb-4 transition cursor-pointer"
    >
      <GoPlusCircle className="text-amber-900" size={20} />
      <span className="text-sm font-medium text-amber-900">Nuevo chat</span>
    </button>
  </div>
)
