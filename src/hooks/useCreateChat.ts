// src/hooks/useCreateChat.ts
import { useState } from 'react'
import axios from 'axios'

export async function createChat(data: {
  contextRaw: object
  contextPrompt: string
  title?: string
}) {
  const response = await axios.post('/api/chat', data)
  return response.data
}

export function useCreateChat() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [isSuccess, setSuccess] = useState(false)
  const [data, setData] = useState(null)

  async function createChatHandler(data: {
    contextRaw: object
    contextPrompt: string
    title?: string
  }) {
    setSuccess(false)
    setLoading(true)
    setError(null)
    try {
      const chat = await createChat(data)
      setSuccess(true)
      setData(chat)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e)
      setSuccess(false)
      throw e
    } finally {
      setLoading(false)
    }
  }

  return {
    createChat: createChatHandler,
    loading,
    isSuccess,
    error,
    data,
  }
}
