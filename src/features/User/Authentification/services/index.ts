import { useMutation } from 'react-query';
import client from '@utils/config/axios';

import { ENDPOINTS } from './endpoints';
import type { AxiosError, AxiosResponse } from 'axios';
import type { ErrorResponseData, OnError } from '@utils/types';
import type { LoginResponse, Credentials } from './types';

const login = (credentials: Credentials) => {
  return client.post<LoginResponse>(ENDPOINTS.login, credentials);
};

export const useLogin = () =>
  useMutation<
    AxiosResponse<LoginResponse>,
    AxiosError<ErrorResponseData>,
    Credentials,
    unknown
  >(login);

type LoginMutationType = ReturnType<typeof useLogin>;

export const submitLogin = (
  loginMutation: LoginMutationType,
  credentials: Credentials,
  onSuccess: (data: AxiosResponse<LoginResponse>) => void,
  onError: OnError,
) => {
  loginMutation.mutate(credentials, {
    onSuccess: (data) => {
      // console.log('API: submitLogin', data);
      onSuccess(data);
    },
    onError: (err) => {
      console.error('API: submitLogin', err);
      onError(err);
    },
  });
};
