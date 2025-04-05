
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

import Index from '@/pages/Index';
import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';
import Dashboard from '@/pages/Dashboard';
import Diary from '@/pages/Diary';
import Fees from '@/pages/Fees';
import Transport from '@/pages/Transport';
import Reports from '@/pages/Reports';
import Schedule from '@/pages/Schedule';
import Alerts from '@/pages/Alerts';
import Notifications from '@/pages/Notifications';
import StudentProfile from '@/pages/StudentProfile';
import Calendar from '@/pages/Calendar';
import Leaves from '@/pages/Leaves';
import Store from '@/pages/Store';
import Feedback from '@/pages/Feedback';
import Help from '@/pages/Help';
import HallTickets from '@/pages/HallTickets';
import PTM from '@/pages/PTM';
import NotFound from '@/pages/NotFound';

import TeacherDiary from '@/pages/teacher/Diary';
import AttendancePage from '@/pages/teacher/Attendance';
import GradeManagement from '@/pages/teacher/GradeManagement';
import Assessments from '@/pages/teacher/Assessments';
import DiaryManagement from '@/pages/teacher/DiaryManagement';
import AdminDashboard from '@/pages/admin/Dashboard';
import FinancialOverview from '@/pages/admin/FinancialOverview';
import CurriculumGeneration from '@/pages/admin/CurriculumGeneration';
import Tracking from '@/pages/driver/Tracking';
import DriverNotifications from '@/pages/driver/Notifications';
import { AuthProvider, AuthContext, useAuth } from '@/contexts/AuthContext';

import StudentPerformancePage from '@/pages/teacher/StudentPerformance';
import ParentCommunicationPage from '@/pages/teacher/ParentCommunication';
import LessonPlanningPage from '@/pages/teacher/LessonPlanning';

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/diary" element={
              <ProtectedRoute>
                <Diary />
              </ProtectedRoute>
            } />
            
            <Route path="/fees" element={
              <ProtectedRoute>
                <Fees />
              </ProtectedRoute>
            } />
            
            <Route path="/transport" element={
              <ProtectedRoute>
                <Transport />
              </ProtectedRoute>
            } />
            
            <Route path="/reports" element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            } />
            
            <Route path="/schedule" element={
              <ProtectedRoute>
                <Schedule />
              </ProtectedRoute>
            } />
            
            <Route path="/alerts" element={
              <ProtectedRoute>
                <Alerts />
              </ProtectedRoute>
            } />
            
            <Route path="/notifications" element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            } />
            
            <Route path="/student-profile" element={
              <ProtectedRoute>
                <StudentProfile />
              </ProtectedRoute>
            } />
            
            <Route path="/calendar" element={
              <ProtectedRoute>
                <Calendar />
              </ProtectedRoute>
            } />
            
            <Route path="/leaves" element={
              <ProtectedRoute>
                <Leaves />
              </ProtectedRoute>
            } />
            
            <Route path="/store" element={
              <ProtectedRoute>
                <Store />
              </ProtectedRoute>
            } />
            
            <Route path="/feedback" element={
              <ProtectedRoute>
                <Feedback />
              </ProtectedRoute>
            } />
            
            <Route path="/help" element={
              <ProtectedRoute>
                <Help />
              </ProtectedRoute>
            } />
            
            <Route path="/hall-tickets" element={
              <ProtectedRoute>
                <HallTickets />
              </ProtectedRoute>
            } />
            
            <Route path="/ptm" element={
              <ProtectedRoute>
                <PTM />
              </ProtectedRoute>
            } />
            
            {/* Teacher routes */}
            <Route path="/teacher/diary" element={
              <ProtectedRoute>
                <TeacherDiary />
              </ProtectedRoute>
            } />
            
            <Route path="/teacher/attendance" element={
              <ProtectedRoute>
                <AttendancePage />
              </ProtectedRoute>
            } />
            
            <Route path="/teacher/grades" element={
              <ProtectedRoute>
                <GradeManagement />
              </ProtectedRoute>
            } />
            
            <Route path="/teacher/assessments" element={
              <ProtectedRoute>
                <Assessments />
              </ProtectedRoute>
            } />
            
            <Route path="/teacher/diary-management" element={
              <ProtectedRoute>
                <DiaryManagement />
              </ProtectedRoute>
            } />
            
            <Route path="/teacher/performance" element={
              <ProtectedRoute>
                <StudentPerformancePage />
              </ProtectedRoute>
            } />
            
            <Route path="/teacher/communication" element={
              <ProtectedRoute>
                <ParentCommunicationPage />
              </ProtectedRoute>
            } />
            
            <Route path="/teacher/lessons" element={
              <ProtectedRoute>
                <LessonPlanningPage />
              </ProtectedRoute>
            } />
            
            {/* Admin routes */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/financial" element={
              <ProtectedRoute>
                <FinancialOverview />
              </ProtectedRoute>
            } />
            
            <Route path="/admin/curriculum" element={
              <ProtectedRoute>
                <CurriculumGeneration />
              </ProtectedRoute>
            } />
            
            {/* Driver routes */}
            <Route path="/driver/tracking" element={
              <ProtectedRoute>
                <Tracking />
              </ProtectedRoute>
            } />
            
            <Route path="/driver/notifications" element={
              <ProtectedRoute>
                <DriverNotifications />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
