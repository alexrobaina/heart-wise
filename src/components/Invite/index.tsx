'use client'

import { useState } from 'react'

export default function InviteCodeGenerator() {
  const [code, setCode] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const generateCode = async () => {
    setLoading(true)
    const res = await fetch('/api/couple/invite', { method: 'POST' })
    const data = await res.json()
    setCode(data.code)
    setLoading(false)
  }

  return (
    <div className="p-4 border rounded-lg shadow max-w-md">
      <h2 className="text-lg font-semibold mb-2">Invita a tu pareja</h2>
      <p className="text-sm text-gray-500 mb-4">Presiona para generar un código único.</p>
      <button
        onClick={generateCode}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Generando...' : 'Generar código'}
      </button>

      {code && (
        <div className="mt-4">
          <p className="text-sm text-gray-700">Comparte este código:</p>
          <div className="font-mono text-xl tracking-wider mt-2 bg-gray-100 px-4 py-2 rounded">
            {code}
          </div>
        </div>
      )}
    </div>
  )
}
