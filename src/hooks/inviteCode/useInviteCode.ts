import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface InviteCodeResponse {
  inviteCode: string | null
}

export function useInviteCode(chatId: string | string[] | undefined) {
  return useQuery<InviteCodeResponse, Error>(
    ['inviteCode', chatId],
    async () => {
      if (!chatId) return { inviteCode: null }
      const response = await axios.get<InviteCodeResponse>(
        `/api/chat/${chatId}/inviteCode`,
      )
      return response.data
    },
    {
      enabled: !!chatId,
    },
  )
}
