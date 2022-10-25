import { useMutation } from 'react-query';
import { NavigateFunction } from 'react-router-dom';
import client from 'src/utils/config/axios';

import { ENDPOINTS } from './endpoints';

interface LoginInterface {
    status: number;
    message: string;
    body: TokenInterface;
}
interface TokenInterface {
    token: string;
}
interface CredentialsInterface {
    email: string;
    password: string;
}

const login = ({ email, password }: CredentialsInterface) => {
    return client.post<LoginInterface>(ENDPOINTS.login, {
        email,
        password,
    });
};

export const useLogin = () => useMutation(login);

type LoginMutationType = ReturnType<typeof useLogin>;

export const submitLogin = (
    loginMutation: LoginMutationType,
    credentials: CredentialsInterface,
    navigate?: NavigateFunction,
    to?: string,
) => {
    loginMutation.mutate(credentials, {
        onSuccess: (data) => {
            client.defaults.headers.common[
                'Authorization'
            ] = `Bearer ${data.data.body.token}`;
            if (navigate && to) navigate(to);
        },
    });
};
