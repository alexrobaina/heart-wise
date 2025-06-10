// src/app/chat/page/tsx
'use client'
import { useRef, useState } from 'react'
import ChatWithAI from '@/components/ChatWithAI'
import { useUserChat } from '@/hooks/useUserChat'
import { useParams } from 'next/navigation'
import { Loading } from '@/components/atoms/Loading'

export default function ChatPage() {
  const params = useParams()

  const { data: chat, isLoading, error } = useUserChat(params?.chat)
  const [showScrollDown, setShowScrollDown] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

  if (isLoading) return <Loading />
  if (error) return <p>Error loading chat</p>

  return (
    <section
      ref={scrollContainerRef}
      className="pt-24 pb-16 pr-8 overflow-y-auto h-screen scrollbar-thumb-amber-900 scrollbar-track-transparent scrollbar-thin"
    >
      <ChatWithAI
        title={chat[0].title}
        chatId={params?.chat}
        initialMessages={chat[0].messages}
        showScrollDown={showScrollDown}
        setShowScrollDown={setShowScrollDown}
        externalScrollRef={scrollContainerRef}
      />
    </section>
  )
}
