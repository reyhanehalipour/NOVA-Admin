import axios from 'axios'
import type { Dictionary } from '../../Dictionary/dictionary.types'

export const NETWORK_ERROR = 'networkError'
export const SERVER_ERROR = 'serverError'

export const toErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response ? SERVER_ERROR : NETWORK_ERROR
  }
  if (error instanceof Error && error.message) {
    return error.message
  }
  return SERVER_ERROR
}

export const resolveErrorMessage = (code: string | null, dictionary: Dictionary): string => {
  if (!code) {
    return ''
  }
  if (code === NETWORK_ERROR) {
    return dictionary.networkError
  }
  if (code === SERVER_ERROR) {
    return dictionary.serverError
  }
  return code
}