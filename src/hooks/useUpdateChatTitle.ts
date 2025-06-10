// src/hooks/useUpdateChatTitle.ts
import { useState, useEffect, useRef, useCallback } from 'react'

export function useUpdateChatTitle(chatId: string, initialTitle: string) {
  const [valueTitle, setTitle] = useState(initialTitle)
  const [isSaving, setIsSaving] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const updateTitleOnServer = useCallback(
    async (updatedTitle: string) => {
      setIsSaving(true)
      try {
        const res = await fetch('/api/chat/updateTitle', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chatId, title: updatedTitle }),
        })
        if (!res.ok) {
          console.error('Failed to update chat title')
        }
      } catch (error) {
        console.error('Error updating chat title:', error)
      } finally {
        setIsSaving(false)
      }
    },
    [chatId],
  )

  // Debounce the update
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      if (valueTitle.trim() !== '') {
        updateTitleOnServer(valueTitle)
      }
    }, 4000)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [valueTitle, updateTitleOnServer])

  return {
    setTitle,
    isSaving,
    valueTitle,
  }
}
