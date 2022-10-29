import { useQuery } from 'react-query';
import client from '@utils/config/axios';

import { ENDPOINTS } from './endpoints';

interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
interface RegisterResponse {
  status: number;
  message: string;
  body: RegisterResponseBody;
}
interface RegisterResponseBody {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
const useRegister = (registerPayload: RegisterPayload) => {
  return useQuery(
    ['registers'],
    async () => {
      const { data } = await client.post<RegisterResponse>(
        ENDPOINTS.signup,
        registerPayload,
      );
      return data;
    },
    {
      onSuccess: (data) => {
        console.log('useRegister', data);
      },
    },
  );
};

export default useRegister;
