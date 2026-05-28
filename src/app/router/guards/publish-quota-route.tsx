import { Navigate, Outlet } from 'react-router-dom'

export function PublishQuotaRoute() {
   /**
    * Replace with API/store later
    */
   const sitesPublished = 2
   const sitesLimit = 3

   if (sitesPublished >= sitesLimit) {
      return <Navigate replace to="/dashboard" />
   }

   return <Outlet />
}