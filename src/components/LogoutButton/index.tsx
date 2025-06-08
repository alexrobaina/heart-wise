// src/components/LogoutButton.tsx
'use client'
import { Button } from '@/components/atoms/Button'
import { signOut } from 'next-auth/react'

export function LogoutButton() {
  return (
    <Button
      variant="primary"
      onClick={() => signOut({ callbackUrl: '/' })}
      className="mb-4"
      IconLeft={null}
      disabled={false}
      type="button"
      loading={false}
    >
      Logout
    </Button>
  )
}
