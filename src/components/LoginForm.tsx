
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { EyeIcon, EyeOffIcon, ArrowRightIcon, MailIcon, ShieldIcon, Apple, Mail, LockKeyhole } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import confetti from 'canvas-confetti';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const loginSchema = z.object({
  role: z.string().min(1, 'Please select a user role'),
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onForgotPassword: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onForgotPassword }) => {
  const { login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const { toast } = useToast();
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      role: 'parent',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoginError('');
    try {
      await login(data.email, data.password);
      
      // Trigger confetti on successful login
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#138808', '#FF9933', '#FFFFFF'],
      });
      
      toast({
        title: "Login successful!",
        description: `Welcome back! You've been logged in as a ${data.role}.`,
      });
    } catch (error) {
      console.error('Login submission error:', error);
      setLoginError('Invalid email or password. Please try again.');
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 animate-fade-in">
        {loginError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Alert variant="destructive" className="bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-800/30">
              <AlertTitle className="text-red-500 dark:text-red-300">Login Failed</AlertTitle>
              <AlertDescription className="text-red-600 dark:text-red-200">{loginError}</AlertDescription>
            </Alert>
          </motion.div>
        )}

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#000080] dark:text-slate-300 font-medium text-base">I am a</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="edu-input border-[#138808]/50 focus:border-[#138808] dark:border-slate-700 dark:focus:border-slate-500 dark:bg-slate-900/50 text-[#000080] dark:text-slate-300">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="glass-card dark:bg-slate-900/90">
                  <SelectItem value="parent" className="focus:bg-[#138808]/10 dark:focus:bg-[#138808]/20">Parent</SelectItem>
                  <SelectItem value="teacher" className="focus:bg-[#138808]/10 dark:focus:bg-[#138808]/20">Teacher</SelectItem>
                  <SelectItem value="driver" className="focus:bg-[#138808]/10 dark:focus:bg-[#138808]/20">Driver</SelectItem>
                  <SelectItem value="admin" className="focus:bg-[#138808]/10 dark:focus:bg-[#138808]/20">Admin</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel 
                className={`text-[#000080] dark:text-slate-300 font-medium absolute transition-all duration-200 z-10 ${
                  focusedField === 'email' || field.value 
                    ? '-top-6 left-0 text-sm' 
                    : 'top-2 left-10 text-base'
                }`}
              >
                Email
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    className={`edu-input border-[#138808]/50 dark:border-slate-700 focus:border-[#138808] dark:focus:border-slate-500 dark:bg-slate-900/50 pl-10 h-12 transition-all duration-200 ${
                      focusedField === 'email' || field.value 
                        ? 'pt-2' 
                        : 'pt-0'
                    }`}
                    placeholder=""
                    {...field}
                    autoComplete="email"
                    aria-label="Email address"
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#138808] dark:text-[#138808]/80 w-5 h-5" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <div className="flex justify-between items-center">
                <FormLabel 
                  className={`text-[#000080] dark:text-slate-300 font-medium absolute transition-all duration-200 z-10 ${
                    focusedField === 'password' || field.value 
                      ? '-top-6 left-0 text-sm' 
                      : 'top-2 left-10 text-base'
                  }`}
                >
                  Password
                </FormLabel>
                <button 
                  type="button" 
                  onClick={onForgotPassword} 
                  className="text-sm text-[#000080] dark:text-[#a3b8ff] font-bold hover:text-[#000080]/80 dark:hover:text-[#a3b8ff]/80 transition-colors border-b border-transparent hover:border-[#000080]/30 dark:hover:border-[#a3b8ff]/30 ml-auto"
                >
                  Forgot password?
                </button>
              </div>
              <FormControl>
                <div className="relative">
                  <Input
                    className={`edu-input border-[#138808]/50 dark:border-slate-700 focus:border-[#138808] dark:focus:border-slate-500 dark:bg-slate-900/50 pl-10 pr-10 h-12 transition-all duration-200 ${
                      focusedField === 'password' || field.value 
                        ? 'pt-2' 
                        : 'pt-0'
                    }`}
                    type={showPassword ? "text" : "password"}
                    placeholder=""
                    {...field}
                    autoComplete="current-password"
                    aria-label="Password"
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                  />
                  <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-[#138808] dark:text-[#138808]/80 w-5 h-5" />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#138808] dark:text-[#138808]/80 hover:text-[#138808]/70 dark:hover:text-[#138808]/50"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="edu-button-primary w-full text-lg py-4 bg-gradient-to-r from-[#FF9933] to-[#FF9933]/90 hover:shadow-[0_0_15px_rgba(255,153,51,0.6)] dark:hover:shadow-[0_0_15px_rgba(255,153,51,0.4)] transition-all duration-300"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="h-5 w-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
              Logging in...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              Login 
              <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </div>
          )}
        </Button>

        {/* Social Login Buttons */}
        <div className="relative flex items-center justify-center mt-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-300 dark:border-slate-700"></div>
          </div>
          <div className="relative px-4 text-sm text-slate-500 dark:text-slate-400 bg-white dark:bg-transparent">
            or continue with
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button 
            type="button" 
            variant="outline" 
            className="border-slate-300 dark:border-slate-700 dark:hover:border-slate-600 dark:bg-slate-900/50 dark:hover:bg-slate-800/70 flex items-center justify-center py-5"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" className="mr-2 fill-current">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.489.5.091.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.645.35-1.087.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.7 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.338-.012 2.417-.012 2.745 0 .267.18.578.688.48C19.138 20.16 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            Google
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            className="border-slate-300 dark:border-slate-700 dark:hover:border-slate-600 dark:bg-slate-900/50 dark:hover:bg-slate-800/70 flex items-center justify-center py-5"
          >
            <Apple className="mr-2 h-5 w-5" />
            Apple
          </Button>
        </div>

        <div className="text-center mt-4">
          <p className="text-[#000080] dark:text-slate-300">
            New user? 
            <Link to="/signup" className="ml-2 text-[#FF9933] dark:text-[#FFB366] font-bold hover:text-[#FF9933]/80 dark:hover:text-[#FFB366]/80 transition-colors">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
