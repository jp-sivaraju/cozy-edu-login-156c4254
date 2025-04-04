
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/Logo';
import LoginForm from '@/components/LoginForm';
import ForgotPasswordForm from '@/components/ForgotPasswordForm';
import ResetPasswordForm from '@/components/ResetPasswordForm';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleBackground from '@/components/ParticleBackground';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';

type AuthView = 'login' | 'forgot-password' | 'reset-password';

const Login = () => {
  const { user } = useAuth();
  const [view, setView] = useState<AuthView>('login');
  const [email, setEmail] = useState('');
  const { theme, toggleTheme } = useTheme();

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
    <div className="min-h-screen bg-gradient-to-br from-[#f9fcff] via-[#f6fcfc] to-[#f0fff4] dark:from-[#121212] dark:via-[#131825] dark:to-[#101820] flex flex-col md:flex-row relative overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Theme Toggle Button */}
      <div className="absolute top-4 right-4 z-50">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleTheme}
          className="rounded-full w-10 h-10 bg-white/20 backdrop-blur-md border border-white/20 hover:bg-white/30 transition-all duration-300"
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5 text-yellow-200" />
          ) : (
            <Moon className="h-5 w-5 text-[#000080]" />
          )}
        </Button>
      </div>

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
          <h1 className="text-4xl font-bold mb-4 text-[#000080] dark:text-white">
            Welcome to the future of education management
            <motion.span 
              className="block h-1 w-32 bg-gradient-to-r from-[#FF9933] to-[#138808] mt-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '8rem' }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg mb-3">
            A secure, intuitive platform connecting parents, teachers, administrators, and drivers.
          </p>
          <p className="text-[#000080] dark:text-[#a3b8ff] text-lg font-medium">
            Empowering Learning at Modern School
          </p>
        </div>
      </motion.div>

      {/* Right side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-8 z-10">
        <AnimatePresence mode="wait">
          <motion.div 
            key={view}
            className="w-full max-w-md bg-white/70 dark:bg-[#0a0a0a]/60 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-white/30 dark:border-white/10"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mb-8">
              {view === 'login' && (
                <>
                  <h2 className="text-3xl font-semibold mb-2 text-[#FF9933] dark:text-[#FFB366]">Sign in</h2>
                  <p className="text-[#000080] dark:text-slate-300">
                    Enter your credentials to access your account
                  </p>
                </>
              )}
              
              {view === 'forgot-password' && (
                <>
                  <h2 className="text-3xl font-semibold mb-2 text-[#FF9933] dark:text-[#FFB366]">Forgot Password</h2>
                  <p className="text-[#000080] dark:text-slate-300">
                    Enter your email to receive a password reset link
                  </p>
                </>
              )}
              
              {view === 'reset-password' && (
                <>
                  <h2 className="text-3xl font-semibold mb-2 text-[#FF9933] dark:text-[#FFB366]">Reset Password</h2>
                  <p className="text-[#000080] dark:text-slate-300">
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
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Login;
