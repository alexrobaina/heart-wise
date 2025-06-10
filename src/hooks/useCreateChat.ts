import { useMutation } from '@tanstack/react-query'
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
  return useMutation(createChat)
}
