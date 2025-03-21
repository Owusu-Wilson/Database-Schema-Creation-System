import { createContext, useContext, ReactNode } from 'react';
import { User } from '../types'; // Adjust the import path as necessary
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { login, logout, signup } from '../store/slices/authSlice';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.auth);

  const handleLogin = async (email: string, password: string) => {
    await dispatch(login({ email, password })).unwrap();
  };
  const handleSignup = async (email: string, password: string) => {
    await dispatch(signup({ email, password })).unwrap();
  };

  const handleLogout = async () => {
    await dispatch(logout()).unwrap();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login: handleLogin,
        logout: handleLogout,
        signup: handleSignup,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}