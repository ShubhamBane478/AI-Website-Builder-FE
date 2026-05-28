import { PublicSiteLayout } from '@/app/layouts/public-site-layout'
import type { RouteObject } from 'react-router-dom'



// const PublishedSitePage = loadable(
//    () => import('../../../domains/public-site/pages/published-site-page')
// )

export const publicSiteRoutes: RouteObject = {
   element: <PublicSiteLayout />,
   children: [
      {
         path: '/s/:subdomain',
         element: null,
         // element: <PublishedSitePage />,
      },
   ],
}