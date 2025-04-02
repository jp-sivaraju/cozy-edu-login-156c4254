
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Logo from "@/components/Logo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-edu-blue-light via-white to-edu-purple-light flex items-center justify-center p-8">
      <div className="edu-card text-center max-w-lg">
        <Logo className="mx-auto mb-8" />
        
        <h1 className="text-5xl font-bold mb-4 text-slate-800">404</h1>
        <p className="text-xl text-slate-600 mb-8">
          Oops! We couldn't find the page you're looking for.
        </p>
        
        <Link to="/" className="edu-button-primary inline-block">
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
