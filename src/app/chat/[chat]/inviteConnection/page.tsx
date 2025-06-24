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

const connectionType = {
  COUPLE: 'couple',
  FRIEND: 'friend',
}

export default function InviteConnectionPage() {
  const router = useRouter()
  const { chat } = useParams()
  const { data: session } = useSession()
  const [codeInput, setCodeInput] = useState('')
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Use custom hooks
  const { data, isLoading: loading } = useInviteCode(chat)
  const { mutate: generateCode, isLoading: generating } =
    useGenerateInviteCode(chat)

  const {
    mutate: acceptCode,
    isLoading: acceptLoading,
    isSuccess: acceptSuccess,
  } = useAcceptInviteCode()

  // Copy invite code handler
  const copyToClipboard = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!data?.inviteCode) return
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (data?.connectionType === connectionType.COUPLE && data?.used) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-xl sm:text-xl font-bold">
          You have connected with your partner
        </h1>
        <p className="text-lg mt-2 text-gray-600">
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          {data.connectionUsers
            .filter(
              (user: { email: string; id: string; name: string }) =>
                user.email !== session?.user.email,
            )
            .map((user: { id: string; name: string }) => (
              <span key={user.id} className="font-semibold">
                {user.name}
              </span>
            ))
            .reduce(
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              (prev, curr) => (prev === null ? curr : [prev, ' and ', curr]),
              null,
            )}
        </p>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        {data?.inviteCode && (
          <div
            onClick={copyToClipboard}
            className="mt-6 p-4 bg-amber-100 rounded shadow-md flex flex-col items-center gap-2 cursor-pointer select-none"
          >
            <p className="text-lg font-semibold">Código de invitación:</p>
            <p className="text-2xl font-bold tracking-widest select-all">
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
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

      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
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
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      {data?.inviteCode && (
        <div
          onClick={copyToClipboard}
          className="mt-6 p-4 bg-amber-100 rounded shadow-md flex flex-col items-center gap-4 cursor-pointer select-none"
        >
          <p className="text-lg font-semibold">Código de invitación:</p>
          <p className="text-2xl font-bold tracking-widest select-all">
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            {data.inviteCode}
          </p>
          {copied && <p className="text-sm text-green-500">¡Copiado!</p>}
        </div>
      )}
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
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
