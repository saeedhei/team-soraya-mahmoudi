import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from '@/pages/Signup';
import Login from '@/pages/login/page';
import ForgotPassword from '@/pages/ForgotPasswordPage';
import ResetPassword from '@/pages/ResetPasswordPage';
import Profile from '@/pages/Profile';
import DoctorDashboard from '@/pages/DoctorDashboard';
import PatientDashboard from '@/pages/PatientDashboard';
import DoctorAppointments from '@/pages/DoctorAppointments';
import PatientAppointments from '@/pages/PatientAppointments';
import PrivateRoute from '@/components/auth/PrivateRoute';
import RoleBasedRoute from '@/components/auth/RoleBasedRoute';
import PageNotFound from '@/pages/PageNotFound';

export default function AppRouter() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Protected Routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />

        {/* Doctor Routes */}
        <Route element={<RoleBasedRoute allowedRoles={['doctor']} />}>
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor-appointments" element={<DoctorAppointments />} />
        </Route>

        {/* Patient Routes */}
        <Route element={<RoleBasedRoute allowedRoles={['patient']} />}>
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/patient-appointments" element={<PatientAppointments />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
