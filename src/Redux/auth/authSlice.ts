import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { login } from '../../Utils/services/auth.service'
import { getToken, setToken, removeToken } from '../../Storage/tokenStorage'
import type { LoginCredentials, AuthResponse } from '../../types/auth.types'

interface AuthState {
  token: string | null
  isAuthenticated: boolean
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialToken = getToken()

const initialState: AuthState = {
  token: initialToken,
  isAuthenticated: !!initialToken,
  status: 'idle',
  error: null,
}

export const loginThunk = createAsyncThunk<AuthResponse, LoginCredentials, { rejectValue: string }>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await login(credentials)
      return response
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return rejectWithValue('خطای نامشخص در ورود به سیستم')
    }
  }
)

export const logoutThunk = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      removeToken()
      return
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return rejectWithValue('خطا در خروج از سیستم')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      removeToken()
      state.token = null
      state.isAuthenticated = false
      state.status = 'idle'
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginThunk.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.status = 'succeeded'
        state.token = action.payload.token
        state.isAuthenticated = true
        setToken(action.payload.token)
        state.error = null
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? 'خطا در ورود به سیستم'
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.token = null
        state.isAuthenticated = false
        state.status = 'idle'
        state.error = null
      })
  },
})

export const { logout: logoutAction, clearError } = authSlice.actions

export default authSlice.reducer
