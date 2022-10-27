interface User {
  id: string | undefined;
  email: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
}

interface UserContext {
  user: User;
  setUser: (user: User) => void;
}

interface ErrorResponseData {
  message: string;
  status: number;
}
