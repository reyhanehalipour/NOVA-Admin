import { Navigate, Route, Routes } from 'react-router-dom'
import { ROUTES } from './appRoutes'
import { ProtectedRoute } from './ProtectedRoute'
import { AdminLayout } from '../Shared/layout'
import { lightTheme } from '../Shared/theme'

const LoginPlaceholder = () => (
  <div>
    <h2>Login</h2>
    <p>صفحه ورود به سیستم (موقت)</p>
  </div>
)

const DashboardPlaceholder = () => (
  <div>
    <h2>Dashboard</h2>
    <p>داشبورد (موقت)</p>
  </div>
)

const ProductsPlaceholder = () => (
  <div>
    <h2>Products</h2>
    <p>مدیریت محصولات (موقت)</p>
  </div>
)

const CreateProductPlaceholder = () => (
  <div>
    <h2>Create Product</h2>
    <p>ایجاد محصول جدید (موقت)</p>
  </div>
)

const UsersPlaceholder = () => (
  <div>
    <h2>Users</h2>
    <p>مدیریت کاربران (موقت)</p>
  </div>
)

const CreateUserPlaceholder = () => (
  <div>
    <h2>Create User</h2>
    <p>ایجاد کاربر جدید (موقت)</p>
  </div>
)

const NotFoundPlaceholder = () => (
  <div>
    <h2>Not Found</h2>
    <p>صفحه یافت نشد (موقت)</p>
  </div>
)

export const MainRoutes = () => (
  <Routes>
    <Route path={ROUTES.LOGIN} element={<LoginPlaceholder />} />
    <Route element={<ProtectedRoute />}>
      <Route element={<AdminLayout theme={lightTheme} />}>
        <Route path={ROUTES.DASHBOARD} element={<DashboardPlaceholder />} />
        <Route path={ROUTES.PRODUCTS} element={<ProductsPlaceholder />} />
        <Route path={ROUTES.CREATE_PRODUCT} element={<CreateProductPlaceholder />} />
        <Route path={ROUTES.USERS} element={<UsersPlaceholder />} />
        <Route path={ROUTES.CREATE_USER} element={<CreateUserPlaceholder />} />
      </Route>
    </Route>
    <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
    <Route path="*" element={<NotFoundPlaceholder />} />
  </Routes>
)
