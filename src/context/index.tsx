import React, { createContext, useContext, useState } from 'react';

// interface UserContextInterface {
//     user: User;
//     setUser: (user: User) => void;
// }

// const user: User = {
//     token: null,
// };
// const userContext: UserContextInterface = {
//     user: { token: null },
//     setUser: (user) => {
//         user;
//     },
// };

// export const UserContext = createContext<UserContextInterface>(userContext);
const UserContext = createContext<UserContextInterface>(
    {} as UserContextInterface,
);

export const useUserContext = () => {
    const userContext = useContext(UserContext);

    return userContext;
};

export const UserContextProvider = ({
    children,
}: {
    children?: React.ReactNode;
}) => {
    const [user, setUserState] = useState<User>({ token: null });

    const setUser = (user: User) => {
        setUserState(user);
    };

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
