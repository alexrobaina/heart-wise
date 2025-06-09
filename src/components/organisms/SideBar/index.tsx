// src/components/Layout/Sidebar.tsx
'use client'

import { signOut } from 'next-auth/react'
import React, { ReactNode } from 'react'
import { GoPlusCircle } from 'react-icons/go'
import Image from 'next/image'
import { useUser } from '@/hooks/useUser'
import { CiLogout } from 'react-icons/ci'
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

  // If not logged in
  if (!isAuthenticated) return children

  // Mientras carga la sesión
  if (isLoading) {
    return (
      <aside
        className=" `
          w-64 h-screen fixed top-0
          bg-white
          p-4 border-r border-amber-200
          hidden md:flex flex-col
        "
      >
        <p className="text-center text-amber-500 mb-4">Loading…</p>
        {children}
      </aside>
    )
  }

  const logautHandler = () => signOut({ callbackUrl: '/' })

  return (
    <aside
      className="
        w-64 h-screen fixed top-0 z-50
        bg-white
        p-4 border-r border-amber-200
        hidden md:flex flex-col
        overflow-hidden
      "
    >
      {/* Logo / Título */}
      <div className="flex items-center mb-6">
        <span className="ml-2 text-lg font-semibold text-amber-900">
          Heart Wise
        </span>
      </div>

      {/* Botón “New Chat” */}
      <button
        onClick={() => redirect('/onboarding')}
        className="
          flex items-center gap-2
          p-2 bg-amber-100
          hover:bg-amber-200-700
          rounded mb-4 transition cursor-pointer
        "
      >
        <GoPlusCircle className="text-amber-600" size={20} />
        <span className="text-sm font-medium text-amber-900">Nuevo chat</span>
      </button>

      {/* Chats List */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1">
          {chatsLoading && (
            <li className="p-3 text-sm text-amber-600">Cargando chats...</li>
          )}
          {chatsError && (
            <li className="p-3 text-sm text-red-600">
              No hay chats registrados
            </li>
          )}
          {chats &&
            chats.map((chat) => (
              <li
                key={chat.id}
                className="p-3 text-sm text-amber-900 rounded hover:bg-amber-200-800 cursor-pointer transition"
                onClick={() => redirect(`/chat/${chat.id}`)}
              >
                {chat.title || 'Untitled Chat'}
              </li>
            ))}
          {!chatsLoading && chats?.length === 0 && (
            <li className="p-3 text-sm text-amber-600">
              No chats yet. Start a new conversation!
            </li>
          )}
        </ul>
      </nav>

      {/* Separador y Footer con info de usuario + logout */}
      <div className="border-t border-amber-200 mt-4 pt-4 gap-4 flex flex-col">
        <div className="flex items-center space-x-3">
          {session?.image ? (
            <Image
              src={session.image}
              alt="User Avatar"
              width={42}
              height={42}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 bg-amber-300 rounded-full flex items-center justify-center">
              <span className="text-amber-500 text-sm">
                {session?.name?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-amber-900 truncate">
              {session?.name || session?.email}
            </p>
          </div>
        </div>
        <button
          onClick={logautHandler}
          className="
              flex items-center gap-2
              p-2 bg-amber-100
              hover:bg-amber-200-700
              rounded mb-4 transition cursor-pointer
            "
        >
          <CiLogout className="text-amber-600" size={20} />
          <span className="text-sm font-medium text-amber-900">Logout</span>
        </button>
      </div>
    </aside>
  )
}
