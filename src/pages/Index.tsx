
import { Navigate } from "react-router-dom";

const Index = () => {
  // Set some demo credentials in localStorage for testing
  const setupDemoUser = () => {
    // Only set up demo user if it doesn't already exist
    if (!localStorage.getItem('eduSenseUser')) {
      const demoUser = {
        id: 'demo123',
        email: 'parent@example.com',
        name: 'Demo Parent',
        role: 'parent'
      };
      
      localStorage.setItem('eduSenseUser', JSON.stringify(demoUser));
      
      // Redirect to dashboard after setting up demo user
      return <Navigate to="/dashboard" replace />;
    }
    
    // If user is already set up, redirect to login page
    return <Navigate to="/login" replace />;
  };

  return setupDemoUser();
};

export default Index;
