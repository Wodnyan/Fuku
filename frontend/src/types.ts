export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  avatarUrl?: string;
}

export interface Room {
  id: number;
  name: string;
  createdAt: string;
  user: User;
  icon?: string;
}

export interface Review {
  id: number;
  code: string;
  description: string;
  createdAt: string;
  user: User;
}
