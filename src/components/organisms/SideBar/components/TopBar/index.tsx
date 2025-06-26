'use client'

import React from 'react'
import { Loading } from '@/components/atoms/Loading'
import { DropDown } from '@/components/atoms/Dropdown'

interface TopBarProps {
  title: string
  chatId?: string | string[] | undefined
  isSaving: boolean
  languageSelected: string
  onLanguageChange: (lang: string) => void
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const options = [
  { label: 'English', value: 'English' },
  { label: 'Español', value: 'Español' },
]

export const TopBar: React.FC<TopBarProps> = ({
  chatId,
  title,
  isSaving,
  onTitleChange,
  languageSelected,
  onLanguageChange,
}) => {
  return (
    <div className="fixed bg-white h-14 top-0 z-40 w-screen border-b border-amber-200 flex items-center justify-between pr-8">
      {chatId && (
        <input
          onChange={onTitleChange}
          value={title.charAt(0).toUpperCase() + title.slice(1)}
          className="ml-[30px] sm:ml-[290px] bg-white text-amber-900 text-xl font-semibold focus:outline-none"
        />
      )}
      {isSaving && (
        <Loading
          size={20}
          centerScreen={false}
          className="justify-center items-center"
        />
      )}
      <DropDown
        name="Language"
        options={options}
        className="ml-auto mr-4"
        selected={languageSelected}
        onSelect={onLanguageChange}
      />
    </div>
  )
}
