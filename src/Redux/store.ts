import { configureStore } from '@reduxjs/toolkit'
import authReducer, { logoutAction } from './auth/authSlice'
import productsReducer from './products/productsSlice'
import usersReducer from './users/usersSlice'
import { registerUnauthorizedHandler } from '../Utils/api/authEvents'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    users: usersReducer,
  },
})

registerUnauthorizedHandler(() => {
  store.dispatch(logoutAction())
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch