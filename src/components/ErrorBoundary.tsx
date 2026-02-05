import React, { ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: (error: Error, retry: () => void) => ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

/**
 * Error Boundary component to catch errors in child components
 * Provides graceful error handling and recovery UI
 */
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null
    }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error Boundary caught:', error, errorInfo)
  }

  retry = () => {
    this.setState({
      hasError: false,
      error: null
    })
  }

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.retry)
      }

      return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-[#F4F7FB] to-[#E8F2F7]">
          <div className="max-w-md w-full bg-[#F8FAFD] rounded-lg shadow-refined p-8 text-center">
            <div className="mb-4 text-4xl">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-6 text-sm">
              {this.state.error.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={this.retry}
              className="w-full bg-gradient-to-r from-[#1F4FD8] to-[#1ECAD3] text-white font-semibold py-2 px-4 rounded-lg hover:shadow-refined transition-all"
            >
              Try Again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
