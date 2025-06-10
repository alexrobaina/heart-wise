import { useState, useEffect, useRef } from 'react'
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

export function useUpdateChatTitle(
  chatId: string | Array<string> | undefined,
  initialTitle: string,
) {
  const queryClient = useQueryClient()
  const [valueTitle, setTitle] = useState(initialTitle)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const mutation = useMutation((title: string) =>
    updateChatTitleApi(chatId, title),
  )

  // Debounce the update
  useEffect(() => {
    if (valueTitle === initialTitle) return
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      if (valueTitle.trim() !== '') {
        mutation.mutate(valueTitle)
      }
    }, 500)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [valueTitle, initialTitle, mutation])

  if (mutation.isSuccess) {
    queryClient.invalidateQueries(['userChats'])
  }

  return {
    setTitle,
    isSaving: mutation.isLoading,
    valueTitle,
  }
}
