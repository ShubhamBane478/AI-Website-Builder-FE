import { Navigate, Outlet } from 'react-router-dom'

export function VerifiedRoute() {
   /**
    * Replace with auth store later
    */
   const isAuthenticated = true
   const isVerified = true

   if (!isAuthenticated) {
      return <Navigate replace to="/login" />
   }

   if (!isVerified) {
      return <Navigate replace to="/verify-email" />
   }

   return <Outlet />
}