import axios from 'axios'
import type { Dictionary } from '../../Dictionary/dictionary.types'

export const NETWORK_ERROR = 'networkError'
export const SERVER_ERROR = 'serverError'
export const FORBIDDEN_ERROR = 'forbiddenError'
export const LOGIN_INVALID = 'loginInvalid'

export const toErrorMessage = (error: unknown): string => {
  if (typeof error === 'string' && error.length > 0) {
    return error
  }
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return NETWORK_ERROR
    }
    if (error.response.status === 403) {
      return FORBIDDEN_ERROR
    }
    return SERVER_ERROR
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
  if (code === FORBIDDEN_ERROR) {
    return dictionary.forbiddenError
  }
  if (code === SERVER_ERROR) {
    return dictionary.serverError
  }
  if (code === LOGIN_INVALID) {
    return dictionary.loginInvalid
  }
  return code
}