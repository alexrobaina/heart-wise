// src/app/newChat/page.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { emotionalOnboardingFormSchema } from '@/schemas/emotionalOnboardingFormSchema'
import { WelcomeScreen } from '@/components/organisms/WelcomeScreen'
import { StepOne } from '@/components/organisms/EmotionalOnboardingForm/StepOne'
import { StepTwo } from '@/components/organisms/EmotionalOnboardingForm/StepTwo'
import { StepThree } from '@/components/organisms/EmotionalOnboardingForm/StepThree'
import { StepFour } from '@/components/organisms/EmotionalOnboardingForm/StepFour'
import { NavigationControls } from '@/components/molecules/NavigationControls'
import { redirect } from 'next/navigation'
import womanPsychology from '@/assets/lottie/womanPsychology.json'
import { useSession } from 'next-auth/react'
import { useCreateChat } from '@/hooks/useCreateChat'
import { contextPrompt, createContextPrompt } from '@/lib/promptUtils'
import { ObjectSchema } from 'yup'

const steps = [StepOne, StepTwo, StepThree, StepFour]

export default function NewChatPage() {
  const { data: session } = useSession()
  const [currentStep, setCurrentStep] = useState(0)
  const [showWelcome, setShowWelcome] = useState(true)
  const { mutate: createChat, isSuccess, data } = useCreateChat()
  const [codeToAccept, setCodeToAccept] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  if (!session) {
    redirect('/')
  }

  const looseObjectSchema: ObjectSchema<Record<string, unknown>> =
    emotionalOnboardingFormSchema[currentStep] as ObjectSchema<
      Record<string, unknown>
    >

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const methods = useForm<any>({
    resolver: yupResolver(looseObjectSchema),
    mode: 'onChange',
  })

  const StepComponent = steps[currentStep]

  const onSubmit = async (data: contextPrompt) => {
    if (currentStep < steps.length - 1) {
      return setCurrentStep((prev) => prev + 1)
    }
    const contextPrompt = await createContextPrompt(data)
    const contextRaw = data
    createChat({ contextPrompt, contextRaw, title: 'Nuevo Chat Creado' })
  }

  useEffect(() => {
    if (isSuccess) {
      redirect(`chat/${data.id}`)
    }
  })

  const onBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    } else {
      setShowWelcome(true)
      setCodeToAccept(null)
      setError(null)
      methods.reset()
    }
  }


  if (showWelcome) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 px-4">
        {!codeToAccept && (
          <WelcomeScreen
            title="Bienvenido a Soul Connection"
            subtitle="Comienza el proceso de onboarding para conocerte mejor"
            lottieAnimation={womanPsychology}
            onStart={() => setShowWelcome(false)}
            buttonText="Comenzar nuevo chat"
          />
        )}
        {codeToAccept && (
          <div>
            <h2>Código aceptado: {codeToAccept}</h2>
            {/* Aquí puedes redirigir, cargar datos o mostrar algo */}
          </div>
        )}
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </div>
    )
  }

  return (
    <div className="flex flex-col py-16 items-center min-h-screen bg-amber-50 px-4 overflow-auto pb-10">
      <div className="mb-6 text-center">
        <div className="flex justify-center mb-1 w-full mt-10">
          {steps.map((_step, index) => (
            <React.Fragment key={index}>
              <span
                onClick={() => setCurrentStep(index)}
                className={`w-10 h-10 rounded-full flex justify-center items-center ${index <= currentStep ? 'bg-amber-600' : 'bg-amber-200'}`}
              >
                <div
                  className={`${index === currentStep ? 'text-white' : 'text-gray-800'} ${index < currentStep ? 'text-white' : 'text-gray-800'} cursor-pointer transition-colors`}
                >
                  {index + 1}
                </div>
              </span>
              {index < steps.length - 1 && (
                <div
                  className={`${index < currentStep ? 'h-[1px] bg-orange-500' : ' bg-amber-300'} h-[1px] w-10 mt-5 mx-1 rounded-md transition-colors`}
                />
              )}
            </React.Fragment>
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
            isLastStep={currentStep === steps.length - 1}
            isNextDisabled={!methods.formState.isValid}
          />
        </form>
      </FormProvider>
    </div>
  )
}
