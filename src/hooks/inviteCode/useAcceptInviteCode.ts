// src/hooks/inviteCode/useAcceptInviteCode.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

interface AcceptCodeRequest {
  code: string
  chatId: string | string[] | undefined
}

interface AcceptCodeResponse {
  message: string
  chatId: string | string[] | undefined
}

async function acceptInviteCode({
  code,
  chatId,
}: AcceptCodeRequest): Promise<AcceptCodeResponse> {
  const response = await axios.post<AcceptCodeResponse>(
    '/api/inviteCode/accept',
    {
      code,
      chatId,
    },
  )
  return response.data
}

export function useAcceptInviteCode() {
  const queryClient = useQueryClient()

  return useMutation<AcceptCodeResponse, unknown, AcceptCodeRequest>(
    acceptInviteCode,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['userChats'])
      },
    },
  )
}
