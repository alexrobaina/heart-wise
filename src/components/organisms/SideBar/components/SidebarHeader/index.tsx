'use client'
import React from 'react'
import { GoPlusCircle } from 'react-icons/go'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export const SidebarHeader: React.FC = () => {
  const t = useTranslations('SidebarHeader')

  return (
    <div className="mb-6">
      <div className="flex items-center mb-4">
        <Image
          width={40}
          height={40}
          alt="Logo"
          src="/logo-soulconnection.png"
        />
        <span className="ml-2 text-lg font-semibold text-amber-900">
          Soul Connection
        </span>
      </div>
      <button
        onClick={() => redirect('/newChat')}
        className="flex w-full items-center gap-2 p-2.5 bg-amber-50 hover:bg-amber-100 rounded mb-4 transition cursor-pointer"
      >
        <GoPlusCircle className="text-amber-900" size={20} />
        <span className="text-sm font-medium text-amber-900">
          {t('newChat')}
        </span>
      </button>
    </div>
  )
}
