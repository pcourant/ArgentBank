import { useQuery, useMutation } from 'react-query';
import client from '@utils/config/axios';
import { AxiosError, AxiosResponse } from 'axios';

import { ENDPOINTS } from './endpoints';
import { ErrorResponseData, OnError } from '@utils/types';

interface ProfileResponse {
  status: number;
  message: string;
  body: ProfileResponseBody;
}
interface ProfileResponseBody {
  createdAt: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  updatedAt: string;
}

type ProfileOnSuccess = (data: ProfileResponse) => void;
// type OnError = (err: AxiosError<ErrorResponseData>) => void;

const useProfile = (onSuccess: ProfileOnSuccess, onError: OnError) => {
  return useQuery<unknown, AxiosError<ErrorResponseData>, ProfileResponse>(
    ['profile'],
    async () => {
      const { data } = await client.post<ProfileResponse>(ENDPOINTS.profile);
      return data;
    },
    {
      onSuccess: (data) => {
        console.log('API: useProfile', data);
        onSuccess(data);
      },
      onError: (err) => {
        console.error('API: useProfile', err);
        onError(err);
      },
    },
  );
};

interface NameInterface {
  firstName: string;
  lastName: string;
}
const updateProfile = (name: NameInterface) => {
  return client.put<ProfileUpdateResponse>(ENDPOINTS.profile, name);
};

const useProfileUpdate = () =>
  useMutation<
    AxiosResponse<ProfileUpdateResponse>,
    AxiosError<ErrorResponseData>,
    NameInterface
  >(updateProfile);

interface ProfileUpdateResponse {
  status: number;
  message: string;
  body: ProfileUpdateResponseBody;
}
interface ProfileUpdateResponseBody {
  id: string;
  email: string;
}
type ProfileMutationType = ReturnType<typeof useProfileUpdate>;
type ProfileUpdateOnSuccess = (
  data: AxiosResponse<ProfileUpdateResponse>,
  variables: NameInterface,
) => void | Promise<unknown>;

const submitProfileUpdate = (
  profileMutation: ProfileMutationType,
  name: NameInterface,
  onSuccess: ProfileUpdateOnSuccess,
  onError: OnError,
) => {
  profileMutation.mutate(name, {
    onSuccess: onSuccess,
    onError: (err) => {
      console.error('API: submitProfileUpdate', err);
      onError(err);
    },
  });
};

export { useProfile, useProfileUpdate, submitProfileUpdate };
