import { Navigate, Outlet, useLocation } from 'react-router-dom'

export function ProtectedRoute() {
   /**
    * Replace with Zustand/Auth store later
    */
   const isAuthenticated = true

   const location = useLocation()

   if (!isAuthenticated) {
      return (
         <Navigate
            replace
            to="/login"
            state={{
               from: location,
            }}
         />
      )
   }

   return <Outlet />
}