
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/Logo';
import LoginForm from '@/components/LoginForm';
import ForgotPasswordForm from '@/components/ForgotPasswordForm';
import ResetPasswordForm from '@/components/ResetPasswordForm';
import { motion } from 'framer-motion';

type AuthView = 'login' | 'forgot-password' | 'reset-password';

const Login = () => {
  const { user } = useAuth();
  const [view, setView] = useState<AuthView>('login');
  const [email, setEmail] = useState('');

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleForgotPassword = () => {
    setView('forgot-password');
  };

  const handleEmailSent = (email: string) => {
    setEmail(email);
    setView('reset-password');
  };

  const handleBackToLogin = () => {
    setView('login');
  };

  const handleResetSuccess = () => {
    setView('login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-white to-[#F0FFF0] flex flex-col md:flex-row relative">
      {/* Background overlay with school-related image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10 z-0"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9')" }}
      />

      {/* Left side - Branding */}
      <motion.div 
        className="flex-1 flex flex-col justify-center p-8 md:p-16 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-md mx-auto">
          <div className="flex items-center">
            <Logo size="lg" className="mb-8" />
            <img 
              src="/placeholder.svg" 
              alt="School Logo" 
              className="h-12 w-12 ml-4 mb-8" 
            />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-[#000080]">
            Welcome to the future of education management
            <span className="block h-1 w-32 bg-[#138808] mt-2 rounded-full"></span>
          </h1>
          <p className="text-slate-600 text-lg mb-3">
            A secure, intuitive platform connecting parents, teachers, administrators, and drivers.
          </p>
          <p className="text-[#000080] text-lg font-medium">
            Empowering Learning at Modern School
          </p>
        </div>
      </motion.div>

      {/* Right side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-8 z-10">
        <motion.div 
          className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-[#138808]/20"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="mb-8">
            {view === 'login' && (
              <>
                <h2 className="text-3xl font-semibold mb-2 text-[#FF9933]">Sign in</h2>
                <p className="text-[#000080]">
                  Enter your credentials to access your account
                </p>
              </>
            )}
            
            {view === 'forgot-password' && (
              <>
                <h2 className="text-3xl font-semibold mb-2 text-[#FF9933]">Forgot Password</h2>
                <p className="text-[#000080]">
                  Enter your email to receive a password reset link
                </p>
              </>
            )}
            
            {view === 'reset-password' && (
              <>
                <h2 className="text-3xl font-semibold mb-2 text-[#FF9933]">Reset Password</h2>
                <p className="text-[#000080]">
                  Create a new password for your account
                </p>
              </>
            )}
          </div>

          {view === 'login' && (
            <LoginForm onForgotPassword={handleForgotPassword} />
          )}

          {view === 'forgot-password' && (
            <ForgotPasswordForm 
              onBack={handleBackToLogin} 
              onEmailSent={handleEmailSent} 
            />
          )}

          {view === 'reset-password' && (
            <ResetPasswordForm 
              email={email}
              onBack={() => setView('forgot-password')} 
              onSuccess={handleResetSuccess} 
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
