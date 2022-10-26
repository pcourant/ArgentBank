interface User {
    firstName: string;
    lastName: string;
}

interface UserContext {
    user: User;
    setUser: (user: User) => void;
}
