// src/app/chat/page/tsx
'use client'
import { LottieAnimation } from '@/components/atoms/LottieAnimations'
import hugConnection from '@/assets/lottie/hugConnection.json'
import { Button } from '@/components/atoms/Button'
import { useParams } from 'next/navigation'
// import { Loading } from '@/components/atoms/Loading'

export default function ChatPage() {
  const { chat } = useParams()
  console.log(chat)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center ">
      <h1 className="text-xl sm:text-4xl font-bold">Conecta con el alma</h1>
      <p className="text-xl mt-2 font-medium text-gray-600">
        Mejora tus conecciones enviando este codigo a tu pareja
      </p>
      <div className="w-full max-w-md mx-auto">
        <LottieAnimation animation={hugConnection} width="90%" />
      </div>
      <Button onClick={() => alert('hola')} className="-mt-6 z-30">
        Generar codigo
      </Button>
    </div>
  )
}
