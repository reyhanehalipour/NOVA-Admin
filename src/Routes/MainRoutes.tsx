import { Navigate, Route, Routes } from 'react-router-dom'
import { ROUTES } from './appRoutes'
import { ProtectedRoute } from './ProtectedRoute'
import { AdminLayout } from '../Shared/layout'
import { LoginPage } from '../Pages/Login/Login'
import { ProductsList } from '../Pages/Products/ProductsList'
import { CreateProductPage } from '../Pages/Products/CreateProduct/CreateProduct'
import { UsersList } from '../Pages/Users/UsersList'
import { CreateUserPage } from '../Pages/Users/CreateUser/CreateUser'
import { DashboardPage } from '../Pages/Dashboard/Dashboard'

const NotFoundPlaceholder = () => (
  <div>
    <h2>Not Found</h2>
    <p>صفحه یافت نشد (موقت)</p>
  </div>
)

export const MainRoutes = () => (
  <Routes>
    <Route path={ROUTES.LOGIN} element={<LoginPage />} />
    <Route element={<ProtectedRoute />}>
      <Route element={<AdminLayout />}>
        <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
        <Route path={ROUTES.PRODUCTS} element={<ProductsList />} />
        <Route path={ROUTES.CREATE_PRODUCT} element={<CreateProductPage />} />
        <Route path={ROUTES.USERS} element={<UsersList />} />
        <Route path={ROUTES.CREATE_USER} element={<CreateUserPage />} />
      </Route>
    </Route>
    <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
    <Route path="*" element={<NotFoundPlaceholder />} />
  </Routes>
)
