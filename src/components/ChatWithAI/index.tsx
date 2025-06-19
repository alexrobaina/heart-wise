'use client'

import { RefObject } from 'react'
import { IoMdArrowRoundDown } from 'react-icons/io'
import { LuSend } from 'react-icons/lu'
import { useEffect, useRef } from 'react'
import { ChatMessage, useChatWithAI } from '@/hooks/useChatWithAI'
import { useUser } from '@/hooks/useUser'
import { redirect } from 'next/navigation'
import { ChatBubble } from './components/ChatBubble'
import { useUpdateChatTitle } from '@/hooks/useUpdateChatTitle'
import { Loading } from '../atoms/Loading'

interface ChatWithAIProps {
  title: string
  showScrollDown: boolean
  initialMessages: ChatMessage[]
  setShowScrollDown: (show: boolean) => void
  chatId: string | Array<string> | undefined
  externalScrollRef: RefObject<HTMLDivElement | null>
  scrollContainerRef: RefObject<HTMLDivElement | null>
}

export default function ChatWithAI({
  chatId,
  title,
  initialMessages,
  showScrollDown,
  setShowScrollDown,
  externalScrollRef,
  scrollContainerRef,
}: ChatWithAIProps) {
  const { valueTitle, setTitle, isSaving } = useUpdateChatTitle(chatId, title)
  const { isAuthenticated, user } = useUser()

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

  useEffect(() => {
    if (textareaRef.current && !loading) {
      textareaRef.current.focus()
    }
  }, [input, loading])

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
    <section
      ref={scrollContainerRef}
      className="pt-24 pb-16 sm:pr-8 overflow-y-auto h-screen scrollbar-thumb-amber-900 scrollbar-track-transparent scrollbar-thin"
    >
      <div className="relative w-full flex flex-col pb-[140px]">
        <div className="fixed bg-white h-14 top-0 z-40 w-screen border-b border-amber-200 flex items-center">
          <input
            value={valueTitle}
            placeholder="Chat title..."
            onChange={(e) => setTitle(e.target.value)}
            className="ml-8 bg-white text-amber-900 text-xl font-semibold focus:outline-none"
          />
          {isSaving && <Loading size={8} />}
        </div>
        <div className="max-w-lg sm:max-w-4xl w-full mx-auto space-y-2 flex flex-col">
          {messages.length === 0 ? (
            <div className="mt-[30%] flex flex-col justify-center gap-4 -ml-8 items-center">
              <h1 className="text-center text-amber-900 text-xl ">
                {`En que te puedo ayudar hoy ${user?.name}`}
              </h1>
              <p className="text-center text-amber-900 text-lg mt-2">
                Dime como te sientes y que te gustaría resolver
              </p>
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
          className="fixed bottom-8 left-0 right-0 z-40 px-4"
        >
          <div className="flex flex-col justify-center items-end gap-2 max-w-3xl mx-auto">
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
            <div className="relative w-full p-0 md:pl-44">
              <textarea
                value={input}
                ref={textareaRef}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Escribe tu mensaje..."
                rows={1}
                className="resize-none w-full rounded-xl px-4 py-8 text-amber-900 placeholder-amber-500 focus:outline-none focus:ring-2 ring-amber-500 focus:ring-amber-500 text-base max-h-[300px] scrollbar-thumb-amber-800 scrollbar-track-transparent scrollbar-thin"
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
    </section>
  )
}
