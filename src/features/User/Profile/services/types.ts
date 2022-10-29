import type { AxiosResponse } from 'axios';

interface ProfileResponseBody {
  createdAt: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  updatedAt: string;
}

export interface ProfileResponse {
  status: number;
  message: string;
  body: ProfileResponseBody;
}

export type ProfileOnSuccess = (data: ProfileResponse) => void;

export interface NameInterface {
  firstName: string;
  lastName: string;
}

interface ProfileUpdateResponseBody {
  id: string;
  email: string;
}

export interface ProfileUpdateResponse {
  status: number;
  message: string;
  body: ProfileUpdateResponseBody;
}

export type ProfileUpdateOnSuccess = (
  data: AxiosResponse<ProfileUpdateResponse>,
  variables: NameInterface,
) => void | Promise<unknown>;
