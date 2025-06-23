import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export function useGenerateInviteCode(chatId: string | string[] | undefined) {
  const queryClient = useQueryClient()

  return useMutation(
    async () => {
      if (!chatId) throw new Error('Chat ID is required')
      const response = await axios.post(`/api/chat/${chatId}/inviteCode`)
      return response.data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['inviteCode', chatId])
      },
    },
  )
}
