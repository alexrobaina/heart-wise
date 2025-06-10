import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'

export type ChatMessage = {
  role: 'user' | 'ai'
  content: string
}

async function sendMessageApi(
  chatId: string | undefined,
  message: string,
): Promise<string> {
  const res = await fetch(`/api/message/${chatId}`, {
    method: 'POST',
    body: JSON.stringify({ message }),
    headers: { 'Content-Type': 'application/json' },
  })

  if (!res.ok) {
    throw new Error('Network response was not ok')
  }

  const data = await res.json()
  return data.response
}

export function useChatWithAI(
  chatId: string | string[] | undefined,
  initialMessages: ChatMessage[] = [],
) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [input, setInput] = useState('')

  const mutation = useMutation({
    mutationFn: (message: string) =>
      sendMessageApi(chatId as string | undefined, message),
    onMutate: (message) => {
      // Add user message optimistically
      setMessages((prev) => [...prev, { role: 'user', content: message }])
      setInput('')
    },
    onSuccess: (response) => {
      // Add AI response message
      setMessages((prev) => [...prev, { role: 'ai', content: response }])
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        { role: 'ai', content: 'Ocurrió un error con el modelo de IA.' },
      ])
    },
  })

  const sendMessage = () => {
    if (!input.trim()) return
    mutation.mutate(input)
  }

  return {
    messages,
    input,
    setInput,
    loading: mutation.isLoading,
    sendMessage,
  }
}
