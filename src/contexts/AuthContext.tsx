
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

// Define user roles
export type UserRole = 'parent' | 'teacher' | 'admin' | 'driver';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (email: string, otp: string, newPassword: string) => Promise<void>;
}

// Export the AuthContext
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  login: async () => {},
  logout: () => {},
  forgotPassword: async () => {},
  resetPassword: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('eduSenseUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Simulated login - in a real app, this would call your authentication endpoint
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, simulate different user roles based on email pattern
      let role: UserRole = 'parent';
      if (email.includes('teacher')) {
        role = 'teacher';
      } else if (email.includes('admin')) {
        role = 'admin';
      } else if (email.includes('driver')) {
        role = 'driver';
      }
      
      const userData: User = {
        id: '123456',
        email,
        name: email.split('@')[0],
        role
      };
      
      localStorage.setItem('eduSenseUser', JSON.stringify(userData));
      setUser(userData);
      
      toast({
        title: "Welcome back!",
        description: `You've successfully logged in as a ${role}`,
      });
    } catch (error) {
      console.error('Login error:', error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Please check your credentials and try again.",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('eduSenseUser');
    setUser(null);
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
  };

  const forgotPassword = async (email: string) => {
    try {
      setIsLoading(true);
      
      // Simulated API call - would send an OTP to the user's email
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Password recovery email sent",
        description: "Please check your email for the OTP code.",
      });
    } catch (error) {
      console.error('Forgot password error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send password recovery email. Please try again.",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string, otp: string, newPassword: string) => {
    try {
      setIsLoading(true);
      
      // Simulated API call - would verify OTP and reset password
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Password reset successful",
        description: "Your password has been updated. You can now log in with your new password.",
      });
    } catch (error) {
      console.error('Reset password error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to reset password. Please try again.",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, forgotPassword, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};
