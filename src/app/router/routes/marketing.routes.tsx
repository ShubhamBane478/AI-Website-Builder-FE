import { MarketingLayout } from '@/app/layouts/marketing-layout'
import { loadable } from '@/shared/components/loadable'
import type { RouteObject } from 'react-router-dom'



const HomePage = loadable(
   () => import('@/domains/marketing/pages/home-page')
)


export const marketingRoutes: RouteObject = {
   element: <MarketingLayout />,
   children: [
      {
         path: '/',
         element: <HomePage />,
      },

   ],
}