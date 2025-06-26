import React from 'react'
import { ChatListItem } from '../ChatListItems'

export interface Chat {
  id: string
  title?: string
}

interface ChatListProps {
  chats?: Chat[]
  isLoading: boolean
  onSelect: (id: string) => void
  onInvite: (id: string) => void
  onDelete: (id: string) => void
  activeChatId?: string | string[] | undefined
}

export const ChatList: React.FC<ChatListProps> = ({
  chats,
  onSelect,
  onInvite,
  onDelete,
  isLoading,
  activeChatId,
}) => (
  <nav className="flex-grow">
    <ul className="space-y-1">
      {isLoading && (
        <li className="p-3 text-sm text-amber-600">Cargando chats...</li>
      )}
      {chats?.length
        ? chats.map((chat) => (
            <ChatListItem
              key={chat.id}
              chat={chat}
              isActive={chat.id === activeChatId}
              onSelect={() => onSelect(chat.id)}
              onInvite={() => onInvite(chat.id)}
              onDelete={() => onDelete(chat.id)}
            />
          ))
        : !isLoading && (
            <li className="p-3 text-sm text-amber-600">
              No chats yet. Start a new conversation!
            </li>
          )}
    </ul>
  </nav>
)
