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
    <ChatWithAI
      chatId={chat}
      title={dataChat[0].title}
      showScrollDown={showScrollDown}
      initialMessages={dataChat[0].messages}
      setShowScrollDown={setShowScrollDown}
      externalScrollRef={scrollContainerRef}
      scrollContainerRef={scrollContainerRef}
    />
  )
}
