import { useMutation } from 'react-query';
import { NavigateFunction } from 'react-router-dom';
import client from '@utils/config/axios';

import { ENDPOINTS } from './endpoints';

interface LoginResponse {
    status: number;
    message: string;
    body: Token;
}
interface Token {
    token: string;
}
interface Credentials {
    email: string;
    password: string;
}

const login = (credentials: Credentials) => {
    return client.post<LoginResponse>(ENDPOINTS.login, credentials);
};

export const useLogin = () => useMutation(login);

type LoginMutationType = ReturnType<typeof useLogin>;

export const submitLogin = (
    loginMutation: LoginMutationType,
    credentials: Credentials,
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
