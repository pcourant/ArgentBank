interface User {
    firstName?: string;
    lastName?: string;
    token: string | null;
}

interface UserContextInterface {
    user: User;
    setUser: (user: User) => void;
}
