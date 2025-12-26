
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface User {
  token: string;
  email: string;
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface ApiState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}
