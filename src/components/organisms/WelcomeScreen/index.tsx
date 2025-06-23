// components/organisms/WelcomeScreen/index.tsx
import { FC } from 'react'
import { Button } from '@/components/atoms/Button'
import Image from 'next/image'
import { LottieAnimation } from '@/components/atoms/LottieAnimations'

interface WelcomeScreenProps {
  title: string
  subtitle?: string
  imageUrl?: string
  lottieAnimation?: object
  onStart: () => void // para iniciar chat nuevo
  buttonText?: string
}

export const WelcomeScreen: FC<WelcomeScreenProps> = ({
  title,
  subtitle,
  imageUrl,
  lottieAnimation,
  onStart,
  buttonText = 'Comenzar',
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center ">
      <h1 className="text-xl sm:text-4xl font-bold">{title}</h1>
      {subtitle && (
        <p className="text-xl mt-2 font-medium text-gray-600">{subtitle}</p>
      )}
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Ilustración de bienvenida"
          className="max-w-xs w-full mx-auto"
        />
      )}
      {lottieAnimation && (
        <div className="w-full max-w-md mx-auto">
          <LottieAnimation animation={lottieAnimation} width="90%" />
        </div>
      )}
      <div className="max-w-md w-full mt-6 flex flex-col gap-4">
        <Button onClick={onStart}>{buttonText}</Button>
      </div>
    </div>
  )
}
