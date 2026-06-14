import { Navigate, Outlet } from 'react-router-dom'

export function AdminRoute() {
   /**
    * Replace with auth store later
    */
   const isAuthenticated = true
   const isAdmin = false

   if (!isAuthenticated) {
      return <Navigate replace to="/login" />
   }

   if (!isAdmin) {
      return <Navigate replace to="/dashboard" />
   }

   return <Outlet />
}