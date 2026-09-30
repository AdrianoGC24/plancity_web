import { createContext, useEffect, useState } from "react";

import type { ReactNode } from "react";

import type { UserResponse } from "../../types/user";

import type { Login, Register } from "../../types/interfaces";

import {
  login as loginService,
  register as registerService,
  logout as logoutService,
  getMe,
} from "../../features/auth/services/authService";

import { storage } from "../../lib/storage";

interface AuthContextType {
  user: UserResponse | null;

  token: string | null;

  role: string | null;

  loading: boolean;

  login(data: Login): Promise<UserResponse>;

  register(data: Register): Promise<void>;

  logout(): Promise<void>;

  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [token, setToken] = useState<string | null>(storage.getToken());
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false);

        return;
      }

      try {
        const user = await getMe();

        setUser(user);
      } catch {
        storage.removeToken();

        setToken(null);

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [token]);

  const login = async (data: Login) => {
    const response = await loginService(data);
    storage.setToken(response.accessToken);
    setToken(response.accessToken);
    setUser(response.user);
    return response.user;
  };

  const register = async (data: Register) => {
    const response = await registerService(data);

    storage.setToken(response.accessToken);

    setToken(response.accessToken);

    setUser(response.user);
  };
  const logout = async () => {
    try {
      await logoutService();
    } finally {
      storage.removeToken();
      setToken(null);
      setUser(null);
    }
  };
  return (
    <AuthContext.Provider   value={{  user, token, role: user?.role ?? null, loading,   login,   register,   logout,  isAuthenticated: !!user, }} >
      {children}
    </AuthContext.Provider>
  );
}
