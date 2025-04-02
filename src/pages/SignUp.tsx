
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Form validation schema
const signUpFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  studentId: z.string().min(1, { message: "Student ID is required." }),
  phoneNumber: z.string().min(10, { message: "Please enter a valid phone number." }),
});

type SignUpFormValues = z.infer<typeof signUpFormSchema>;

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<'form' | 'otp'>('form');
  const [otpValue, setOtpValue] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpError, setOtpError] = useState("");

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      studentId: '',
      phoneNumber: '',
    },
  });

  const onSubmit = async (values: SignUpFormValues) => {
    setIsSubmitting(true);
    try {
      // In a real application, this would call your API to send OTP
      console.log("Sending OTP to:", values.email);
      setEmail(values.email);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Verification code sent",
        description: `We've sent a verification code to ${values.email}`,
      });
      
      setCurrentStep('otp');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send verification code. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const verifyOtp = async () => {
    setIsSubmitting(true);
    setOtpError("");
    
    try {
      // In a real application, this would call your API to verify OTP
      console.log("Verifying OTP:", otpValue);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any 6-digit OTP
      if (otpValue.length === 6) {
        toast({
          title: "Registration successful!",
          description: "Your account has been created successfully.",
        });
        
        // Redirect to login page after successful registration
        navigate('/login');
      } else {
        setOtpError("Invalid verification code. Please check and try again.");
      }
    } catch (error) {
      setOtpError("Failed to verify code. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resendOtp = async () => {
    try {
      // In a real application, this would call your API to resend OTP
      console.log("Resending OTP to:", email);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Verification code resent",
        description: `We've sent a new verification code to ${email}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to resend verification code. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-edu-blue-light via-white to-edu-green-light flex flex-col md:flex-row">
      {/* Left side - Branding */}
      <div className="flex-1 flex flex-col justify-center p-8 md:p-16">
        <div className="max-w-md mx-auto">
          <Logo size="lg" className="mb-8" />
          <h1 className="text-4xl font-bold mb-4">
            Join the EduSense family
          </h1>
          <p className="text-slate-600 text-lg">
            Connect with your child's educational journey and stay informed every step of the way.
          </p>
        </div>
      </div>

      {/* Right side - Sign Up Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="w-full max-w-md border-none shadow-lg bg-white">
          <div className="bg-edu-yellow rounded-t-lg p-6">
            <CardHeader className="p-0">
              <CardTitle className="text-3xl font-semibold text-slate-800">
                {currentStep === 'form' ? 'Parent Sign Up' : 'Verify Email'}
              </CardTitle>
              <CardDescription className="text-slate-700">
                {currentStep === 'form' 
                  ? 'Create your account to get started'
                  : 'Enter the verification code sent to your email'}
              </CardDescription>
            </CardHeader>
          </div>
          
          <CardContent className="p-6 pt-8">
            {currentStep === 'form' ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your full name" 
                            className="border-edu-green focus:border-edu-green focus:ring-edu-blue-light" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="Enter your email address" 
                            className="border-edu-green focus:border-edu-green focus:ring-edu-blue-light" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="studentId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Student ID</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter student ID" 
                            className="border-edu-green focus:border-edu-green focus:ring-edu-blue-light" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input 
                            type="tel" 
                            placeholder="Enter your phone number" 
                            className="border-edu-green focus:border-edu-green focus:ring-edu-blue-light" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full bg-edu-blue hover:bg-edu-blue/90 text-white" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Processing..." : "Continue"}
                    </Button>
                  </div>
                  
                  <div className="text-center mt-4">
                    <p className="text-slate-600">
                      Already have an account?{" "}
                      <a href="/login" className="text-edu-blue hover:underline font-medium">
                        Sign in
                      </a>
                    </p>
                  </div>
                </form>
              </Form>
            ) : (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <p className="text-edu-blue mb-4">
                    We've sent a 6-digit code to <span className="font-medium">{email}</span>
                  </p>
                </div>
                
                {otpError && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{otpError}</AlertDescription>
                  </Alert>
                )}
                
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otpValue}
                    onChange={setOtpValue}
                    render={({ slots }) => (
                      <InputOTPGroup className="gap-2">
                        {slots.map((slot, index) => (
                          <InputOTPSlot
                            key={index}
                            index={index}
                            className="border-edu-green rounded-md"
                            {...slot}
                          />
                        ))}
                      </InputOTPGroup>
                    )}
                  />
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={verifyOtp} 
                    className="w-full bg-edu-blue hover:bg-edu-blue/90 text-white" 
                    disabled={isSubmitting || otpValue.length !== 6}
                  >
                    {isSubmitting ? "Verifying..." : "Verify & Create Account"}
                  </Button>
                </div>
                
                <div className="text-center mt-4">
                  <p className="text-slate-600">
                    Didn't receive code?{" "}
                    <button 
                      type="button" 
                      onClick={resendOtp} 
                      className="text-edu-blue hover:underline font-medium"
                    >
                      Resend
                    </button>
                  </p>
                  <p className="text-slate-600 mt-2">
                    <button 
                      type="button" 
                      onClick={() => setCurrentStep('form')} 
                      className="text-edu-blue hover:underline font-medium"
                    >
                      Go back
                    </button>
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
