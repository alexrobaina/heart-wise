import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

async function fetchUserMessages(chatId: string) {
  try {
    const response = await axios.get(`/api/chat/${chatId}`)
    return response.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || 'Failed to fetch user messages',
    )
  }
}

export function useUserChat(chatId: string | undefined) {
  return useQuery({
    queryKey: ['userChats', chatId],
    queryFn: () => chatId && fetchUserMessages(chatId),
  })
}
