'use client'

import { IoMdArrowRoundDown } from 'react-icons/io'
import { LuSend } from 'react-icons/lu'
import { useEffect, useRef } from 'react'
import { ChatMessage, useChatWithAI } from '@/hooks/useChatWithAI'
import ReactMarkdown from 'react-markdown'
import { useUser } from '@/hooks/useUser'
import { redirect } from 'next/navigation'

function ChatBubble({
  role,
  content,
}: {
  role: 'user' | 'assistant'
  content: string
}) {
  const isUser = role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] whitespace-pre-wrap px-4 py-2 text-base ${
          isUser
            ? 'bg-[#11a37f] text-white rounded-tr-xl rounded-tl-xl rounded-bl-xl'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-xl rounded-br-xl rounded-tr-xl'
        }`}
      >
        {isUser ? (
          content
        ) : (
          <ReactMarkdown
            components={{
              p: (props) => (
                <p
                  className="prose prose-sm dark:prose-invert whitespace-pre-wrap"
                  {...props}
                />
              ),
              code: ({ inline, ...props }) => (
                <code
                  className={`block overflow-auto bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded ${inline ? 'inline' : ''}`}
                  {...props}
                />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  )
}

interface ChatWithAIProps {
  initialMessages: ChatMessage[]
  showScrollDown: boolean
  setShowScrollDown: (show: boolean) => void
  externalScrollRef: React.RefObject<HTMLDivElement>
}

export default function ChatWithAI({
  initialMessages,
  showScrollDown,
  setShowScrollDown,
  externalScrollRef,
}: ChatWithAIProps) {
  const { isAuthenticated } = useUser()
  const { messages, input, setInput, loading, sendMessage } =
    useChatWithAI(initialMessages)
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
  }, [externalScrollRef])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [input])

  if (!isAuthenticated) return redirect('/')

  return (
    <div className="relative w-full flex flex-col px-4 pb-[120px]">
      <div className="max-w-md sm:max-w-2xl mx-auto space-y-4">
        {messages.map((msg, idx) => (
          <ChatBubble
            key={idx}
            role={msg.role as 'user' | 'assistant'}
            content={msg.content}
          />
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-4 py-2 text-sm rounded-xl animate-pulse">
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
        <div className="flex flex-col justify-center items-center gap-2 w-full max-w-3xl mx-auto">
          {showScrollDown && (
            <button
              onClick={() =>
                externalScrollRef.current?.scrollTo({
                  top: externalScrollRef.current.scrollHeight,
                  behavior: 'smooth',
                })
              }
              className="bg-gray-600 w-10 h-10 flex justify-center items-center hover:bg-gray-700 text-white rounded-full shadow-lg z-50"
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
              className="resize-none w-full rounded-xl px-4 py-4 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base dark:bg-gray-700 max-h-[300px] scrollbar-thumb-gray-800 scrollbar-track-transparent scrollbar-thin"
              disabled={loading}
            />
            <button
              type="submit"
              className="absolute right-4 bottom-4 bg-[#11a37f] hover:bg-[#0e8266] disabled:opacity-50 text-white px-2 py-2 text-sm font-medium w-8 h-8 flex items-center justify-center rounded-full"
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
