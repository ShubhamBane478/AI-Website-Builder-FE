import { loadable } from '@/shared/components/loadable'
import type { RouteObject } from 'react-router-dom'


const NotFoundPage = loadable(() => import('@/domains/error/pages/not-found-page'))

export const errorRoutes: RouteObject = {
   path: '*',
   element: <NotFoundPage />,
}