import { useQuery, useMutation } from 'react-query';
import client from '@utils/config/axios';
import type { AxiosError, AxiosResponse } from 'axios';
import type {
  ProfileResponse,
  ProfileOnSuccess,
  NameInterface,
  ProfileUpdateResponse,
  ProfileUpdateOnSuccess,
} from './types';

import { ENDPOINTS } from './endpoints';
import type { ErrorResponseData, OnError } from '@utils/types';

const useProfile = (onSuccess: ProfileOnSuccess, onError: OnError) => {
  return useQuery<unknown, AxiosError<ErrorResponseData>, ProfileResponse>(
    ['profile'],
    async () => {
      const { data } = await client.post<ProfileResponse>(ENDPOINTS.profile);
      return data;
    },
    {
      onSuccess: (data) => {
        // console.log('API: useProfile', data);
        onSuccess(data);
      },
      onError: (err) => {
        console.error('API: useProfile', err);
        onError(err);
      },
    },
  );
};

const updateProfile = (name: NameInterface) => {
  return client.put<ProfileUpdateResponse>(ENDPOINTS.profile, name);
};

const useProfileUpdate = () =>
  useMutation<
    AxiosResponse<ProfileUpdateResponse>,
    AxiosError<ErrorResponseData>,
    NameInterface
  >(updateProfile);

type ProfileMutationType = ReturnType<typeof useProfileUpdate>;

const submitProfileUpdate = (
  profileMutation: ProfileMutationType,
  name: NameInterface,
  onSuccess: ProfileUpdateOnSuccess,
  onError: OnError,
) => {
  profileMutation.mutate(name, {
    onSuccess,
    onError: (err) => {
      console.error('API: submitProfileUpdate', err);
      onError(err);
    },
  });
};

export { useProfile, useProfileUpdate, submitProfileUpdate };
