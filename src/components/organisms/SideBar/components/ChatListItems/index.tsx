import React from 'react'
import { RiDeleteBinLine } from 'react-icons/ri'
import { BsChatLeftHeartFill } from 'react-icons/bs'

export interface Chat {
  id: string
  title?: string
}

interface ChatListItemProps {
  chat: Chat
  isActive: boolean
  onSelect: () => void
  onInvite: () => void
  onDelete: () => void
}

export const ChatListItem: React.FC<ChatListItemProps> = ({
  chat,
  isActive,
  onSelect,
  onInvite,
  onDelete,
}) => (
  <li
    onClick={onSelect}
    className={`flex justify-between items-center ${
      isActive ? 'bg-amber-100' : ''
    } hover:bg-amber-200 py-2 p-2 h-10 text-sm text-amber-900 rounded cursor-pointer transition`}
  >
    <div className="flex-grow capitalize truncate">
      {chat.title || 'Untitled Chat'}
    </div>
    <div className="flex gap-1">
      <button
        onClick={(e) => {
          e.stopPropagation()
          onInvite()
        }}
        className="p-1 rounded hover:bg-amber-100 text-amber-400 hover:text-red-400"
        aria-label={`invite to chat ${chat.title || 'Untitled Chat'}`}
      >
        <BsChatLeftHeartFill size={18} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation()
          onDelete()
        }}
        className="p-1 rounded hover:bg-amber-100 text-amber-400 hover:text-red-400"
        aria-label={`delete chat ${chat.title || 'Untitled Chat'}`}
      >
        <RiDeleteBinLine size={18} />
      </button>
    </div>
  </li>
)
