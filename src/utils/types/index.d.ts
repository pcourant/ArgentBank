import type { AxiosError } from 'axios';

export interface NameInterface {
  firstName: string;
  lastName: string;
}

export interface User {
  isAuthenticated: boolean;
  firstName: string | undefined;
  lastName: string | undefined;
}
export interface ErrorResponseData {
  message: string;
  status: number;
}

export type OnError = (err: AxiosError<ErrorResponseData>) => void;
