import { IconSquareRoundedX } from 'assets/icons/iconSquareRoundedX'
import { BaseButton } from 'components/common/BaseButton'
import { BaseCard } from 'components/common/BaseCard'
import { Component, ErrorInfo, ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  // Update state when an error is caught
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  // Log error information if needed
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // If a fallback prop is provided, render it; otherwise, render a default message
      return (
        this.props.fallback || (
          <div className="flex justify-center items-center mt-20">
            <BaseCard className="w-[400px] md:w-[470px] flex flex-col items-center justify-center gap-4">
              <div className="rounded-full size-20 bg-red-100 p-2 flex justify-center items-center">
                <IconSquareRoundedX className="size-8 text-red-700" />
              </div>
              <h1 className="text-3xl font-bold">Error</h1>
              <p className="text-base text-gray-500 text-center">
                We couldn’t load the groups right now. Please check your
                internet connection or try again later.
              </p>
              <BaseButton
                text="Try again"
                className="w-full"
                onClick={() => {
                  window.location.reload()
                }}
              />
            </BaseCard>
          </div>
        )
      )
    }
    return this.props.children
  }
}
