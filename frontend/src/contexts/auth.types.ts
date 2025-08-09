export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor';
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  loading: boolean;
}
