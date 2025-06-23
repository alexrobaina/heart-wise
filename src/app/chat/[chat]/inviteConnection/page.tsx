'use client'

import React, { useState } from 'react'
import { Button } from '@/components/atoms/Button'
import { InputText } from '@/components/atoms/InputText'
import { useParams, useRouter } from 'next/navigation'
import { Loading } from '@/components/atoms/Loading'
import { useAcceptInviteCode } from '@/hooks/inviteCode/useAcceptInviteCode'
import { useGenerateInviteCode } from '@/hooks/inviteCode/useGenerateInviteCode'
import { useInviteCode } from '@/hooks/inviteCode/useInviteCode'

export default function InviteConnectionPage() {
  const router = useRouter()
  const { chat } = useParams()
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center ">
      <h1 className="text-xl sm:text-4xl font-bold">Conecta con el alma</h1>
      <p className="text-xl mt-2 font-medium text-gray-600">
        Enviale este codigo a la persona con la que quieres conectar
      </p>

      {!data?.inviteCode && (
        <div className="mt-6 max-w-md mx-auto flex flex-col items-center gap-4">
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
