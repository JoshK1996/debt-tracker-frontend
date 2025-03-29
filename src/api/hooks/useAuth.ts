import { useState } from 'react';
import axiosClient from '../axiosClient';
import { useRouter } from 'next/navigation';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  user?: {
    id: number;
    name: string;
    email: string;
    role: string;
    company_id?: number;
  };
}

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  /**
   * Login user with email and password
   */
  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axiosClient.post<AuthResponse>('/auth/login', credentials);
      const { access_token, refresh_token, user } = response.data;
      
      // Store tokens in localStorage
      localStorage.setItem('accessToken', access_token);
      if (refresh_token) {
        localStorage.setItem('refreshToken', refresh_token);
      }
      
      // Store user data
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout user
   */
  const logout = async () => {
    setIsLoading(true);
    
    try {
      // Call logout endpoint if it exists
      try {
        await axiosClient.post('/auth/logout');
      } catch (err) {
        // Ignore errors from logout endpoint
      }
      
      // Clear localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      
      // Redirect to login
      router.push('/login');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Logout failed.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Get the current authenticated user
   */
  const getCurrentUser = () => {
    const userString = localStorage.getItem('user');
    if (!userString) return null;
    
    try {
      return JSON.parse(userString);
    } catch (err) {
      return null;
    }
  };

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = () => {
    return !!localStorage.getItem('accessToken');
  };

  return {
    login,
    logout,
    getCurrentUser,
    isAuthenticated,
    isLoading,
    error,
  };
}