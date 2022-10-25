import { useQuery } from 'react-query';
import client from 'src/utils/config/axios';

import { ENDPOINTS } from './endpoints';

interface ProfileInterface {
    status: number;
    message: string;
    body: ProfileBodyInterface;
}
interface ProfileBodyInterface {
    createdAt: string;
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    updatedAt: string;
}
const useProfile = (userContext: UserContextInterface) => {
    return useQuery(
        ['posts'],
        async () => {
            const { data } = await client.post<ProfileInterface>(
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
