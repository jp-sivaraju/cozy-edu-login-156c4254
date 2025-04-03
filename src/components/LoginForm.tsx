
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { EyeIcon, EyeOffIcon, ArrowRightIcon, MailIcon, ShieldIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import confetti from 'canvas-confetti';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';

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
        particleCount: 100,
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
          <Alert variant="destructive" className="bg-white border-[#FF9933]">
            <AlertTitle className="text-[#FF9933]">Login Failed</AlertTitle>
            <AlertDescription className="text-[#FF9933]">{loginError}</AlertDescription>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#000080] font-medium text-base">I am a</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="edu-input border-[#138808] focus:border-[#138808] text-[#000080]">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="driver">Driver</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
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
            <FormItem>
              <FormLabel className="text-[#000080] font-medium text-base">Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    className="edu-input border-[#138808] focus:border-[#138808] pl-10"
                    placeholder="your.email@example.com"
                    {...field}
                    autoComplete="email"
                    aria-label="Email address"
                  />
                  <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#138808] w-5 h-5" />
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
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel className="text-[#000080] font-medium text-base">Password</FormLabel>
                <button 
                  type="button" 
                  onClick={onForgotPassword} 
                  className="text-sm text-[#000080] font-bold hover:text-[#000080]/80 transition-colors border-b border-transparent hover:border-[#000080]/30"
                >
                  Forgot password?
                </button>
              </div>
              <FormControl>
                <div className="relative">
                  <Input
                    className="edu-input border-[#138808] focus:border-[#138808] pl-10 pr-10"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...field}
                    autoComplete="current-password"
                    aria-label="Password"
                  />
                  <ShieldIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#138808] w-5 h-5" />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#138808] hover:text-[#138808]/70"
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
          className="edu-button-primary w-full text-lg py-4 hover:shadow-[0_0_10px_rgba(19,136,8,0.5)] transition-all duration-300"
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
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </div>
          )}
        </Button>

        <div className="text-center mt-4">
          <p className="text-[#000080]">
            New user? 
            <Link to="/signup" className="ml-2 text-[#FF9933] font-bold hover:text-[#FF9933]/80 transition-colors">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
