import { AxiosError } from 'axios';

export interface User {
  id: string | undefined;
  email: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
}

export interface UserContextInterface {
  user: User;
  setUser: (user: User) => void;
}

export interface ErrorResponseData {
  message: string;
  status: number;
}

export type OnError = (err: AxiosError<ErrorResponseData>) => void;
