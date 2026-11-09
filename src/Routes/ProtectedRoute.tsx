import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '../Redux/hooks'
import { ROUTES } from './appRoutes'

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  }

  return <Outlet />
}
