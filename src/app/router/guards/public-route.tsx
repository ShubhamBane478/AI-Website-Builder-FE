import { Navigate, Outlet } from 'react-router-dom'

export function PublicRoute() {
   /**
    * Replace with Zustand/Auth store later
    */
   const isAuthenticated = false

   if (isAuthenticated) {
      return <Navigate replace to="/dashboard" />
   }

   return <Outlet />
}  