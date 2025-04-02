
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/Logo';
import LoginForm from '@/components/LoginForm';
import ForgotPasswordForm from '@/components/ForgotPasswordForm';
import ResetPasswordForm from '@/components/ResetPasswordForm';

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
    <div className="min-h-screen bg-gradient-to-br from-[#FFF9F0] via-white to-[#F0FFF0] flex flex-col md:flex-row">
      {/* Left side - Branding */}
      <div className="flex-1 flex flex-col justify-center p-8 md:p-16">
        <div className="max-w-md mx-auto">
          <Logo size="lg" className="mb-8" />
          <h1 className="text-4xl font-bold mb-4 text-[#000080]">
            Welcome to the future of education management
          </h1>
          <p className="text-slate-600 text-lg">
            A secure, intuitive platform connecting parents, teachers, administrators, and drivers.
          </p>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 border border-[#138808]/20">
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
        </div>
      </div>
    </div>
  );
};

export default Login;
