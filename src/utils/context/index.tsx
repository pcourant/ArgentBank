import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext<UserContext>({
    user: {
        firstName: '',
        lastName: '',
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
        firstName: '',
        lastName: '',
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
