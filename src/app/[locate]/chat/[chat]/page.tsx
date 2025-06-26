// src/app/chat/page/tsx
'use client'
import { useEffect, useRef, useState } from 'react'
import ChatWithAI from '@/components/ChatWithAI'
import { useUserChat } from '@/hooks/useUserChat'
import { useParams } from 'next/navigation'
import { Loading } from '@/components/atoms/Loading'
import { useChatTitle } from '@/context/ChatTitleContext'

export default function ChatPage() {
  const { chat } = useParams()
  const { data: dataChat, isLoading, error } = useUserChat(chat)
  const [showScrollDown, setShowScrollDown] = useState(false)
  const { setTitle } = useChatTitle()
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (dataChat && dataChat.length > 0) {
      setTitle(dataChat[0].title)
    }
  }, [chat, dataChat, setTitle])

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
