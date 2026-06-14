import { EditorLayout } from '@/app/layouts/editor-layout'
import { VerifiedRoute } from '@/app/router/guards/verified-route'
import { ProtectedRoute } from '@/app/router/protected-route'
import { loadable } from '@/shared/components/loadable'
import type { RouteObject } from 'react-router-dom'



const EditorPage = loadable(
   () => import('@/domains/editor/pages/editor-page')
)

export const editorRoutes: RouteObject = {
   element: <ProtectedRoute />,
   children: [
      {
         element: <VerifiedRoute />,
         children: [
            {
               element: <EditorLayout />,
               children: [
                  {
                     path: '/sites/:id/edit',
                     element: <EditorPage />,
                  },
               ],
            },
         ],
      },
   ],
}