import { useQuery, useMutation } from 'react-query';
import { NavigateFunction } from 'react-router-dom';
import client from 'src/utils/config/axios';

import { ENDPOINTS } from '../constants/endpoints';

interface CredentialsInterface {
    email: string;
    password: string;
}

const login = ({ email, password }: CredentialsInterface) => {
    return client.post<CredentialsInterface>(ENDPOINTS.login, {
        email,
        password,
    });
};

export const useLogin = () => useMutation(login);

export const submitLogin = (
    loginMutation,
    credentials: CredentialsInterface,
    userContext: UserContextInterface,
    navigate: NavigateFunction,
    to: string,
) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    loginMutation.mutate(credentials, {
        onSuccess: (data) => {
            console.log(
                'submitLogin onSuccess',
                // loginMutation.data?.data?.body?.token,
                data,
            );
            // userContext.setUser({
            //     ...userContext.user,
            //     token: data?.data?.body?.token,
            // });
            client.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${data.data.body.token}`;
            navigate(to);
        },
    });
};

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
export const useProfile = (userContext: UserContextInterface) => {
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
