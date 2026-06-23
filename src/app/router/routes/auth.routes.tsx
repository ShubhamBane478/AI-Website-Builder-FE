import { AuthLayout } from '@/app/layouts/auth-layout'
import { PublicRoute } from '@/app/router/guards/public-route'
import { loadable } from '@/shared/components/loadable'
import type { RouteObject } from 'react-router-dom'

const LoginPage = loadable(
   () => import('@/domains/auth/pages/login-page')
)

const RegisterPage = loadable(
   () => import('@/domains/auth/pages/register-page')
)

const ForgotPasswordPage = loadable(
   () => import('@/domains/auth/pages/forgot-password-page')
)

const ResetPasswordPage = loadable(
   () => import('@/domains/auth/pages/reset-password-page')
)

export const authRoutes: RouteObject = {
   element: <PublicRoute />,
   children: [
      {
         element: <AuthLayout />,
         children: [
            {
               path: '/login',
               element: <LoginPage />,
            },
            {
               path: '/register',
               element: <RegisterPage />,
            },
            {
               path: '/forgot-password',
               element: <ForgotPasswordPage />,
            },
            {
               path: '/reset-password',
               element: <ResetPasswordPage />,
            },
         ],
      },
   ],
}