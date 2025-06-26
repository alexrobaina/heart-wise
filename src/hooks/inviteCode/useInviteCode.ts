import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface InviteCodeResponse {
  inviteCode: string | null
  connectionType?: string
  used?: boolean
  chatId?: string | string[] | undefined
  connectionUsers?:
    | Array<{
        email: string
        id: string
        name: string
      }>
    | undefined
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
