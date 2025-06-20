// src/components/Layout/Sidebar.tsx
'use client'

import { signOut } from 'next-auth/react'
import React, { ReactNode, useState, useEffect, useRef } from 'react'
import { GoPlusCircle } from 'react-icons/go'
import { CiLogout } from 'react-icons/ci'
import Image from 'next/image'
import { useUser } from '@/hooks/useUser'
import { redirect, useParams } from 'next/navigation'
import { useUserChats } from '@/hooks/useUserChats'
import { HiMenu } from 'react-icons/hi'
import { RiDeleteBinLine } from 'react-icons/ri'
import { Loading } from '@/components/atoms/Loading'
import { useRemoveChat } from '@/hooks/useRemoveChat'
import { BsChatLeftHeartFill } from 'react-icons/bs'

interface SidebarProps {
  children?: ReactNode
}

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const param = useParams()
  const [chatIdRemove, setChatIdRemove] = useState('')
  const { mutate: removeChat, isSuccess } = useRemoveChat()
  const { user: session, isLoading, isAuthenticated } = useUser()
  const [isOpen, setIsOpen] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const { data: chats, isLoading: chatsLoading } = useUserChats()

  useEffect(() => {
    if (isSuccess && param.chat === chatIdRemove) {
      redirect('/newChat')
    }
  })

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isOpen])

  if (!isAuthenticated) return children

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
        <Loading />
        {children}
      </aside>
    )
  }

  const logautHandler = () => signOut({ callbackUrl: '/' })
  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-2 right-4 z-50 p-2 rounded bg-amber-100 hover:bg-amber-200 transition"
        aria-label="Open Menu"
      >
        <HiMenu className="text-amber-600" size={24} />
      </button>
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 flex flex-col bg-white border-r border-amber-200 p-4
              overflow-y-auto
              duration-300 ease-in-out ${isOpen ? 'md:translate-x-0' : '-translate-x-full'} md:static md:translate-x-0 md:shadow-lg`}
      >
        {/* Logo / Título */}
        <div className="flex items-center mb-6">
          <span className="ml-2 text-lg font-semibold text-amber-900">
            Soul Connection
          </span>
        </div>

        {/* Botón “New Chat” */}
        <button
          onClick={() => redirect('/newChat')}
          className="flex items-center gap-2 p-2 bg-amber-50 hover:bg-amber-100 rounded mb-4 transition cursor-pointer
        "
        >
          <GoPlusCircle className="text-amber-900" size={20} />
          <span className="text-sm font-medium text-amber-900">Nuevo chat</span>
        </button>

        {/* Chats List */}
        <nav className="flex-grow">
          <ul className="space-y-1">
            {chatsLoading && (
              <li className="p-3 text-sm text-amber-600">Cargando chats...</li>
            )}
            {chats &&
              chats.map((chat) => (
                <li
                  key={chat.id}
                  className={`flex justify-between items-center ${
                    chat.id === param.chat ? 'bg-amber-100' : ''
                  } hover:bg-amber-200 py-2 p-2 h-10 text-sm text-amber-900 rounded cursor-pointer transition`}
                >
                  <div
                    className="flex-grow capitalize truncate"
                    onClick={() => redirect(`/chat/${chat.id}`)}
                  >
                    {chat.title || 'Untitled Chat'}
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() =>
                        redirect(`/chat/${chat.id}/inviteConnection`)
                      }
                      className="p-1 rounded hover:bg-amber-100 text-amber-400 hover:text-red-400"
                      aria-label={`invite connection chat ${chat.title || 'Untitled Chat'}`}
                    >
                      <BsChatLeftHeartFill size={18} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setChatIdRemove(chat.id)
                        removeChat(chat.id)
                      }}
                      className="p-1 rounded hover:bg-amber-100 text-amber-400 hover:text-red-400"
                      aria-label={`Delete chat ${chat.title || 'Untitled Chat'}`}
                    >
                      <RiDeleteBinLine size={18} />
                    </button>
                  </div>
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
              hover:bg-amber-200
              rounded mb-4 transition cursor-pointer
            "
          >
            <CiLogout className="text-amber-600" size={20} />
            <span className="text-sm font-medium text-amber-900">Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}
