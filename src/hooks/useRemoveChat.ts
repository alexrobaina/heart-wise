import { useMutation, useQueryClient } from '@tanstack/react-query'

export function useRemoveChat() {
  const queryClient = useQueryClient()

  const mutation = useMutation(
    async (chatId: string) => {
      const response = await fetch(`/api/chat/${chatId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete chat')
      }

      return chatId
    },
    {
      onSuccess: (chatId) => {
        queryClient.invalidateQueries(['userChats'])
        queryClient.removeQueries(['chat', chatId])
      },
    },
  )

  return mutation
}
