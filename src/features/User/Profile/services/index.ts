import { useQuery, useMutation } from 'react-query';
import client from '@utils/config/axios';
import { AxiosResponse } from 'axios';

import { ENDPOINTS } from './endpoints';

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
const useProfile = (onSuccess: ProfileOnSuccess) => {
    return useQuery(
        ['profile'],
        async () => {
            const { data } = await client.post<ProfileResponse>(
                ENDPOINTS.profile,
            );
            return data;
        },
        {
            onSuccess: onSuccess,
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

const useProfileUpdate = () => useMutation(updateProfile);

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
) => {
    profileMutation.mutate(name, { onSuccess: onSuccess });
};

export { useProfile, useProfileUpdate, submitProfileUpdate };
