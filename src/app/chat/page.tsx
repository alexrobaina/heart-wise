// src/app/chat/page/tsx
'use client'
import { useRef, useState } from 'react'
import ChatWithAI from '@/components/ChatWithAI'
import { useUserMessageAI } from '@/hooks/useUserMessageAI'

export default function ChatPage() {
  const { data: messages, isLoading, error } = useUserMessageAI()
  const [showScrollDown, setShowScrollDown] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading messages</p>

  return (
    <section
      ref={scrollContainerRef}
      className="py-8 pr-8 overflow-y-auto h-screen scrollbar-thumb-gray-900 scrollbar-track-transparent scrollbar-thin"
    >
      <ChatWithAI
        initialMessages={messages}
        showScrollDown={showScrollDown}
        setShowScrollDown={setShowScrollDown}
        externalScrollRef={scrollContainerRef} // pass ref
      />
    </section>
  )
}
