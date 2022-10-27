import { User, UserContextInterface } from '@utils/types';
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext<UserContextInterface>({
  user: {
    id: undefined,
    email: undefined,
    firstName: undefined,
    lastName: undefined,
  },
  setUser: (user) => {
    user;
    return;
  },
});

export const useUserContext = () => {
  const userContext = useContext(UserContext);

  return userContext;
};

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
