import { useQuery } from 'react-query';
import client from '@utils/config/axios';

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
const useProfile = (userContext: UserContext) => {
    return useQuery(
        ['profile'],
        async () => {
            const { data } = await client.post<ProfileResponse>(
                ENDPOINTS.profile,
            );
            return data;
        },
        {
            onSuccess: (data) => {
                console.log('useProfile', data);
                userContext.setUser({
                    ...userContext.user,
                    firstName: data.body.firstName,
                    lastName: data.body.lastName,
                });
                console.log('useProfile', userContext.user);
            },
        },
    );
};

interface ProfileUpdatePayload {
    firstName: string;
    lastName: string;
}
interface ProfileUpdateResponse {
    status: number;
    message: string;
    body: ProfileUpdateResponseBody;
}
interface ProfileUpdateResponseBody {
    id: string;
    email: string;
}
const useProfileUpdate = (
    profileUpdatePayload: ProfileUpdatePayload,
    userContext: UserContext,
) => {
    return useQuery(
        ['profileUpdate'],
        async () => {
            const { data } = await client.put<ProfileUpdateResponse>(
                ENDPOINTS.profile,
                profileUpdatePayload,
            );
            return data;
        },
        {
            onSuccess: (data) => {
                console.log('useProfileUpdate', data);
                userContext.setUser({
                    ...userContext.user,
                    firstName: profileUpdatePayload.firstName,
                    lastName: profileUpdatePayload.lastName,
                });
                console.log('useProfileUpdate', userContext.user);
            },
        },
    );
};

export { useProfile, useProfileUpdate };
