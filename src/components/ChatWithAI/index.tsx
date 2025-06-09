'use client'

import { IoMdArrowRoundDown } from 'react-icons/io'
import { LuSend } from 'react-icons/lu'
import { useEffect, useRef } from 'react'
import { ChatMessage, useChatWithAI } from '@/hooks/useChatWithAI'
import { useUser } from '@/hooks/useUser'
import { redirect } from 'next/navigation'
import { ChatBubble } from './components/ChatBubble'

interface ChatWithAIProps {
  initialMessages: ChatMessage[]
  showScrollDown: boolean
  setShowScrollDown: (show: boolean) => void
  chatId: string
  externalScrollRef: React.RefObject<HTMLDivElement>
}

export default function ChatWithAI({
  chatId,
  initialMessages,
  showScrollDown,
  setShowScrollDown,
  externalScrollRef,
}: ChatWithAIProps) {
  const { isAuthenticated } = useUser()
  const { messages, input, setInput, loading, sendMessage } = useChatWithAI(
    chatId,
    initialMessages,
  )
  const bottomRef = useRef<HTMLDivElement | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!loading && input.trim()) sendMessage()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  useEffect(() => {
    externalScrollRef.current?.scrollTo({
      top: externalScrollRef.current.scrollHeight,
      behavior: 'smooth',
    })
    setShowScrollDown(false)
  }, [initialMessages, externalScrollRef, setShowScrollDown])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = () => {
    const container = externalScrollRef.current
    if (!container) return
    const { scrollTop, scrollHeight, clientHeight } = container
    const nearBottom = scrollHeight - scrollTop <= clientHeight + 100
    setShowScrollDown(!nearBottom)
  }

  useEffect(() => {
    const container = externalScrollRef.current
    if (!container) return
    container.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => container.removeEventListener('scroll', handleScroll)
  }, [externalScrollRef, handleScroll])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [input])

  if (!isAuthenticated) return redirect('/')

  return (
    <div className="relative w-full flex flex-col px-4 pb-[120px]">
      <div className="max-w-md sm:max-w-2xl w-full mx-auto space-y-2 flex flex-col">
        {messages.length === 0 ? (
          <div className="text-amber-300 mt-80 flex flex-col justify-center gap-4 items-center">
            <h1 className="text-center text-amber-300 text-xl italic mt-10">
              ¡Escribe tu primer mensaje para comenzar la conversación!
            </h1>
            <p>Cuentame como te sientes y como te puedo ayudar</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <ChatBubble
              key={idx}
              role={msg.role as 'user' | 'assistant'}
              content={msg.content}
            />
          ))
        )}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-amber-100 text-amber-500 px-4 py-2 text-sm rounded-xl animate-pulse">
              La IA está escribiendo…
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (!loading && input.trim()) sendMessage()
        }}
        className="fixed bottom-8 left-0 right-0 z-50 px-4"
      >
        <div className="flex flex-col justify-center items-center gap-2 max-w-3xl mx-auto">
          {showScrollDown && (
            <button
              onClick={() =>
                externalScrollRef.current?.scrollTo({
                  top: externalScrollRef.current.scrollHeight,
                  behavior: 'smooth',
                })
              }
              className="bg-amber-600 w-10 h-10 flex justify-center items-center hover:bg-amber-700 text-white rounded-full shadow-lg z-50"
              type="button"
              aria-label="Ir al final"
            >
              <IoMdArrowRoundDown size={20} />
            </button>
          )}
          <div className="relative w-full">
            <textarea
              value={input}
              ref={textareaRef}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu mensaje..."
              rows={1}
              className="resize-none w-full rounded-xl px-4 py-4 text-amber-900 placeholder-amber-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base max-h-[300px] scrollbar-thumb-amber-800 scrollbar-track-transparent scrollbar-thin"
              disabled={loading}
            />
            <button
              type="submit"
              className="absolute right-4 bottom-4 bg-amber-800 hover:bg-amber-600 disabled:opacity-50 text-white px-2 py-2 text-sm font-medium w-8 h-8 flex items-center justify-center rounded-full"
              disabled={loading || !input.trim()}
              aria-label="Enviar Mensaje"
            >
              <LuSend size={20} />
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
