import { useMutation, useQueryClient } from '@tanstack/react-query'
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
  const queryClient = useQueryClient()

  return useMutation(createChat, {
    onSuccess: () => {
      queryClient.invalidateQueries(['userChats'])
    },
  })
}
