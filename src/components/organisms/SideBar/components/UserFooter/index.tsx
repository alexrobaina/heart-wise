import React from 'react'
import Image from 'next/image'
import { CiLogout } from 'react-icons/ci'

interface Session {
  name?: string | null
  email?: string | null
  image?: string | null
}

interface UserFooterProps {
  session: Session | null
  onLogout: () => void
}

export const UserFooter: React.FC<UserFooterProps> = ({
  session,
  onLogout,
}) => (
  <div className="border-t border-amber-200 mt-4 pt-4 gap-4 flex flex-col">
    <div className="flex items-center space-x-3">
      {session?.image ? (
        <Image
          src={session.image}
          alt="User Avatar"
          width={42}
          height={42}
          className="rounded-full object-cover"
        />
      ) : (
        <div className="w-10 h-10 bg-amber-300 rounded-full flex items-center justify-center">
          <span className="text-amber-500 text-sm">
            {session?.name?.charAt(0).toUpperCase() || 'U'}
          </span>
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-amber-900 truncate">
          {session?.name || session?.email}
        </p>
      </div>
    </div>
    <button
      onClick={onLogout}
      className="flex items-center gap-2 p-2 bg-amber-100 hover:bg-amber-200 rounded mb-4 transition cursor-pointer"
    >
      <CiLogout className="text-amber-600" size={20} />
      <span className="text-sm font-medium text-amber-900">Logout</span>
    </button>
  </div>
)
