// src/app/chat/page/tsx
'use client'
import { useRef, useState } from 'react'
import ChatWithAI from '@/components/ChatWithAI'
import { useUserChat } from '@/hooks/useUserChat'
import { useParams } from 'next/navigation'
import { Loading } from '@/components/atoms/Loading'

export default function ChatPage() {
  const { chat } = useParams()
  const { data: dataChat, isLoading, error } = useUserChat(chat)
  const [showScrollDown, setShowScrollDown] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

  if (isLoading) return <Loading />
  if (error) return <p>Error loading chat</p>

  return (
    <section
      ref={scrollContainerRef}
      className="pt-24 pb-16 sm:pr-8 overflow-y-auto h-screen scrollbar-thumb-amber-900 scrollbar-track-transparent scrollbar-thin"
    >
      <ChatWithAI
        chatId={chat}
        title={dataChat[0].title}
        showScrollDown={showScrollDown}
        initialMessages={dataChat[0].messages}
        setShowScrollDown={setShowScrollDown}
        externalScrollRef={scrollContainerRef}
      />
    </section>
  )
}
