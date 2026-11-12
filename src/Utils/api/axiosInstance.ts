import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { getToken } from '../../Storage/tokenStorage'
import { notifyUnauthorized } from './authEvents'

const baseURL = import.meta.env.VITE_API_BASE_URL || ''

export const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.response.use(
  undefined,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status
      const url = error.config?.url ?? ''
      if (status === 401 && !url.includes('/auth/login')) {
        notifyUnauthorized()
      }
    }
    return Promise.reject(error)
  }
)

export const withAuthorization = (config: AxiosRequestConfig): AxiosRequestConfig => ({
  ...config,
  headers: {
    ...config.headers,
    Authorization: `Bearer ${getToken()}`,
  },
})