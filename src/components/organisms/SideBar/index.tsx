'use client'

import React, { ReactNode, useState, useEffect, useRef } from 'react'
import { signOut } from 'next-auth/react'
import { redirect, useParams } from 'next/navigation'

import { useUser } from '@/hooks/useUser'
import { useUserChats } from '@/hooks/useUserChats'
import { useRemoveChat } from '@/hooks/useRemoveChat'
import { useUpdateChatTitle } from '@/hooks/useUpdateChatTitle'
import { useChatTitle } from '@/context/ChatTitleContext'

import { Loading } from '@/components/atoms/Loading'
import { TopBar } from './components/TopBar'
import { MobileMenuToggle } from './components/MobileMenuToggle'
import { SidebarHeader } from './components/SidebarHeader'
import { ChatList } from './components/ChatList'
import { UserFooter } from './components/UserFooter'

interface SidebarProps {
  children?: ReactNode
}

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const params = useParams()
  const [isOpen, setIsOpen] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const { user: session, isLoading: userLoading, isAuthenticated } = useUser()
  const { data: chats, isLoading: chatsLoading } = useUserChats()
  const { mutate: removeChat, isSuccess } = useRemoveChat()
  const { title, setTitle } = useChatTitle()
  const { isSaving, mutation } = useUpdateChatTitle(params.chat || '')
  const [selected, setSelected] = React.useState<string>('English')

  // Auto-redirect after chat delete
  useEffect(() => {
    if (isSuccess && params.chat === sidebarRef.current?.dataset.removingChat) {
      redirect('/newChat')
    }
  })

  // Close sidebar on outside click (mobile)
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [isOpen])

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    setTimeout(() => mutation.mutate(e.target.value), 500)
  }

  const logout = () => signOut({ callbackUrl: '/' })

  const handleLanguageChange = (value: string) => {
    console.log(value)
    setSelected(value)
  }

  if (!isAuthenticated) return <>{children}</>
  if (userLoading) {
    return (
      <aside className="w-64 h-screen fixed top-0 bg-white p-4 border-r border-amber-200 hidden md:flex flex-col">
        <Loading />
        {children}
      </aside>
    )
  }

  return (
    <>
      <TopBar
        title={title}
        isSaving={isSaving}
        chatId={params.chat}
        languageSelected={selected}
        onTitleChange={handleTitleChange}
        onLanguageChange={handleLanguageChange}
      />

      <MobileMenuToggle isOpen={isOpen} onToggle={() => setIsOpen((o) => !o)} />

      <aside
        ref={sidebarRef}
        data-removing-chat={''}
        className={`fixed top-0 left-0 z-50 h-screen w-64 flex flex-col bg-white border-r border-amber-200 p-4
                    overflow-y-auto duration-300 ease-in-out
                    ${isOpen ? 'md:translate-x-0' : '-translate-x-full'} md:static md:translate-x-0 md:shadow-lg`}
      >
        <SidebarHeader />

        <ChatList
          chats={chats}
          isLoading={chatsLoading}
          activeChatId={params?.chat}
          onSelect={(id) => redirect(`/chat/${id}`)}
          onInvite={(id) => redirect(`/chat/${id}/inviteConnection`)}
          onDelete={(id) => {
            sidebarRef.current!.dataset.removingChat = id
            removeChat(id)
          }}
        />

        <UserFooter session={session} onLogout={logout} />
      </aside>
    </>
  )
}
