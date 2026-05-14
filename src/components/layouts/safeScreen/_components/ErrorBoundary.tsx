import type { ErrorInfo } from 'react'
import type { ErrorBoundaryPropsWithFallback } from 'react-error-boundary'

import { ErrorBoundary as DefaultErrorBoundary } from 'react-error-boundary'

import { DefaultErrorScreen } from '@/components/layouts/safeScreen/_components/DefaultError'

type Optional<T, K extends keyof T> = Omit<T, K> & Pick<Partial<T>, K>

type Props = {
  readonly onReset?: () => void
} & Optional<ErrorBoundaryPropsWithFallback, 'fallback'>

export function ErrorBoundary({ fallback = undefined, onError, onReset = undefined, ...props }: Props) {
  const onErrorReport = (error: Error, info: ErrorInfo) => {
    // use any crash reporting tool here
    return onError?.(error, info)
  }

  return (
    <DefaultErrorBoundary
      {...props}
      fallback={fallback || <DefaultErrorScreen onReset={onReset} />}
      onError={onErrorReport}
    />
  )
}
