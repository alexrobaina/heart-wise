// src/components/Layout/Navbar.tsx
'use client'

import { useSession, signOut } from 'next-auth/react'
import React from 'react'
import Image from 'next/image'
import { HiOutlineMenu } from 'react-icons/hi'

export const Navbar: React.FC = () => {
  const { data: session, status } = useSession()

  return (
    <header className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between">
      {/* Left: Hamburger for mobile, Logo + Title */}
      <div className="flex items-center space-x-3">
        {/* Mobile menu toggle (you can implement drawer logic as needed) */}
        <button className="md:hidden text-gray-600 dark:text-gray-300">
          <HiOutlineMenu size={24} />
        </button>

        {/* Logo + Title */}
        <div className="flex items-center">
          {/* <ChatGPTLogo className="h-6 w-6 text-green-500 dark:text-green-300" /> */}
          logo
          <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            Love app
          </span>
        </div>
      </div>

      {/* Right: Session user info (if logged in) */}
      <div className="flex items-center space-x-4">
        {status === 'loading' && (
          <p className="text-sm text-gray-500 dark:text-gray-400">Loading…</p>
        )}

        {status === 'authenticated' && session.user && (
          <div className="flex items-center space-x-3">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt="User Avatar"
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  {session.user.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
            )}
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
              {session.user.name || session.user.email}
            </span>
            <button
              onClick={() => signOut()}
              className="text-xs text-red-600 dark:text-red-400 hover:underline"
            >
              Logout
            </button>
          </div>
        )}

        {status === 'unauthenticated' && (
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Not logged in
          </p>
        )}
      </div>
    </header>
  )
}
