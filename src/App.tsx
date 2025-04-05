import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
import { AuthProvider, AuthContext } from '@/contexts/AuthContext';

import StudentPerformancePage from '@/pages/teacher/StudentPerformance';
import ParentCommunicationPage from '@/pages/teacher/ParentCommunication';
import LessonPlanningPage from '@/pages/teacher/LessonPlanning';

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
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
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/diary" element={<Diary />} />
              <Route path="/fees" element={<Fees />} />
              <Route path="/transport" element={<Transport />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/student-profile" element={<StudentProfile />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/leaves" element={<Leaves />} />
              <Route path="/store" element={<Store />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/help" element={<Help />} />
              <Route path="/hall-tickets" element={<HallTickets />} />
              <Route path="/ptm" element={<PTM />} />
              
              {/* Teacher routes */}
              <Route path="/teacher/diary" element={<TeacherDiary />} />
              <Route path="/teacher/attendance" element={<AttendancePage />} />
              <Route path="/teacher/grades" element={<GradeManagement />} />
              <Route path="/teacher/assessments" element={<Assessments />} />
              <Route path="/teacher/diary-management" element={<DiaryManagement />} />
              <Route path="/teacher/performance" element={<StudentPerformancePage />} />
              <Route path="/teacher/communication" element={<ParentCommunicationPage />} />
              <Route path="/teacher/lessons" element={<LessonPlanningPage />} />
              
              {/* Admin routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/financial" element={<FinancialOverview />} />
              <Route path="/admin/curriculum" element={<CurriculumGeneration />} />
              
              {/* Driver routes */}
              <Route path="/driver/tracking" element={<Tracking />} />
              <Route path="/driver/notifications" element={<DriverNotifications />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
