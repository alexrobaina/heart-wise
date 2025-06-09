import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export type Chat = {
  id: string
  title: string
  updatedAt: string
}

async function fetchUserChats() {
  const response = await axios.get<Chat[]>('/api/chat')
  return response.data
}

export function useUserChats() {
  return useQuery({
    queryKey: ['userChats'],
    queryFn: fetchUserChats,
  })
}
