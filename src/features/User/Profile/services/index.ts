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
        ['posts'],
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

export default useProfile;
