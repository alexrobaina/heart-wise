'use client'

import React, { useState } from 'react'
import { Button } from '@/components/atoms/Button'
import { InputText } from '@/components/atoms/InputText'
import { useParams, useRouter } from 'next/navigation'
import { Loading } from '@/components/atoms/Loading'
import { useAcceptInviteCode } from '@/hooks/inviteCode/useAcceptInviteCode'
import { useGenerateInviteCode } from '@/hooks/inviteCode/useGenerateInviteCode'
import { useInviteCode } from '@/hooks/inviteCode/useInviteCode'
import { useSession } from 'next-auth/react'
import { connectionType } from './constants'

export default function InviteConnectionPage() {
  const router = useRouter()
  const { chat } = useParams()
  const { data: session } = useSession()
  const [codeInput, setCodeInput] = useState('')
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function renderUserNamesWithAnd(
    users:
      | {
          id: string | undefined
          name?: string | undefined
          email?: string | undefined
          image?: string | undefined
        }[]
      | undefined,
    currentUserEmail: string | undefined,
  ): React.ReactNode | undefined {
    if (!users || users.length === 0) return undefined

    const filteredUsers = users.filter(
      (user) => user.email !== currentUserEmail,
    )

    if (filteredUsers.length === 0) return undefined

    const userElements = filteredUsers.map((user) => (
      <span key={user.id} className="font-semibold">
        {user.name}
      </span>
    ))

    if (userElements.length === 0) return undefined

    return userElements.length > 1
      ? userElements.reduce<React.ReactNode[]>(
          (prev, curr) => [...prev, ' and ', curr],
          [],
        )
      : userElements[0]
  }

  // Use custom hooks
  const { data, isLoading: loading } = useInviteCode(chat)
  const { mutate: generateCode, isLoading: generating } =
    useGenerateInviteCode(chat)

  const {
    mutate: acceptCode,
    isLoading: acceptLoading,
    isSuccess: acceptSuccess,
  } = useAcceptInviteCode()

  const copyToClipboard = () => {
    if (!data?.inviteCode) return
    navigator.clipboard.writeText(data.inviteCode).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  // Accept invite code handler
  const handleAcceptCode = () => {
    if (!codeInput.trim()) return
    setError(null)
    acceptCode(
      { code: codeInput.trim().toUpperCase(), chatId: chat },
      {
        onSuccess: (data) => {
          setCodeInput('')
          router.push(`/chat/${data.chatId}`)
        },
      },
    )
  }

  if (loading || generating || acceptLoading) {
    return <Loading />
  }

  if (data?.connectionType === connectionType.COUPLE && data?.used) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-xl sm:text-xl font-bold">
          You have connected with your partner
        </h1>
        <p className="text-lg mt-2 text-gray-600">
          {renderUserNamesWithAnd(
            data.connectionUsers,
            session?.user?.email ?? undefined,
          )}
        </p>
        {data?.inviteCode && (
          <div
            onClick={copyToClipboard}
            className="mt-6 p-4 bg-amber-100 rounded shadow-md flex flex-col items-center gap-2 cursor-pointer select-none"
          >
            <p className="text-lg font-semibold">Código de invitación:</p>
            <p className="text-2xl font-bold tracking-widest select-all">
              {data.inviteCode}
            </p>
            {copied && <p className="text-sm text-green-500">¡Copiado!</p>}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center ">
      <h1 className="text-xl sm:text-4xl font-bold">Conecta con el alma</h1>
      <p className="text-xl mt-2 font-medium text-gray-600">
        Enviale este codigo a la persona con la que quieres conectar
      </p>
      {!data?.inviteCode && (
        <div className="mt-6 max-w-md mx-auto flex flex-col items-center gap-2">
          <InputText
            id="invite-code-input"
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
            placeholder="Ingresa el código recibido"
            disabled={acceptLoading}
          />
          <Button
            onClick={handleAcceptCode}
            disabled={acceptLoading || codeInput.trim().length === 0}
            className="w-48"
          >
            {acceptLoading ? 'Validando...' : 'Aceptar código'}
          </Button>
        </div>
      )}
      {data?.inviteCode && (
        <div
          onClick={copyToClipboard}
          className="mt-6 p-4 bg-amber-100 rounded shadow-md flex flex-col items-center gap-4 cursor-pointer select-none"
        >
          <p className="text-lg font-semibold">Código de invitación:</p>
          <p className="text-2xl font-bold tracking-widest select-all">
            {data.inviteCode}
          </p>
          {copied && <p className="text-sm text-green-500">¡Copiado!</p>}
        </div>
      )}
      {!data?.inviteCode && (
        <Button
          onClick={() => generateCode()}
          className="mt-6"
          disabled={generating || loading}
        >
          {generating ? 'Generando...' : 'Generar código'}
        </Button>
      )}

      {acceptSuccess && (
        <p className="mt-4 text-green-600">
          Código aceptado con éxito. Ya formas parte de la conexión.
        </p>
      )}

      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  )
}
