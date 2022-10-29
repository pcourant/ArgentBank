interface Token {
  token: string;
}

export interface LoginResponse {
  status: number;
  message: string;
  body: Token;
}

export interface Credentials {
  email: string;
  password: string;
}
