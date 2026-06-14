import { lazy, Suspense, type ComponentType } from 'react'
import { FullPageLoader } from '@/shared/components/loaders/full-page-loader'

export function loadable<T extends ComponentType<any>>(
   importFunc: () => Promise<{ default: T }>
) {
   const LazyComponent = lazy(importFunc)

   return function WrappedComponent(props: React.ComponentProps<T>) {
      return (
         <Suspense fallback={<FullPageLoader />}>
            <LazyComponent {...props} />
         </Suspense>
      )
   }
}