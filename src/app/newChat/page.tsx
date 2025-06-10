'use client'

import React, { useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { onboardingSchemas } from '@/schemas/onboardingSchema'
import { WelcomeScreen } from '@/components/organisms/WelcomeScreen'
import { StepOne } from '@/components/organisms/Onboarding/StepOne'
import { StepTwo } from '@/components/organisms/Onboarding/StepTwo'
import { StepThree } from '@/components/organisms/Onboarding/StepThree'
import { StepFour } from '@/components/organisms/Onboarding/StepFour'
import { StepFive } from '@/components/organisms/Onboarding/StepFive'
import { NavigationControls } from '@/components/molecules/NavigationControls'
import { redirect } from 'next/navigation'
import womanAnimation from '@/assets/lottie/female-work.json'
import { useSession } from 'next-auth/react'
import { useCreateChat } from '@/hooks/useCreateChat'
import { createContextPrompt } from '@/lib/promptUtils'

const steps = [StepOne, StepTwo, StepThree, StepFour, StepFive]

export default function NewChatPage() {
  const { data: session } = useSession()
  const [currentStep, setCurrentStep] = useState(0)
  const [showWelcome, setShowWelcome] = useState(true)
  const { createChat, isSuccess, data } = useCreateChat()
  if (!session) {
    redirect('/') // or to /api/auth/signin
  }

  const methods = useForm({
    resolver: yupResolver(onboardingSchemas[currentStep]),
    mode: 'onChange',
  })

  const StepComponent = steps[currentStep]

  const onSubmit = async (data) => {
    if (currentStep < steps.length - 1) {
      return setCurrentStep((prev) => prev + 1)
    }

    const contextPrompt = await createContextPrompt(data)
    const contextRaw = data

    createChat({
      contextPrompt,
      contextRaw,
      title: 'Onboarding Chat',
    })
  }

  useEffect(() => {
    if (isSuccess) {
      redirect(`chat/${data.id}`)
    }
  })

  const onBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  if (showWelcome) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-amber-100 px-4">
        <WelcomeScreen
          title="Bienvenido a Heart wise"
          subtitle="Comienza el proceso de onboarding para conocerte mejor"
          onStart={() => setShowWelcome(false)}
          buttonText="Comenzar"
          lottieAnimation={womanAnimation}
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-100 px-4">
      <div className="mb-6 text-center">
        <div className="flex justify-center mb-1 w-full mt-10">
          {steps.map((_step, index) => (
            <>
              <span
                key={index}
                className={`w-10 h-10 rounded-full flex justify-center items-center ${
                  index <= currentStep ? 'bg-amber-600' : 'bg-amber-200'
                } mr-2`}
              >
                <div
                  onClick={() => setCurrentStep(index)}
                  className={`${
                    index === currentStep ? 'text-white' : 'text-amber-200'
                  } cursor-pointer`}
                >
                  {index + 1}
                </div>
              </span>
            </>
          ))}
        </div>
      </div>
      <FormProvider {...methods} key={currentStep}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="w-full max-w-md p-6 bg-white rounded-lg shadow-md h-auto"
        >
          <StepComponent />
          <NavigationControls
            onPrev={onBack}
            isFirstStep={currentStep === 0}
            isLastStep={currentStep === steps.length - 1}
            isNextDisabled={!methods.formState.isValid}
          />
        </form>
      </FormProvider>
    </div>
  )
}
