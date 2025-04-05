
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Fees from "./pages/Fees";
import Transport from "./pages/Transport";
import Diary from "./pages/Diary";
import Alerts from "./pages/Alerts";
import Notifications from "./pages/Notifications";
import Reports from "./pages/Reports";
import Schedule from "./pages/Schedule";
import StudentProfile from "./pages/StudentProfile";
import Calendar from "./pages/Calendar";
import Leaves from "./pages/Leaves";
import Store from "./pages/Store";
import Feedback from "./pages/Feedback";
import Help from "./pages/Help";
import HallTickets from "./pages/HallTickets";
import PTM from "./pages/PTM";
import CurriculumGeneration from "./pages/admin/CurriculumGeneration";
import AdminDashboard from "./pages/admin/AdminDashboard";
import FinancialOverview from "./pages/admin/FinancialOverview";
import AdminLayout from "./components/layouts/AdminLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-16 w-16 border-4 border-t-edu-blue border-edu-blue-light rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Admin route component - ensures user is admin
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-16 w-16 border-4 border-t-edu-blue border-edu-blue-light rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <AdminLayout>{children}</AdminLayout>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      
      {/* Standard protected routes */}
      <Route
        path="/fees"
        element={
          <ProtectedRoute>
            <Fees />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transport"
        element={
          <ProtectedRoute>
            <Transport />
          </ProtectedRoute>
        }
      />
      <Route
        path="/diary"
        element={
          <ProtectedRoute>
            <Diary />
          </ProtectedRoute>
        }
      />
      <Route
        path="/alerts"
        element={
          <ProtectedRoute>
            <Alerts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        }
      />
      <Route
        path="/schedule"
        element={
          <ProtectedRoute>
            <Schedule />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student-profile"
        element={
          <ProtectedRoute>
            <StudentProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/calendar"
        element={
          <ProtectedRoute>
            <Calendar />
          </ProtectedRoute>
        }
      />
      <Route
        path="/leaves"
        element={
          <ProtectedRoute>
            <Leaves />
          </ProtectedRoute>
        }
      />
      <Route
        path="/store"
        element={
          <ProtectedRoute>
            <Store />
          </ProtectedRoute>
        }
      />
      <Route
        path="/feedback"
        element={
          <ProtectedRoute>
            <Feedback />
          </ProtectedRoute>
        }
      />
      <Route
        path="/help"
        element={
          <ProtectedRoute>
            <Help />
          </ProtectedRoute>
        }
      />
      <Route
        path="/hall-tickets"
        element={
          <ProtectedRoute>
            <HallTickets />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ptm"
        element={
          <ProtectedRoute>
            <PTM />
          </ProtectedRoute>
        }
      />
      
      {/* Admin routes */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      
      <Route
        path="/admin/curriculum-generation"
        element={
          <AdminRoute>
            <CurriculumGeneration />
          </AdminRoute>
        }
      />

      {/* Financial Overview - Show the dedicated Financial Overview page */}
      <Route
        path="/admin/financial"
        element={
          <AdminRoute>
            <FinancialOverview />
          </AdminRoute>
        }
      />

      {/* New Admin Routes for all other modules */}
      <Route path="/admin/users" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/staff" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/onboarding" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/exams/schedule" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/report-cards" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/lesson-plans" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/routes" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/transport/assign" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/routes/assign" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/financial" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/fees" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/concessions" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/fees/bulk-approve" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/hall-tickets" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/hall-tickets/bulk-approve" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/notifications" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/messages" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/reports" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/analytics" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/settings" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/library" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/inventory" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/homework" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/payroll" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/website" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/academic-reports" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

      {/* Catch-all admin route */}
      <Route path="/admin/*" element={
        <AdminRoute>
          <AdminDashboard />
        </AdminRoute>
      } />
      
      {/* Redirect from home to dashboard if logged in, otherwise to login */}
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
