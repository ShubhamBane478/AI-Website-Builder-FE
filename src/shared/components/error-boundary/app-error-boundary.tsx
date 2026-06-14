import { Component, type ErrorInfo, type ReactNode } from 'react'
import { ErrorFallback } from './error-fallback'

type Props = {
   children: ReactNode
}

type State = {
   hasError: boolean
   error?: Error
}

export class AppErrorBoundary extends Component<Props, State> {
   public state: State = {
      hasError: false,
   }

   static getDerivedStateFromError(error: Error): State {
      return {
         hasError: true,
         error,
      }
   }

   componentDidCatch(error: Error, errorInfo: ErrorInfo) {
      console.error(error, errorInfo)
   }

   render() {
      if (this.state.hasError) {
         return <ErrorFallback error={this.state.error} />
      }

      return this.props.children
   }
}