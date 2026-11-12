import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { getProducts, createProduct } from '../../Utils/services/product.service'
import { toErrorMessage } from '../../Utils/api/errorMessage'
import type { Product, CreateProductInput } from '../../types/product.types'

export interface ProductsState {
  items: Product[]
  fetchStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
  createStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: ProductsState = {
  items: [],
  fetchStatus: 'idle',
  createStatus: 'idle',
  error: null,
}

export const fetchProductsThunk = createAsyncThunk<Product[], void, { rejectValue: string }>(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const products = await getProducts()
      return products
    } catch (error: unknown) {
      return rejectWithValue(toErrorMessage(error))
    }
  }
)

export const createProductThunk = createAsyncThunk<Product, CreateProductInput, { rejectValue: string }>(
  'products/createProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const createdProduct = await createProduct(productData)
      return createdProduct
    } catch (error: unknown) {
      return rejectWithValue(toErrorMessage(error))
    }
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProductError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsThunk.pending, (state) => {
        state.fetchStatus = 'loading'
        state.error = null
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.fetchStatus = 'succeeded'
        state.items = action.payload
        state.error = null
      })
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        state.fetchStatus = 'failed'
        state.error = action.payload ?? 'خطا در دریافت محصولات'
      })
      .addCase(createProductThunk.pending, (state) => {
        state.createStatus = 'loading'
        state.error = null
      })
      .addCase(createProductThunk.fulfilled, (state, action: PayloadAction<Product>) => {
        state.createStatus = 'succeeded'
        state.items = [action.payload, ...state.items]
        state.error = null
      })
      .addCase(createProductThunk.rejected, (state, action) => {
        state.createStatus = 'failed'
        state.error = action.payload ?? 'خطا در ایجاد محصول'
      })
  },
})

export const { clearProductError } = productsSlice.actions

export default productsSlice.reducer