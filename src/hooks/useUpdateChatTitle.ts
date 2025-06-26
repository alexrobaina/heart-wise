import { useMutation, useQueryClient } from '@tanstack/react-query'

async function updateChatTitleApi(
  chatId: string | Array<string> | undefined,
  title: string,
) {
  const res = await fetch('/api/chat/updateTitle', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chatId, title }),
  })
  if (!res.ok) throw new Error('Failed to update chat title')
  return res.json()
}

export function useUpdateChatTitle(chatId: string | Array<string> | undefined) {
  const queryClient = useQueryClient()
  const mutation = useMutation((title: string) =>
    updateChatTitleApi(chatId, title),
  )

  if (mutation.isSuccess) {
    queryClient.invalidateQueries(['userChats'])
  }

  return {
    isSaving: mutation.isLoading,
    mutation,
  }
}
