import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/',
    }),
    endpoints: (builder) => ({
        users: builder.query<User, string>({
            query: () => '/users',
        }),
    }),
});

export const { useUsersQuery } = userApi;
