import React, { createContext, useState, useContext, ReactNode } from 'react'

interface ChatTitleContextType {
  title: string
  setTitle: (title: string) => void
}

const ChatTitleContext = createContext<ChatTitleContextType | undefined>(
  undefined,
)

export const ChatTitleProvider = ({ children }: { children: ReactNode }) => {
  const [title, setTitle] = useState('')
  return (
    <ChatTitleContext.Provider value={{ title, setTitle }}>
      {children}
    </ChatTitleContext.Provider>
  )
}

export const useChatTitle = (): ChatTitleContextType => {
  const context = useContext(ChatTitleContext)
  if (!context) {
    throw new Error('useChatTitle must be used within a ChatTitleProvider')
  }
  return context
}
