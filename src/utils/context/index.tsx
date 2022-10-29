import type { User, UserContextInterface } from '@utils/types';
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext<null | UserContextInterface>(null);

export const UserContextProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [user, setUserState] = useState<User>({
    id: undefined,
    email: undefined,
    firstName: undefined,
    lastName: undefined,
  });

  const setUser = (user: User) => {
    setUserState(user);
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const userContext = useContext(UserContext);

  if (userContext == null) {
    throw new Error('Need a <UserContext.Provider>');
  }

  return userContext;
};
