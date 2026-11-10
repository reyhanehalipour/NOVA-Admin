import axios, { type AxiosInstance } from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || ''

export const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})
