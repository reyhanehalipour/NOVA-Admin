import { axiosInstance } from '../api/axiosInstance';
import type { LoginCredentials, AuthResponse } from '../../types/auth.types';

export const login = (credentials: LoginCredentials): Promise<AuthResponse> => {
  return axiosInstance.post<AuthResponse>('/auth/login', credentials).then((response) => response.data);
};
