import { useQuery } from '@tanstack/react-query'

interface Message {
  role: 'user' | 'ai'
  content: string
}

async function fetchUserMessages(): Promise<Message[]> {
  const res = await fetch('/api/message')
  if (!res.ok) throw new Error('Failed to fetch user messages')
  return res.json()
}

export function useUserMessageAI() {
  return useQuery({
    queryKey: ['userMessages'],
    queryFn: fetchUserMessages,
  })
}
