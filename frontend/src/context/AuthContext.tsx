import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type AuthContextType = {
  isAuthenticated: boolean;
  token: string | null;  // Added token to context type
  login: (token: string) => void;
  logout: () => void;
  getAuthHeader: () => HeadersInit;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const navigate = useNavigate();

  // Derive isAuthenticated from token state
  const isAuthenticated = !!token;

  const getAuthHeader = (): HeadersInit => {
    return {
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    };
  };

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);  // Update token state
    navigate('/search');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);  // Clear token state
    navigate('/');
  };

  // Verify token on initial load
  useEffect(() => {
    const verifyToken = async () => {
      if (token) {  // Use token state
        try {
          const response = await fetch('http://localhost:5000/api/auth/verify', {
            headers: getAuthHeader()
          });
          
          if (!response.ok) {
            throw new Error('Token verification failed');
          }
        } catch (error) {
          logout();
        }
      }
    };
    verifyToken();
  }, [token]);  // Add token to dependency array

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout, getAuthHeader }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};