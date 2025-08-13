'use client';

import { createContext } from 'react';

export interface AuthInfo {
  token: string;
  role: string;
}

export const AuthContext = createContext<{
  user: AuthInfo | null;
  login: (info: AuthInfo) => void;
  logout: () => void;
}>({
  user: null,
  login: () => {},
  logout: () => {},
});
