import { Navigate, Outlet, useLocation } from 'react-router-dom'

export function ProtectedRoute() {
  const isAuthenticated = true

  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate replace to="/login" state={{ from: location }} />
  }

  return <Outlet />
}