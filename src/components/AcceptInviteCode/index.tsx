'use client'

import { useState } from 'react'

export default function AcceptInviteCode() {
  const [inputCode, setInputCode] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleAccept = async () => {
    const res = await fetch('/api/couple/accept', {
      method: 'POST',
      body: JSON.stringify({ code: inputCode }),
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await res.json()
    if (res.ok) {
      setStatus('success')
      setMessage('¡Pareja vinculada correctamente!')
    } else {
      setStatus('error')
      setMessage(data.error || 'Error al aceptar el código')
    }
  }

  return (
    <div className="p-4 border rounded-lg shadow max-w-md">
      <h2 className="text-lg font-semibold mb-2">¿Te invitaron?</h2>
      <p className="text-sm text-gray-500 mb-4">Ingresa el código que recibiste.</p>

      <input
        type="text"
        value={inputCode}
        onChange={(e) => setInputCode(e.target.value)}
        className="w-full px-3 py-2 border rounded mb-3"
        placeholder="Ej: A1B2C3"
      />

      <button
        onClick={handleAccept}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Unirme a mi pareja
      </button>

      {status !== 'idle' && (
        <p
          className={`mt-4 text-sm ${
            status === 'success' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  )
}
