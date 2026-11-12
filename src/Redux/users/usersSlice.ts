import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { getUsers, createUser } from '../../Utils/services/user.service'
import { toErrorMessage } from '../../Utils/api/errorMessage'
import type { User, CreateUserInput } from '../../types/user.types'

export interface UsersState {
  items: User[]
  fetchStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
  createStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: UsersState = {
  items: [],
  fetchStatus: 'idle',
  createStatus: 'idle',
  error: null,
}

export const fetchUsersThunk = createAsyncThunk<User[], void, { rejectValue: string }>(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const users = await getUsers()
      return users
    } catch (error: unknown) {
      return rejectWithValue(toErrorMessage(error))
    }
  }
)

export const createUserThunk = createAsyncThunk<User, CreateUserInput, { rejectValue: string }>(
  'users/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      const createdUser = await createUser(userData)
      return { ...userData, id: createdUser.id }
    } catch (error: unknown) {
      return rejectWithValue(toErrorMessage(error))
    }
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersThunk.pending, (state) => {
        state.fetchStatus = 'loading'
        state.error = null
      })
      .addCase(fetchUsersThunk.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.fetchStatus = 'succeeded'
        state.items = action.payload
        state.error = null
      })
      .addCase(fetchUsersThunk.rejected, (state, action) => {
        state.fetchStatus = 'failed'
        state.error = action.payload ?? 'خطا در دریافت کاربران'
      })
      .addCase(createUserThunk.pending, (state) => {
        state.createStatus = 'loading'
        state.error = null
      })
      .addCase(createUserThunk.fulfilled, (state, action: PayloadAction<User>) => {
        state.createStatus = 'succeeded'
        if (!state.items.some((user) => user.id === action.payload.id)) {
          state.items = [action.payload, ...state.items]
        }
        state.error = null
      })
      .addCase(createUserThunk.rejected, (state, action) => {
        state.createStatus = 'failed'
        state.error = action.payload ?? 'خطا در ایجاد کاربر'
      })
  },
})

export const { clearUserError } = usersSlice.actions

export default usersSlice.reducer