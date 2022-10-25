interface User {
    firstName?: string;
    lastName?: string;
}

interface UserContextInterface {
    user: User;
    setUser: (user: User) => void;
}
