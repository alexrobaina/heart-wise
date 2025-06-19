// components/organisms/WelcomeScreen/index.tsx
import { FC } from 'react'
import { Button } from '@/components/atoms/Button'
import Image from 'next/image'
import { LottieAnimation } from '@/components/atoms/LottieAnimations'

interface WelcomeScreenProps {
  title: string
  subtitle?: string
  imageUrl?: string
  onStart: () => void
  buttonText?: string
  lottieAnimation?: object
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
      <Button onClick={onStart} className="-mt-6 z-30">
        {buttonText}
      </Button>
    </div>
  )
}
