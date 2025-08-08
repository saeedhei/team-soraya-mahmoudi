import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/useAuth';

import Signup from '@/pages/Signup';
import Login from '@/pages/login';
import ForgotPassword from '@/pages/forgot-password';
import ResetPassword from '@/pages/reset-password';
import Profile from '@/pages/dashboard/profile';
import DoctorDashboard from '@/pages/dashboard/doctor';
import PatientDashboard from '@/pages/dashboard/patient';
import DoctorAppointments from '@/pages/doctor-appointment';
import PatientAppointments from '@/pages/patient-appoimtment';
import PrivateRoute from '@/components/auth/PrivateRoute';
import RoleBasedRoute from '@/components/auth/RoleBasedRoute';
import PageNotFound from '@/pages/PageNotFound';

export default function AppRouter() {
  const { loading } = useAuth();

  if (loading) {
    return <p className="text-center mt-20">Loading...</p>;
  }
  
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
