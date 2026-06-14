import { DashboardLayout } from '@/app/layouts/dashboard-layout'
import { ProtectedRoute } from '@/app/router/protected-route'
import { loadable } from '@/shared/components/loadable'
import type { RouteObject } from 'react-router-dom'

const DashboardPage = loadable(
   () => import('@/domains/dashboard/pages/dashboard-page')
)

export const dashboardRoutes: RouteObject = {
   element: <ProtectedRoute />,
   children: [
      {
         element: <DashboardLayout />,
         children: [
            {
               path: '/dashboard',
               element: <DashboardPage />,
            },
         ],
      },
   ],
}