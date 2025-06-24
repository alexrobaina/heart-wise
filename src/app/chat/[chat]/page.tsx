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
  const { setTitle, title } = useChatTitle()
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const previousChatId = useRef<string | undefined | string[]>(undefined)

  useEffect(() => {
    if (
      chat !== previousChatId.current &&
      dataChat &&
      dataChat.length > 0 &&
      dataChat[0].title !== title
    ) {
      setTitle(dataChat[0].title)
      previousChatId.current = chat
    }
  }, [chat, dataChat, setTitle, title])

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
