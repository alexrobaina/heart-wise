// src/components/Layout/Sidebar.tsx
'use client'

import { signOut } from 'next-auth/react'
import React, { ReactNode } from 'react'
import { GoPlusCircle } from 'react-icons/go'
import Image from 'next/image'
import { useUser } from '@/hooks/useUser'
import { redirect } from 'next/navigation'
import { useUserChats } from '@/hooks/useUserChats'

interface SidebarProps {
  children?: ReactNode
}

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const { user: session, isLoading, isAuthenticated } = useUser()
  const {
    data: chats,
    isLoading: chatsLoading,
    error: chatsError,
  } = useUserChats()
  console.log(chats)

  // If not logged in
  if (!isAuthenticated) return children

  // Mientras carga la sesión
  if (isLoading) {
    return (
      <aside
        className=" `
          w-64 h-screen fixed top-0
          bg-white dark:bg-gray-900
          p-4 border-r border-gray-200 dark:border-gray-800
          hidden md:flex flex-col
        "
      >
        <p className="text-center text-gray-500 dark:text-gray-400 mb-4">
          Loading…
        </p>
        {children}
      </aside>
    )
  }

  const logautHandler = () => signOut({ callbackUrl: '/' })

  return (
    <aside
      className="
        w-64 h-screen fixed top-0 z-50
        bg-white dark:bg-gray-900
        p-4 border-r border-gray-200 dark:border-gray-800
        hidden md:flex flex-col
        overflow-hidden
      "
    >
      {/* Logo / Título */}
      <div className="flex items-center mb-6">
        <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Heart Wise
        </span>
      </div>

      {/* Botón “New Chat” */}
      <button
        onClick={() => redirect('/onboarding')}
        className="
          flex items-center gap-2
          p-2 bg-gray-100 dark:bg-gray-800
          hover:bg-gray-200 dark:hover:bg-gray-700
          rounded mb-4 transition cursor-pointer
        "
      >
        <GoPlusCircle className="text-gray-600 dark:text-gray-400" size={20} />
        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Nuevo chat
        </span>
      </button>

      {/* Chats List */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1">
          {chatsLoading && (
            <li className="p-3 text-sm text-gray-600 dark:text-gray-400">
              Cargando chats...
            </li>
          )}
          {chatsError && (
            <li className="p-3 text-sm text-red-600 dark:text-red-400">
              No hay chats registrados
            </li>
          )}
          {chats &&
            chats.map((chat) => (
              <li
                key={chat.id}
                className="p-3 text-sm text-gray-900 dark:text-gray-100 rounded hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer transition"
                onClick={() => redirect(`/chat/${chat.id}`)}
              >
                {chat.title || 'Untitled Chat'}
              </li>
            ))}
          {!chatsLoading && chats?.length === 0 && (
            <li className="p-3 text-sm text-gray-600 dark:text-gray-400">
              No chats yet. Start a new conversation!
            </li>
          )}
        </ul>
      </nav>

      {/* Separador y Footer con info de usuario + logout */}
      <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
        <div className="flex items-center space-x-3">
          {session.user?.image ? (
            <Image
              src={session.user.image}
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                {session.user?.name?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
              {session.user?.name || session.user?.email}
            </p>
            <button
              onClick={logautHandler}
              className="text-xs text-red-600 dark:text-red-400 hover:underline mt-1"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
