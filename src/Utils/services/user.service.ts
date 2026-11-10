import { axiosInstance } from '../api/axiosInstance';
import type { User, CreateUserInput } from '../../types/user.types';

export const getUsers = (): Promise<User[]> => {
  return axiosInstance.get<User[]>('/users').then((response) => response.data);
};

export const createUser = (data: CreateUserInput): Promise<User> => {
  return axiosInstance.post<User>('/users', data).then((response) => response.data);
};
